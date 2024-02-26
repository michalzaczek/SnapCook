import Ingredient from '../../components/ingredient/ingredient';
import {
  Box,
  Checkbox,
  FormControlLabel,
  Input,
  Typography,
} from '@mui/material';
import { Container } from '@mui/system';
import { ChangeEvent, useState } from 'react';
import { useIngredients } from '../../contexts/ingredients/ingredients.context';
import { useNavigate } from 'react-router-dom';
import { useRecipes } from '../../contexts/recipes/recipes.context';
import PageHeader from '../../components/page-header/page-header';
import { useUIMessage } from '../../contexts/ui-message/ui-message.context';
import AddIcon from '@mui/icons-material/Add';
import { LoadRecipesButton } from './loading-button';
import { useUIState } from '../../contexts/ui-state/ui-state.context';

export default function IngredientsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [newIngredient, setNewIngredient] = useState<string>('');
  const { setRecipes } = useRecipes();
  const { setMessage, setSeverity, setOpen } = useUIMessage();
  const { setAnimateIngredients, setDelayIngredientsAnimation } = useUIState();

  const {
    ingredients,
    toggleIngredient,
    setIngredientSelection,
    addIngredient,
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
      setDelayIngredientsAnimation(false);
      setAnimateIngredients(true);
      addIngredient({
        isConfirmed: true,
        name: newIngredient!,
      });
    }

    setNewIngredient('');
  };

  return (
    <Box sx={{ width: '100%' }}>
      <PageHeader>
        <Typography
          variant='subtitle1'
          sx={{ fontSize: '25px', textAlign: 'left', lineHeight: 1 }}
        >
          Scanning succesful!
        </Typography>
        <Typography variant='subtitle1' sx={{ textAlign: 'left' }}>
          Look what I found
        </Typography>
      </PageHeader>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { md: 4 },
        }}
      >
        <Box sx={{ width: '100%', textAlign: 'left' }}>
          <Typography variant='subtitle1'>Select your ingredients</Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            width: '100%',
            justifyContent: { xs: 'flex-start', md: 'center' },
            alignItems: 'center',
            flexDirection: { xs: 'row', md: 'row' },
          }}
        >
          {ingredients?.map((i, index) => (
            <Ingredient
              index={index}
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
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              paddingLeft: '20px',
            }}
          >
            <FormControlLabel
              sx={{ mb: 2 }}
              control={
                <Checkbox
                  onChange={handleSelectAll}
                  checked={allSelected}
                  //@ts-ignore
                  size='large'
                  sx={{
                    '&&.MuiCheckbox-root': { color: 'primary.dark' },
                  }}
                />
              }
              label='Select all'
            />
          </Box>
        )}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: { xs: 'space-between', sm: 'center' },
            alignItems: 'center',
            width: '100%',
            mb: 3,
          }}
        >
          <Input
            placeholder='Add ingredient'
            onChange={handleNewIngredientChange}
            value={newIngredient}
            sx={{
              width: '100%',
              maxWidth: { sm: '320px' },
              height: '56px',
              backgroundColor: '#f2f0f0',
              color: 'text.primary',
              paddingLeft: '20px',
              borderRadius: '100px',
              borderBottom: 'none',
              '&&:after, &&:before': {
                display: 'none',
              },
            }}
          />
          <Box
            sx={{
              display: 'flex',
              backgroundColor: 'primary.dark',
              width: '70px',
              height: '56px',
              borderTopLeftRadius: '100px',
              borderBottomLeftRadius: '100px',
              borderBottomRightRadius: { sm: '100px' },
              borderTopRightRadius: { sm: '100px' },
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              right: '-16px',
            }}
            onClick={addNewIngredient}
          >
            <AddIcon sx={{ color: 'secondary.main', fontSize: '45px' }} />
          </Box>
        </Box>
        <LoadRecipesButton
          loading={isLoading}
          onClick={handleSearchRecipe}
          disabled={!ingredients.filter((i) => i.isConfirmed).length}
        />
      </Container>
    </Box>
  );
}
