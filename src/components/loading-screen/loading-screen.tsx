import { Box, Typography } from '@mui/material';
import snapCookLogo from '../../assets/logo.png';
import LinearProgress from '@mui/material/LinearProgress';
import { lighten } from '@mui/material/styles';
import { useLoadingScreen } from '../../contexts/loading-screen/loading-screen-context';
import { motion } from 'framer-motion';

export default function LoadingScreen() {
  const { isLoading } = useLoadingScreen();

  if (!isLoading) {
    return null;
  }

  return (
    <Box
      sx={(theme) => ({
        height: '100vh',
        width: '100vw',
        backgroundColor: lighten(theme.palette.primary.main, 0.5),
        position: 'absolute',
        zIndex: 999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      })}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <motion.div
          animate={{
            rotate: [-5, 5],
            translateY: [5, 2.5, 0, 0, 2.5, 5, 5, 5, 2.5, 0, 0, 2.5, 5],
          }}
          transition={{
            repeat: Infinity,
            duration: 1,
            repeatType: 'reverse',
            ease: 'anticipate',
          }}
        >
          <img
            style={{ height: 'auto', width: '200px', marginBottom: '15px' }}
            src={snapCookLogo}
            alt=''
          />
        </motion.div>
        <Typography
          variant='h1'
          sx={{
            fontSize: '70px',
            textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            color: 'primary.dark',
            '&&:hover': {
              color: 'primary.dark',
            },
            mb: 4,
          }}
        >
          Snapcook
        </Typography>
        <Box sx={{ width: '100%', mb: 1 }}>
          <LinearProgress
            sx={{
              '&&.MuiLinearProgress-root': {
                height: 18,
                borderRadius: '28px',
                backgroundColor: 'primary.main',
              },
              '&& .MuiLinearProgress-bar': {
                borderRadius: '28px',
                backgroundColor: 'primary.dark',
              },
            }}
          />
        </Box>
        <Typography sx={{ fontSize: '18px' }}>
          Analyzing your photo...
        </Typography>
      </Box>
    </Box>
  );
}
