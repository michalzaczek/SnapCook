import { useLocation } from "react-router-dom";
import Ingredient from "../../components/ingredient/ingredient";
import { Box, Button, Checkbox, FormControlLabel, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { IIngredient } from "./ingredient.interface";
import { useEffect, useState } from "react";
import { IPageProps } from "../page-props.interface";

export default function IngredientsPage({setPageTitle}: IPageProps) {
    setPageTitle("Select Ingredients");

    const location = useLocation();

    const [ingredients, setIngredients] = useState(location.state as IIngredient[]);

    useEffect(() => {
        setIngredients(ingredients?.map(i => ({ ...i, isConfirmed: i.percentage > 75 })));
    }, []);

    const [allSelected, setAllSelected] = useState(ingredients?.every(i => i.isConfirmed));

    const handleSelection = (name: string) => {
        const updatedIngredients = ingredients.map(i =>
            i.name === name ?
                { ...i, isConfirmed: !i.isConfirmed } :
                i
        )

        setIngredients(updatedIngredients);
        setAllSelected(updatedIngredients.every(i => i.isConfirmed));
    }

    const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIngredients(ingredients.map(i => ({ ...i, isConfirmed: event.target.checked })));
        setAllSelected(event.target.checked);
    };

    return (
        <Box>
            {/* {ingredients?.filter(i => i.isConfirmed).map(i => <Typography component="p">{i.name}</Typography>)} */}

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