import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Box } from '@mui/system';
import { useState, SyntheticEvent, useEffect } from 'react';
import { TabPanel } from '../../components/tab-panel/tab-panel';
import { useRecipes } from '../../contexts/recipes/recipes.context';
import RecipeThumbnail from '../../components/recipe-thumbnail/recipe-thumbnail';
import { useRecipeInfo } from '../../contexts/recipe-info/recipe-info-context';
import { IRecipeData } from '../../services/recipe/recipe-data.interface';

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState(0);
  const { recipes } = useRecipes();
  const { getRecipeInfo } = useRecipeInfo();
  const [favorites, setFavorites] = useState<IRecipeData[] | null>(null);

  useEffect(() => {
    const setFavoritesAsync = async () => {
      const promises = recipes.map(async (r) => {
        const isFav = (await getRecipeInfo(r.id)).isFavorite;
        return {
          id: r.id,
          isFav,
        };
      });

      const recipeInfo = await Promise.all(promises);

      const favorites = recipes.filter(
        (r) => recipeInfo.find((i) => r.id === i.id)?.isFav
      );

      setFavorites(favorites);
    };

    setFavoritesAsync();
  }, [recipes]);

  const handleTabChange = (event: SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
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
        {favorites?.map((r) => <RecipeThumbnail key={r.id} recipe={r} />)}
      </TabPanel>
      <TabPanel value={activeTab} index={1}>
        {recipes.toReversed().map((r) => (
          <RecipeThumbnail key={r.id} recipe={r} />
        ))}
      </TabPanel>
    </Box>
  );
}
