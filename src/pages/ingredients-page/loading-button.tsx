import LoadingButton from '@mui/lab/LoadingButton';
import { keyframes } from '@mui/system';
import { Typography } from '@mui/material';

const blink = keyframes`50% {
    color: gray;
  }`;

export function LoadRecipesButton({
  loading,
  onClick,
  disabled,
}: {
  loading: boolean;
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <LoadingButton
      loading={loading}
      variant='cta'
      onClick={() => onClick()}
      disabled={disabled}
      size='large'
      sx={{
        my: 2,
        width: '100%',
        maxWidth: '400px',
        '&&.MuiLoadingButton-loading': {
          backgroundColor: 'primary.dark',
          color: 'secondary.main',
        },
        '&& .MuiLoadingButton-loadingIndicator': {
          color: 'white',
          position: 'static',
        },
        '&& .MuiCircularProgress-root': {
          ml: 1,
        },
        '&&.Mui-disabled': {
          backgroundColor: 'primary.dark',
          opacity: '50%',
        },
      }}
    >
      <Typography
        sx={{
          color: 'secondary.main',
          animation: loading ? `${blink} 2s infinite ease` : 'none',
        }}
      >
        {loading ? 'Searching...' : 'Find Recipes'}
      </Typography>
    </LoadingButton>
  );
}
