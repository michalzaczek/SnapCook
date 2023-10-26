import { Box, Typography } from '@mui/material';

export default function PageHeader({ title }: { title: string }) {
  return (
    <Box
      sx={{
        backgroundColor: 'primary.light',
        p: '25px',
        mb: 2,
      }}
    >
      <Typography variant='h2' sx={{ fontSize: '40px' }}>
        {title}
      </Typography>
    </Box>
  );
}
