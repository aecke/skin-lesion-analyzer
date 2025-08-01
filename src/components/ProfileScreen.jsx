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
  padding: 16px;
  overflow-y: auto;
`;

const ProfileSection = styled.div`
  background: var(--color-card-background);
  border-radius: var(--border-radius-medium);
  padding: 20px;
  margin-bottom: 16px;
`;

const AvatarSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;
`;

const Avatar = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-primary-blue), var(--color-info));
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 40px;
  font-weight: 600;
  margin-bottom: 16px;
`;

const ChangePhotoButton = styled.button`
  background: transparent;
  border: none;
  color: var(--color-primary-blue);
  font-size: 16px;
  cursor: pointer;
  font-family: inherit;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  color: var(--color-text-secondary);
  margin-bottom: 8px;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  border: 1px solid var(--color-separator);
  border-radius: var(--border-radius-small);
  font-family: inherit;
  background: var(--color-background);
  
  &:focus {
    outline: none;
    border-color: var(--color-primary-blue);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  border: 1px solid var(--color-separator);
  border-radius: var(--border-radius-small);
  font-family: inherit;
  background: var(--color-background);
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: var(--color-primary-blue);
  }
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
`;

const InfoCard = styled.div`
  background: var(--color-disclaimer-background);
  border: 1px solid var(--color-primary-blue);
  border-radius: var(--border-radius-small);
  padding: 12px;
  margin-bottom: 16px;
  display: flex;
  gap: 12px;
  align-items: flex-start;
`;

const InfoIcon = styled.span`
  font-size: 16px;
  color: var(--color-primary-blue);
`;

const InfoText = styled.p`
  font-size: 14px;
  line-height: 1.5;
  color: var(--color-text-secondary);
`;

const SaveButton = styled.button`
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
  
  &:hover {
    background: var(--color-primary-blue-hover);
  }
  
  &:active {
    transform: scale(0.98);
  }
`;

const RiskFactorToggle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid var(--color-separator);
  
  &:last-child {
    border-bottom: none;
  }
`;

const RiskFactorLabel = styled.span`
  font-size: 16px;
  flex: 1;
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

function ProfileScreen({ onBack }) {
  const [profile, setProfile] = useState({
    name: 'Anna Schmidt',
    email: 'anna.schmidt@email.de',
    birthdate: '1990-07-15',
    skinType: 'II',
    riskFactors: {
      familyHistory: true,
      sunExposure: false,
      manyMoles: true,
      previousCancer: false
    }
  });

  const handleInputChange = (field, value) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleRiskFactorToggle = (factor) => {
    setProfile(prev => ({
      ...prev,
      riskFactors: {
        ...prev.riskFactors,
        [factor]: !prev.riskFactors[factor]
      }
    }));
  };

  const handleSave = () => {
    alert('Profil gespeichert! (Demo)');
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={onBack}>←</BackButton>
        <Title>Mein Profil</Title>
      </Header>

      <Content>
        <ProfileSection>
          <AvatarSection>
            <Avatar>A</Avatar>
            <ChangePhotoButton>Foto ändern</ChangePhotoButton>
          </AvatarSection>

          <FormGroup>
            <Label>Name</Label>
            <Input 
              type="text" 
              value={profile.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label>E-Mail</Label>
            <Input 
              type="email" 
              value={profile.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label>Geburtsdatum</Label>
            <Input 
              type="date" 
              value={profile.birthdate}
              onChange={(e) => handleInputChange('birthdate', e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label>Hauttyp (Fitzpatrick-Skala)</Label>
            <Select 
              value={profile.skinType}
              onChange={(e) => handleInputChange('skinType', e.target.value)}
            >
              <option value="I">Typ I - Sehr hell, immer Sonnenbrand</option>
              <option value="II">Typ II - Hell, meist Sonnenbrand</option>
              <option value="III">Typ III - Mittelhell, manchmal Sonnenbrand</option>
              <option value="IV">Typ IV - Olivfarben, selten Sonnenbrand</option>
              <option value="V">Typ V - Braun, sehr selten Sonnenbrand</option>
              <option value="VI">Typ VI - Dunkelbraun/Schwarz, nie Sonnenbrand</option>
            </Select>
          </FormGroup>
        </ProfileSection>

        <ProfileSection>
          <SectionTitle>Risikofaktoren</SectionTitle>
          <InfoCard>
            <InfoIcon>ℹ️</InfoIcon>
            <InfoText>
              Diese Informationen helfen der KI, Ihre Risikoeinschätzung zu personalisieren.
            </InfoText>
          </InfoCard>

          <RiskFactorToggle>
            <RiskFactorLabel>Hautkrebs in der Familie</RiskFactorLabel>
            <Toggle 
              active={profile.riskFactors.familyHistory}
              onClick={() => handleRiskFactorToggle('familyHistory')}
            />
          </RiskFactorToggle>

          <RiskFactorToggle>
            <RiskFactorLabel>Häufige Sonnenexposition</RiskFactorLabel>
            <Toggle 
              active={profile.riskFactors.sunExposure}
              onClick={() => handleRiskFactorToggle('sunExposure')}
            />
          </RiskFactorToggle>

          <RiskFactorToggle>
            <RiskFactorLabel>Mehr als 50 Muttermale</RiskFactorLabel>
            <Toggle 
              active={profile.riskFactors.manyMoles}
              onClick={() => handleRiskFactorToggle('manyMoles')}
            />
          </RiskFactorToggle>

          <RiskFactorToggle>
            <RiskFactorLabel>Frühere Hautkrebsdiagnose</RiskFactorLabel>
            <Toggle 
              active={profile.riskFactors.previousCancer}
              onClick={() => handleRiskFactorToggle('previousCancer')}
            />
          </RiskFactorToggle>
        </ProfileSection>

        <SaveButton onClick={handleSave}>Änderungen speichern</SaveButton>
      </Content>
    </Container>
  );
}

export default ProfileScreen;