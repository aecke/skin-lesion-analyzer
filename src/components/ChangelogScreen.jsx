import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: var(--color-background);
`;

const Header = styled.header`
  padding: 16px;
  background-color: var(--color-card-background);
  border-bottom: 1px solid var(--color-separator);
  display: flex;
  align-items: center;
  gap: 16px;
`;

const BackButton = styled.button`
  background: transparent;
  border: none;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  cursor: pointer;
  color: var(--color-primary-blue);
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: 600;
  flex: 1;
`;

const Content = styled.div`
  flex: 1;
  padding: 16px;
  overflow-y: auto;
`;

const VersionCard = styled.div`
  background: var(--color-card-background);
  border-radius: var(--border-radius-medium);
  padding: 20px;
  margin-bottom: 16px;
`;

const VersionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const VersionNumber = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: var(--color-primary-blue);
`;

const VersionDate = styled.p`
  font-size: 14px;
  color: var(--color-text-secondary);
`;

const Badge = styled.span`
  background: ${props => props.type === 'new' ? 'var(--color-success)' : 'var(--color-info)'};
  color: white;
  font-size: 12px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: var(--border-radius-pill);
  text-transform: uppercase;
`;

const CategorySection = styled.div`
  margin-bottom: 16px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const CategoryTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ChangeList = styled.ul`
  list-style: none;
  margin-left: 28px;
`;

const ChangeItem = styled.li`
  font-size: 14px;
  line-height: 1.6;
  color: var(--color-text-secondary);
  margin-bottom: 4px;
  position: relative;
  
  &:before {
    content: '•';
    position: absolute;
    left: -16px;
    color: var(--color-primary-blue);
  }
`;

const Highlight = styled.span`
  color: var(--color-text-primary);
  font-weight: 500;
`;

const InfoBanner = styled.div`
  background: var(--color-disclaimer-background);
  border: 1px solid var(--color-primary-blue);
  border-radius: var(--border-radius-medium);
  padding: 16px;
  margin-bottom: 16px;
  display: flex;
  gap: 12px;
  align-items: flex-start;
`;

const InfoIcon = styled.span`
  font-size: 20px;
  color: var(--color-primary-blue);
`;

const InfoText = styled.p`
  font-size: 14px;
  line-height: 1.5;
  color: var(--color-text-secondary);
`;

const versions = [
  {
    version: '1.0.0',
    date: '1. August 2025',
    isLatest: true,
    categories: [
      {
        title: 'Neue Features',
        icon: '✨',
        changes: [
          '<Highlight>KI-gestützte Hautanalyse</Highlight> mit 92% Genauigkeit (AUROC)',
          '<Highlight>Explainable AI</Highlight>: Verstehen Sie, wie die KI ihre Entscheidungen trifft',
          '<Highlight>Timeline-Ansicht</Highlight>: Verfolgen Sie Veränderungen über Zeit',
          '<Highlight>PDF-Export</Highlight>: Erstellen Sie Berichte für Ihren Arzt',
          '<Highlight>Offline-Modus</Highlight>: Alle Analysen erfolgen lokal auf Ihrem Gerät'
        ]
      },
      {
        title: 'Verbesserungen',
        icon: '🚀',
        changes: [
          'Optimierte Bildaufnahme mit Live-Qualitätsfeedback',
          'Intuitive Benutzeroberfläche nach Apple Human Interface Guidelines',
          'Barrierefreies Design mit hohem Kontrast-Modus',
          'Schnellere Analysezeiten durch optimiertes TensorFlow-Modell'
        ]
      },
      {
        title: 'Sicherheit & Datenschutz',
        icon: '🔒',
        changes: [
          'DSGVO-konforme Datenverarbeitung',
          'Lokale Speicherung aller Gesundheitsdaten',
          'Opt-in für anonymisierte Datenspende zur Forschung',
          'Ende-zu-Ende-Verschlüsselung für geteilte Berichte'
        ]
      }
    ]
  },
  {
    version: '0.9.0 Beta',
    date: '15. Juni 2025',
    categories: [
      {
        title: 'Beta Features',
        icon: '🧪',
        changes: [
          'Erste Version der KI-Analyse',
          'Grundlegende Capture-Funktionalität',
          'Einfache Ergebnisanzeige'
        ]
      },
      {
        title: 'Bekannte Probleme',
        icon: '🐛',
        changes: [
          'Gelegentliche Abstürze bei schlechter Beleuchtung behoben',
          'Verbesserte Speicherverwaltung',
          'Optimierte Batterielaufzeit'
        ]
      }
    ]
  }
];

function ChangelogScreen({ onBack }) {
  const parseChangeText = (text) => {
    return text.replace(/<Highlight>(.*?)<\/Highlight>/g, (match, p1) => 
      `<strong>${p1}</strong>`
    );
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={onBack}>←</BackButton>
        <Title>Was ist neu?</Title>
      </Header>

      <Content>
        <InfoBanner>
          <InfoIcon>💡</InfoIcon>
          <InfoText>
            DermaGuide wird kontinuierlich verbessert. Aktivieren Sie automatische Updates, 
            um immer die neuesten Features und Sicherheitsverbesserungen zu erhalten.
          </InfoText>
        </InfoBanner>

        {versions.map((version, index) => (
          <VersionCard key={version.version}>
            <VersionHeader>
              <div>
                <VersionNumber>Version {version.version}</VersionNumber>
                <VersionDate>{version.date}</VersionDate>
              </div>
              {version.isLatest && <Badge type="new">Aktuell</Badge>}
            </VersionHeader>

            {version.categories.map((category, catIndex) => (
              <CategorySection key={catIndex}>
                <CategoryTitle>
                  <span>{category.icon}</span>
                  {category.title}
                </CategoryTitle>
                <ChangeList>
                  {category.changes.map((change, changeIndex) => (
                    <ChangeItem 
                      key={changeIndex}
                      dangerouslySetInnerHTML={{ __html: parseChangeText(change) }}
                    />
                  ))}
                </ChangeList>
              </CategorySection>
            ))}
          </VersionCard>
        ))}
      </Content>
    </Container>
  );
}

export default ChangelogScreen;