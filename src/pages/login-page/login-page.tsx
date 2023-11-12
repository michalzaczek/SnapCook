import { Box, Button, SxProps, Typography } from '@mui/material';
import MainLayout from '../../components/main-layout/main-layout';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import { useGoogleLogin } from '../../hooks/useGoogleLogin';
import { useNavigate } from 'react-router-dom';
import { useUIMessage } from '../../contexts/ui-message/ui-message.context';
import { useAuth } from '../../contexts/auth/AuthContext';

export default function LoginPage() {
  const { state } = useAuth();
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

  const iconStyle: SxProps = {
    color: '#2457c5',
  };

  const buttonStyle: SxProps = {
    borderColor: 'primary.dark',
    color: 'primary.dark',
    p: '8px 40px',
    boxShadow: 2,
    '&&:hover': {
      backgroundColor: 'secondary.main',
    },
  };

  return (
    <MainLayout>
      {}
      <Typography variant='subtitle1' sx={{ mb: 7 }}>
        {state.loading ? 'Loading ...' : 'Please sing in to continue ...'}
        {state.error && state.error}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Button
          sx={{ ...buttonStyle, mb: 3 }}
          startIcon={<GoogleIcon sx={iconStyle} />}
          onClick={handleGoogleLogin}
        >
          Sign in with Google
        </Button>
        <Button
          sx={buttonStyle}
          startIcon={<FacebookRoundedIcon sx={iconStyle} />}
        >
          Sign in with Facebook
        </Button>
      </Box>
    </MainLayout>
  );
}
