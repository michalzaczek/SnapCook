import { Link } from 'react-router-dom';
import {
  Badge,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  SxProps,
} from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import { useState } from 'react';
import { useIngredients } from '../../contexts/ingredients/ingredients.context';

export default function Navbar() {
  const [value, setValue] = useState(0);
  const { ingredients } = useIngredients();

  const iconStyle: SxProps = {
    color: 'primary.navbarIcon',
    fontSize: '35px',
    '.Mui-selected &': { color: 'black' },
  };

  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
      }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{ backgroundColor: 'primary.light', height: 80 }}
      >
        <BottomNavigationAction
          component={Link}
          to='/'
          icon={<CameraAltIcon sx={iconStyle} />}
        />
        <BottomNavigationAction
          component={Link}
          to='ingredients'
          icon={
            <Badge
              badgeContent={ingredients.filter((i) => i.isConfirmed).length}
            >
              <ShoppingBagIcon sx={iconStyle} />
            </Badge>
          }
        />
        <BottomNavigationAction
          component={Link}
          to='recipes'
          icon={<SearchIcon sx={iconStyle} />}
        />
        <BottomNavigationAction
          component={Link}
          to='account'
          icon={<PersonIcon sx={iconStyle} />}
        />
      </BottomNavigation>
    </Paper>
  );
}
