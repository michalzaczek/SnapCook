import { ChangeEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import snapCookLogo from '../../assets/logo.png';
import { fetchIngredients } from '../../services/ingredients/ingredients.service';
import { useIngredients } from '../../contexts/ingredients/ingredients.context';
import { CircularProgress, Input, Typography } from '@mui/material';
import MainLayout from '../../components/main-layout/main-layout';

export default function MainPage() {
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
    <MainLayout>
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
    </MainLayout>
  );
}
