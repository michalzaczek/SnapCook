import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { fetchRecipeInfo } from '../../services/recipe-info/recipe-info.service';
import { IRecipeInfo } from './recipe-info.interface';
import { IRecipeInfoContext } from './recipe-info-context.interface';
import { AxiosError, AxiosResponse } from 'axios';
import { IRecipeInfoData } from '../../services/recipe-info/recipe-info-data.interface';

const RecipeInfoContext = createContext<IRecipeInfoContext | undefined>(
  undefined
);

function RecipeInfoProvider({ children }: { children: ReactNode }) {
  const localStorageKey = 'recipeInfo';

  const [recipes, setRecipes] = useState<IRecipeInfo[]>(() => {
    const stored = localStorage.getItem(localStorageKey);

    if (!stored) {
      return [];
    }

    return JSON.parse(stored);
  });

  async function getRecipeInfo(id: number) {
    const recipe = recipes.find((r) => r.id === id);

    if (recipe) {
      return new Promise<IRecipeInfo>((resolve) => resolve(recipe!));
    }

    try {
      const response = await fetchRecipeInfo(id);

      if (!(response as AxiosResponse<IRecipeInfoData, any>).data) {
        throw `Failed to fetch the recipe information. Error: ${
          (response as AxiosError).message
        }`;
      }

      const recipeInfo: IRecipeInfo = {
        ...(response as AxiosResponse<IRecipeInfoData, any>).data,
        isFavorite: false,
      };

      setRecipes((r) => [...r, recipeInfo]);
      return new Promise<IRecipeInfo>((resolve) => resolve(recipeInfo));
    } catch (error) {
      throw `Failed to fetch the recipe information. Error: ${error}`;
    }
  }

  function isFavorite(id: number): boolean {
    const recipe = recipes.find((r) => r.id === id);

    if (!recipe) {
      return false;
    }

    return recipe.isFavorite;
  }

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(recipes));
  }, [recipes]);

  function setIsFavorite(id: number, value: boolean) {
    const errorMsg =
      'Tried setting isFavorite property of an unexisting recipeInfo';

    const stored = localStorage.getItem(localStorageKey);

    if (!stored) {
      throw errorMsg;
    }

    const recipes = JSON.parse(stored) as IRecipeInfo[];

    const recipe = recipes.find((r) => r.id === id);

    if (!recipe) {
      throw errorMsg;
    }

    recipe.isFavorite = value;

    setRecipes(recipes);
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
