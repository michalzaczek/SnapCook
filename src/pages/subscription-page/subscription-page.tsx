import {
  Box,
  Button,
  List,
  ListItem,
  SxProps,
  Typography,
} from '@mui/material';
import MainLayout from '../../components/main-layout/main-layout';

export default function SubscriptionPage() {
  const body2Style: SxProps = { fontSize: '20px', mb: 1 };

  return (
    <MainLayout>
      <Box
        sx={{
          backgroundColor: 'primary.light',
          borderRadius: '8px',
          p: 4,
          mb: 4,
          boxShadow: 3,
        }}
      >
        <Typography
          variant='body1'
          sx={{ fontSize: '22px', mb: 3, fontWeight: 700 }}
        >
          Save food, save the planet
          <br /> with SnapCook Premium
        </Typography>
        <List
          sx={{
            listStyleType: 'disc',
            border: '1px solid #aaa',
            borderRight: 'none',
            borderLeft: 'none',
            mb: 4,
            pl: 3,
          }}
        >
          <ListItem disableGutters sx={{ display: 'list-item' }}>
            <Typography variant='body2' sx={body2Style}>
              Unlimited recipe searches
            </Typography>
          </ListItem>
          <ListItem disableGutters sx={{ display: 'list-item' }}>
            <Typography variant='body2' sx={body2Style}>
              Ad-free, pure cooking experience
            </Typography>
          </ListItem>
          <ListItem disableGutters sx={{ display: 'list-item' }}>
            <Typography variant='body2' sx={body2Style}>
              Exclusive access to premium recipes
            </Typography>
          </ListItem>
        </List>
        <Button
          variant='cta'
          sx={{ boxShadow: 3 }}
          href='https://buy.stripe.com/14kbJQcx70pA7605kk'
          target='_blank'
        >
          Subscribe for 2$/monthly
        </Button>
      </Box>
    </MainLayout>
  );
}
