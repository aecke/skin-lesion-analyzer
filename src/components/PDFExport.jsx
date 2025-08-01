import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  background: var(--color-card-background);
  border-radius: var(--border-radius-medium);
`;

const PreviewContainer = styled.div`
  background: white;
  border: 1px solid var(--color-separator);
  border-radius: var(--border-radius-small);
  padding: 24px;
  margin-bottom: 20px;
  font-family: 'Times New Roman', serif;
`;

const ReportHeader = styled.div`
  text-align: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid var(--color-separator);
`;

const ReportTitle = styled.h1`
  font-size: 24px;
  margin-bottom: 8px;
`;

const ReportDate = styled.p`
  font-size: 14px;
  color: #666;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 12px;
  color: #333;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
`;

const Label = styled.span`
  font-weight: bold;
  color: #555;
`;

const Value = styled.span`
  color: #333;
`;

const ImageSection = styled.div`
  text-align: center;
  margin: 20px 0;
`;

const ReportImage = styled.img`
  max-width: 200px;
  max-height: 200px;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const RiskIndicator = styled.div`
  text-align: center;
  margin: 20px 0;
  padding: 16px;
  background: ${props => {
    if (props.level === 'high') return '#ffe6e6';
    if (props.level === 'medium') return '#fff3e0';
    return '#e8f5e9';
  }};
  border-radius: 8px;
  border: 1px solid ${props => {
    if (props.level === 'high') return '#ffcccc';
    if (props.level === 'medium') return '#ffe0b2';
    return '#c8e6c9';
  }};
`;

const RiskText = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: ${props => {
    if (props.level === 'high') return '#d32f2f';
    if (props.level === 'medium') return '#f57c00';
    return '#388e3c';
  }};
  margin-bottom: 4px;
`;

const Disclaimer = styled.div`
  margin-top: 24px;
  padding: 16px;
  background: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 12px;
  color: #666;
  text-align: center;
`;

const ExportButton = styled.button`
  width: 100%;
  padding: 16px;
  background: var(--color-primary-blue);
  color: white;
  border: none;
  border-radius: var(--border-radius-medium);
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
  transition: background-color 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  &:hover {
    background: var(--color-primary-blue-hover);
  }
`;

const ShareButton = styled.button`
  width: 100%;
  padding: 16px;
  background: transparent;
  color: var(--color-primary-blue);
  border: 1px solid var(--color-primary-blue);
  border-radius: var(--border-radius-medium);
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
  margin-top: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  &:hover {
    background: var(--color-disclaimer-background);
  }
`;

function PDFExport({ result, patientName = "Anna Schmidt", onClose }) {
  const currentDate = new Date().toLocaleDateString('de-DE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handleExport = () => {
    // In einer echten App würde hier die PDF-Generierung stattfinden
    alert('PDF wird generiert und heruntergeladen... (Demo)');
  };

  const handleShare = () => {
    alert('Bericht wird für Ihren Arzt freigegeben... (Demo)');
  };

  const getRiskText = (level) => {
    if (level === 'high') return 'Hohes Risiko - Dringende ärztliche Abklärung empfohlen';
    if (level === 'medium') return 'Mittleres Risiko - Beobachtung empfohlen';
    if (level === 'low_confidence') return 'Unsichere Einschätzung - Neue Aufnahme empfohlen';
    return 'Niedriges Risiko - Regelmäßige Selbstkontrolle ausreichend';
  };

  return (
    <Container>
      <PreviewContainer>
        <ReportHeader>
          <ReportTitle>DermaGuide Analysebericht</ReportTitle>
          <ReportDate>{currentDate}</ReportDate>
        </ReportHeader>

        <Section>
          <SectionTitle>Patienteninformationen</SectionTitle>
          <InfoRow>
            <Label>Name:</Label>
            <Value>{patientName}</Value>
          </InfoRow>
          <InfoRow>
            <Label>Geburtsdatum:</Label>
            <Value>15.07.1990</Value>
          </InfoRow>
          <InfoRow>
            <Label>Hauttyp:</Label>
            <Value>Typ II (Fitzpatrick)</Value>
          </InfoRow>
        </Section>

        <Section>
          <SectionTitle>Analyseergebnis</SectionTitle>
          <RiskIndicator level={result.riskLevel}>
            <RiskText level={result.riskLevel}>
              Risikobewertung: {result.riskValue}%
            </RiskText>
            <p>{getRiskText(result.riskLevel)}</p>
          </RiskIndicator>
        </Section>

        <Section>
          <SectionTitle>Analysierte Läsion</SectionTitle>
          <ImageSection>
            <ReportImage src={result.imagePreview} alt="Hautläsion" />
          </ImageSection>
          <InfoRow>
            <Label>Aufnahmedatum:</Label>
            <Value>{currentDate}</Value>
          </InfoRow>
          <InfoRow>
            <Label>Körperstelle:</Label>
            <Value>Nicht spezifiziert</Value>
          </InfoRow>
        </Section>

        <Section>
          <SectionTitle>ABCD-Analyse</SectionTitle>
          {result.explainability.abcd.map((item, index) => (
            <InfoRow key={index}>
              <Label>{item.feature}:</Label>
              <Value>{item.value}</Value>
            </InfoRow>
          ))}
        </Section>

        <Section>
          <SectionTitle>KI-Konfidenzwerte</SectionTitle>
          {result.predictions.slice(0, 3).map((pred, index) => (
            <InfoRow key={index}>
              <Label>{pred.label}:</Label>
              <Value>{(pred.confidence * 100).toFixed(1)}%</Value>
            </InfoRow>
          ))}
        </Section>

        <Disclaimer>
          Dieser Bericht wurde mit KI-Unterstützung erstellt und ersetzt keine ärztliche Diagnose. 
          Bei Auffälligkeiten konsultieren Sie bitte umgehend einen Dermatologen.
          <br /><br />
          DermaGuide Version 1.0.0 | CE-Kennzeichnung: Klasse IIa Medizinprodukt (Demo)
        </Disclaimer>
      </PreviewContainer>

      <ExportButton onClick={handleExport}>
        <span>📄</span> Als PDF herunterladen
      </ExportButton>
      
      <ShareButton onClick={handleShare}>
        <span>🔗</span> Mit Arzt teilen
      </ShareButton>
    </Container>
  );
}

export default PDFExport;