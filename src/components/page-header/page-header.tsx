import { Box, IconButton, Typography } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import { ReactNode } from 'react';
import CloseIcon from '@mui/icons-material/Close';

export default function PageHeader({ children }: { children?: ReactNode }) {
  const { pathname } = useLocation();

  return (
    <Box
      sx={{
        display: { xs: 'flex', md: 'none' },
        flexDirection: 'column',
        backgroundColor: 'primary.light',
        pt: 3,
        px: 3,
        pb: 2,
        mb: 2,
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
        {pathname === '/settings' ? (
          <IconButton component={NavLink} to={-1 as any}>
            <CloseIcon sx={{ fontSize: '45px', color: 'primary.dark' }} />
          </IconButton>
        ) : (
          <IconButton component={NavLink} to='/settings'>
            <SettingsIcon sx={{ fontSize: '45px', color: 'primary.dark' }} />
          </IconButton>
        )}
      </Box>
      {children}
    </Box>
  );
}
