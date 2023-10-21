import { IExtendedIngredient } from './extended-ingredients.interface';

export interface IRecipeInfo {
  id: number;
  title: string;
  image: string;
  imageType: string;
  readyInMinutes: number;
  instructions: string;
  extendedIngredients: IExtendedIngredient[];
}
