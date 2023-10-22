import { ReactNode, createContext, useContext, useMemo, useState } from 'react';
import { IRecipesContext } from './recipes-context.interface';
import { IRecipeData } from '../../services/recipe/recipe-data.interface';
import { IRecipeStorage } from './recipe-storage.interface';
import { fetchRecipes } from '../../services/recipe/recipe.service';
import { useIngredients } from '../ingredients/ingredients.context';

const RecipesContext = createContext<IRecipesContext | undefined>(undefined);

function RecipesProvider({ children }: { children: ReactNode }) {
  const { ingredients } = useIngredients();
  const localStorageKey = 'recipes';

  const [recipes, setRecipes] = useState<IRecipeData[]>(() => {
    const storage = localStorage.getItem(localStorageKey);

    if (storage) {
      const localStorageRecipes = JSON.parse(storage) as IRecipeStorage[];

      const selectedIngredients = ingredients
        .filter((i) => i.isConfirmed)
        .map((i) => i.name);

      const recipesForEqualQuery = localStorageRecipes.find(
        (recipeStorage) =>
          selectedIngredients.every((i) =>
            recipeStorage.queryIngredients.includes(i)
          ) &&
          selectedIngredients.length === recipeStorage.queryIngredients.length
      );

      return recipesForEqualQuery ? recipesForEqualQuery.recipes : [];
    }

    return [];
  });

  const [searchQuery, setSearchQuery] = useState('');

  // TODO: refactor (extract local storage logic)
  async function fetchAndSet(ingredients: string[]): Promise<void> {
    const storage = localStorage.getItem(localStorageKey);
    const promise = new Promise<void>((resolve) => resolve());

    if (storage) {
      const localStorageRecipes = JSON.parse(storage) as IRecipeStorage[];

      const recipesForEqualQuery = localStorageRecipes.find(
        (recipeStorage) =>
          ingredients.every((i) =>
            recipeStorage.queryIngredients.includes(i)
          ) && ingredients.length === recipeStorage.queryIngredients.length
      );

      if (recipesForEqualQuery) {
        setRecipes(recipesForEqualQuery.recipes);

        return promise;
      }

      try {
        const recipes = (await fetchRecipes(ingredients)).data;

        const updatedStorage: IRecipeStorage[] = [
          ...localStorageRecipes,
          {
            queryIngredients: ingredients,
            recipes,
          },
        ];

        localStorage.setItem(localStorageKey, JSON.stringify(updatedStorage));
        setRecipes(recipes);

        return promise;
      } catch (error) {
        throw `Failed to fetch recipes. Error: ${error}`;
      }
    }

    try {
      const recipes = (await fetchRecipes(ingredients)).data;

      localStorage.setItem(
        localStorageKey,
        JSON.stringify([{ recipes, queryIngredients: ingredients }])
      );
      setRecipes(recipes);

      return promise;
    } catch (error) {
      throw `Failed to fetch recipes. Error: ${error}`;
    }
  }

  const searchedRecipes =
    searchQuery.length > 0
      ? recipes.filter((recipe) =>
          recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : recipes;

  const value: IRecipesContext = useMemo(() => {
    return {
      recipes: searchedRecipes,
      setRecipes: fetchAndSet,
      searchQuery,
      setSearchQuery,
    };
  }, [recipes, searchedRecipes, searchQuery]);

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
