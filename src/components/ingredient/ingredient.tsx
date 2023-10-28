import { IProps } from './props.interface';
import { Chip } from '@mui/material';

export default function Ingredient({ name, onSelect, selected }: IProps) {
  return (
    <Chip
      label={name}
      variant={selected ? 'filled' : 'outlined'}
      onClick={onSelect}
      sx={{
        width: { xs: '100%', md: 'auto' },
        maxWidth: '400px',
        backgroundColor: 'secondary.main',
        my: 2,
        mx: { xs: 0, md: 1 },
        color: 'primary.dark',
        fontSize: '20px',
        fontWeight: 700,
        textTransform: 'capitalize',
        borderColor: 'primary.dark',
        borderWidth: '2px',
        p: 2.5,
        borderRadius: '30px',
        '&&.MuiChip-filled': {
          borderColor: 'primary.dark',
          borderWidth: '2px',
          borderStyle: 'solid',
          backgroundColor: 'primary.main',
          '&&:hover': {
            backgroundColor: 'primary.main',
          },
        },
        '&&.MuiChip-outlined': {
          color: 'primary.text',
          borderColor: 'primary.text',
          '&&:hover': {
            backgroundColor: 'secondary.main',
          },
        },
      }}
    />
  );
}
