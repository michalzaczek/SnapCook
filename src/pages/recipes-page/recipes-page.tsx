import { Grid, Input, Skeleton } from '@mui/material';
import { Container } from '@mui/system';
import { useRecipes } from '../../contexts/recipes/recipes.context';
import SearchIcon from '@mui/icons-material/Search';
import { ChangeEvent, useEffect, useState } from 'react';
import { useIngredients } from '../../contexts/ingredients/ingredients.context';
import RecipeThumbnail from '../../components/recipe-thumbnail/recipe-thumbnail';

export default function RecipesPage() {
  const { recipes, setSearchQuery, searchQuery } = useRecipes();
  const { ingredients } = useIngredients();
  const { setRecipes } = useRecipes();
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

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
    <Container sx={{ py: 8 }} maxWidth='md'>
      <Input
        onChange={handleSearch}
        value={searchQuery}
        placeholder='Search for a recipe...'
        endAdornment={<SearchIcon />}
        sx={{ mb: 4 }}
      ></Input>
      <Grid container spacing={4}>
        {isLoading ? (
          <>
            <Grid item xs={12} sm={6} md={4}>
              <Skeleton
                animation='wave'
                variant='rectangular'
                height={250}
              ></Skeleton>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Skeleton
                animation='wave'
                variant='rectangular'
                height={250}
              ></Skeleton>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Skeleton
                animation='wave'
                variant='rectangular'
                height={250}
              ></Skeleton>
            </Grid>
          </>
        ) : (
          recipes?.map((recipe) => (
            <Grid item key={recipe.id} xs={12} sm={6} md={4}>
              <RecipeThumbnail recipe={recipe} />
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
}
