import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  flex: 1; display: flex; flex-direction: column; background-color: #000; position: relative;
`;
const Header = styled.div`
  position: absolute; top: 0; left: 0; width: 100%; padding: 16px;
  display: flex; justify-content: flex-start;
`;
const BackButton = styled.button`
  background: rgba(255,255,255,0.2); color: white; border: none;
  width: 44px; height: 44px; border-radius: 50%; font-size: 24px;
  cursor: pointer;
`;
const FocusFrame = styled.div`
  position: absolute; top: 50%; left: 50%;
  width: 80vw; height: 80vw; max-width: 400px; max-height: 400px;
  transform: translate(-50%, -50%);
  border: 2px solid white; border-radius: var(--border-radius-large);
  box-shadow: 0 0 0 9999px rgba(0,0,0,0.5);
`;
const Footer = styled.div`
  position: absolute; bottom: 0; left: 0; width: 100%; padding: 32px;
  display: flex; flex-direction: column; align-items: center; gap: 16px;
`;
const QualityBarContainer = styled.div`
  width: 100%; max-width: 300px;
`;
const QualityBar = styled.div`
  width: 100%; height: 8px; background-color: rgba(255,255,255,0.3);
  border-radius: 4px; overflow: hidden;
`;
const QualityFill = styled.div`
  width: ${props => props.quality}%; height: 100%;
  background-color: ${props => props.quality < 50 ? 'var(--color-risk-high)' : 'var(--color-risk-low)'};
  transition: width 0.5s ease, background-color 0.5s ease;
`;
const QualityText = styled.p`color: white; font-size: 14px;`;
const CaptureButton = styled.button`
  width: 72px; height: 72px; border-radius: 50%;
  background-color: white; border: 4px solid rgba(255,255,255,0.5);
  cursor: pointer;
`;

function CaptureScreen({ onCapture, onBack }) {
  const [quality, setQuality] = useState(0);
  const fileInputRef = useRef(null);

  useEffect(() => {
    // Simuliere Live-Qualitätsprüfung
    const interval = setInterval(() => {
      setQuality(q => (q > 95 ? 0 : q + Math.random() * 20));
    }, 700);
    return () => clearInterval(interval);
  }, []);

  const handleCaptureClick = () => {
    fileInputRef.current.click();
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
        onCapture(file);
    }
  };

  return (
    <Container>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />
      <Header><BackButton onClick={onBack}>×</BackButton></Header>
      <FocusFrame />
      <Footer>
        <QualityBarContainer>
          <QualityText>Bildqualität: {quality < 50 ? "Schlecht" : "Gut"}</QualityText>
          <QualityBar><QualityFill quality={quality} /></QualityBar>
        </QualityBarContainer>
        <CaptureButton onClick={handleCaptureClick} />
      </Footer>
    </Container>
  );
}
export default CaptureScreen;