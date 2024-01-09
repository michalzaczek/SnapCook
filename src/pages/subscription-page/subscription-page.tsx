import {
  Box,
  Button,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  SxProps,
  Typography,
} from '@mui/material';
import { useStripePayment } from '../../hooks/useStripePayment';
import PageHeader from '../../components/page-header/page-header';
import { NavLink } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CheckIcon from '@mui/icons-material/Check';
import { useAuth } from '../../contexts/auth/AuthContext';
import DeleteIcon from '@mui/icons-material/Delete';

const textStyle: SxProps = {
  textAlign: 'left',
  fontSize: '20px',
  textTransform: 'capitalize',
  fontWeight: 500,
  lineHeight: 1,
};

const listItemStyle: SxProps = {
  pl: 0,
};

const listItemTextStyle: SxProps = {
  mb: 1,
  '&& .MuiListItemText-primary': { color: 'secondary.main', fontSize: '23px' },
};

const iconStyle: SxProps = { color: 'secondary.main', fontSize: '40px' };

export default function SubscriptionPage() {
  const { redirectToCheckout } = useStripePayment();
  const { state } = useAuth();

  const handleSubscribe = async () => {
    const priceId = 'price_1O6sV2Jl4ItknVoyRfpPhykF';
    redirectToCheckout(priceId);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <PageHeader>
        <IconButton
          component={NavLink}
          to={-1 as any}
          sx={{ justifyContent: 'flex-start' }}
        >
          <ArrowBackIosIcon
            sx={{
              color: 'primary.dark',
              position: 'relative',
            }}
          />
          <Typography sx={{ fontWeight: 700 }}>Back</Typography>
        </IconButton>
      </PageHeader>
      <Box
        sx={{
          px: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            pt: 5,
            pb: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              aligni: 'center',
              borderBottom: '1px solid black',
              width: '100%',
              mb: 3,
              pb: 2,
            }}
          >
            <Typography
              variant='subtitle1'
              sx={{
                ...textStyle,
                mr: 3,
              }}
            >
              Current plan
            </Typography>
            <Box>
              <Typography
                variant='subtitle1'
                sx={{
                  ...textStyle,
                  mb: 1,
                }}
              >
                {state.isPremium ? 'Premium' : 'Free trial'}
              </Typography>
              <Typography
                variant='subtitle1'
                sx={{
                  ...textStyle,
                  fontSize: '18px',
                  fontWeight: 400,
                  color: 'primary.dark',
                }}
              >
                {state.isPremium
                  ? 'Monthly subscription'
                  : '14-day trial period'}
              </Typography>
            </Box>
          </Box>
          <Typography
            variant='subtitle1'
            sx={{
              ...textStyle,
              fontSize: '16px',
              fontWeight: 400,
              color: 'primary.dark',
              width: '100%',
              lineHeight: 1.2,
              textAlign: 'center',
            }}
          >
            Your plan will be automatically extended on 05.12.2023. You will
            then be charged a fee od $2 per month.
          </Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: 'primary.dark',
            borderRadius: '28px',
            borderTopLeftRadius: 0,
            p: 4,
            mb: 4,
            boxShadow: 3,
            mt: 3,
            display: 'flex',
            flexDirection: 'column',
            color: 'secondary.main',
            maxWidth: '560px',
          }}
        >
          <Typography
            variant='body1'
            sx={{
              fontSize: '25px',
              mb: 3,
              textAlign: 'left',
              color: 'secondary.main',
            }}
          >
            {state.isPremium ? 'Your plan includes' : 'Premium includes'}
          </Typography>
          <ListItem sx={listItemStyle}>
            <ListItemIcon>
              <CheckIcon sx={iconStyle} />
            </ListItemIcon>
            <ListItemText
              sx={listItemTextStyle}
              primary='Unlimited recipe searches'
            />
          </ListItem>
          <ListItem sx={listItemStyle}>
            <ListItemIcon>
              <CheckIcon sx={iconStyle} />
            </ListItemIcon>
            <ListItemText
              sx={listItemTextStyle}
              primary='Ad-free, pure cooking experience'
            />
          </ListItem>
          <ListItem sx={listItemStyle}>
            <ListItemIcon>
              <CheckIcon sx={iconStyle} />
            </ListItemIcon>
            <ListItemText
              sx={listItemTextStyle}
              primary='Exclusive access to premium recipes'
            />
          </ListItem>
          {!state.isPremium && (
            <Button
              onClick={handleSubscribe}
              variant='cta'
              sx={{
                boxShadow: 3,
                mt: 2,
                backgroundColor: 'primary.light',
                color: 'primary.dark',
                fontWeight: 700,
                border: 'none',
              }}
            >
              Subscribe for 2$/monthly
            </Button>
          )}
        </Box>
        {state.isPremium && (
          <IconButton
            sx={{
              justifyContent: 'flex-start',
              alignSelf: 'flex-start',
              '&&:focus': { outline: 'none' },
            }}
          >
            <DeleteIcon
              sx={{
                color: 'primary.dark',
                position: 'relative',
                top: '-1px',
              }}
            />
            <Typography sx={{ fontSize: '18px' }}>
              Cancel subscription
            </Typography>
          </IconButton>
        )}
      </Box>
    </Box>
  );
}
