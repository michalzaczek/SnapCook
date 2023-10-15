import Ingredient from "../../components/ingredient/ingredient";
import { Box, Button, Checkbox, FormControlLabel } from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";
import { IPageProps } from "../page-props.interface";
import { useIngredients } from "../../contexts/ingredients.context.ts/ingredients.context";

export default function IngredientsPage({ setPageTitle }: IPageProps) {
    // setPageTitle("Select Ingredients");

    const { ingredients, toggleIngredient, setIngredientSelection } = useIngredients();

    const [allSelected, setAllSelected] = useState(ingredients?.every(i => i.isConfirmed));

    const handleSelection = (name: string) => {
        const selected = toggleIngredient(name);

        if (!selected) {
            setAllSelected(false);
            return;
        }

        if (ingredients.every(i => i.isConfirmed)) {
            setAllSelected(true);
        }
    }

    const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        ingredients.forEach(i => setIngredientSelection(i.name, event.target.checked));
        setAllSelected((allSelected) => !allSelected);
    };

    return (
        <Box>
            <Container sx={{ display: "flex", flexDirection: "column" }} >
                {ingredients?.map(i =>
                    <Ingredient
                        name={i.name}
                        selected={i.isConfirmed}
                        key={i.name}
                        onSelect={() => handleSelection(i.name)}></Ingredient>
                )}
                <FormControlLabel control={<Checkbox onChange={handleSelectAll} checked={allSelected} />} label="Select all" />
                <Button variant="contained">Find Recipe</Button>
            </Container >
        </Box >
    )
}