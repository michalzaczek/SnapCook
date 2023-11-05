import { IRecipeData } from '../../services/recipe/recipe-data.interface';

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
  recipes: IRecipeData[];
}
