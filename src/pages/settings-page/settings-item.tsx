import { Box, SvgIconTypeMap, Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { OverridableComponent } from '@mui/material/OverridableComponent';

export default function SettingsItem({
  icon,
  text,
  arrow = false,
  top = 0,
  onClick,
}: {
  icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
    muiName: string;
  };
  text: string;
  arrow?: boolean;
  top?: number;
  onClick?: () => void;
}) {
  const Icon = icon;

  return (
    <Box
      sx={{
        display: 'flex',
        borderBottom: '1px solid rgba(103, 125, 115, 0.50)',
        alignItems: 'center',
        py: 1,
        px: 3,
      }}
      onClick={onClick}
    >
      <Box sx={{ mr: 3 }}>
        <Icon
          sx={{ fontSize: '32px', top: `${top}px`, position: 'relative' }}
        />
      </Box>
      <Typography sx={{ flexGrow: 1, textAlign: 'left' }} variant='subtitle1'>
        {text}
      </Typography>
      {arrow && <ArrowForwardIosIcon sx={{ fontSize: '30px' }} />}
    </Box>
  );
}
