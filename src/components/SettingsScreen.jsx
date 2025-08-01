import React, { useState } from 'react';
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
  overflow-y: auto;
`;

const SettingsSection = styled.div`
  background: var(--color-card-background);
  margin: 16px 16px 0;
  border-radius: var(--border-radius-medium);
  overflow: hidden;
`;

const SectionHeader = styled.div`
  padding: 12px 16px;
  background: var(--color-background);
`;

const SectionTitle = styled.h2`
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-secondary);
  text-transform: uppercase;
`;

const SettingItem = styled.div`
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--color-separator);
  
  &:last-child {
    border-bottom: none;
  }
`;

const SettingInfo = styled.div`
  flex: 1;
  margin-right: 16px;
`;

const SettingLabel = styled.div`
  font-size: 16px;
  margin-bottom: 4px;
`;

const SettingDescription = styled.div`
  font-size: 14px;
  color: var(--color-text-secondary);
  line-height: 1.4;
`;

const Toggle = styled.button`
  width: 51px;
  height: 31px;
  background: ${props => props.active ? 'var(--color-success)' : '#e5e5e5'};
  border: none;
  border-radius: 15.5px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: ${props => props.active ? '22px' : '2px'};
    width: 27px;
    height: 27px;
    background: white;
    border-radius: 50%;
    transition: left 0.2s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

const SelectButton = styled.button`
  padding: 8px 16px;
  background: var(--color-background);
  border: 1px solid var(--color-separator);
  border-radius: var(--border-radius-small);
  font-size: 16px;
  color: var(--color-primary-blue);
  cursor: pointer;
  font-family: inherit;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &::after {
    content: '›';
    font-size: 20px;
  }
`;

const InfoBanner = styled.div`
  margin: 16px;
  padding: 16px;
  background: var(--color-disclaimer-background);
  border: 1px solid var(--color-primary-blue);
  border-radius: var(--border-radius-medium);
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

const DeleteButton = styled.button`
  margin: 16px;
  width: calc(100% - 32px);
  padding: 16px;
  background: transparent;
  color: var(--color-error);
  border: 1px solid var(--color-error);
  border-radius: var(--border-radius-medium);
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.2s ease;
  
  &:hover {
    background: var(--color-error);
    color: white;
  }
