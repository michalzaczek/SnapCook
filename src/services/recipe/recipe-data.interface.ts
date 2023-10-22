export interface IRecipeData {
  id: number;
  title: string;
  image: string;
  usedIngredients: IIngredientData[];
}

interface IIngredientData {
  originalName: string;
}
