import { TextField } from '@mui/material';
import { Box, Container } from '@mui/system';
import { useRecipes } from '../../contexts/recipes/recipes.context';
import SearchIcon from '@mui/icons-material/Search';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useIngredients } from '../../contexts/ingredients/ingredients.context';
import { IRecipeData } from '../../services/recipe/recipe-data.interface';
import PageHeader from '../../components/page-header/page-header';
import RecipeList from '../../components/recipe-list/recipe-list';

export default function RecipesPage() {
  const { recipes, setSearchQuery, searchQuery } = useRecipes();
  const { ingredients } = useIngredients();
  const { setRecipes } = useRecipes();
  const [isLoading, setIsLoading] = useState(false);
  const [filteredRecipes, setFilteredRecipes] = useState<IRecipeData[]>([]);

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
      await setRecipes(selectedIngredients);
      setIsLoading(false);
    };

    fetchRecipes();
  }, []);

  return (
    <Box sx={{ width: '100%' }}>
      <PageHeader title='Find a Recipe' />
      <Container>
        <TextField
          onChange={handleSearch}
          value={searchQuery}
          label='Search for a recipe...'
          inputMode='search'
          InputProps={{ endAdornment: <SearchIcon /> }}
          sx={{ mb: 4, width: '100%', maxWidth: '400px' }}
        ></TextField>
        <RecipeList recipes={filteredRecipes} isLoading={isLoading} />
      </Container>
    </Box>
  );
}
