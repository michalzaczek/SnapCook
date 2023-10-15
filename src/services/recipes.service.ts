import { IRecipe } from "./recipe.interface";

export const recipesService = async () => {
    try {
        const response = await fetch("http://localhost:3000/recipes");
        const data = await response.json();
        return data as IRecipe[];
    } catch (error) {
        throw error;
    }
}