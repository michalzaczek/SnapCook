import { IRecipeInfo } from './recipe-info.interface';

/**
 * Recipe information storage.
 */
export interface IRecipeInfoStorage {
  /**
   * Timestamp indicating the time of last modification.
   */
  timestamp: number;

  /**
   * Storage data.
   */
  data: IRecipeInfo[];
}
