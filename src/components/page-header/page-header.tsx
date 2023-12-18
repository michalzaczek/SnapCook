import { Box, Typography } from '@mui/material';

export default function PageHeader({ title }: { title: string }) {
  return (
    <Box
      sx={{
        backgroundColor: { xs: 'primary.light', md: 'transparent' },
        p: '25px',
        mb: 2,
        borderBottomLeftRadius: '28px',
        borderBottomRightRadius: '28px',
      }}
    >
      <Typography
        variant='h2'
        sx={{
          fontSize: { xs: '40px', md: '64px' },
          fontFamily: { md: 'Lato' },
          color: 'primary.dark',
          fontWeight: { md: 700 },
        }}
      >
        {title}
      </Typography>
    </Box>
  );
}
