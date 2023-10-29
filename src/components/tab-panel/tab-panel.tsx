import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { IProps } from './props.interface';

export function TabPanel(props: IProps) {
  const { children, value, index } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
