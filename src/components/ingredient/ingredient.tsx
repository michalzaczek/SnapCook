import { IProps } from './props.interface';
import { Box, Chip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function Ingredient({ name, onSelect, selected }: IProps) {
  return (
    <Box
      sx={{
        px: 2,
        width: { xs: '50%', md: 'auto' },
        ':nth-child(odd)': { paddingLeft: { xs: 0, sm: 2 } },
        ':nth-child(even)': { paddingRight: { xs: 0, sm: 2 } },
      }}
    >
      <Chip
        label={name}
        variant={selected ? 'filled' : 'outlined'}
        onClick={onSelect}
        icon={
          <CloseIcon
            color={'secondary.main'}
            sx={{
              transform: selected ? 'rotate(0deg)' : 'rotate(45deg)',
              transition: 'transform 0.3s ease',
            }}
          />
        }
        sx={{
          width: '100%',
          maxWidth: '400px',
          backgroundColor: 'primary.dark',
          my: 1,
          mx: { xs: 0, md: 1 },
          fontSize: '18px',
          textTransform: 'capitalize',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row-reverse',
          py: '20px',
          paddingLeft: '10px',
          paddingRight: '20px',
          borderRadius: '30px',
          border: 'none',
          '&&.MuiChip-filled': {
            backgroundColor: 'primary.dark',
            color: 'secondary.main',
            '&&:hover': {
              backgroundColor: 'primary.dark',
            },
          },
          '&&.MuiChip-outlined': {
            backgroundColor: '#677d73',
            color: 'secondary.main',
            '&&:hover': {
              backgroundColor: '#677d73',
            },
          },
        }}
      />
    </Box>
  );
}
