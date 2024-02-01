import { IRecipeData } from './recipe-data.interface';
import axios, { AxiosResponse } from 'axios';

export const fetchRecipes = async (
  ingredients: string[],
  token: string
): Promise<AxiosResponse<IRecipeData[], any>> => {
  const options = {
    method: 'GET',
    url: 'https://us-central1-snapcook-test.cloudfunctions.net/api/getRecipesList',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      ingredients: ingredients.toString(),
    },
  };

  try {
    const res = {
      data: [
        {
          title: 'Scrambled Eggs',
          ingredients: ['egg', 'salt', 'pepper', 'butter'],
          category: 'Breakfast and Brunch',
        },
        {
          title: 'Egg Salad Sandwich',
          ingredients: ['egg', 'mayonnaise', 'mustard', 'lettuce', 'bread'],
          category: 'Lunch',
        },
        {
          title: 'Deviled Eggs',
          ingredients: [
            'egg',
            'mayonnaise',
            'mustard',
            'pickle relish',
            'paprika',
          ],
          category: 'Appetizers',
        },
        {
          title: 'Frittata',
          ingredients: ['egg', 'vegetables', 'cheese', 'milk'],
          category: 'Breakfast and Brunch',
        },
        {
          title: 'Noodle Soup with Poached Egg',
          ingredients: ['egg', 'noodles', 'broth', 'vegetables'],
          category: 'Soups and Stews',
        },
      ],
    } as any;

    // const response = await axios.request<IRecipeData[]>(options);
    return new Promise((resolve) => resolve(res));
  } catch (error: any) {
    return new Promise((resolve) => resolve(error));
  }
};
