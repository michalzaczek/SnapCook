import { IExtendedIngredientData } from './extended-ingredient-data.interface';

export interface IRecipeInfoData {
  id: number;
  title: string;
  image: string;
  imageType: string;
  readyInMinutes: number;
  instructions: string;
  extendedIngredients: IExtendedIngredientData[];
}
