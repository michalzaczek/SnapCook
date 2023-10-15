export interface IRecipe {
    id: number;
    title: string;
    image: string;
    usedIngredients: IIngredient[]
}

interface IIngredient {
    originalName: string;
}