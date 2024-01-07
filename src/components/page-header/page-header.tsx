import { Box, IconButton, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import { ReactNode } from 'react';

export default function PageHeader({ children }: { children?: ReactNode }) {
  return (
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
        <IconButton component={NavLink} to='/settings'>
          <SettingsIcon sx={{ fontSize: '45px', color: 'primary.dark' }} />
        </IconButton>
      </Box>
      {children}
    </Box>
  );
}
