import { Box, Typography } from '@mui/material';
import { IProps } from './top-bar.interface';

export default function TopBar({ title }: IProps) {
  return (
    <Box>
      <Typography variant='h2'>{title}</Typography>
    </Box>
  );
}
