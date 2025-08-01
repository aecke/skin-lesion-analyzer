import React, { useState } from 'react';
import styled from 'styled-components';
import ExplainabilityModal from './ExplainabilityModal';
import NextStepDialog from './NextStepDialog';
import PDFExport from './PDFExport';

const Container = styled.div`
  flex: 1; display: flex; flex-direction: column; padding: 24px; align-items: center;
`;

const RiskBadge = styled.div`
  padding: 8px 16px; border-radius: var(--border-radius-large);
  background-color: ${props => `var(--color-risk-${props.level})`};
  color: white; font-size: 18px; font-weight: 600; text-transform: capitalize;
  margin-bottom: 16px;
`;

const RiskValue = styled.p`font-size: 48px; font-weight: 700; margin-bottom: 24px;`;

const ImagePreview = styled.img`
  width: 150px; height: 150px; object-fit: cover; border-radius: var(--border-radius-large);
  margin-bottom: 24px; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
`;

const ConfidenceBar = styled.div`
  width: 100%; max-width: 300px; height: 10px; background-color: #e5e5e5;
  border-radius: 5px; overflow: hidden; margin-bottom: 8px; position: relative;
`;

const ConfidenceFill = styled.div`
  width: ${props => props.score}%; height: 100%;
  background: linear-gradient(90deg, var(--color-risk-low) 0%, var(--color-risk-medium) 60%, var(--color-risk-high) 85%);
`;

const ConfidenceMarkers = styled.div`
  position: absolute; top: 0; left: 0; width: 100%; height: 100%;
  display: flex; align-items: center;
`;

const Marker = styled.div`
  position: absolute; left: ${props => props.position}%; 
  width: 2px; height: 14px; background: rgba(0,0,0,0.3);
  transform: translateX(-50%);
`;

const MarkerLabel = styled.span`
  position: absolute; left: ${props => props.position}%;
  top: 16px; font-size: 10px; color: var(--color-text-tertiary);
  transform: translateX(-50%);
`;

const ConfidenceText = styled.p`font-size: 14px; color: var(--color-text-secondary); margin-bottom: 24px;`;

const ExplainButton = styled.button`
  background: transparent; color: var(--color-primary-blue); font-family: inherit;
  border: none; font-size: 16px; font-weight: 500; cursor: pointer; margin-bottom: 32px;
  display: flex; align-items: center; gap: 8px;
`;

const ActionButtons = styled.div`
  display: flex; flex-direction: column; gap: 12px; width: 100%; max-width: 400px;
`;

const PrimaryButton = styled.button`
  background: var(--color-primary-blue); color: white; font-family: inherit; border: none;
  padding: 16px; font-size: 17px; font-weight: 600; border-radius: var(--border-radius-medium);
  cursor: pointer; width: 100%;
`;

const SecondaryButton = styled.button`
  background: transparent; color: var(--color-primary-blue); font-family: inherit;
  border: 1px solid var(--color-primary-blue); padding: 16px; font-size: 17px;
  font-weight: 600; border-radius: var(--border-radius-medium); cursor: pointer; width: 100%;
`;

// Feedback-Komponenten (G15, G16)
const FeedbackSection = styled.div`
  width: 100%; max-width: 400px; margin: 24px 0;
  padding: 20px; background: var(--color-card-background);
  border-radius: var(--border-radius-medium); box-shadow: var(--shadow-small);
`;

const FeedbackTitle = styled.h3`
  font-size: 16px; font-weight: 600; margin-bottom: 12px; text-align: center;
`;

const StarRating = styled.div`
  display: flex; justify-content: center; gap: 8px; margin-bottom: 16px;
`;

const Star = styled.button`
  background: transparent; border: none; font-size: 28px; cursor: pointer;
  color: ${props => props.filled ? '#FFD700' : '#e0e0e0'};
  transition: color 0.2s ease; padding: 0;
  
  &:hover {
    color: #FFD700;
  }
`;

const FeedbackButtons = styled.div`
  display: flex; gap: 8px; margin-bottom: 12px;
`;

const FeedbackButton = styled.button`
  flex: 1; padding: 12px; background: ${props => props.selected ? 'var(--color-primary-blue)' : 'var(--color-background)'};
  color: ${props => props.selected ? 'white' : 'var(--color-text-primary)'};
  border: 1px solid ${props => props.selected ? 'var(--color-primary-blue)' : 'var(--color-separator)'};
  border-radius: var(--border-radius-small); font-size: 14px; cursor: pointer;
  font-family: inherit; transition: all 0.2s ease;
`;

const FeedbackConfirmation = styled.div`
  padding: 12px; background: var(--color-success); color: white;
  border-radius: var(--border-radius-small); text-align: center;
  font-size: 14px; margin-top: 12px;
`;

const ReportOverlay = styled.div`
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0,0,0,0.5); display: flex; align-items: flex-end;
  justify-content: center; z-index: 1000;
`;

