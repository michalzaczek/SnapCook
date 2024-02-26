import { IProps } from './props.interface';
import { Box, Chip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { motion, useAnimate } from 'framer-motion';
import { useUIState } from '../../contexts/ui-state/ui-state.context';
import { useEffect } from 'react';

export default function Ingredient({
  name,
  onSelect,
  selected,
  index,
}: IProps) {
  const {
    animateIngredients,
    setAnimateIngredients,
    delayIngredientsAnimation,
    setDelayIngredientsAnimation,
  } = useUIState();
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (!animateIngredients) {
      return;
    }

    animate(
      scope.current,
      { x: 0, opacity: 1 },
      {
        duration: 0.5,
        type: 'spring',
        delay: delayIngredientsAnimation ? 0.1 * index : 0,
      }
    ).then(() => {
      setAnimateIngredients(false);
      setDelayIngredientsAnimation(true);
    });
  }, []);

  return (
    <Box
      ref={scope}
      initial={animateIngredients ? { x: -100, opacity: 0 } : false}
      component={motion.div}
      sx={{
        px: 2,
        width: { xs: '50%', md: 'auto' },
        ':nth-of-type(odd)': { paddingLeft: { xs: 0, sm: 2 } },
        ':nth-of-type(even)': { paddingRight: { xs: 0, sm: 2 } },
      }}
    >
      <Chip
        label={name}
        variant={selected ? 'filled' : 'outlined'}
        onClick={onSelect}
        icon={
          <CloseIcon
            sx={(template) => ({
              transform: selected ? 'rotate(0deg)' : 'rotate(45deg)',
              transition: 'transform 0.3s ease',
              fill: template.palette.secondary.main,
            })}
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
