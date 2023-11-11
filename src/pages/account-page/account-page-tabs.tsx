import { Tabs, Tab } from '@mui/material';
import { SyntheticEvent } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function AccountPageTabs({
  onChange,
  activeTab,
}: {
  onChange: (event: SyntheticEvent, newValue: number) => void;
  activeTab: number;
}) {
  const theme = useTheme();
  const isWideScreen = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Tabs
      value={activeTab}
      onChange={onChange}
      variant={isWideScreen ? 'standard' : 'fullWidth'}
      centered={true}
    >
      <Tab label='Favorite Recipes' />
      <Tab label='Search History' />
    </Tabs>
  );
}
