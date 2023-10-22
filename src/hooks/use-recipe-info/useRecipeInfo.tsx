import { useEffect, useState } from 'react';
import { fetchRecipeInfo } from '../../services/recipe-info/recipe-info.service';
import { IRecipeInfo } from './recipe-info.interface';

function useRecipeInfo(id: number) {
  const localStorageKey = 'recipeInfo';

  const [recipes, setRecipes] = useState<IRecipeInfo[]>(() => {
    const stored = localStorage.getItem(localStorageKey);

    if (!stored) {
      return [];
    }

    return JSON.parse(stored);
  });

  const [recipe, setRecipe] = useState<IRecipeInfo | null>(null);

  useEffect(() => {
    async function getRecipeInfo() {
      let recipe = recipes.find((r) => r.id === id);

      if (recipe) {
        setRecipe(recipe);
        return;
      }

      try {
        const recipeInfoData = (await fetchRecipeInfo(id)).data;

        const recipeInfo: IRecipeInfo = {
          ...recipeInfoData,
          isFavorite: false,
        };

        setRecipes((r) => [...r, recipeInfo]);
        setRecipe(recipeInfo);
      } catch (error) {
        throw `Failed to fetch the recipe information. Error: ${error}`;
      }
    }

    getRecipeInfo();
  }, [recipes]);

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(recipes));
  }, [recipes]);

  function setIsFavorite(value: boolean) {
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

  return { recipe, setIsFavorite };
}

export { useRecipeInfo };
