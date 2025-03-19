'use client'
import React, { useEffect, useState } from 'react';
import { Container, Fade, Slide, ContainerProps } from '@mui/material';

interface WrapperProps extends ContainerProps {
  children: React.ReactNode;
  fadeTimeout?: number;
  slideDirection?: 'up' | 'down' | 'left' | 'right';
  slideTimeout?: number;
}

const Wrapper: React.FC<WrapperProps> = ({
  children,
  fadeTimeout = 800,
  slideDirection = 'up',
  slideTimeout = 500,
  ...containerProps
}) => {
  const [pageLoaded, setPageLoaded] = useState<boolean>(false);

  useEffect(() => {
    setPageLoaded(true);
  }, []);

  return (
    <Fade in={pageLoaded} timeout={fadeTimeout}>
      <Container {...containerProps}>
        <Slide direction={slideDirection} in={pageLoaded} timeout={slideTimeout} unmountOnExit>
          <div>{children}</div>
        </Slide>
      </Container>
    </Fade>
  );
};

export default Wrapper;
