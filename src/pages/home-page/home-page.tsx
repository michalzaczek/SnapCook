import { useRef } from 'react';
import snapCookLogo from '../../assets/logo.png';
import { Box, Button, CardMedia, Typography } from '@mui/material';
import ImageInput from '../../components/image-input/image-input';
import { NavLink } from 'react-router-dom';
import PageHeader from '../../components/page-header/page-header';
import { useAuth } from '../../contexts/auth/AuthContext';
import PersonIcon from '@mui/icons-material/Person';

export default function HomePage() {
  const cameraTrigger = useRef(null);
  const { state } = useAuth();
  const { user } = state;

  return (
    <Box sx={{ width: '100%' }}>
      <PageHeader>
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
                alignItems: 'center',
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
      </PageHeader>
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
          top: '-39px',
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
        boxShadow={4}
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
          <Button
            variant='cta'
            sx={{ mb: 2, border: 'none' }}
            component={NavLink}
            to='/subscription'
          >
            Upgrade now!
          </Button>
          <Button
            variant='outlined'
            sx={{
              mb: 2,
              backgroundColor: 'primary.light',
              color: 'primary.dark',
              fontWeight: 700,
            }}
          >
            See details
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
