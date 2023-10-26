import { IProps } from './props.interface';
import { Chip } from '@mui/material';

export default function Ingredient({ name, onSelect, selected }: IProps) {
  return (
    <Chip
      label={name}
      variant={selected ? 'filled' : 'outlined'}
      onClick={onSelect}
      sx={{
        backgroundColor: 'secondary.main',
        my: 2,
        color: 'secondary.activeText',
        fontSize: '20px',
        fontWeight: 700,
        textTransform: 'capitalize',
        borderColor: 'primary.activeText',
        borderWidth: '2px',
        p: 2.5,
        borderRadius: '30px',
        '&&.MuiChip-filled': {
          borderColor: 'primary.activeText',
          borderWidth: '2px',
          borderStyle: 'solid',
          backgroundColor: 'primary.main',
          '&&:hover': {
            backgroundColor: 'primary.main',
          },
        },
        '&&.MuiChip-outlined': {
          color: 'primary.inactiveText',
          borderColor: 'primary.inactiveText',
          '&&:hover': {
            backgroundColor: 'secondary.main',
          },
        },
      }}
    />
  );
}
