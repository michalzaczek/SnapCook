import { Box } from '@mui/system';
import { useState, SyntheticEvent, useMemo, ChangeEvent } from 'react';
import { TabPanel } from '../../components/tab-panel/tab-panel';
import { useRecipes } from '../../contexts/recipes/recipes.context';
import { useRecipeInfo } from '../../contexts/recipe-info/recipe-info-context';
import { IRecipeData } from '../../services/recipe/recipe-data.interface';
import {
  CardMedia,
  Container,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { NavLink } from 'react-router-dom';
import RecipeList from '../../components/recipe-list/recipe-list';
import AccountPageTabs from './account-page-tabs';
import SettingsPage from '../settings-page/settings-page';
import { useAuth } from '../../contexts/auth/AuthContext';

export default function AccountPage() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState(0);
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

  const { state } = useAuth();
  const { user } = state;

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
      <Box
        sx={{
          display: 'flex',
          justifyContent: { xs: 'space-between', md: 'flex-end' },
          backgroundColor: 'primary.light',
          p: { xs: 3, md: 0 },
          pb: { md: '20px' },
          pr: { md: '40px' },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
          <Box
            sx={{
              backgroundColor: 'primary.dark',
              borderRadius: '100px',
              width: '40px',
              height: '40px',
              display: 'flex',
              placeContent: 'center',
            }}
          >
            {user?.photoURL ? (
              <CardMedia
                sx={{ height: '100%', width: '100%', borderRadius: '100px' }}
                image={user?.photoURL || ''}
              ></CardMedia>
            ) : (
              <PersonIcon
                sx={{ color: 'primary.light', fontSize: '33px' }}
              ></PersonIcon>
            )}
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            flexGrow: { xs: '1', md: '0' },
          }}
        >
          <Typography
            variant='subtitle1'
            sx={{
              lineHeight: '1',
              textAlign: 'left',
              fontSize: '18px',
              textTransform: 'uppercase',
            }}
          >
            {user?.displayName}
          </Typography>
          <Typography
            variant='subtitle1'
            sx={{
              lineHeight: '1',
              textAlign: 'left',
              fontSize: '17px',
              color: 'primary.text',
              textTransform: 'lowercase',
            }}
          >
            {user?.email}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton component={NavLink} to='settings'>
            <SettingsOutlinedIcon
              sx={{ fontSize: '50px', color: 'primary.dark' }}
            />
          </IconButton>
        </Box>
      </Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <AccountPageTabs onChange={handleTabChange} activeTab={activeTab} />
      </Box>
      <Container>
        <TabPanel value={activeTab} index={0}>
          <TextField
            onChange={handleSearch}
            value={searchQuery}
            label='Search for a recipe...'
            InputProps={{ endAdornment: <SearchIcon /> }}
            sx={{ mb: 4, width: '100%', maxWidth: '400px' }}
          ></TextField>
          <RecipeList recipes={filteredFavorites} />
        </TabPanel>
        <TabPanel value={activeTab} index={1}>
          <TextField
            onChange={handleSearch}
            value={searchQuery}
            label='Search for a recipe...'
            InputProps={{ endAdornment: <SearchIcon /> }}
            sx={{ mb: 4, width: '100%', maxWidth: '400px' }}
          ></TextField>
          <Box>
            <RecipeList recipes={filteredHistory} />
          </Box>
        </TabPanel>
        <TabPanel value={activeTab} index={2}>
          <SettingsPage />
        </TabPanel>
      </Container>
    </Box>
  );
}
