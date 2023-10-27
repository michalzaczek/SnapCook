import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton, Typography } from '@mui/material';
import { Box, SxProps } from '@mui/system';
import { NavLink } from 'react-router-dom';

export default function SettingsPage() {
  const borderStyle: SxProps = {
    borderBottom: '1px solid',
    borderColor: 'primary.inactiveText',
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
    color: 'primary.inactiveText',
  };

  return (
    <Box
      sx={{
        backgroundColor: 'secondary.main',
        minHeight: '100%',
        width: '100%',
        padding: '20px',
      }}
    >
      <Box sx={{ textAlign: 'left', mb: '25px' }}>
        <IconButton component={NavLink} to={-1 as any} sx={{ p: 0 }}>
          <ArrowBackIcon
            sx={{
              fontSize: '40px',
              color: 'primary.inactiveText',
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
        }}
      >
        <Typography
          variant='body1'
          sx={{ fontSize: '16px', mb: 3, fontWeight: 700 }}
        >
          Unlock unlimited search recipes and start to cook whenever you want!
        </Typography>
        <Button variant='cta'>Upgrade Plan</Button>
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
        <Button>Sign Out</Button>
      </Box>
      <Box sx={{ textAlign: 'left' }}>
        <Typography variant='body1' sx={body1Style}>
          Delete Account
        </Typography>
      </Box>
    </Box>
  );
}
