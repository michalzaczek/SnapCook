import axios from 'axios';
import { IIngredient } from '../../pages/ingredients-page/ingredient.interface';

export const fetchIngredients = async (
  userToken: string,
  base64: string
): Promise<IIngredient[]> => {
  try {
    const response = await axios.post<any>(
      `${import.meta.env.VITE_SNAPCOOK_API}/getIngredients`,
      { image: base64 },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    const responseString: string = response.data.choices[0].message.content;

    const jsonString = responseString
      .replace(/^```json\n/, '')
      .replace(/```$/, '');

    const ingredients: IIngredient[] = (
      JSON.parse(jsonString).ingredients as string[]
    ).map((i) => ({
      isConfirmed: true,
      name: i,
    }));

    return new Promise((resolve) => resolve(ingredients));
  } catch (error: any) {
    throw error;
  }
};
