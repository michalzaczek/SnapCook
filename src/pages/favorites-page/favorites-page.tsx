import { Box } from '@mui/system';
import { useState, useMemo, ChangeEvent } from 'react';
import { useRecipes } from '../../contexts/recipes/recipes.context';
import { useRecipeInfo } from '../../contexts/recipe-info/recipe-info-context';
import { IRecipeData } from '../../services/recipe/recipe-data.interface';
import { TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RecipeList from '../../components/recipe-list/recipe-list';

export default function FavoritesPage() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { allRecipes } = useRecipes();
  const [recipes] = useState<IRecipeData[]>(() => {
    const recipes = allRecipes.flatMap((r) => r.recipes) || [];

    return recipes.reduce((prev: IRecipeData[], r) => {
      if (!prev.find((recipe) => recipe.id === r.id)) {
        prev.push(r);
      }
      return prev;
    }, []);
  });

  const { isFavorite } = useRecipeInfo();
  const [favorites] = useState<IRecipeData[]>(() => {
    return recipes.filter((r) => isFavorite(r.id));
  });

  const [filteredFavorites, setFilteredFavorites] = useState<IRecipeData[]>([]);
  const [filteredHistory, setFilteredHistory] = useState<IRecipeData[]>([]);

  useMemo(() => {
    setFilteredFavorites(filterRecipes(favorites));
    setFilteredHistory(filterRecipes(recipes));
  }, [searchQuery]);

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
      <TextField
        onChange={handleSearch}
        value={searchQuery}
        label='Search for a recipe...'
        InputProps={{ endAdornment: <SearchIcon /> }}
        sx={{ mb: 4, width: '100%', maxWidth: '400px' }}
      ></TextField>
      <RecipeList recipes={filteredHistory} />
      <RecipeList recipes={filteredFavorites} />
    </Box>
  );
}
