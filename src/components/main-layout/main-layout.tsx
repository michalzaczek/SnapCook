import { Grid, Typography } from '@mui/material';
import { ReactNode } from 'react';

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <Grid
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <Grid item sx={{ mt: 4 }}>
        <Typography
          variant='h1'
          sx={{ fontSize: '80px', display: { md: 'none' } }}
        >
          Snapcook
        </Typography>
      </Grid>
      <Grid
        item
        sx={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          pt: 2,
        }}
      >
        {children}
      </Grid>
    </Grid>
  );
}
