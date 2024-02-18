import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { IRecipesContext } from './recipes-context.interface';
import { IRecipeData } from '../../services/recipe/recipe-data.interface';
import { IRecipeStorage, IRecipeStorageData } from './recipe-storage.interface';
import { fetchRecipes } from '../../services/recipe/recipe.service';
import { useIngredients } from '../ingredients/ingredients.context';
import { useAuth } from '../auth/AuthContext';
import { AxiosResponse } from 'axios';
import { IRecipeDto } from '../../services/recipe/recipe-dto.interface';
import { db } from '../../firebase/config';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
} from 'firebase/firestore';

const RecipesContext = createContext<IRecipesContext | undefined>(undefined);
const localStorageKeyBase = 'recipes';

function RecipesProvider({ children }: { children: ReactNode }) {
  const { ingredients } = useIngredients();
  const { state } = useAuth();
  const { user } = state;
  const localStorageKey = user
    ? `${localStorageKeyBase}_${user.uid}`
    : localStorageKeyBase;
  const [searchQuery, setSearchQuery] = useState('');

  const [allRecipes, setAllRecipes] = useState<IRecipeStorageData[]>([]);

  useEffect(() => {
    syncRecipes();
  }, [user]);

  //TODO: remove useState hook.
  const [recipesForQuery, setRecipesForQuery] = useState<IRecipeData[]>(() => {
    const selectedIngredients = ingredients
      .filter((i) => i.isConfirmed)
      .map((i) => i.name);

    return getRecipesForQuery(selectedIngredients);
  });

  async function syncRecipes(): Promise<void> {
    if (!user) {
      return;
    }

    const userDoc = await getDoc(doc(db, `users/${user?.uid}`));

    if (!userDoc.exists()) {
      setAllRecipes(getLocalData()?.data || []);
      return;
    }

    const dbTimeStamp = userDoc.data().recipeCacheTimestamp;

    if (!dbTimeStamp) {
      setAllRecipes(getLocalData()?.data || []);
      return;
    }

    if (
      getLocalData() === undefined ||
      getLocalData()!.timestamp < userDoc.data().recipeCacheTimestamp
    ) {
      const recipesRef = collection(db, `users/${user?.uid}/recipes`);
      const recipesSnapshot = await getDocs(query(recipesRef));
      const recipes = recipesSnapshot.docs.map((s) =>
        s.data()
      ) as IRecipeStorageData[];

      setAllRecipes(recipes);

      localStorage.setItem(
        localStorageKey,
        JSON.stringify({ timestamp: dbTimeStamp, data: recipes })
      );

      return;
    }

    setAllRecipes(getLocalData()?.data || []);
  }

  function getLocalData(): IRecipeStorage | undefined {
    const localData = localStorage.getItem(localStorageKey);

    if (localData) {
      return (JSON.parse(localData) as IRecipeStorage) || undefined;
    }

    return undefined;
  }

  async function fetchAndSet(ingredients: string[]): Promise<void> {
    if (!ingredients.length) {
      return;
    }

    const recipesForQuery = getRecipesForQuery(ingredients);

    if (recipesForQuery.length) {
      setRecipesForQuery(recipesForQuery);

      return;
    }

    try {
      const token = (await user?.getIdToken()) || '';
      const response = await fetchRecipes(ingredients, token);
      const recipes = (response as AxiosResponse<IRecipeDto, any>).data.recipes;

      if (!recipes.length) {
        throw 'No recipes found for this query.';
      }

      const updatedStorage: IRecipeStorage = {
        timestamp: Date.now(),
        data: [...allRecipes, { queryIngredients: ingredients, recipes }],
      };

      setAllRecipes(updatedStorage.data);
      setRecipesForQuery(recipes);
      localStorage.setItem(localStorageKey, JSON.stringify(updatedStorage));

      await addDoc(collection(db, `users/${user?.uid}/recipes`), {
        queryIngredients: ingredients,
        recipes,
      });

      await setDoc(doc(db, `users/${user?.uid}`), {
        recipeCacheTimestamp: updatedStorage.timestamp,
      });

      return;
    } catch (error: any) {
      throw `Failed to fetch recipes. Error: ${error}`;
    }
  }

  function getRecipesForQuery(ingredients: string[]): IRecipeData[] {
    return (
      allRecipes.find(
        (recipeStorage) =>
          ingredients.every((i) =>
            recipeStorage.queryIngredients.includes(i)
          ) && ingredients.length === recipeStorage.queryIngredients.length
      )?.recipes || []
    );
  }

  const value: IRecipesContext = useMemo(() => {
    const all = allRecipes.flatMap((r) => r.recipes);

    return {
      allRecipes: all,
      recipesForQuery,
      setRecipes: fetchAndSet,
      searchQuery,
      setSearchQuery,
    };
  }, [recipesForQuery, searchQuery, allRecipes]);

  return (
    <RecipesContext.Provider value={value}>{children}</RecipesContext.Provider>
  );
}

function useRecipes() {
  const context = useContext(RecipesContext);

  if (context === undefined)
    throw new Error('RecipesContext was used outside of the RecipesProvider');
  return context;
}

export { RecipesProvider, useRecipes };
