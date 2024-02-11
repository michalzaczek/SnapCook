import axios, { AxiosError, AxiosResponse } from 'axios';
import { IRecipeDto } from './recipe-dto.interface';

export const fetchRecipes = async (
  ingredients: string[],
  token: string
): Promise<AxiosResponse<IRecipeDto, any> | AxiosError<unknown, any>> => {
  const options = {
    method: 'GET',
    url: `${import.meta.env.VITE_SNAPCOOK_API}/getRecipesList`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      ingredients: ingredients.toString(),
    },
  };

  try {
    const response = await axios.request<IRecipeDto>(options);
    return new Promise((resolve) => resolve(response));
  } catch (error: any) {
    if ((error as AxiosError).response?.status === 403) {
      throw error.response.data;
    }

    throw error;
  }
};
