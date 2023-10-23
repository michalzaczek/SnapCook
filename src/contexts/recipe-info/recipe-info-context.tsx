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
    let recipe = recipes.find((r) => r.id === id);

    if (recipe) {
      return new Promise<IRecipeInfo>((resolve) => resolve(recipe!));
    }

    try {
      const recipeInfoData = (await fetchRecipeInfo(id)).data;

      const recipeInfo: IRecipeInfo = {
        ...recipeInfoData,
        isFavorite: false,
      };

      setRecipes((r) => [...r, recipeInfo]);
      return new Promise<IRecipeInfo>((resolve) => resolve(recipe!));
    } catch (error) {
      throw `Failed to fetch the recipe information. Error: ${error}`;
    }
  }

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(recipes));
  }, [recipes]);

  function setIsFavorite(id: number, value: boolean): IRecipeInfo {
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

    return recipe;
  }

  const value: IRecipeInfoContext = useMemo(() => {
    return { getRecipeInfo, setIsFavorite };
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
