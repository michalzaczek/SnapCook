import { IRecipeData } from './recipe-data.interface';
import axios, { AxiosResponse } from 'axios';

export const fetchRecipes = async (
  ingredients: string[]
): Promise<AxiosResponse<IRecipeData[], any>> => {
  const options = {
    method: 'GET',
    url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients',
    headers: {
      'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
      'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
    },
    params: {
      ingredients: ingredients.toString(),
      number: '5',
      ignorePantry: 'false',
      ranking: '1',
    },
  };

  try {
    const response = await axios.request<IRecipeData[]>(options);
    return new Promise((resolve) => resolve(response));
  } catch (error: any) {
    return new Promise((resolve) => resolve(error));
  }
};