const ReportContainer = styled.div`
  background: var(--color-card-background); width: 100%; max-width: 500px;
  max-height: 80vh; overflow-y: auto;
  border-radius: var(--border-radius-large) var(--border-radius-large) 0 0;
  padding: 16px;
`;

const ReportHeader = styled.div`
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 16px;
`;

const CloseButton = styled.button`
  background: transparent; border: none; font-size: 24px;
  cursor: pointer; color: var(--color-text-secondary);
`;

function ResultsScreen({ result, onDone }) {
  const [showExplainModal, setShowExplainModal] = useState(false);
  const [showNextStepDialog, setShowNextStepDialog] = useState(true);
  const [showPDFExport, setShowPDFExport] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedbackType, setFeedbackType] = useState(null);
  const [showFeedbackConfirmation, setShowFeedbackConfirmation] = useState(false);

  if (!result) return null;

  const { riskLevel, riskValue, imagePreview, explainability } = result;

  const handleRating = (stars) => {
    setRating(stars);
    setTimeout(() => {
      setShowFeedbackConfirmation(true);
      setTimeout(() => setShowFeedbackConfirmation(false), 3000);
    }, 300);
  };

  const handleFeedback = (type) => {
    setFeedbackType(type);
    setTimeout(() => {
      setShowFeedbackConfirmation(true);
      setTimeout(() => setShowFeedbackConfirmation(false), 3000);
    }, 300);
  };

  const getRiskText = () => {
    if (riskLevel === 'low_confidence') return 'Unsicher';
    if (riskLevel === 'high') return 'Hoch';
    if (riskLevel === 'medium') return 'Mittel';
    return 'Niedrig';
  };

  return (
    <Container>
      {showExplainModal && (
        <ExplainabilityModal 
          explainData={explainability} 
          onClose={() => setShowExplainModal(false)} 
        />
      )}
      
      {showNextStepDialog && (
        <NextStepDialog 
          riskLevel={riskLevel} 
          onClose={() => setShowNextStepDialog(false)} 
        />
      )}

      {showPDFExport && (
        <ReportOverlay onClick={() => setShowPDFExport(false)}>
          <ReportContainer onClick={e => e.stopPropagation()}>
            <ReportHeader>
              <h2>Bericht exportieren</h2>
              <CloseButton onClick={() => setShowPDFExport(false)}>×</CloseButton>
            </ReportHeader>
            <PDFExport result={result} onClose={() => setShowPDFExport(false)} />
          </ReportContainer>
        </ReportOverlay>
      )}

      <ImagePreview src={imagePreview} alt="Analysierte Läsion" />
      <RiskBadge level={riskLevel}>{getRiskText()} Risiko</RiskBadge>
      <RiskValue>{riskValue}%</RiskValue>
      
      <ConfidenceBar>
        <ConfidenceFill score={riskValue} />
        <ConfidenceMarkers>
          <Marker position={60} />
          <Marker position={85} />
          <MarkerLabel position={30}>Niedrig</MarkerLabel>
          <MarkerLabel position={72.5}>Mittel</MarkerLabel>
          <MarkerLabel position={92.5}>Hoch</MarkerLabel>
        </ConfidenceMarkers>
      </ConfidenceBar>
      <ConfidenceText>KI-Konfidenz: {Math.round(Math.max(...result.predictions.map(p => p.confidence)) * 100)}%</ConfidenceText>

      <ExplainButton onClick={() => setShowExplainModal(true)}>
        <span>❓</span> Warum diese Einschätzung?
      </ExplainButton>

      <FeedbackSection>
        <FeedbackTitle>War diese Analyse hilfreich?</FeedbackTitle>
        <StarRating>
          {[1, 2, 3, 4, 5].map(star => (
            <Star 
              key={star}
              filled={star <= rating}
              onClick={() => handleRating(star)}
            >
              ★
            </Star>
          ))}
        </StarRating>
        
        <FeedbackTitle>War das Ergebnis korrekt?</FeedbackTitle>
        <FeedbackButtons>
          <FeedbackButton 
            selected={feedbackType === 'correct'}
            onClick={() => handleFeedback('correct')}
          >
            ✓ Korrekt
          </FeedbackButton>
          <FeedbackButton 
            selected={feedbackType === 'incorrect'}
            onClick={() => handleFeedback('incorrect')}
          >
            ✗ Falsch
          </FeedbackButton>
          <FeedbackButton 
            selected={feedbackType === 'unsure'}
            onClick={() => handleFeedback('unsure')}
          >
            ? Unsicher
          </FeedbackButton>
        </FeedbackButtons>
        
        {showFeedbackConfirmation && (
          <FeedbackConfirmation>
            ✓ Danke! Ihr Feedback verbessert die KI für alle Nutzer.
          </FeedbackConfirmation>
        )}
      </FeedbackSection>

      <ActionButtons>
        <PrimaryButton onClick={() => setShowPDFExport(true)}>
          PDF-Bericht erstellen
        </PrimaryButton>
        <SecondaryButton onClick={onDone}>
          Zurück zur Übersicht
        </SecondaryButton>
      </ActionButtons>
    </Container>
  );
}

export default ResultsScreen;