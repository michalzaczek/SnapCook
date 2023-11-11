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
import { useIngredients } from '../../contexts/ingredients/ingredients.context';
import { useNavigate } from 'react-router-dom';
import { useRecipes } from '../../contexts/recipes/recipes.context';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import LoadingButton from '@mui/lab/LoadingButton';
import PageHeader from '../../components/page-header/page-header';
import { useUIMessage } from '../../contexts/ui-message/ui-message.context';

export default function IngredientsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [newIngredient, setNewIngredient] = useState<string>('');
  const { setRecipes } = useRecipes();
  const { setMessage, setSeverity, setOpen } = useUIMessage();

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

    try {
      await setRecipes(selectedIngredients);

      setIsLoading(false);

      navigate('/recipes');
    } catch (err: any) {
      setIsLoading(false);
      setSeverity('error');
      setMessage(err);
      setOpen(true);
    }
  };

  const handleNewIngredientChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewIngredient(e.target.value);
  };

  const addNewIngredient = () => {
    if (!newIngredient) {
      return;
    }

    if (ingredients.find((i) => i.name === newIngredient)) {
      setSeverity('info');
      setMessage('Ingredient is already on the list');
      setOpen(true);
    } else {
      addIngredient({
        isConfirmed: true,
        name: newIngredient!,
        percentage: 100,
      });
    }

    setNewIngredient('');
  };

  return (
    <Box sx={{ width: '100%' }}>
      <PageHeader title='Select Ingredients'></PageHeader>
      <Container
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: { xs: 'column', md: 'row' },
          }}
        >
          {ingredients?.map((i) => (
            <Ingredient
              name={i.name}
              selected={i.isConfirmed}
              key={i.name}
              onSelect={() => handleSelection(i.name)}
            ></Ingredient>
          ))}
        </Box>
        {ingredients.length > 0 && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <FormControlLabel
              sx={{ mb: 2 }}
              control={
                <Checkbox onChange={handleSelectAll} checked={allSelected} />
              }
              label='Select all'
            />
            <Button
              variant='outlined'
              startIcon={<DeleteIcon />}
              sx={{
                mb: 2,
                mt: 1,
                width: '100%',
                maxWidth: '280px',
              }}
              onClick={resetIngredients}
            >
              Remove ingredients
            </Button>
          </Box>
        )}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <TextField
            label='New ingredient'
            variant='outlined'
            onChange={handleNewIngredientChange}
            value={newIngredient}
            sx={{ mt: 6, width: '100%', maxWidth: '280px', mb: 2 }}
          />
          <Button
            variant='outlined'
            startIcon={<AddIcon />}
            sx={{ mb: 2, mt: 1, width: '100%', maxWidth: '280px' }}
            onClick={addNewIngredient}
          >
            Add more
          </Button>
          <LoadingButton
            loading={isLoading}
            variant='cta'
            onClick={handleSearchRecipe}
            disabled={!ingredients.length}
            sx={{ my: 2, width: '100%', maxWidth: '400px' }}
          >
            Find Recipe
          </LoadingButton>
        </Box>
      </Container>
    </Box>
  );
}
