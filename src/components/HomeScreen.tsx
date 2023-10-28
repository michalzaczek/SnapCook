import React from 'react';
import Screen from './Screen';
import { Typography } from '@mui/material';
import SampleComponent from '../firebase/SampleComponent';

const HomeScreen: React.FC = () => {
  return (
    <Screen>
      <Typography variant='h1'>Home Screen</Typography>
      <SampleComponent />
    </Screen>
  );
};

export default HomeScreen;
