import { ChangeEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import snapCookLogo from '../../assets/logo.png';
import { fetchIngredients } from '../../services/ingredients/ingredients.service';
import { IPageProps } from '../../pages/page-props.interface';
import { useIngredients } from '../../contexts/ingredients/ingredients.context';
import { Box, CircularProgress, Grid, Input, Typography } from '@mui/material';
import { height } from '@mui/system';

export default function Camera({ setPageTitle }: IPageProps) {
  // setPageTitle("SnapCook");

  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const { addIngredient, resetIngredients } = useIngredients();

  async function handleUpload(e: ChangeEvent<HTMLInputElement>): Promise<void> {
    setIsLoading(true);

    resetIngredients();

    const ingredients = (await fetchIngredients()).data;

    ingredients.forEach((i) => addIngredient(i));

    setIsLoading(false);

    navigate('ingredients');
  }

  function handleClick() {
    (inputRef.current as any).click();
  }

  return (
    <Grid
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <Grid item sx={{ mt: 4 }}>
        <Typography variant='h1' sx={{ fontSize: '80px' }}>
          Snapcook
        </Typography>
      </Grid>
      <Grid
        item
        sx={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          pt: 2,
        }}
      >
        {isLoading && <CircularProgress />}
        {!isLoading && (
          <img
            style={{ height: 'auto', width: '250px' }}
            onClick={handleClick}
            src={snapCookLogo}
            alt=''
          />
        )}
        <Input
          inputRef={inputRef}
          type='file'
          inputProps={{ accept: 'image/*', capture: 'environment' }}
          onChange={handleUpload}
          sx={{ display: 'none' }}
        />
        <Typography variant='subtitle1' sx={{ mt: 4 }}>
          Tap to take a photo...
        </Typography>
      </Grid>
    </Grid>
  );
}
