import { IRecipeInfo } from './recipe-info.interface';
import axios, { AxiosResponse } from 'axios';

export const recipeInfoService = async (
  id: number
): Promise<AxiosResponse<IRecipeInfo, any>> => {
  const options = {
    method: 'GET',
    url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/information`,
    headers: {
      'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
      'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
    },
  };

  try {
    const response = await axios.request<IRecipeInfo>(options);
    return new Promise((resolve) => resolve(response));
  } catch (error: any) {
    return new Promise((resolve) => resolve(error));
  }
};

// export const recipeInfoService = async () => {
//   try {
//     const response = await axios.request<IRecipeInfo>({
//       url: 'http://localhost:3000/recipeInfo',
//     });
//     return new Promise((resolve) => resolve(response));
//   } catch (error: any) {
//     return new Promise((resolve) => resolve(error));
//   }
// };
