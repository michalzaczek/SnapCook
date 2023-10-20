import { IRecipeInfo } from "../../services/recipe-info/recipe-info.interface";

export interface IRecipeInfoContext {
    getRecipe: (id: number) => IRecipeInfo;
}