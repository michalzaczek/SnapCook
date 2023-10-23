import { IRecipeInfo } from './recipe-info.interface';

export interface IRecipeInfoContext {
  getRecipeInfo(id: number): Promise<IRecipeInfo>;
  setIsFavorite(id: number, value: boolean): IRecipeInfo;
  isFavorite(id: number): boolean;
}
