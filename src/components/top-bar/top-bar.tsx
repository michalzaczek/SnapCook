import { AppBar, Button, SxProps, Toolbar, Typography } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import { NavLink } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function TopBar() {
  const navButtonStyle: SxProps = {
    textTransform: 'none',
    fontSize: '18px',
    py: 1,
    px: 2,
    my: 1,
    mx: 1.5,
    color: 'primary.text',
    borderWidth: '2px',
    fontWeight: 700,
    borderRadius: '4px',
    backgroundColor: 'primary.light',
    borderColor: 'primary.dark',
    '&&:hover, &&.active': {
      backgroundColor: 'primary.main',
      color: 'primary.dark',
      borderWidth: '2px',
      borderColor: 'primary.dark',
    },
  };

  const iconStyle: SxProps = {
    fontSize: '30px !important',
  };

  return (
    <AppBar
      position='static'
      color='default'
      elevation={0}
      sx={{
        display: { xs: 'none', md: 'flex' },
        backgroundColor: 'primary.light',
        p: 2,
      }}
    >
      <Toolbar sx={{ flexWrap: 'wrap', justifyContent: 'space-between' }}>
        <Typography
          component={NavLink}
          to='/'
          variant='h1'
          sx={{
            fontSize: '70px',
            textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            color: 'primary.dark',
            '&&:hover': {
              color: 'primary.dark',
            },
          }}
        >
          Snapcook
        </Typography>
        <nav>
          <Button
            startIcon={<CameraAltIcon sx={iconStyle} />}
            component={NavLink}
            to='/'
            variant='outlined'
            sx={navButtonStyle}
          >
            Photo
          </Button>
          <Button
            startIcon={<ShoppingBagIcon sx={iconStyle} />}
            component={NavLink}
            to='ingredients'
            variant='outlined'
            sx={navButtonStyle}
          >
            Ingredients
          </Button>
          <Button
            startIcon={<SearchIcon sx={iconStyle} />}
            component={NavLink}
            to='recipes'
            variant='outlined'
            sx={navButtonStyle}
          >
            Search
          </Button>
          <Button
            startIcon={<FavoriteIcon sx={iconStyle} />}
            component={NavLink}
            to='favorites'
            variant='outlined'
            sx={navButtonStyle}
          >
            Favorites
          </Button>
          <Button
            startIcon={<PersonIcon sx={iconStyle} />}
            component={NavLink}
            to='settings'
            variant='outlined'
            sx={navButtonStyle}
          >
            Settings
          </Button>
        </nav>
      </Toolbar>
    </AppBar>
  );
}
