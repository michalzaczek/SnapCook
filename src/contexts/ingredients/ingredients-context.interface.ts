import { IIngredient } from "../../pages/ingredients-page/ingredient.interface";

export interface IIngredientsContext {
    setIngredientSelection: (name: string, value: boolean) => void;
    toggleIngredient: (ingredient: string) => boolean;
    addIngredient: (ingredient: IIngredient) => void;
    resetIngredients: () => void;
    ingredients: IIngredient[];
}