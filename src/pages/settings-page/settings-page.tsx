import { Button, CardMedia } from '@mui/material';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/auth/AuthContext';
import PageHeader from '../../components/page-header/page-header';
import PersonIcon from '@mui/icons-material/Person';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsItem from './settings-item';
import DeleteIcon from '@mui/icons-material/Delete';
import PaymentIcon from '@mui/icons-material/Payment';

export default function SettingsPage() {
  const { dispatch, state } = useAuth();
  const navigate = useNavigate();
  const { user } = state;

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/');
  };

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <PageHeader sx={{ width: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: { xs: 'space-between', md: 'flex-end' },
            backgroundColor: 'primary.light',
          }}
        >
          <Box sx={{ display: 'flex', mr: 1 }}>
            <Box
              sx={{
                backgroundColor: 'primary.dark',
                borderRadius: '100px',
                width: '100px',
                height: '100px',
                display: 'flex',
                placeContent: 'center',
              }}
            >
              {user?.photoURL ? (
                <CardMedia
                  sx={{
                    height: '100%',
                    width: '100%',
                    borderRadius: '100px',
                  }}
                  image={user?.photoURL || ''}
                ></CardMedia>
              ) : (
                <PersonIcon
                  sx={{ color: 'primary.light', fontSize: '33px' }}
                ></PersonIcon>
              )}
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              flexGrow: { xs: '1', md: '0' },
            }}
          >
            <Typography
              variant='subtitle1'
              sx={{
                lineHeight: '1',
                textAlign: 'left',
                fontSize: '20px',
                textTransform: 'capitalize',
                fontWeight: 700,
                mb: '7px',
              }}
            >
              {user?.displayName}
            </Typography>
            <Typography
              variant='subtitle1'
              sx={{
                lineHeight: '1',
                textAlign: 'left',
                fontSize: '17px',
                mb: 2,
              }}
            >
              {user?.email}
            </Typography>
            <Typography
              variant='subtitle1'
              sx={{
                lineHeight: '1',
                textAlign: 'left',
                fontSize: '18px',
                mb: 1,
              }}
            >
              Current plan: <b>{state.isPremium ? 'Premium' : 'Free'}</b>
            </Typography>
            <Button
              variant='cta'
              component={NavLink}
              to='/subscription'
              sx={{
                alignSelf: 'flex-start',
                p: '20px',
                py: 0,
                fontSize: '16px',
              }}
            >
              Upgrade
            </Button>
          </Box>
        </Box>
      </PageHeader>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          maxWidth: { md: '1000px' },
          mt: { md: 4 },
        }}
      >
        <Typography
          variant='h1'
          sx={{
            fontFamily: 'Lato',
            fontSize: '28px',
            fontWeight: 700,
            textAlign: 'left',
            pl: 3,
            pb: 3,
            borderBottom: '1px solid rgba(103, 125, 115, 0.50)',
          }}
        >
          Settings
        </Typography>
        <SettingsItem
          icon={SubscriptionsIcon}
          text='Manage subscription'
          arrow={true}
          top={4}
          onClick={() => navigate('/subscription')}
        />
        <SettingsItem
          icon={PaymentIcon}
          text='Payment history'
          arrow={true}
          top={4}
        />
        <SettingsItem
          icon={LogoutIcon}
          text='Log out'
          arrow={false}
          top={3}
          onClick={handleLogout}
        />
        <SettingsItem
          icon={DeleteIcon}
          text='Delete account'
          arrow={false}
          top={3}
        />
      </Box>
    </Box>
  );
}
