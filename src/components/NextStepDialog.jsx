import React from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center;
  padding: 16px; z-index: 1001;
`;
const DialogContainer = styled.div`
  background: var(--color-card-background); width: 100%; max-width: 340px;
  border-radius: var(--border-radius-large); padding: 24px; text-align: center;
`;
const Icon = styled.div`font-size: 48px; margin-bottom: 16px;`;
const Title = styled.h2`font-size: 20px; font-weight: 600; margin-bottom: 8px;`;
const Message = styled.p`font-size: 16px; color: var(--color-text-secondary); margin-bottom: 24px;`;
const Button = styled.button`
  background: ${props => props.primary ? 'var(--color-primary-blue)' : '#e5e5e5'};
  color: ${props => props.primary ? 'white' : 'var(--color-primary-blue)'};
  font-family: inherit; border: none; padding: 14px; font-size: 17px; font-weight: 600;
  border-radius: var(--border-radius-medium); width: 100%; cursor: pointer;
  margin-top: 8px;
`;

const dialogContent = {
  low: { icon: '✅', title: 'Niedriges Risiko', message: 'Alles scheint in Ordnung. Möchten Sie eine Erinnerung in 6 Monaten einrichten, um diesen Bereich erneut zu prüfen?', primaryAction: 'Erinnerung erstellen' },
  medium: { icon: '⚠️', title: 'Mittleres Risiko', message: 'Die KI hat Merkmale erkannt, die beobachtet werden sollten. Sie können die Daten für einen Tele-Dermatologie-Dienst vorbereiten.', primaryAction: 'Daten für Tele-Derm exportieren' },
  high: { icon: '🚨', title: 'Hohes Risiko', message: 'Die KI empfiehlt dringend eine ärztliche Abklärung. Exportieren Sie einen PDF-Bericht für Ihren Arztbesuch.', primaryAction: 'PDF-Bericht erstellen' },
  low_confidence: { icon: '❓', title: 'Unsicheres Ergebnis', message: 'Die Bildqualität war nicht optimal für eine klare Analyse. Bitte versuchen Sie es erneut aus einem anderen Winkel oder mit besserer Beleuchtung.', primaryAction: 'Erneut versuchen' },
};

function NextStepDialog({ riskLevel, onClose }) {
  const content = dialogContent[riskLevel] || dialogContent.low_confidence;

  return (
    <Overlay>
      <DialogContainer>
        <Icon>{content.icon}</Icon>
        <Title>{content.title}</Title>
        <Message>{content.message}</Message>
        <Button primary onClick={() => alert(`${content.primaryAction} (simuliert)`)}>{content.primaryAction}</Button>
        <Button onClick={onClose}>Später</Button>
      </DialogContainer>
    </Overlay>
  );
}
export default NextStepDialog;