import axios, { AxiosError, AxiosResponse } from 'axios';
import { IRecipeInfo } from '../../contexts/recipe-info/recipe-info.interface';

export const fetchRecipeInfo = async (
  ingredients: string[],
  title: string,
  category: string,
  token: string
): Promise<AxiosResponse<IRecipeInfo, any> | AxiosError<unknown, any>> => {
  const options = {
    method: 'GET',
    url: `${import.meta.env.VITE_SNAPCOOK_API}/getRecipeDetails`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      ingredients: ingredients.join(','),
      title,
      category,
    },
  };

  try {
    const response = await axios.request<IRecipeInfo>(options);
    return new Promise((resolve) => resolve(response));
  } catch (error: any) {
    return new Promise((resolve) => resolve(error));
  }
};
