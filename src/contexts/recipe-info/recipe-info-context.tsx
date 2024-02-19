import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { generateRecipeInfo } from '../../services/recipe-info/recipe-info.service';
import { IRecipeInfo } from './recipe-info.interface';
import { IRecipeInfoContext } from './recipe-info-context.interface';
import { AxiosError, AxiosResponse } from 'axios';
import { useAuth } from '../auth/AuthContext';
import {
  getDoc,
  doc,
  collection,
  getDocs,
  query,
  addDoc,
  setDoc,
  where,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../../firebase/config';
import { IRecipeInfoStorage } from './recipe-info-storage.interface';

const RecipeInfoContext = createContext<IRecipeInfoContext | undefined>(
  undefined
);

const localStorageKeyBase = 'recipeInfo';

function RecipeInfoProvider({ children }: { children: ReactNode }) {
  const { state } = useAuth();
  const { user } = state;
  const localStorageKey = user
    ? `${localStorageKeyBase}_${user.uid}`
    : localStorageKeyBase;

  const [recipes, setRecipes] = useState<IRecipeInfo[]>([]);

  useEffect(() => {
    syncRecipes();
  }, [user]);

  async function syncRecipes(): Promise<void> {
    if (!user) {
      return;
    }

    const localRecipeInfoStorage = getLocalData();
    const userDoc = await getDoc(doc(db, `users/${user?.uid}`));

    if (!userDoc.exists()) {
      setRecipes(localRecipeInfoStorage?.data || []);
      return;
    }

    const dbTimeStamp = userDoc.data().recipeInfoCacheTimestamp;

    if (!dbTimeStamp) {
      setRecipes(localRecipeInfoStorage?.data || []);
      return;
    }

    if (
      localRecipeInfoStorage === undefined ||
      !localRecipeInfoStorage?.data?.length ||
      localRecipeInfoStorage!.timestamp <
        userDoc.data().recipeInfoCacheTimestamp ||
      !localRecipeInfoStorage.timestamp
    ) {
      const recipesRef = collection(db, `users/${user?.uid}/recipe-info`);
      const recipesSnapshot = await getDocs(
        query(recipesRef, where('isFavorite', '==', true))
      );
      const recipes = recipesSnapshot.docs.map((s) =>
        s.data()
      ) as IRecipeInfo[];

      setRecipes(recipes);

      localStorage.setItem(
        localStorageKey,
        JSON.stringify({
          timestamp: dbTimeStamp,
          data: recipes,
        } as IRecipeInfoStorage)
      );

      return;
    }

    setRecipes(getLocalData()?.data || []);
  }

  function getLocalData(): IRecipeInfoStorage | undefined {
    const localData = localStorage.getItem(localStorageKey);

    if (localData) {
      return (JSON.parse(localData) as IRecipeInfoStorage) || undefined;
    }

    return undefined;
  }

  async function getRecipeInfo(
    ingredients: string[],
    title: string,
    category: string
  ) {
    try {
      const recipe = recipes.find((r) => r.title === title);

      if (recipe) {
        return new Promise<IRecipeInfo>((resolve) => resolve(recipe!));
      }

      const recipeRef = collection(db, `users/${user?.uid}/recipe-info`);
      const recipeSnapshot = await getDocs(
        query(recipeRef, where('title', '==', title))
      );

      if (recipeSnapshot.docs.length) {
        const recipe = recipeSnapshot.docs[0].data() as unknown as IRecipeInfo;
        const timestamp = (
          JSON.parse(
            localStorage.getItem(localStorageKey) || ''
          ) as IRecipeInfoStorage
        ).timestamp;

        setRecipes((r) => [...r, recipe]);
        localStorage.setItem(
          localStorageKey,
          JSON.stringify({
            data: [...recipes, recipe],
            timestamp,
          } as IRecipeInfoStorage)
        );

        return new Promise<IRecipeInfo>((resolve) => resolve(recipe));
      }

      const token = (await user?.getIdToken()) || '';
      const response = await generateRecipeInfo(
        ingredients,
        title,
        category,
        token
      );

      if (!(response as AxiosResponse<IRecipeInfo, any>).data) {
        throw `Failed to fetch the recipe information. Error: ${
          (response as AxiosError).message
        }`;
      }

      const fetchedRecipe: IRecipeInfo = {
        ...(response as AxiosResponse<IRecipeInfo, any>).data,
        isFavorite: false,
        title,
      };

      const recipeInfoStorage: IRecipeInfoStorage = {
        data: [...recipes, fetchedRecipe],
        timestamp: Date.now(),
      };

      setRecipes(recipeInfoStorage.data);
      localStorage.setItem(localStorageKey, JSON.stringify(recipeInfoStorage));

      addDoc(collection(db, `users/${user?.uid}/recipe-info`), fetchedRecipe);

      setDoc(
        doc(db, `users/${user?.uid}`),
        {
          recipeInfoCacheTimestamp: recipeInfoStorage.timestamp,
        },
        { merge: true }
      );

      return new Promise<IRecipeInfo>((resolve) => resolve(fetchedRecipe));
    } catch (error) {
      throw `Failed to fetch the recipe information. Error: ${error}`;
    }
  }

  function isFavorite(title: string): boolean {
    const recipe = recipes.find((r) => r.title === title);

    if (!recipe) {
      return false;
    }

    return recipe.isFavorite;
  }

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(recipes));
  }, [recipes]);

  async function setIsFavorite(title: string, value: boolean) {
    const errorMsg =
      'Tried setting isFavorite property of an unexisting recipeInfo';

    const stored = localStorage.getItem(localStorageKey);

    if (!stored) {
      throw errorMsg;
    }

    const recipes = JSON.parse(stored) as IRecipeInfo[];

    const recipe = recipes.find((r) => r.title === title);

    if (!recipe) {
      throw errorMsg;
    }

    recipe.isFavorite = value;

    setRecipes(recipes);

    const recipesRef = collection(db, `users/${user?.uid}/recipe-info`);
    const recipeSnapshot = await getDocs(
      query(recipesRef, where('title', '==', title))
    );

    setDoc(
      doc(db, `users/${user?.uid}/recipe-info/${recipeSnapshot.docs[0].id}`),
      {
        isFavorite: value,
      },
      { merge: true }
    );
  }

  const value: IRecipeInfoContext = useMemo(() => {
    return { getRecipeInfo, setIsFavorite, isFavorite, recipes };
  }, [recipes]);

  return (
    <RecipeInfoContext.Provider value={value}>
      {children}
    </RecipeInfoContext.Provider>
  );
}

function useRecipeInfo() {
  const context = useContext(RecipeInfoContext);

  if (context === undefined)
    throw new Error('RecipesContext was used outside of the RecipesProvider');
  return context;
}

export { useRecipeInfo, RecipeInfoProvider };
