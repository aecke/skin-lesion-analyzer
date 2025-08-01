import React from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0,0,0,0.5); display: flex; align-items: flex-end; justify-content: center;
  z-index: 1000;
`;
const ModalContainer = styled.div`
  background: var(--color-card-background); width: 100%; max-width: 500px;
  border-radius: var(--border-radius-large) var(--border-radius-large) 0 0;
  padding: 16px;
`;
const Handle = styled.div`
  width: 40px; height: 5px; background: #d1d1d6; border-radius: 2.5px;
  margin: 0 auto 16px auto;
`;
const Title = styled.h2`font-size: 20px; font-weight: 600; text-align: center; margin-bottom: 16px;`;
const Section = styled.div`margin-bottom: 16px;`;
const SectionTitle = styled.h3`font-size: 16px; font-weight: 600; margin-bottom: 8px;`;
const HeatmapImage = styled.img`width: 100%; border-radius: var(--border-radius-medium);`;
const AbcdList = styled.ul`list-style: none; display: flex; flex-direction: column; gap: 8px;`;
const AbcdItem = styled.li`font-size: 14px;`;
const CloseButton = styled.button`
  background: #e5e5e5; color: var(--color-text-primary); font-family: inherit;
  border: none; padding: 16px; font-size: 17px; font-weight: 600;
  border-radius: var(--border-radius-medium); width: 100%; cursor: pointer;
`;

function ExplainabilityModal({ explainData, onClose }) {
  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={e => e.stopPropagation()}>
        <Handle />
        <Title>Erklärung der KI</Title>
        <Section>
          <SectionTitle>Visueller Fokus (Grad-CAM)</SectionTitle>
          <HeatmapImage src={explainData.gradCamImage} alt="Grad-CAM Heatmap" />
        </Section>
        <Section>
          <SectionTitle>ABCD-Analyse</SectionTitle>
          <AbcdList>
            {explainData.abcd.map(item => (
              <AbcdItem key={item.feature}><strong>{item.feature}:</strong> {item.value} - <em>{item.reason}</em></AbcdItem>
            ))}
          </AbcdList>
        </Section>
        <CloseButton onClick={onClose}>Schließen</CloseButton>
      </ModalContainer>
    </Overlay>
  );
}
export default ExplainabilityModal;