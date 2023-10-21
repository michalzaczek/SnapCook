import { IRecipe } from '../../services/recipe.interface';

/**
 * Recipes grouped by queries with which they were fetched.
 */
export interface IRecipeStorage {
  /**
   * Ingredients list that was used to fetch the recipes.
   */
  queryIngredients: string[];

  /**
   * Recipes.
   */
  recipes: IRecipe[];
}
