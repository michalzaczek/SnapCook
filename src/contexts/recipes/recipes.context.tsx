import { ReactNode, createContext, useContext, useMemo, useState } from "react";
import { IRecipesContext } from "./recipes-context.interface";
import { IRecipe } from "../../services/recipe.interface";

const RecipesContext = createContext<IRecipesContext | undefined>(undefined);

function RecipesProvider({ children }: { children: ReactNode }) {
    const [recipes, setRecipes] = useState<IRecipe[]>([]);

    const [searchQuery, setSearchQuery] = useState("");

    const searchedRecipes =
        searchQuery.length > 0
            ? recipes.filter((recipe) =>
                recipe.title
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
            )
            : recipes;

    const value: IRecipesContext = useMemo(() => {
        return {
            recipes: searchedRecipes,
            setRecipes,
            searchQuery,
            setSearchQuery
        }
    }, [recipes, searchedRecipes, searchQuery])

    return (
        <RecipesContext.Provider value={value}>{children}</RecipesContext.Provider>
    );
}

function useRecipes() {
    const context = useContext(RecipesContext);
    if (context === undefined)
        throw new Error("RecipesContext was used outside of the RecipesProvider");
    return context;
}

export { RecipesProvider, useRecipes };
