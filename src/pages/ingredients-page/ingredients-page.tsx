import Ingredient from '../../components/ingredient/ingredient';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from '@mui/material';
import { Container } from '@mui/system';
import { ChangeEvent, useState } from 'react';
import { IPageProps } from '../page-props.interface';
import { useIngredients } from '../../contexts/ingredients/ingredients.context';
import { useNavigate } from 'react-router-dom';
import { useRecipes } from '../../contexts/recipes/recipes.context';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import LoadingButton from '@mui/lab/LoadingButton';

export default function IngredientsPage({ setPageTitle }: IPageProps) {
  // setPageTitle("Select Ingredients");
  const [isLoading, setIsLoading] = useState(false);

  const [newIngredient, setNewIngredient] = useState<string>('');

  const { setRecipes } = useRecipes();

  const {
    ingredients,
    toggleIngredient,
    setIngredientSelection,
    addIngredient,
    resetIngredients,
  } = useIngredients();

  const [allSelected, setAllSelected] = useState(
    ingredients?.every((i) => i.isConfirmed)
  );

  const navigate = useNavigate();

  const handleSelection = (name: string) => {
    const selected = toggleIngredient(name);

    if (!selected) {
      setAllSelected(false);
      return;
    }

    if (ingredients.every((i) => i.isConfirmed)) {
      setAllSelected(true);
    }
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    ingredients.forEach((i) =>
      setIngredientSelection(i.name, event.target.checked)
    );
    setAllSelected((allSelected) => !allSelected);
  };

  const handleSearchRecipe = async () => {
    setIsLoading(true);

    const selectedIngredients = ingredients
      .filter((i) => i.isConfirmed)
      .map((i) => i.name);

    await setRecipes(selectedIngredients);

    setIsLoading(false);

    navigate('/recipes');
  };

  const handleNewIngredientChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewIngredient(e.target.value);
  };

  const addNewIngredient = () => {
    if (!newIngredient) {
      return;
    }

    addIngredient({
      isConfirmed: true,
      name: newIngredient!,
      percentage: 100,
    });

    setNewIngredient('');
  };

  return (
    <Box>
      <Container sx={{ display: 'flex', flexDirection: 'column' }}>
        {ingredients?.map((i) => (
          <Ingredient
            name={i.name}
            selected={i.isConfirmed}
            key={i.name}
            onSelect={() => handleSelection(i.name)}
          ></Ingredient>
        ))}
        {ingredients.length > 0 && (
          <>
            <FormControlLabel
              control={
                <Checkbox onChange={handleSelectAll} checked={allSelected} />
              }
              label='Select all'
            />
            <Button
              variant='outlined'
              startIcon={<DeleteIcon />}
              sx={{ mb: 2, mt: 1 }}
              onClick={resetIngredients}
            >
              Remove ingredients
            </Button>
          </>
        )}
        <TextField
          label='New ingredient'
          variant='outlined'
          onChange={handleNewIngredientChange}
          value={newIngredient}
          sx={{ mt: 6 }}
        />
        <Button
          variant='outlined'
          startIcon={<AddIcon />}
          sx={{ mb: 2, mt: 1 }}
          onClick={addNewIngredient}
        >
          Add more
        </Button>
        <LoadingButton
          loading={isLoading}
          variant='contained'
          onClick={handleSearchRecipe}
          disabled={!ingredients.length}
          sx={{ my: 2 }}
        >
          Find Recipe
        </LoadingButton>
      </Container>
    </Box>
  );
}
