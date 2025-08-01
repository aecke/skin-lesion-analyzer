// ResultsScreen.js – finale Version 2
// ---------------------------------------------------------------------------------
//  ▸ Leichter Schlagschatten für die AnalysisCard hinzugefügt
//  ▸ Design des Feedback-Blocks reduziert (kein Hintergrund/Schatten)
// ---------------------------------------------------------------------------------

import React, { useState } from 'react';
import styled from 'styled-components';
import ExplainabilityModal from './ExplainabilityModal';
import PDFExport from './PDFExport';

// ---------- Styled Components -----------------------------------------------------

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 0 120px;
  position: relative;
`;

/* Analysis block - jetzt mit leichtem Schlagschatten */
const AnalysisCard = styled.div`
  width: 100%;
  background: var(--color-card-background);
  /* Ein dezenter Schatten, um es leicht abzuheben */
  box-shadow: var(--shadow-small);
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
`;

const ImagePreview = styled.img`
  width: 140px;
  height: 140px;
  object-fit: cover;
  border-radius: var(--border-radius-large);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
`;

const RiskBadge = styled.div`
  padding: 6px 14px;
  border-radius: var(--border-radius-large);
  background-color: ${({ level }) => `var(--color-risk-${level})`};
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  text-transform: capitalize;
`;

const ProbabilityLabel = styled.p`
  font-size: 16px;
  font-weight: 600;
  margin: 4px 0;
`;

const ConfidenceBar = styled.div`
  width: 100%;
  max-width: 400px;
  height: 8px;
  background-color: #e5e5e5;
  border-radius: 4px;
  overflow: hidden;
`;

const ConfidenceFill = styled.div`
  width: ${({ score }) => `${score}%`};
  height: 100%;
  background-color: ${({ level }) => `var(--color-risk-${level})`};
  transition: width 0.3s ease;
`;

const ExplainButton = styled.button`
  background: transparent;
  color: var(--color-primary-blue);
  border: none;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
`;

// --- Follow‑Up Box ---------------------------------------------------------------

const FollowUpBox = styled.div`
  width: 100%;
  max-width: 400px;
  background: var(--color-info-light);
  border-left: 4px solid ${({ level }) => `var(--color-risk-${level})`};
  border-radius: var(--border-radius-medium);
  padding: 16px 20px;
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const FollowUpText = styled.p`
  font-size: 14px;
  margin: 0;
`;

const FollowUpButton = styled.button`
  align-self: flex-start;
  padding: 12px 18px;
  border-radius: var(--border-radius-small);
  font-size: 14px;
  font-family: inherit;
  cursor: pointer;
  border: none;
  background: var(--color-primary-blue);
  color: #fff;
`;

// --- Feedback Section (Design reduziert) -------------------------------------------

const FeedbackSection = styled.div`
  width: 100%;
  max-width: 400px;
  /* Entfernt: background, border-radius, box-shadow für ein unauffälligeres Design */
  padding: 20px;
  margin-bottom: 24px;
`;

const FeedbackTitle = styled.h3`
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 12px;
  text-align: center;
  /* Ggf. Textfarbe anpassen, um sie noch weniger prominent zu machen */
  color: var(--color-text-secondary);
`;

const FeedbackChips = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
`;

const Chip = styled.button`
  flex: 1;
  padding: 12px;
  border-radius: var(--border-radius-small);
  font-size: 14px;
  font-family: inherit;
  cursor: pointer;
  border: 1px solid
    ${({ selected }) =>
      selected ? 'var(--color-primary-blue)' : 'var(--color-separator)'};
  background: ${({ selected }) =>
    selected ? 'var(--color-primary-blue)' : 'var(--color-background)'};
  color: ${({ selected }) => (selected ? '#fff' : 'var(--color-text-primary)')};
  transition: all 0.2s ease;
`;

const FeedbackConfirmation = styled.div`
  margin-top: 12px;
  padding: 12px;
  background: var(--color-success);
  color: #fff;
  border-radius: var(--border-radius-small);
  text-align: center;
  font-size: 14px;
`;

// --- Sticky Footer ----------------------------------------------------------------

const Footer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: var(--color-card-background);
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.06);
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
`;

const PrimaryButton = styled.button`
  width: 100%;
  max-width: 400px;
  padding: 16px;
  font-size: 17px;
  font-weight: 600;
  border-radius: var(--border-radius-medium);
  border: none;
  background: var(--color-primary-blue);
  color: #fff;
  cursor: pointer;
`;

const SecondaryButton = styled.button`
  width: 100%;
  max-width: 400px;
  padding: 16px;
  font-size: 17px;
  font-weight: 600;
  border-radius: var(--border-radius-medium);
  background: transparent;
  color: var(--color-primary-blue);
  border: 1px solid var(--color-primary-blue);
  cursor: pointer;
`;

