import { ChangeEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import snapCookLogo from '../../assets/logo.png';
import { fetchIngredients } from '../../services/ingredients/ingredients.service';
import { useIngredients } from '../../contexts/ingredients/ingredients.context';
import { CircularProgress, Input, Typography } from '@mui/material';
import MainLayout from '../../components/main-layout/main-layout';
import { useUIMessage } from '../../contexts/ui-message/ui-message.context';

export default function HomePage() {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const { addIngredient, resetIngredients } = useIngredients();
  const { setMessage, setSeverity, setOpen } = useUIMessage();

  async function handleUpload(e: ChangeEvent<HTMLInputElement>): Promise<void> {
    setIsLoading(true);

    try {
      const ingredients = (await fetchIngredients()).data || [];
      resetIngredients();
      ingredients.forEach((i) => addIngredient(i));
      navigate('ingredients');
    } catch (err: any) {
      setSeverity('error');
      setMessage('Failed to fetch the ingredients.');
      setOpen(true);
    }

    setIsLoading(false);
  }

  function handleClick() {
    (inputRef.current as any).click();
  }

  return (
    <MainLayout>
      {isLoading && <CircularProgress size={80} />}
      {!isLoading && (
        <img
          style={{ height: 'auto', width: '250px' }}
          onClick={handleClick}
          src={snapCookLogo}
          alt=""
        />
      )}
      <Input
        inputRef={inputRef}
        type="file"
        inputProps={{ accept: 'image/*', capture: 'environment' }}
        onChange={handleUpload}
        sx={{ display: 'none' }}
      />
      <Typography
        variant="subtitle1"
        sx={{ mt: 4, fontSize: '25px', color: 'primary.text' }}
      >
        Tap to take a photo...
      </Typography>
    </MainLayout>
  );
}
