import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import * as tf from '@tensorflow/tfjs';

// Import aller Screens
import OnboardingScreen from './components/OnboardingScreen';
import HomeScreen from './components/HomeScreen';
import CaptureScreen from './components/CaptureScreen';
import AnalysisScreen from './components/AnalysisScreen';
import ResultsScreen from './components/ResultsScreen';
import ProfileScreen from './components/ProfileScreen';
import SettingsScreen from './components/SettingsScreen';
import ChangelogScreen from './components/ChangelogScreen';
import RemindersScreen from './components/RemindersScreen';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--color-background);
  max-width: 500px;
  margin: 0 auto;
  box-shadow: 0 0 20px rgba(0,0,0,0.1);
  position: relative;
  overflow: hidden;
`;

// Loading Screen für initiales Laden
const LoadingScreen = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

const AppLogo = styled.div`
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, var(--color-primary-blue), var(--color-info));
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  margin-bottom: 24px;
  animation: pulse 1.5s ease-in-out infinite;
`;

const AppName = styled.h1`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 8px;
`;

const AppTagline = styled.p`
  font-size: 16px;
  color: var(--color-text-secondary);
`;

// Die Labels, die zum model.json passen
const classLabels = [
  'Actinic Keratoses', 'Basal Cell Carcinoma', 'Benign Keratosis-like Lesions',
  'Dermatofibroma', 'Melanoma', 'Melanocytic Nevi', 'Vascular Lesions'
];
const highRiskLabels = ['Melanoma', 'Basal Cell Carcinoma', 'Actinic Keratoses'];

// Erweiterte Mock-Daten mit realistischeren Werten
const getMockScanHistory = () => [
    { 
      id: 1, 
      date: '2025-07-28', 
      riskLevel: 'low', 
      riskValue: 12, 
      thumbnail: 'https://placehold.co/100x100/34c759/FFFFFF?text=L',
      location: 'Linker Unterarm',
      notes: 'Regelmäßiger Check'
    },
    { 
      id: 2, 
      date: '2025-06-15', 
      riskLevel: 'medium', 
      riskValue: 68, 
      thumbnail: 'https://placehold.co/100x100/ff9500/FFFFFF?text=M',
      location: 'Schulter rechts',
      notes: 'Zur Beobachtung'
    },
    { 
      id: 3, 
      date: '2025-04-02', 
      riskLevel: 'low', 
      riskValue: 25, 
      thumbnail: 'https://placehold.co/100x100/34c759/FFFFFF?text=L',
      location: 'Rücken',
      notes: 'Alles in Ordnung'
    },
];

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [screen, setScreen] = useState('onboarding');
  const [previousScreen, setPreviousScreen] = useState(null);
  const [scanHistory, setScanHistory] = useState(getMockScanHistory());
  const [analysisResult, setAnalysisResult] = useState(null);
  const [model, setModel] = useState(null);
  const fileInputRef = useRef(null);

  // Check if user has completed onboarding
  useEffect(() => {
    const checkOnboarding = () => {
      const hasCompletedOnboarding = localStorage.getItem('dermaguide_onboarding_completed');
      if (hasCompletedOnboarding === 'true') {
        setScreen('home');
      }
      setTimeout(() => setIsLoading(false), 1500);
    };
    
    checkOnboarding();
    tf.setBackend('webgl').then(() => loadModel());
  }, []);

  const loadModel = async () => {
    try {
      const loadedModel = await tf.loadLayersModel('/model/model.json');
      setModel(loadedModel);
      console.log('TensorFlow model loaded successfully.');
    } catch (error) {
      console.error('Error loading model:', error);
      // App funktioniert auch ohne Modell (mit Mock-Daten)
    }
  };

  const handleImageCapture = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setScreen('analysis');
        analyzeImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const preprocessImage = (imageUrl) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const tensor = tf.browser.fromPixels(img)
          .resizeBilinear([224, 224]).toFloat().div(255.0).expandDims(0);
        resolve(tensor);
      };
      img.src = imageUrl;
    });
  };

  const analyzeImage = async (imageUrl) => {
    if (!model) {
      // Simuliere Ergebnis ohne geladenes Modell für Prototyping
      await new Promise(resolve => setTimeout(resolve, 2000));
      const mockPrediction = [0.05, 0.1, 0.15, 0.05, 0.2, 0.4, 0.05];
      processResults(mockPrediction, imageUrl);
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const tensor = await preprocessImage(imageUrl);
      const outputTensor = model.predict(tensor);
      const predictionArray = await outputTensor.data();
      tensor.dispose();
      outputTensor.dispose();
      processResults(predictionArray, imageUrl);
    } catch (error) {
      console.error('Error analyzing image:', error);
      setScreen('home');
    }
  };

  const processResults = (predictionArray, imageUrl) => {
      let riskValue = 0;
      const resultsWithLabels = classLabels.map((label, index) => {
        const confidence = predictionArray[index];
        if (highRiskLabels.includes(label)) {
            riskValue += confidence;
        }
        return { label, confidence };
      });

      riskValue = Math.round(riskValue * 100);
      let riskLevel = 'low';
      if (riskValue > 85) riskLevel = 'high';
      else if (riskValue > 60) riskLevel = 'medium';

      // Wenn die höchste Konfidenz unter 50% liegt -> "Low Confidence"
      const topConfidence = Math.max(...predictionArray);
      if (topConfidence < 0.5) {
        riskLevel = 'low_confidence';
      }

      setAnalysisResult({
        riskValue,
        riskLevel,
        predictions: resultsWithLabels.sort((a, b) => b.confidence - a.confidence),
        imagePreview: imageUrl,
        // Erweiterte Explainability-Daten
        explainability: {
            gradCamImage: `https://placehold.co/300x300/000000/FFFFFF?text=Heatmap`,
            abcd: [
                { feature: 'Asymmetrie', value: 'Hoch', reason: 'Die Läsion ist in beiden Achsen ungleichmäßig verteilt.' },
                { feature: 'Begrenzung', value: 'Unscharf', reason: 'Die Ränder sind nicht klar definiert und zeigen Unregelmäßigkeiten.' },
                { feature: 'Farbe', value: 'Mehrfarbig', reason: 'Es wurden verschiedene Brauntöne und dunkle Bereiche erkannt.' },
                { feature: 'Durchmesser', value: '> 6mm', reason: 'Der geschätzte Durchmesser überschreitet den kritischen Grenzwert.' },
            ]
        }
      });
      
      // Füge neuen Scan zur Historie hinzu
      const newScan = {
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        riskLevel,
        riskValue,
        thumbnail: imageUrl,
        location: 'Neue Aufnahme',
        notes: ''
      };
      
      setScanHistory(prev => [newScan, ...prev]);
      setScreen('results');
  };

  const navigate = (targetScreen) => {
    setPreviousScreen(screen);
    setAnalysisResult(null);
    setScreen(targetScreen);
  };

  const handleBack = () => {
    if (previousScreen) {
      setScreen(previousScreen);
      setPreviousScreen(null);
    } else {
      setScreen('home');
    }
  };

  const completeOnboarding = () => {
    localStorage.setItem('dermaguide_onboarding_completed', 'true');
    navigate('home');
  };

  const renderScreen = () => {
    switch (screen) {
      case 'onboarding':
        return <OnboardingScreen onFinish={completeOnboarding} />;
      case 'home':
        return <HomeScreen 
          scanHistory={scanHistory} 
          onNewScan={() => navigate('capture')} 
          onNavigate={navigate}
        />;
      case 'capture':
        return <CaptureScreen 
          onCapture={handleImageCapture} 
          onBack={() => navigate('home')} 
        />;
      case 'analysis':
        return <AnalysisScreen />;
      case 'results':
        return <ResultsScreen 
          result={analysisResult} 
          onDone={() => navigate('home')} 
        />;
      case 'profile':
        return <ProfileScreen onBack={handleBack} />;
      case 'settings':
        return <SettingsScreen onBack={handleBack} />;
      case 'reminders':
        return <RemindersScreen onBack={handleBack} />;
      case 'changelog':
        return <ChangelogScreen onBack={handleBack} />;
      case 'privacy':
        return (
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <h2>Datenschutz</h2>
            <p>Datenschutzrichtlinien (Demo)</p>
            <button onClick={handleBack}>Zurück</button>
          </div>
        );
      case 'help':
        return (
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <h2>Hilfe & Support</h2>
            <p>support@dermaguide.de</p>
            <button onClick={handleBack}>Zurück</button>
          </div>
        );
      default:
        return <HomeScreen 
          scanHistory={scanHistory} 
          onNewScan={() => navigate('capture')} 
          onNavigate={navigate}
        />;
    }
  };

  if (isLoading) {
    return (
      <AppContainer>
        <LoadingScreen>
          <AppLogo>🔬</AppLogo>
          <AppName>DermaGuide</AppName>
          <AppTagline>Ihr KI-Hautanalyse-Assistent</AppTagline>
        </LoadingScreen>
      </AppContainer>
    );
  }

  return <AppContainer>{renderScreen()}</AppContainer>;
}

export default App;