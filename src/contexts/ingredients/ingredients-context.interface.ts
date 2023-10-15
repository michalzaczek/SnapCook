import { IIngredient } from "../../pages/ingredients/ingredient.interface";

export interface IIngredientsContext {
    setIngredientSelection: (name: string, value: boolean) => void;
    toggleIngredient: (ingredient: string) => boolean;
    addIngredient: (ingredient: IIngredient) => void;
    ingredients: IIngredient[];
}