import { useRef } from 'react';
import snapCookLogo from '../../assets/logo.png';
import { Typography } from '@mui/material';
import MainLayout from '../../components/main-layout/main-layout';
import ImageInput from '../../components/image-input/image-input';

export default function HomePage() {
  const cameraTrigger = useRef(null);

  return (
    <MainLayout>
      <img
        style={{ height: 'auto', width: '250px' }}
        src={snapCookLogo}
        alt=''
        ref={cameraTrigger}
      />
      <ImageInput triggerElement={cameraTrigger} />
      <Typography
        variant='subtitle1'
        sx={{ mt: 4, fontSize: '25px', color: 'primary.text' }}
      >
        Tap to take a photo...
      </Typography>
    </MainLayout>
  );
}
