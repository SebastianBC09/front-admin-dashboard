'use client'
import React, { useEffect, useState } from 'react';
import { Container, Fade, Slide } from '@mui/material';

interface AuthFormWrapperProps {
  children: React.ReactNode;
}

const AuthFormWrapper: React.FC<AuthFormWrapperProps> = ({ children }) => {
  const [pageLoaded, setPageLoaded] = useState<boolean>(false);

  useEffect(() => {
    setPageLoaded(true);
  }, []);

  return (
    <Fade in={pageLoaded} timeout={800}>
      <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
        <Slide direction="up" in={pageLoaded} timeout={500}>
          {children as React.ReactElement}
        </Slide>
      </Container>
    </Fade>
  );
};

export default AuthFormWrapper;