const Disclaimer = styled.p`
  font-size: 12px;
  color: var(--color-text-secondary);
  text-align: center;
`;

// --- Bottom Sheet Styles ----------------------------------------------------------

const SheetOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 1000;
`;

const SheetContainer = styled.div`
  width: 100%;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
  background: var(--color-card-background);
  border-radius: var(--border-radius-large) var(--border-radius-large) 0 0;
  padding: 24px;
`;

// ---------- Helper ----------------------------------------------------------------

const getRiskLabel = (level) => {
  if (level === 'high') return 'Hohes Risiko';
  if (level === 'medium') return 'Mittleres Risiko';
  if (level === 'low') return 'Niedriges Risiko';
  return 'Unsicher';
};

// ---------- Main Component --------------------------------------------------------

function ResultsScreen({ result, onDone }) {
  const [showExplainModal, setShowExplainModal] = useState(false);
  const [showPDFSheet, setShowPDFSheet] = useState(false);
  const [feedbackState, setFeedbackState] = useState(null);
  const [showFeedbackConfirmation, setShowFeedbackConfirmation] = useState(false);

  if (!result) return null;
  const { riskLevel, riskValue, imagePreview, explainability } = result;

  const handleFeedback = (state) => {
    setFeedbackState(state);
    setShowFeedbackConfirmation(true);
    setTimeout(() => setShowFeedbackConfirmation(false), 3000);
  };

  const renderFollowUp = () => {
    if (riskLevel === 'low') {
      return (
        <FollowUpBox level={riskLevel}>
          <FollowUpText>
            Alles scheint in Ordnung. Möchten Sie eine Erinnerung in 6 Monaten einrichten, um diesen Bereich erneut zu prüfen?
          </FollowUpText>
          <FollowUpButton onClick={() => alert('Reminder gesetzt (Stub)')}>Erinnerung einstellen</FollowUpButton>
        </FollowUpBox>
      );
    }
    if (riskLevel === 'high') {
      return (
        <FollowUpBox level={riskLevel}>
          <FollowUpText>
            Die KI empfiehlt dringend eine ärztliche Abklärung. Exportieren Sie einen PDF‑Bericht für Ihren Arztbesuch.
          </FollowUpText>
          <FollowUpButton onClick={() => alert('Terminbuchung (Stub)')}>Dermatologischen Termin vereinbaren</FollowUpButton>
        </FollowUpBox>
      );
    }
    return null;
  };

  return (
    <>
      {showPDFSheet && (
        <SheetOverlay onClick={() => setShowPDFSheet(false)}>
          <SheetContainer onClick={(e) => e.stopPropagation()}>
            <PDFExport result={result} onClose={() => setShowPDFSheet(false)} />
          </SheetContainer>
        </SheetOverlay>
      )}

      {showExplainModal && (
        <ExplainabilityModal
          explainData={explainability}
          onClose={() => setShowExplainModal(false)}
        />
      )}

      <Container>
        <AnalysisCard>
          <ImagePreview src={imagePreview} alt="Analysierte Läsion" />
          <RiskBadge level={riskLevel}>{getRiskLabel(riskLevel)}</RiskBadge>
          <ProbabilityLabel>Konfidenz hierfür: {riskValue}%</ProbabilityLabel>
          <ConfidenceBar>
            <ConfidenceFill score={riskValue} level={riskLevel} />
          </ConfidenceBar>
          <ExplainButton onClick={() => setShowExplainModal(true)}>
            Warum diese Einschätzung?
          </ExplainButton>
        </AnalysisCard>

        {renderFollowUp()}

        <FeedbackSection>
          <FeedbackTitle>Wurde das Ergebnis fachärztlich bestätigt?</FeedbackTitle>
          <FeedbackChips>
            <Chip
              selected={feedbackState === 'confirmed'}
              onClick={() => handleFeedback('confirmed')}
            >
              ✓ Ja
            </Chip>
            <Chip
              selected={feedbackState === 'rejected'}
              onClick={() => handleFeedback('rejected')}
            >
              ✗ Nein
            </Chip>
            <Chip
              selected={feedbackState === 'pending'}
              onClick={() => handleFeedback('pending')}
            >
              ⏳ Steht aus
            </Chip>
          </FeedbackChips>
          {showFeedbackConfirmation && (
            <FeedbackConfirmation>
              ✓ Danke! Ihr Feedback hilft, das Modell zu verbessern.
            </FeedbackConfirmation>
          )}
        </FeedbackSection>
      </Container>

      <Footer>
        <PrimaryButton onClick={() => setShowPDFSheet(true)}>
          PDF‑Bericht erstellen
        </PrimaryButton>
        <SecondaryButton onClick={onDone}>Zurück zur Übersicht</SecondaryButton>
        <Disclaimer>Diese Analyse ersetzt keine ärztliche Diagnose.</Disclaimer>
      </Footer>
    </>
  );
}

export default ResultsScreen;