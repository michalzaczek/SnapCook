import { IRecipeData } from '../../services/recipe/recipe-data.interface';

/**
 * Recipes storage.
 */
export interface IRecipeStorage {
  /**
   * Timestamp indicating the time of last modification.
   */
  timestamp: number;

  /**
   * Storage data.
   */
  data: IRecipeStorageData[];
}

/**
 * Recipes grouped by queries with which they were fetched.
 */
export interface IRecipeStorageData {
  /**
   * Ingredients list that was used to fetch the recipes.
   */
  queryIngredients: string[];

  /**
   * Recipes.
   */
  recipes: IRecipeData[];
}
