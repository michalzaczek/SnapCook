import { IIngredient } from "../pages/ingredients/ingredient.interface";

export const ingredientsService = async () => {
    try {
        const response = await fetch("http://localhost:3000/ingredients")
        const data = await response.json() as IIngredient[];

        data.map(i => ({ ...i, isConfirmed: i.percentage > 75 }));

        return data;
    } catch (error) {
        throw error;
    }
};