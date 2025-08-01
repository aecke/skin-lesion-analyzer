import React from 'react';
import styled, { keyframes } from 'styled-components';

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  width: 48px;
  height: 48px;
  border: 5px solid rgba(0, 0, 0, 0.1);
  border-top-color: var(--color-primary-blue);
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin-bottom: 24px;
`;

const LoadingText = styled.p`
  font-size: 17px;
  color: var(--color-text-secondary);
  text-align: center;
`;

function AnalysisScreen() {
  return (
    <Container>
      <Spinner />
      <LoadingText>Bild wird analysiert...</LoadingText>
    </Container>
  );
}

export default AnalysisScreen;