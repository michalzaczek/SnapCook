import axios, { AxiosResponse } from 'axios';
import { IIngredient } from '../../pages/ingredients-page/ingredient.interface';

export const fetchIngredients = async (): Promise<
  AxiosResponse<IIngredient[], any>
> => {
  try {
    const response = await axios.request<IIngredient[]>({
      url: 'http://localhost:3000/ingredients',
    });
    return new Promise((resolve) => resolve(response));
  } catch (error: any) {
    return new Promise((resolve) => resolve(error));
  }
};
