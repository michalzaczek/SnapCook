import { Button, Container } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton, Typography } from '@mui/material';
import { Box, SxProps } from '@mui/system';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/auth/auth-context';
import { useUIMessage } from '../../contexts/ui-message/ui-message.context';

export default function SettingsPage() {
  const { logOut } = useAuth();
  const navigate = useNavigate();
  const { setMessage, setSeverity, setOpen } = useUIMessage();

  const signOut = async () => {
    try {
      await logOut();
      navigate('/login');
    } catch (err) {
      setSeverity('error');
      setMessage('Log out failed.');
      setOpen(true);
    }
  };

  const borderStyle: SxProps = {
    borderBottom: '1px solid',
    borderColor: 'primary.text',
  };

  const h2Style: SxProps = {
    fontFamily: 'Lato',
    fontSize: '20px',
    fontWeight: 700,
    mb: 0.5,
  };

  const body1Style: SxProps = {
    fontSize: '18px',
    mb: 1,
    fontWeight: 700,
    color: 'primary.text',
  };

  return (
    <Container>
      <Box
        sx={{
          backgroundColor: 'secondary.main',
          minHeight: '100%',
          width: '100%',
          padding: '20px',
        }}
      >
        <Box sx={{ textAlign: 'left', mb: '25px', display: { md: 'none' } }}>
          <IconButton component={NavLink} to={-1 as any} sx={{ p: 0 }}>
            <ArrowBackIcon
              sx={{
                fontSize: '40px',
                color: 'primary.text',
                position: 'relative',
                left: '-5px',
              }}
            />
          </IconButton>
        </Box>
        <Box
          sx={{
            ...borderStyle,
            pb: 2,
            mb: 3,
            display: { md: 'none' },
          }}
        >
          <Typography
            variant='h1'
            sx={{
              fontFamily: 'Lato',
              fontSize: '28px',
              fontWeight: 700,
              textAlign: 'left',
            }}
          >
            Settings
          </Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: 'primary.light',
            borderRadius: '8px',
            p: 4,
            mb: 4,
            pt: { md: 8 },
          }}
        >
          <Typography
            variant='body1'
            sx={{
              fontSize: { xs: '16px', md: '24px' },
              mb: { xs: 3, md: 5 },
              fontWeight: 700,
            }}
          >
            Unlock unlimited search recipes and start to cook whenever you want!
          </Typography>
          <Button
            variant='cta'
            component={NavLink}
            to='/subscription'
            sx={{ px: { md: 10 }, py: { md: 1.5 }, fontSize: { md: '22px' } }}
          >
            Upgrade Plan
          </Button>
        </Box>
        <Box sx={{ ...borderStyle, textAlign: 'left', mb: 2 }}>
          <Typography variant='h2' sx={{ ...h2Style }}>
            Current Plan
          </Typography>
          <Typography variant='body1' sx={body1Style}>
            Free
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'left', mb: 2 }}>
          <Typography variant='h2' sx={{ ...h2Style }}>
            Displayed Name
          </Typography>
          <Typography
            variant='body1'
            sx={{
              ...body1Style,
              textTransform: 'uppercase',
            }}
          >
            Name surname
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'left', mb: 4 }}>
          <Typography variant='h2' sx={{ ...h2Style }}>
            Measurement System
          </Typography>
          <Typography variant='body1' sx={body1Style}>
            Metric
          </Typography>
        </Box>
        <Box sx={{ mb: 4 }}>
          <Button onClick={() => signOut()}>Sign Out</Button>
        </Box>
        <Box sx={{ textAlign: 'left' }}>
          <Typography variant='body1' sx={body1Style}>
            Delete Account
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
