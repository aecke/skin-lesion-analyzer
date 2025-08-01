import React, { useState } from 'react';
import styled from 'styled-components';

const MenuButton = styled.button`
  background: transparent;
  border: none;
  width: 44px;
  height: 44px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
`;

const MenuLine = styled.div`
  width: 24px;
  height: 2px;
  background-color: var(--color-text-primary);
  transition: all 0.3s ease;
  
  ${props => props.isOpen && props.index === 0 && `
    transform: translateY(6px) rotate(45deg);
  `}
  
  ${props => props.isOpen && props.index === 1 && `
    opacity: 0;
  `}
  
  ${props => props.isOpen && props.index === 2 && `
    transform: translateY(-6px) rotate(-45deg);
  `}
`;

const MenuOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transition: all 0.3s ease;
  z-index: 998;
`;

const MenuContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 280px;
  height: 100%;
  background: var(--color-card-background);
  transform: translateX(${props => props.isOpen ? '0' : '-100%'});
  transition: transform 0.3s ease;
  z-index: 999;
  box-shadow: var(--shadow-large);
  overflow-y: auto;
`;

const MenuHeader = styled.div`
  padding: 24px 20px;
  border-bottom: 1px solid var(--color-separator);
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const UserAvatar = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-primary-blue), var(--color-info));
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  font-weight: 600;
`;

const UserDetails = styled.div`
  flex: 1;
`;

const UserName = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 4px;
`;

const UserEmail = styled.p`
  font-size: 14px;
  color: var(--color-text-secondary);
`;

const MenuSection = styled.div`
  padding: 12px 0;
  border-bottom: 1px solid var(--color-separator);
  
  &:last-child {
    border-bottom: none;
  }
`;

const MenuItem = styled.button`
  width: 100%;
  padding: 16px 20px;
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-family: inherit;
  font-size: 16px;
  color: var(--color-text-primary);
  text-align: left;
  
  &:hover {
    background-color: var(--color-background);
  }
  
  &:active {
    background-color: var(--color-separator);
  }
`;

const MenuIcon = styled.span`
  width: 24px;
  font-size: 20px;
  text-align: center;
`;

const MenuLabel = styled.span`
  flex: 1;
`;

const Badge = styled.span`
  background: var(--color-error);
  color: white;
  font-size: 12px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: var(--border-radius-pill);
`;

const VersionText = styled.p`
  padding: 20px;
  text-align: center;
  font-size: 12px;
  color: var(--color-text-tertiary);
`;

function NavigationMenu({ onNavigate }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuClick = (screen) => {
    setIsOpen(false);
    setTimeout(() => {
      onNavigate(screen);
    }, 300);
  };

  const menuItems = [
    { icon: '👤', label: 'Mein Profil', screen: 'profile' },
    { icon: '📊', label: 'Meine Statistiken', screen: 'stats' },
    { icon: '🔔', label: 'Erinnerungen', screen: 'reminders', badge: '2' },
    { icon: '📄', label: 'Exportierte Berichte', screen: 'reports' },
    { icon: '⚙️', label: 'Einstellungen', screen: 'settings' },
    { icon: '🔒', label: 'Datenschutz', screen: 'privacy' },
    { icon: '❓', label: 'Hilfe & Support', screen: 'help' },
    { icon: '📖', label: 'Anleitung', screen: 'tutorial' },
    { icon: '🔄', label: 'Changelog', screen: 'changelog', badge: 'NEU' },
  ];

  return (
    <>
      <MenuButton onClick={() => setIsOpen(!isOpen)}>
        <MenuLine isOpen={isOpen} index={0} />
        <MenuLine isOpen={isOpen} index={1} />
        <MenuLine isOpen={isOpen} index={2} />
      </MenuButton>

      <MenuOverlay isOpen={isOpen} onClick={() => setIsOpen(false)} />
      
      <MenuContainer isOpen={isOpen}>
        <MenuHeader>
          <UserInfo>
            <UserAvatar>A</UserAvatar>
            <UserDetails>
              <UserName>Anna Schmidt</UserName>
              <UserEmail>anna.schmidt@email.de</UserEmail>
            </UserDetails>
          </UserInfo>
        </MenuHeader>

        <MenuSection>
          {menuItems.slice(0, 4).map(item => (
            <MenuItem key={item.screen} onClick={() => handleMenuClick(item.screen)}>
              <MenuIcon>{item.icon}</MenuIcon>
              <MenuLabel>{item.label}</MenuLabel>
              {item.badge && <Badge>{item.badge}</Badge>}
            </MenuItem>
          ))}
        </MenuSection>

        <MenuSection>
          {menuItems.slice(4, 7).map(item => (
            <MenuItem key={item.screen} onClick={() => handleMenuClick(item.screen)}>
              <MenuIcon>{item.icon}</MenuIcon>
              <MenuLabel>{item.label}</MenuLabel>
              {item.badge && <Badge>{item.badge}</Badge>}
            </MenuItem>
          ))}
        </MenuSection>

        <MenuSection>
          {menuItems.slice(7).map(item => (
            <MenuItem key={item.screen} onClick={() => handleMenuClick(item.screen)}>
              <MenuIcon>{item.icon}</MenuIcon>
              <MenuLabel>{item.label}</MenuLabel>
              {item.badge && <Badge>{item.badge}</Badge>}
            </MenuItem>
          ))}
        </MenuSection>

        <VersionText>DermaGuide v1.0.0</VersionText>
      </MenuContainer>
    </>
  );
}

export default NavigationMenu;