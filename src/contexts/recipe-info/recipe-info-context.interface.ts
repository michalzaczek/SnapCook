import { IRecipeInfo } from './recipe-info.interface';

export interface IRecipeInfoContext {
  getRecipeInfo(
    ingredients: string[],
    title: string,
    category: string
  ): Promise<IRecipeInfo>;
  setIsFavorite(title: string, value: boolean): void;
  isFavorite(title: string): boolean;
  recipes: IRecipeInfo[];
}
