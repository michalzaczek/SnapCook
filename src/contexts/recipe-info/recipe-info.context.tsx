import { useEffect, useState } from 'react';
import { IRecipeInfo } from '../../services/recipe-info/recipe-info.interface';
import { recipeInfoService } from '../../services/recipe-info.service';

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
    async function fetchRecipeInfo() {
      let recipe = recipes.find((r) => r.id === id);

      if (recipe) {
        setRecipe(recipe);
        return;
      }

      const fetchedRecipe = await recipeInfoService();

      setRecipes((r) => [...r, fetchedRecipe]);
      setRecipe(fetchedRecipe);
    }

    fetchRecipeInfo();
  }, [id]);

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(recipes));
  }, [recipes]);

  return { recipe };
}

export { useRecipeInfo };
