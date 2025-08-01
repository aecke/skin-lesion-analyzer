import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  max-width: 500px;
  margin: 40px auto;
  width: 100%;
  text-align: center;
`;

const IconContainer = styled.div`
  font-size: 56px;
  margin-bottom: 24px;
  line-height: 1;
`;

const Title = styled.h1`
  font-size: 28px;
  color: var(--color-text-primary);
  margin-bottom: 8px;
  font-weight: 700;
`;

const Subtitle = styled.p`
  font-size: 17px;
  color: var(--color-text-secondary);
  margin-bottom: 32px;
  max-width: 380px;
`;

const DisclaimerBox = styled.div`
  background: var(--color-disclaimer-background);
  border-radius: var(--border-radius-medium);
  padding: 16px;
  margin-bottom: 32px;
  border: 1px solid var(--color-primary-blue-hover);
  text-align: left;
  display: flex;
  gap: 12px;
  align-items: flex-start;
`;

const DisclaimerIcon = styled.span`
  font-size: 20px;
  color: var(--color-primary-blue);
  margin-top: 2px;
`;

const DisclaimerText = styled.p`
  font-size: 14px;
  line-height: 1.5;
  color: var(--color-text-secondary);
  strong {
    color: var(--color-text-primary);
    font-weight: 600;
  }
`;

const UploadButton = styled.button`
  background: var(--color-primary-blue);
  color: white;
  font-family: inherit;
  border: none;
  padding: 16px 32px;
  font-size: 17px;
  font-weight: 600;
  border-radius: var(--border-radius-medium);
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
  
  &:hover {
    background: var(--color-primary-blue-hover);
  }
  
  &:active {
    transform: scale(0.98);
  }
`;

function WelcomeScreen({ onUploadClick }) {
  return (
    <Container>
      <IconContainer>🔬</IconContainer>
      <Title>Hautanalyse-Prototyp</Title>
      <Subtitle>Laden Sie ein Bild hoch, um eine KI-basierte Einschätzung zu erhalten.</Subtitle>
      
      <DisclaimerBox>
        <DisclaimerIcon>⚠️</DisclaimerIcon>
        <DisclaimerText>
          <strong>Wichtiger Hinweis:</strong> Dies ist ein Prototyp zu Bildungszwecken und kein medizinisches Gerät. Es kann keine Diagnose stellen. Konsultieren Sie bei gesundheitlichen Bedenken immer einen Arzt.
        </DisclaimerText>
      </DisclaimerBox>
      
      <UploadButton onClick={onUploadClick}>
        Bild hochladen & analysieren
      </UploadButton>
    </Container>
  );
}

export default WelcomeScreen;