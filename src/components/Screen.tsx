import React, { ReactNode } from 'react';
import { Container } from '@mui/material';
import MenuAppBar from './MenuBar';
import MainContent from './MainContent';

interface ScreenProps {
  children: ReactNode;
}

const Screen: React.FC<ScreenProps> = ({ children }) => {
  return (
    <Container
      sx={{
        width: '100vw',
        height: '100vh',
        bgcolor: 'lightblue',
        display: 'flex',
        flexDirection: 'column',
      }}
      disableGutters
    >
      <MainContent>{children}</MainContent>
      <MenuAppBar />
    </Container>
  );
};

export default Screen;
