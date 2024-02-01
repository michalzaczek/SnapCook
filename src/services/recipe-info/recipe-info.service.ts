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
    url: `https://us-central1-snapcook-test.cloudfunctions.net/api/getRecipeDetails`,
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
    const res = {
      data: {
        description:
          'A delicious and savory pork stir-fry with a tangy pineapple sauce.',
        cookingTime: 30,
        instructions: [
          'Slice the pork into thin strips.',
          'In a large skillet, heat some oil over medium-high heat.',
          'Add the pork strips to the skillet and cook until browned and cooked through, about 5-7 minutes.',
          'Remove the cooked pork from the skillet and set it aside.',
          'In the same skillet, add the pineapple chunks and cook until they are slightly caramelized, about 3-4 minutes.',
          'Meanwhile, in a small bowl, whisk together soy sauce, vinegar, sugar, ginger, and cornstarch.',
          'Pour the sauce mixture into the skillet with the caramelized pineapple and cook until it thickens, about 2-3 minutes.',
          'Return the cooked pork to the skillet with the pineapple sauce and stir well to coat the pork with the sauce.',
          'Cook for an additional 1-2 minutes to ensure the pork is heated through.',
          'Serve the pork stir-fry with pineapple sauce over steamed rice or noodles.',
          'Garnish with chopped green onions, if desired.',
          'Enjoy this delicious and flavorful pork stir-fry with a hint of sweetness from the pineapple sauce!',
        ],
      },
    } as any;

    // const response = await axios.request<IRecipeInfo>(options);
    return new Promise((resolve) => resolve(res));
  } catch (error: any) {
    return new Promise((resolve) => resolve(error));
  }
};
