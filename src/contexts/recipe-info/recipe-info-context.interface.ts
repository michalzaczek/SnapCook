import { IRecipeInfo } from './recipe-info.interface';

export interface IRecipeInfoContext {
  getRecipeInfo(id: number): Promise<IRecipeInfo>;
  setIsFavorite(id: number, value: boolean): void;
  isFavorite(id: number): boolean;
  recipes: IRecipeInfo[];
}
