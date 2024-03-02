import { Box } from '@mui/system';
import { useState, ChangeEvent } from 'react';
import { useRecipes } from '../../contexts/recipes/recipes.context';
import { useRecipeInfo } from '../../contexts/recipe-info/recipe-info-context';
import { IRecipeData } from '../../services/recipe/recipe-data.interface';
import { Container, SxProps, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RecipeList from '../../components/recipe-list/recipe-list';
import PageHeader from '../../components/page-header/page-header';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

const titleStyle: SxProps = {
  paddingLeft: 1,
  marginBottom: 2,
};

export default function FavoritesPage() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { allRecipes } = useRecipes();
  const { isFavorite } = useRecipeInfo();

  const favorites = allRecipes.filter((r) => isFavorite(r.title));
  const filteredFavorites = filterRecipes(favorites);
  const filteredHistory = filterRecipes(allRecipes);
  const [activeTab, setActiveTab] = useState<string>('favs');

  function handleTabChange(_event: React.SyntheticEvent, newValue: string) {
    setActiveTab(newValue);
  }

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
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={activeTab}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleTabChange} centered>
                <Tab label='Favorites' value='favs' />
                <Tab label='History' value='history' />
              </TabList>
            </Box>
            <TabPanel value='favs'>
              <Container>
                <TextField
                  onChange={handleSearch}
                  value={searchQuery}
                  label='Filter recipes...'
                  InputProps={{ endAdornment: <SearchIcon /> }}
                  sx={{ mb: 4, width: '100%', maxWidth: '400px' }}
                ></TextField>
                <RecipeList recipes={filteredFavorites} />
                {!filteredFavorites.length && (
                  <Typography sx={{ ...titleStyle, fontSize: '14px' }}>
                    Nothing here yet. Snap to cook and find your favs!
                  </Typography>
                )}
              </Container>
            </TabPanel>
            <TabPanel value='history'>
              <Container>
                <TextField
                  onChange={handleSearch}
                  value={searchQuery}
                  label='Filter recipes...'
                  InputProps={{ endAdornment: <SearchIcon /> }}
                  sx={{ mb: 4, width: '100%', maxWidth: '400px' }}
                ></TextField>
                <RecipeList recipes={filteredHistory} />
                {!filteredHistory.length && (
                  <Typography sx={{ ...titleStyle, fontSize: '14px' }}>
                    No history yet. Snap to cook and search for some recipes!
                  </Typography>
                )}
              </Container>
            </TabPanel>
          </TabContext>
        </Box>
      </Box>
    </Box>
  );
}
