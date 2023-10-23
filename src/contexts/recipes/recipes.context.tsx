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

const RecipesContext = createContext<IRecipesContext | undefined>(undefined);

function RecipesProvider({ children }: { children: ReactNode }) {
  const { ingredients } = useIngredients();
  const localStorageKey = 'recipes';
  const [searchQuery, setSearchQuery] = useState('');

  const [allRecipes, setAllRecipes] = useState<IRecipeStorage[]>(() => {
    const storage = localStorage.getItem(localStorageKey);

    if (storage) {
      return JSON.parse(storage) as IRecipeStorage[];
    }

    return [];
  });

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(allRecipes));
  }, [allRecipes]);

  const [recipes, setRecipes] = useState<IRecipeData[]>(() => {
    const selectedIngredients = ingredients
      .filter((i) => i.isConfirmed)
      .map((i) => i.name);

    return getRecipesForQuery(selectedIngredients);
  });

  async function fetchAndSet(ingredients: string[]): Promise<void> {
    const promise = new Promise<void>((resolve) => resolve());

    const recipesForQuery = getRecipesForQuery(ingredients);

    if (recipesForQuery.length) {
      setRecipes(recipesForQuery);

      return promise;
    }

    try {
      const recipes = (await fetchRecipes(ingredients)).data;

      const updatedStorage: IRecipeStorage[] = [
        ...allRecipes,
        {
          queryIngredients: ingredients,
          recipes,
        },
      ];

      setAllRecipes(updatedStorage);
      setRecipes(recipes);

      return promise;
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
    return {
      allRecipes,
      recipes,
      setRecipes: fetchAndSet,
      searchQuery,
      setSearchQuery,
    };
  }, [recipes, searchQuery]);

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
