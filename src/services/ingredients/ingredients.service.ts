import axios, { AxiosResponse } from 'axios';
import { IIngredient } from '../../pages/ingredients-page/ingredient.interface';

export const fetchIngredients = async (
  userToken: string,
  base64: string
): Promise<AxiosResponse<IIngredient[], any>> => {
  try {
    const response = await axios.post<IIngredient[]>(
      'https://us-central1-snapcook-test.cloudfunctions.net/getIngredients',
      { image: base64 },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    return new Promise((resolve) => resolve(response));
  } catch (error: any) {
    throw error;
  }
};
