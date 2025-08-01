import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  flex: 1; display: flex; flex-direction: column; padding: 24px;
  background: var(--color-card-background);
`;

const SkipButton = styled.button`
  align-self: flex-end;
  background: transparent;
  border: none;
  color: var(--color-text-secondary);
  font-size: 16px;
  cursor: pointer;
  padding: 8px;
  font-family: inherit;
`;

const SlideContainer = styled.div`
  flex: 1; display: flex; flex-direction: column; align-items: center; 
  justify-content: center; text-align: center;
`;

const Icon = styled.div`
  font-size: 80px; 
  margin-bottom: 32px;
  animation: ${props => props.animate ? 'pulse 1.5s ease-in-out infinite' : 'none'};
`;

const Title = styled.h1`
  font-size: 28px; 
  font-weight: 700; 
  margin-bottom: 16px;
`;

const Text = styled.p`
  font-size: 17px; 
  color: var(--color-text-secondary); 
  max-width: 320px; 
  line-height: 1.5;
`;

const AccuracyVisual = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
`;

const AccuracyBar = styled.div`
  width: 200px;
  height: 20px;
  background: #e5e5e5;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 8px;
`;

const AccuracyFill = styled.div`
  width: 92%;
  height: 100%;
  background: var(--color-success);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 8px;
  color: white;
  font-size: 14px;
  font-weight: 600;
`;

const ErrorRate = styled.p`
  font-size: 14px;
  color: var(--color-error);
  margin-top: 4px;
`;

const PrivacyFeatures = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 20px 0;
  text-align: left;
  max-width: 320px;
`;

const PrivacyItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
`;

const PrivacyIcon = styled.span`
  font-size: 24px;
  margin-top: -2px;
`;

const PrivacyText = styled.div`
  flex: 1;
`;

const PrivacyTitle = styled.p`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 2px;
`;

const PrivacyDesc = styled.p`
  font-size: 14px;
  color: var(--color-text-secondary);
`;

const Footer = styled.div`padding: 16px 0;`;

const Button = styled.button`
  background: var(--color-primary-blue); color: white; font-family: inherit; border: none;
  padding: 16px; font-size: 17px; font-weight: 600; border-radius: var(--border-radius-medium);
  cursor: pointer; width: 100%; transition: background-color 0.2s ease;
  &:hover { background: var(--color-primary-blue-hover); }
`;

const Dots = styled.div`
  display: flex; justify-content: center; gap: 8px; margin-bottom: 24px;
`;

const Dot = styled.div`
  width: 8px; height: 8px; border-radius: 50%;
  background-color: ${props => props.active ? 'var(--color-primary-blue)' : '#d1d1d6'};
  transition: background-color 0.3s ease;
`;

const BrandingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
`;

const AppLogo = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, var(--color-primary-blue), var(--color-info));
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
`;

const AppName = styled.h2`
  font-size: 32px;
  font-weight: 700;
`;

const slides = [
  { 
    icon: '🔬', 
    title: 'Willkommen bei DermaGuide', 
    text: 'Ihr persönlicher KI-Assistent zur Unterstützung bei der Hautkrebsfrüherkennung.',
    showBranding: true,
    animate: true
  },
  { 
    icon: '🎯', 
    title: 'Transparente Genauigkeit', 
    text: 'Unsere KI erreicht eine Genauigkeit von 92%. Das bedeutet aber auch: In 8% der Fälle kann sie falsch liegen.',
    showAccuracy: true
  },
  { 
    icon: '🔒', 
    title: 'Ihre Daten sind sicher', 
    text: 'Volle Kontrolle über Ihre Gesundheitsdaten:',
    showPrivacy: true
  },
  {
    icon: '✋',
    title: 'Wichtiger Hinweis',
    text: 'DermaGuide ist ein Unterstützungswerkzeug und ersetzt keine ärztliche Diagnose. Bei Auffälligkeiten suchen Sie bitte immer einen Dermatologen auf.',
    important: true
  }
];

function OnboardingScreen({ onFinish }) {
  const [step, setStep] = useState(0);
  const isLastStep = step === slides.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      onFinish();
    } else {
      setStep(s => s + 1);
    }
  };

  const handleSkip = () => {
    onFinish();
  };

  const currentSlide = slides[step];

  return (
    <Container>
      {step === 0 && <SkipButton onClick={handleSkip}>Überspringen</SkipButton>}
      
      <SlideContainer>
        {currentSlide.showBranding ? (
          <>
            <BrandingContainer>
              <AppLogo>🔬</AppLogo>
              <AppName>DermaGuide</AppName>
            </BrandingContainer>
            <Text>{currentSlide.text}</Text>
          </>
        ) : (
          <>
            <Icon animate={currentSlide.animate}>{currentSlide.icon}</Icon>
            <Title>{currentSlide.title}</Title>
            
            {currentSlide.showAccuracy && (
              <AccuracyVisual>
                <Text>{currentSlide.text}</Text>
                <AccuracyBar>
                  <AccuracyFill>92%</AccuracyFill>
                </AccuracyBar>
                <ErrorRate>⚠️ 8% Fehlerwahrscheinlichkeit</ErrorRate>
              </AccuracyVisual>
            )}
            
            {currentSlide.showPrivacy && (
              <>
                <Text>{currentSlide.text}</Text>
                <PrivacyFeatures>
                  <PrivacyItem>
                    <PrivacyIcon>📱</PrivacyIcon>
                    <PrivacyText>
                      <PrivacyTitle>Lokale Verarbeitung</PrivacyTitle>
                      <PrivacyDesc>Alle Analysen erfolgen direkt auf Ihrem Gerät</PrivacyDesc>
                    </PrivacyText>
                  </PrivacyItem>
                  <PrivacyItem>
                    <PrivacyIcon>🚫</PrivacyIcon>
                    <PrivacyText>
                      <PrivacyTitle>Keine Cloud-Uploads</PrivacyTitle>
                      <PrivacyDesc>Ihre Bilder verlassen niemals Ihr Gerät</PrivacyDesc>
                    </PrivacyText>
                  </PrivacyItem>
                  <PrivacyItem>
                    <PrivacyIcon>✅</PrivacyIcon>
                    <PrivacyText>
                      <PrivacyTitle>Opt-in Datenspende</PrivacyTitle>
                      <PrivacyDesc>Sie entscheiden, ob Sie zur Forschung beitragen</PrivacyDesc>
                    </PrivacyText>
                  </PrivacyItem>
                </PrivacyFeatures>
              </>
            )}
            
            {currentSlide.important && (
              <Text style={{ 
                backgroundColor: 'var(--color-disclaimer-background)', 
                padding: '16px', 
                borderRadius: 'var(--border-radius-medium)',
                border: '1px solid var(--color-primary-blue)'
              }}>
                {currentSlide.text}
              </Text>
            )}
            
            {!currentSlide.showAccuracy && !currentSlide.showPrivacy && !currentSlide.important && (
              <Text>{currentSlide.text}</Text>
            )}
          </>
        )}
      </SlideContainer>
      
      <Footer>
        <Dots>
          {slides.map((_, index) => <Dot key={index} active={index === step} />)}
        </Dots>
        <Button onClick={handleNext}>
          {isLastStep ? 'Los geht\'s!' : 'Weiter'}
        </Button>
      </Footer>
    </Container>
  );
}

export default OnboardingScreen;