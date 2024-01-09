import { Link } from 'react-router-dom';
import {
  Badge,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Paper,
  SxProps,
} from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { useRef, useState } from 'react';
import { useIngredients } from '../../contexts/ingredients/ingredients.context';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ImageInput from '../image-input/image-input';

const iconStyle: SxProps = {
  color: 'primary.light',
  fontSize: '35px',
  '.Mui-selected &': { color: 'primary.dark' },
};

export default function Navbar() {
  const [value, setValue] = useState(0);
  const { ingredients } = useIngredients();
  const cameraTrigger = useRef(null);

  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        display: { md: 'none' },
      }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{
          backgroundColor: '#677d73',
          height: 67,
          borderTopLeftRadius: 28,
          borderTopRightRadius: 28,
        }}
      >
        <BottomNavigationAction
          component={Link}
          to='favorites'
          icon={<FavoriteIcon sx={iconStyle} />}
        />
        <BottomNavigationAction
          sx={{
            '&&.Mui-selected .MuiSvgIcon-root': { color: 'primary.light' },
            '&&:focus': { outline: 'none' },
          }}
          icon={
            <Box
              sx={{
                display: 'flex',
                flexGrow: 1,
                justifyContent: 'center',
                alignItems: 'center',
                minWidth: 80,
                maxWidth: 168,
              }}
              ref={cameraTrigger}
            >
              <ImageInput triggerElement={cameraTrigger} />
              <Box
                sx={{
                  backgroundColor: '#677d73',
                  width: 82,
                  height: 82,
                  display: 'flex',
                  flexGrow: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 41,
                  position: 'absolute',
                  top: -20,
                  minWidth: 80,
                  maxWidth: 168,
                }}
              >
                <Box
                  sx={{
                    backgroundColor: 'primary.dark',
                    width: 60,
                    height: 60,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 30,
                  }}
                >
                  <CameraAltIcon
                    sx={{ ...iconStyle, position: 'relative', top: '2px' }}
                  />
                </Box>
              </Box>
            </Box>
          }
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
      </BottomNavigation>
    </Paper>
  );
}
