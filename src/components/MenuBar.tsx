import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';

const pages = ['HomeScreen', 'Ingredients', 'Search', 'History'];

function MenuAppBar() {
  return (
    <AppBar
      position='static'
      sx={{
        top: 'auto',
        bottom: 0,
        width: '100%',
        height: '10vh',
      }}
    >
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
            }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => {}}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default MenuAppBar;
