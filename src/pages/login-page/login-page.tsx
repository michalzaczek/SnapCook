import { Box, Button, SxProps, Typography } from '@mui/material';
import MainLayout from '../../components/main-layout/main-layout';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';

export default function LoginPage() {
  const iconStyle: SxProps = {
    color: '#2457c5',
  };

  const buttonStyle: SxProps = {
    borderColor: 'primary.activeText',
    color: 'primary.activeText',
    p: '8px 40px',
    boxShadow: 2,
    '&&:hover': {
      backgroundColor: 'secondary.main',
    },
  };

  return (
    <MainLayout>
      <Typography variant='subtitle1' sx={{ mb: 7 }}>
        Please sing in to continue ...
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Button
          sx={{ ...buttonStyle, mb: 3 }}
          startIcon={<GoogleIcon sx={iconStyle} />}
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
