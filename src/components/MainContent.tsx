import React, { ReactNode } from 'react';
import { Container } from '@mui/material';

interface MainContentProps {
  children: ReactNode;
}

const MainContent: React.FC<MainContentProps> = ({ children }) => (
  <Container sx={{ flexGrow: 1 }}>{children}</Container>
);

export default MainContent;
