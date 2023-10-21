import { IProps } from './props.interface';
import { Chip } from '@mui/material';

export default function Ingredient({ name, onSelect, selected }: IProps) {
  return (
    <Chip
      label={name}
      variant={selected ? 'filled' : 'outlined'}
      onClick={onSelect}
      color='primary'
      sx={{ my: 2 }}
    />
  );
}
