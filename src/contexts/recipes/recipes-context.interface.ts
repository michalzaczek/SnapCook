import { Dispatch, SetStateAction } from 'react';
import { IRecipeData } from '../../services/recipe/recipe-data.interface';
import { IRecipeStorage } from './recipe-storage.interface';

export interface IRecipesContext {
  recipes: IRecipeData[];
  setRecipes: (ingredients: string[]) => Promise<void>;
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  allRecipes: IRecipeStorage[];
}
