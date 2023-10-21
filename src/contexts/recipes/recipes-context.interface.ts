import { Dispatch, SetStateAction } from 'react';
import { IRecipe } from '../../services/recipe.interface';

export interface IRecipesContext {
  recipes: IRecipe[];
  setRecipes: (ingredients: string[]) => Promise<void>;
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
}
