import { ChangeEvent, RefObject, useEffect, useRef } from 'react';
import { useAuth } from '../../contexts/auth/AuthContext';
import { useUIMessage } from '../../contexts/ui-message/ui-message.context';
import { useIngredients } from '../../contexts/ingredients/ingredients.context';
import { useNavigate } from 'react-router-dom';
import { fetchIngredients } from '../../services/ingredients/ingredients.service';
import { Input } from '@mui/material';
import { useLoadingScreen } from '../../contexts/loading-screen/loading-screen-context';

export default function ImageInput({
  triggerElement,
}: {
  triggerElement: RefObject<HTMLElement>;
}) {
  const authState = useAuth().state;
  const { setMessage, setSeverity, setOpen } = useUIMessage();
  const { addIngredient, resetIngredients } = useIngredients();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const { setIsLoading } = useLoadingScreen();
  const { state } = useAuth();

  useEffect(() => {
    const listener = () => {
      if (!state.isPremium) {
        navigate('/subscription');
        return;
      }

      (inputRef.current as any).click();
    };

    triggerElement.current?.addEventListener('click', listener);

    return () => triggerElement.current?.removeEventListener('click', listener);
  }, []);

  async function handleUpload(e: ChangeEvent<HTMLInputElement>): Promise<void> {
    if (!e.target.files || !e.target.files[0]) {
      return;
    }

    const reader = new FileReader();

    reader.onload = async (event) => {
      if (!event.target) {
        return;
      }

      const userToken = await authState.user?.getIdToken();

      if (!userToken) {
        setSeverity('error');
        setMessage('You need to sign in to use this feature.');
        setOpen(true);
        return;
      }

      const image = event.target.result as string;
      const base64 = image.split(',')[1];

      setIsLoading(true);

      try {
        const ingredients = (await fetchIngredients(userToken, base64)) || [];
        resetIngredients();
        ingredients.forEach((i) => addIngredient(i));
        navigate('ingredients');
      } catch (err: any) {
        setSeverity('error');
        setMessage('Failed to fetch the ingredients.');
        setOpen(true);
      }

      setIsLoading(false);
    };

    reader.readAsDataURL(e.target.files[0]);
  }
  return (
    <Input
      inputRef={inputRef}
      type='file'
      inputProps={{ accept: 'image/*', capture: 'environment' }}
      onChange={handleUpload}
      sx={{ display: 'none' }}
    />
  );
}
