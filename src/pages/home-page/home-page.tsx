import { useRef } from 'react';
import snapCookLogo from '../../assets/logo.png';
import { Box, Button, CardMedia, IconButton, Typography } from '@mui/material';
import ImageInput from '../../components/image-input/image-input';
import SettingsIcon from '@mui/icons-material/Settings';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/auth/AuthContext';
import PersonIcon from '@mui/icons-material/Person';

export default function HomePage() {
  const cameraTrigger = useRef(null);
  const { state } = useAuth();
  const { user } = state;

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          display: { xs: 'flex', md: 'none' },
          flexDirection: 'column',
          backgroundColor: 'primary.light',
          pt: 5,
          px: 3,
          pb: 3,
          borderBottomLeftRadius: '28px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mb: 3,
            alignItems: 'center',
          }}
        >
          <Typography
            variant='h1'
            sx={{
              fontSize: '42px',
              display: { md: 'none' },
              textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            }}
          >
            Snapcook
          </Typography>
          <IconButton component={NavLink} to='settings'>
            <SettingsIcon sx={{ fontSize: '45px', color: 'primary.dark' }} />
          </IconButton>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: { xs: 'space-between', md: 'flex-end' },
            backgroundColor: 'primary.light',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
            <Box
              sx={{
                backgroundColor: 'primary.dark',
                borderRadius: '100px',
                width: '50px',
                height: '50px',
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
              Hello, {user?.displayName}
            </Typography>
            <Typography
              variant='subtitle1'
              sx={{
                lineHeight: '1',
                textAlign: 'left',
                fontSize: '17px',
              }}
            >
              Let's snap to cook!
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: 'primary.dark',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          borderBottomLeftRadius: '90px',
          borderBottomRightRadius: '90px',
          pt: 7,
          pb: 4,
          position: 'relative',
          top: '-25px',
        }}
        boxShadow={4}
      >
        <img
          style={{ height: 'auto', width: '250px' }}
          src={snapCookLogo}
          alt=''
          ref={cameraTrigger}
        />
        <ImageInput triggerElement={cameraTrigger} />
        <Typography
          variant='subtitle1'
          sx={{
            mt: 4,
            fontSize: '20px',
            fontWeight: 400,
            color: 'primary.light',
          }}
        >
          Tap to take a photo!
        </Typography>
      </Box>
      <Box
        sx={{
          backgroundColor: 'primary.light',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          width: '90%',
          margin: '0 auto',
          borderRadius: '28px',
          borderTopLeftRadius: 0,
          p: '30px',
          pt: 4,
        }}
      >
        <Typography
          variant='subtitle1'
          sx={{
            fontSize: '18px',
            fontWeight: 400,
            textAlign: 'left',
            mb: 3,
          }}
        >
          Unlock <b>unlimited</b> search recipes and start to cook whenever you
          want!
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            alignItems: 'center',
            width: '100%',
            maxWidth: '366px',
          }}
        >
          <Button variant='cta' sx={{ boxShadow: 3, mb: 2 }}>
            Upgrade now!
          </Button>
          <Button variant='outlined' sx={{ boxShadow: 3, mb: 2 }}>
            See details
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