`;

function SettingsScreen({ onBack }) {
  const [settings, setSettings] = useState({
    // KI-Einstellungen
    autoAnalysis: true,
    saveToDevice: true,
    improveModel: false,
    
    // Benachrichtigungen
    checkReminders: true,
    weeklyReport: false,
    updateNotifications: true,
    
    // Datenschutz
    analytics: false,
    crashReports: true,
    
    // Anzeige
    darkMode: false,
    highContrast: false,
    
    // Erweitert
    confidence: 'balanced',
    imageQuality: 'high'
  });

  const handleToggle = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleDeleteData = () => {
    if (confirm('Möchten Sie wirklich alle Ihre Daten löschen? Diese Aktion kann nicht rückgängig gemacht werden.')) {
      alert('Alle Daten wurden gelöscht (Demo)');
    }
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={onBack}>←</BackButton>
        <Title>Einstellungen</Title>
      </Header>

      <Content>
        <InfoBanner>
          <InfoIcon>🔒</InfoIcon>
          <InfoText>
            Ihre Daten werden ausschließlich lokal auf Ihrem Gerät verarbeitet. 
            Die KI-Analyse erfolgt ohne Internetverbindung.
          </InfoText>
        </InfoBanner>

        <SettingsSection>
          <SectionHeader>
            <SectionTitle>KI-Einstellungen</SectionTitle>
          </SectionHeader>
          
          <SettingItem>
            <SettingInfo>
              <SettingLabel>Automatische Analyse</SettingLabel>
              <SettingDescription>
                Bilder nach der Aufnahme automatisch analysieren
              </SettingDescription>
            </SettingInfo>
            <Toggle 
              active={settings.autoAnalysis}
              onClick={() => handleToggle('autoAnalysis')}
            />
          </SettingItem>

          <SettingItem>
            <SettingInfo>
              <SettingLabel>Bilder lokal speichern</SettingLabel>
              <SettingDescription>
                Aufgenommene Bilder für Verlaufsansicht speichern
              </SettingDescription>
            </SettingInfo>
            <Toggle 
              active={settings.saveToDevice}
              onClick={() => handleToggle('saveToDevice')}
            />
          </SettingItem>

          <SettingItem>
            <SettingInfo>
              <SettingLabel>Modellverbesserung</SettingLabel>
              <SettingDescription>
                Anonymisierte Daten zur Verbesserung der KI teilen (Opt-in)
              </SettingDescription>
            </SettingInfo>
            <Toggle 
              active={settings.improveModel}
              onClick={() => handleToggle('improveModel')}
            />
          </SettingItem>

          <SettingItem>
            <SettingInfo>
              <SettingLabel>Konfidenzschwelle</SettingLabel>
              <SettingDescription>
                Wie vorsichtig soll die KI bei unsicheren Fällen sein?
              </SettingDescription>
            </SettingInfo>
            <SelectButton>
              {settings.confidence === 'conservative' && 'Konservativ'}
              {settings.confidence === 'balanced' && 'Ausgewogen'}
              {settings.confidence === 'aggressive' && 'Aggressiv'}
            </SelectButton>
          </SettingItem>
        </SettingsSection>

        <SettingsSection>
          <SectionHeader>
            <SectionTitle>Benachrichtigungen</SectionTitle>
          </SectionHeader>
          
          <SettingItem>
            <SettingInfo>
              <SettingLabel>Check-Erinnerungen</SettingLabel>
              <SettingDescription>
                Monatliche Erinnerung zur Hautkontrolle
              </SettingDescription>
            </SettingInfo>
            <Toggle 
              active={settings.checkReminders}
              onClick={() => handleToggle('checkReminders')}
            />
          </SettingItem>

          <SettingItem>
            <SettingInfo>
              <SettingLabel>Wochenberichte</SettingLabel>
              <SettingDescription>
                Zusammenfassung Ihrer Scans per E-Mail
              </SettingDescription>
            </SettingInfo>
            <Toggle 
              active={settings.weeklyReport}
              onClick={() => handleToggle('weeklyReport')}
            />
          </SettingItem>

          <SettingItem>
            <SettingInfo>
              <SettingLabel>App-Updates</SettingLabel>
              <SettingDescription>
                Benachrichtigung bei neuen Features
              </SettingDescription>
            </SettingInfo>
            <Toggle 
              active={settings.updateNotifications}
              onClick={() => handleToggle('updateNotifications')}
            />
          </SettingItem>
        </SettingsSection>

        <SettingsSection>
          <SectionHeader>
            <SectionTitle>Datenschutz</SectionTitle>
          </SectionHeader>
          
          <SettingItem>
            <SettingInfo>
              <SettingLabel>Nutzungsanalyse</SettingLabel>
              <SettingDescription>
                Anonyme App-Nutzungsdaten zur Verbesserung
              </SettingDescription>
            </SettingInfo>
            <Toggle 
              active={settings.analytics}
              onClick={() => handleToggle('analytics')}
            />
          </SettingItem>

          <SettingItem>
            <SettingInfo>
              <SettingLabel>Absturzberichte</SettingLabel>
              <SettingDescription>
                Automatisch Fehlerberichte senden
              </SettingDescription>
            </SettingInfo>
            <Toggle 
              active={settings.crashReports}
              onClick={() => handleToggle('crashReports')}
            />
          </SettingItem>
        </SettingsSection>

        <DeleteButton onClick={handleDeleteData}>
          Alle Daten löschen
        </DeleteButton>
      </Content>
    </Container>
  );
}

export default SettingsScreen;