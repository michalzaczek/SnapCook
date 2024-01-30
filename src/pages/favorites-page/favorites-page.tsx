import { Box } from '@mui/system';
import { useState, useMemo, ChangeEvent } from 'react';
import { useRecipes } from '../../contexts/recipes/recipes.context';
import { useRecipeInfo } from '../../contexts/recipe-info/recipe-info-context';
import { IRecipeData } from '../../services/recipe/recipe-data.interface';
import { Container, SxProps, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RecipeList from '../../components/recipe-list/recipe-list';
import PageHeader from '../../components/page-header/page-header';

const titleStyle: SxProps = {
  paddingLeft: 1,
  marginBottom: 2,
};

export default function FavoritesPage() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { allRecipes } = useRecipes();

  const { isFavorite } = useRecipeInfo();
  const [favorites] = useState<IRecipeData[]>(() => {
    return allRecipes.filter((r) => isFavorite(r.id));
  });

  const [filteredFavorites, setFilteredFavorites] = useState<IRecipeData[]>([]);
  const [filteredHistory, setFilteredHistory] = useState<IRecipeData[]>([]);

  useMemo(() => {
    setFilteredFavorites(filterRecipes(favorites));
    setFilteredHistory(filterRecipes(allRecipes));
  }, [searchQuery, allRecipes]);

  function filterRecipes(recipes: IRecipeData[]): IRecipeData[] {
    return searchQuery.length > 0
      ? recipes.filter((recipe) =>
          recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : recipes;
  }

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <PageHeader>
        <Typography
          variant='subtitle1'
          sx={{ fontSize: '25px', textAlign: 'left', lineHeight: 1 }}
        >
          Your favorites
        </Typography>
        <Typography variant='subtitle1' sx={{ textAlign: 'left' }}>
          Choose the recipe for today
        </Typography>
      </PageHeader>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          paddingTop: 3,
        }}
      >
        <Container>
          <TextField
            onChange={handleSearch}
            value={searchQuery}
            label='Filter recipes...'
            InputProps={{ endAdornment: <SearchIcon /> }}
            sx={{ mb: 4, width: '100%', maxWidth: '400px' }}
          ></TextField>
        </Container>
        <Box sx={{ width: '100%', textAlign: 'left', paddingLeft: '20px' }}>
          <Typography sx={titleStyle}>Favorites</Typography>
          <RecipeList recipes={filteredFavorites} />
          {!filteredFavorites.length && (
            <Typography sx={{ ...titleStyle, fontSize: '14px' }}>
              Nothing here yet. Snap to cook and find your favs!
            </Typography>
          )}
          <Typography sx={{ ...titleStyle, marginTop: 3 }}>History</Typography>
          <RecipeList recipes={filteredHistory} />
          {!filteredHistory.length && (
            <Typography sx={{ ...titleStyle, fontSize: '14px' }}>
              No history yet. Snap to cook and search for some recipes!
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}
