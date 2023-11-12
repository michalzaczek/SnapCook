import {
  Box,
  Button,
  List,
  ListItem,
  SxProps,
  Typography,
} from '@mui/material';
import MainLayout from '../../components/main-layout/main-layout';
import { getCheckoutUrl } from '../../contexts/auth/stripePayment';
import { app } from '../../firebase/config';
import { useNavigate } from 'react-router-dom';
import { useStripePayment } from '../../hooks/useStripePayment';

export default function SubscriptionPage() {
  const navigate = useNavigate();
  // const handleSubscribe = async () => {
  //   const paymentId = 'price_1O6sV2Jl4ItknVoyRfpPhykF';
  //   const paymentUrl = await getCheckoutUrl(app, paymentId);
  //   console.log(paymentUrl);
  //   navigate(paymentUrl);
  // };
  const { redirectToCheckout, error } = useStripePayment();

  const handleSubscribe = async () => {
    const priceId = 'price_1O6sV2Jl4ItknVoyRfpPhykF';
    redirectToCheckout(priceId);
  };

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
          variant="body1"
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
            <Typography variant="body2" sx={body2Style}>
              Unlimited recipe searches
            </Typography>
          </ListItem>
          <ListItem disableGutters sx={{ display: 'list-item' }}>
            <Typography variant="body2" sx={body2Style}>
              Ad-free, pure cooking experience
            </Typography>
          </ListItem>
          <ListItem disableGutters sx={{ display: 'list-item' }}>
            <Typography variant="body2" sx={body2Style}>
              Exclusive access to premium recipes
            </Typography>
          </ListItem>
        </List>
        <Button onClick={handleSubscribe} variant="cta" sx={{ boxShadow: 3 }}>
          Subscribe for 2$/monthly
        </Button>
      </Box>
    </MainLayout>
  );
}
