import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Box } from '@mui/system';
import { useState, SyntheticEvent } from 'react';
import { TabPanel } from '../../components/tab-panel/tab-panel';
import { useRecipes } from '../../contexts/recipes/recipes.context';
import RecipeThumbnail from '../../components/recipe-thumbnail/recipe-thumbnail';

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState(0);
  const { recipes } = useRecipes();

  const favorites = recipes.filter((r) => {});

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
        Item One
      </TabPanel>
      <TabPanel value={activeTab} index={1}>
        {recipes.reverse().map((r) => (
          <RecipeThumbnail key={r.id} recipe={r} />
        ))}
      </TabPanel>
    </Box>
  );
}
