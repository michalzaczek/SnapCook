import { TextField, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import { useRecipes } from '../../contexts/recipes/recipes.context';
import SearchIcon from '@mui/icons-material/Search';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useIngredients } from '../../contexts/ingredients/ingredients.context';
import { IRecipeData } from '../../services/recipe/recipe-data.interface';
import PageHeader from '../../components/page-header/page-header';
import RecipeList from '../../components/recipe-list/recipe-list';
import { useUIMessage } from '../../contexts/ui-message/ui-message.context';

export default function RecipesPage() {
  const { recipes, setSearchQuery, searchQuery } = useRecipes();
  const { ingredients } = useIngredients();
  const { setRecipes } = useRecipes();
  const [isLoading, setIsLoading] = useState(false);
  const [filteredRecipes, setFilteredRecipes] = useState<IRecipeData[]>([]);
  const { setMessage, setSeverity, setOpen } = useUIMessage();

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  useMemo(() => {
    const filteredRecipes =
      searchQuery.length > 0
        ? recipes.filter((recipe) =>
            recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : recipes;

    setFilteredRecipes(filteredRecipes);
  }, [recipes, searchQuery]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const selectedIngredients = ingredients
        .filter((i) => i.isConfirmed)
        .map((i) => i.name);

      setIsLoading(true);
      try {
        await setRecipes(selectedIngredients);
      } catch (err: any) {
        setSeverity('error');
        setMessage(err);
        setOpen(true);
      }
      setIsLoading(false);
    };

    fetchRecipes();
  }, []);

  return (
    <Box sx={{ width: '100%' }}>
      <PageHeader>
        <Typography
          variant='subtitle1'
          sx={{ fontSize: '25px', textAlign: 'left', lineHeight: 1 }}
        >
          Let's cook!
        </Typography>
        <Typography variant='subtitle1' sx={{ textAlign: 'left' }}>
          Find the recipe for yourself
        </Typography>
      </PageHeader>
      <Container>
        <TextField
          onChange={handleSearch}
          value={searchQuery}
          label='Filter recipes...'
          inputMode='search'
          InputProps={{ endAdornment: <SearchIcon /> }}
          sx={{ mt: 2, mb: 4, width: '100%', maxWidth: '400px' }}
        ></TextField>
        <RecipeList recipes={filteredRecipes} isLoading={isLoading} />
      </Container>
    </Box>
  );
}
