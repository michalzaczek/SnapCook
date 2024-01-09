import { Box, Button, SxProps, Typography } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import { useGoogleLogin } from '../../hooks/useGoogleLogin';
import { useNavigate } from 'react-router-dom';
import { useUIMessage } from '../../contexts/ui-message/ui-message.context';
import snapCookLogo from '../../assets/logo.png';

export default function LoginPage() {
  const navigate = useNavigate();
  const { setMessage, setSeverity, setOpen } = useUIMessage();
  const googleLogin = useGoogleLogin();

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      navigate('/');
    } catch (err) {
      setSeverity('error');
      setMessage('There was an error logging in with Google.');
      setOpen(true);
    }
  };

  const buttonStyle: SxProps = {
    borderColor: 'primary.dark',
    backgroundColor: 'primary.light',
    color: 'primary.dark',
    fontWeight: 700,
    width: '320px',
    p: '8px 40px',
    boxShadow: 2,
    '&&:hover': {
      backgroundColor: 'secondary.main',
    },
  };

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: 'primary.light',
        pt: 5,
        px: 4,
      }}
    >
      <img
        style={{ height: 'auto', width: '250px', marginBottom: 20 }}
        src={snapCookLogo}
        alt=''
      />
      <Typography
        variant='h1'
        sx={{
          fontSize: '80px',
          display: { md: 'none' },
          textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          mb: 5,
        }}
      >
        Snapcook
      </Typography>
      <Box
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <Button
          sx={{ ...buttonStyle, mb: 3 }}
          startIcon={<GoogleIcon />}
          onClick={handleGoogleLogin}
        >
          Sign in with Google
        </Button>
        <Button sx={buttonStyle} startIcon={<FacebookRoundedIcon />}>
          Sign in with Facebook
        </Button>
      </Box>
    </Box>
  );
}
