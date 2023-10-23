import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Box } from '@mui/system';
import { useState, SyntheticEvent, useMemo, ChangeEvent } from 'react';
import { TabPanel } from '../../components/tab-panel/tab-panel';
import { useRecipes } from '../../contexts/recipes/recipes.context';
import RecipeThumbnail from '../../components/recipe-thumbnail/recipe-thumbnail';
import { useRecipeInfo } from '../../contexts/recipe-info/recipe-info-context';
import { IRecipeData } from '../../services/recipe/recipe-data.interface';
import { Input } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function AccountPage() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState(0);
  const { allRecipes } = useRecipes();
  const [recipes] = useState<IRecipeData[]>(() => {
    const recipes = allRecipes.flatMap((r) => r.recipes);

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

  const handleTabChange = (event: SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={activeTab} onChange={handleTabChange} variant='fullWidth'>
          <Tab label='Favorite Recipes' />
          <Tab label='Search History' />
        </Tabs>
      </Box>
      <TabPanel value={activeTab} index={0}>
        <Input
          onChange={handleSearch}
          value={searchQuery}
          placeholder='Search for a recipe...'
          endAdornment={<SearchIcon />}
          sx={{ mb: 4 }}
        ></Input>
        {filteredFavorites?.map((r) => (
          <RecipeThumbnail key={r.id} recipe={r} />
        ))}
      </TabPanel>
      <TabPanel value={activeTab} index={1}>
        <Input
          onChange={handleSearch}
          value={searchQuery}
          placeholder='Search for a recipe...'
          endAdornment={<SearchIcon />}
          sx={{ mb: 4 }}
        ></Input>
        {filteredHistory.toReversed().map((r) => (
          <RecipeThumbnail key={r.id} recipe={r} />
        ))}
      </TabPanel>
    </Box>
  );
}
