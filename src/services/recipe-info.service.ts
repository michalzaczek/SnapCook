import { IRecipeInfo } from "./recipe-info/recipe-info.interface";

export const recipeInfoService = async () => {
    try {
        const response = await fetch("http://localhost:3000/recipeInfo");
        const data = await response.json();
        return data as IRecipeInfo;
    } catch (error) {
        throw error;
    }
}