import { IExtendedIngredientData } from '../../services/recipe-info/extended-ingredient-data.interface';

export interface IRecipeInfo {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  instructions: string;
  extendedIngredients: IExtendedIngredientData[];
  isFavorite: boolean;
}
