import React from 'react';
import styled from 'styled-components';
import NavigationMenu from './NavigationMenu';

const Container = styled.div`
  flex: 1; display: flex; flex-direction: column; background-color: var(--color-background);
`;

const Header = styled.header`
  padding: 16px;
  background-color: var(--color-card-background);
  border-bottom: 1px solid var(--color-separator);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const AppIcon = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, var(--color-primary-blue), var(--color-info));
  border-radius: var(--border-radius-small);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: var(--color-text-secondary);
  margin-top: 2px;
`;

const QuickStats = styled.div`
  display: flex;
  gap: 16px;
  padding: 16px;
  background: var(--color-card-background);
  margin: 16px 16px 0;
  border-radius: var(--border-radius-medium);
`;

const StatItem = styled.div`
  flex: 1;
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: ${props => props.color || 'var(--color-text-primary)'};
  margin-bottom: 4px;
`;

const StatLabel = styled.div`
  font-size: 12px;
  color: var(--color-text-secondary);
  text-transform: uppercase;
`;

const TimelineContainer = styled.div`
  flex: 1; padding: 16px; display: flex; flex-direction: column; gap: 12px;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
`;

const ViewAllButton = styled.button`
  background: transparent;
  border: none;
  color: var(--color-primary-blue);
  font-size: 14px;
  cursor: pointer;
  font-family: inherit;
`;

const ScanItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background-color: var(--color-card-background);
  border-radius: var(--border-radius-medium);
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-medium);
  }
`;

const Thumbnail = styled.img`
  width: 60px;
  height: 60px;
  border-radius: var(--border-radius-small);
  object-fit: cover;
`;

const Info = styled.div`
  flex: 1;
`;

const DateText = styled.p`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 4px;
`;

const LocationText = styled.p`
  font-size: 14px;
  color: var(--color-text-secondary);
  margin-bottom: 4px;
`;

const RiskIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: ${props => `var(--color-risk-${props.level})`};
  span {
    text-transform: capitalize;
  }
`;

const RiskDot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${props => `var(--color-risk-${props.level})`};
`;

const FABContainer = styled.div`
  position: fixed;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
`;

const FAB = styled.button`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: none;
  background-color: var(--color-primary-blue);
  color: white;
  font-size: 32px;
  line-height: 1;
  box-shadow: 0 8px 24px rgba(0, 122, 255, 0.3);
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: var(--color-primary-blue-hover);
    transform: scale(1.05);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const EmptyState = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px;
  text-align: center;
`;

const EmptyIcon = styled.div`
  font-size: 64px;
  margin-bottom: 16px;
  opacity: 0.5;
`;

const EmptyText = styled.p`
  font-size: 16px;
  color: var(--color-text-secondary);
  margin-bottom: 24px;
  max-width: 280px;
`;

function HomeScreen({ scanHistory, onNewScan, onNavigate }) {
  // Erweiterte Mock-Daten mit mehr Details
  const enhancedScanHistory = scanHistory.map(scan => ({
    ...scan,
    location: 'Linker Unterarm',
    confidence: scan.riskValue > 70 ? 'Hoch' : 'Mittel'
  }));

  // Berechne Statistiken
  const stats = {
    total: scanHistory.length,
    highRisk: scanHistory.filter(s => s.riskLevel === 'high').length,
    lastScan: scanHistory.length > 0 ? 
      new Date(scanHistory[0].date).toLocaleDateString('de-DE', { day: 'numeric', month: 'short' }) : 
      'Noch keine'
  };

  return (
    <Container>
      <Header>
        <HeaderLeft>
          <NavigationMenu onNavigate={onNavigate} />
          <div>
            <Title>DermaGuide</Title>
            <Subtitle>Hallo Anna! 👋</Subtitle>
          </div>
        </HeaderLeft>
        <AppIcon>🔬</AppIcon>
      </Header>

      <QuickStats>
        <StatItem>
          <StatValue>{stats.total}</StatValue>
          <StatLabel>Scans gesamt</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue color="var(--color-risk-high)">{stats.highRisk}</StatValue>
          <StatLabel>Auffällig</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue>{stats.lastScan}</StatValue>
          <StatLabel>Letzter Scan</StatLabel>
        </StatItem>
      </QuickStats>

      <TimelineContainer>
        <SectionHeader>
          <SectionTitle>Letzte Scans</SectionTitle>
          {scanHistory.length > 3 && (
            <ViewAllButton onClick={() => onNavigate('history')}>
              Alle anzeigen
            </ViewAllButton>
          )}
        </SectionHeader>

        {scanHistory.length === 0 ? (
          <EmptyState>
            <EmptyIcon>📸</EmptyIcon>
            <EmptyText>
              Noch keine Scans vorhanden. Starten Sie Ihre erste Hautanalyse!
            </EmptyText>
          </EmptyState>
        ) : (
          enhancedScanHistory.slice(0, 3).map(scan => (
            <ScanItem key={scan.id} onClick={() => alert(`Scan ${scan.id} Details (Demo)`)}>
              <Thumbnail src={scan.thumbnail} alt="Scan Vorschau" />
              <Info>
                <DateText>
                  {new Date(scan.date).toLocaleDateString('de-DE', { 
                    year: 'numeric', month: 'long', day: 'numeric' 
                  })}
                </DateText>
                <LocationText>{scan.location}</LocationText>
                <RiskIndicator level={scan.riskLevel}>
                  <RiskDot level={scan.riskLevel} />
                  <span>{scan.riskLevel === 'low' ? 'Niedriges' : scan.riskLevel === 'medium' ? 'Mittleres' : 'Hohes'} Risiko</span>
                  <span>• {scan.riskValue}%</span>
                </RiskIndicator>
              </Info>
            </ScanItem>
          ))
        )}
      </TimelineContainer>

      <FABContainer>
        <FAB onClick={onNewScan}>
          <span style={{ marginTop: '-2px' }}>+</span>
        </FAB>
      </FABContainer>
    </Container>
  );
}

export default HomeScreen;