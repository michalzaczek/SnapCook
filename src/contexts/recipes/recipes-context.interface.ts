import { Dispatch, SetStateAction } from "react";
import { IRecipe } from "../../services/recipe.interface";

export interface IRecipesContext {
    recipes: IRecipe[];
    setRecipes: Dispatch<SetStateAction<IRecipe[]>>;
    searchQuery: string;
    setSearchQuery: Dispatch<SetStateAction<string>>
}