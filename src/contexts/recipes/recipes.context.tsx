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
import { IRecipeStorage } from './recipe-storage.interface';
import { fetchRecipes } from '../../services/recipe/recipe.service';
import { useIngredients } from '../ingredients/ingredients.context';
import { useAuth } from '../auth/AuthContext';
import { AxiosResponse } from 'axios';
import { IRecipeDto } from '../../services/recipe/recipe-dto.interface';

const RecipesContext = createContext<IRecipesContext | undefined>(undefined);
const localStorageKeyBase = 'recipes';

function RecipesProvider({ children }: { children: ReactNode }) {
  const { ingredients } = useIngredients();
  const [localStorageKey, setLocalStorageKey] = useState<string>(
    () => localStorageKeyBase
  );
  const [searchQuery, setSearchQuery] = useState('');
  const { state } = useAuth();
  const { user } = state;

  const getCurrentRecipes = () => {
    const storage = localStorage.getItem(localStorageKey);

    if (storage) {
      return JSON.parse(storage) as IRecipeStorage[];
    }

    return [];
  };

  const [allRecipes, setAllRecipes] = useState<IRecipeStorage[]>(() =>
    getCurrentRecipes()
  );

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(allRecipes));
  }, [allRecipes]);

  useEffect(() => {
    setAllRecipes(getCurrentRecipes());
  }, [localStorageKey]);

  useEffect(() => {
    let key = localStorageKeyBase;

    if (user) {
      key += `_${user.uid}`;
    }

    setLocalStorageKey(key);
  }, [user]);

  const [recipesForQuery, setRecipesForQuery] = useState<IRecipeData[]>(() => {
    const selectedIngredients = ingredients
      .filter((i) => i.isConfirmed)
      .map((i) => i.name);

    return getRecipesForQuery(selectedIngredients);
  });

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

      const updatedStorage: IRecipeStorage[] = [
        ...allRecipes,
        {
          queryIngredients: ingredients,
          recipes,
        },
      ];

      setAllRecipes(updatedStorage);
      setRecipesForQuery(recipes);

      return;
    } catch (error) {
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
