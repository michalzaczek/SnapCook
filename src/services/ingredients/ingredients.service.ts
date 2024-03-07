import axios from 'axios';
import { IIngredient } from '../../pages/ingredients-page/ingredient.interface';
import { IIngredientsDto } from './ingredients-dto.interface';

export const fetchIngredients = async (
  userToken: string,
  base64: string
): Promise<IIngredient[]> => {
  try {
    const response = await axios.post<IIngredientsDto>(
      `${import.meta.env.VITE_SNAPCOOK_API}/getIngredients`,
      { image: base64 },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    const ingredients: IIngredient[] = response.data.ingredients.map((i) => ({
      isConfirmed: true,
      name: i,
    }));

    return new Promise((resolve) => resolve(ingredients));
  } catch (error: any) {
    throw error;
  }
};
