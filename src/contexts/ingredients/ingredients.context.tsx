import { ReactNode, createContext, useContext, useMemo, useState } from "react";
import { IIngredient } from "../../pages/ingredients/ingredient.interface";
import { IIngredientsContext } from "./ingredients-context.interface";

const IngredientsContext = createContext<IIngredientsContext | undefined>(undefined);

function IngredientsProvider({ children }: { children: ReactNode }) {
    const [ingredients, setIngredients] = useState<IIngredient[]>([]);

    const addIngredient = (ingredient: IIngredient) => {
        if (!ingredients.find(i => i.name === ingredient.name)) {
            // throw `Ingredient ${ingredient.name} is already on the list`;
            setIngredients((ingredients) => [...ingredients, ingredient]);
        }
    }

    const toggleIngredient = (name: string): boolean => {
        const i = ingredients.find(i => i.name === name);

        if (!i) {
            throw new Error("Tried to toggle an unexisting ingredient");
        }

        i.isConfirmed = !i.isConfirmed;

        setIngredients((ingredients) => [...ingredients]);

        return i.isConfirmed;
    };

    const setIngredientSelection = (name: string, value: boolean) => {
        const ingredient = ingredients.find(i => i.name === name);

        ingredient!.isConfirmed = value;

        setIngredients((ingredients) => [...ingredients]);
    }

    const value: IIngredientsContext = useMemo(() => {
        return {
            ingredients,
            addIngredient,
            toggleIngredient,
            setIngredientSelection
        }
    }, [ingredients])

    return (
        <IngredientsContext.Provider value={value}>{children}</IngredientsContext.Provider>
    );
}

function useIngredients() {
    const context = useContext(IngredientsContext);
    if (context === undefined)
        throw new Error("IngredientsContext was used outside of the IngredientsProvider");
    return context;
}

export { IngredientsProvider, useIngredients };
