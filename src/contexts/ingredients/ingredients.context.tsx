import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { IIngredient } from '../../pages/ingredients-page/ingredient.interface';
import { IIngredientsContext } from './ingredients-context.interface';

const IngredientsContext = createContext<IIngredientsContext | undefined>(
  undefined
);

function IngredientsProvider({ children }: { children: ReactNode }) {
  const localStorageKey = 'ingredients';
  const [ingredients, setIngredients] = useState<IIngredient[]>(() => {
    const stored = localStorage.getItem(localStorageKey);

    if (!stored) {
      return [];
    }

    return JSON.parse(stored);
  });

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(ingredients));
  }, [ingredients]);

  function addIngredient(ingredient: IIngredient): void {
    setIngredients((ingredients) => {
      if (!ingredients.find((i) => i.name === ingredient.name.toLowerCase())) {
        return [
          ...ingredients,
          { ...ingredient, name: ingredient.name.toLowerCase() },
        ];
      }
      return [...ingredients];
    });
  }

  function resetIngredients(): void {
    setIngredients([]);
  }

  function toggleIngredient(name: string): boolean {
    const i = ingredients.find((i) => i.name === name);

    if (!i) {
      throw new Error('Tried to toggle an unexisting ingredient');
    }

    i.isConfirmed = !i.isConfirmed;

    setIngredients((ingredients) => [...ingredients]);

    return i.isConfirmed;
  }

  function setIngredientSelection(name: string, value: boolean) {
    const ingredient = ingredients.find((i) => i.name === name);

    ingredient!.isConfirmed = value;

    setIngredients((ingredients) => [...ingredients]);
  }

  const value: IIngredientsContext = useMemo(() => {
    return {
      ingredients,
      addIngredient,
      toggleIngredient,
      setIngredientSelection,
      resetIngredients,
    };
  }, [ingredients]);

  return (
    <IngredientsContext.Provider value={value}>
      {children}
    </IngredientsContext.Provider>
  );
}

function useIngredients() {
  const context = useContext(IngredientsContext);
  if (context === undefined)
    throw new Error(
      'IngredientsContext was used outside of the IngredientsProvider'
    );
  return context;
}

export { IngredientsProvider, useIngredients };
