import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Header from './components/layout/Header';
import Splash from './components/screens/Splash';
import Home from './components/screens/Home';
import Form from './components/screens/Form';
import Loading from './components/screens/Loading';
import Result from './components/screens/Result';
import Learning from './components/screens/Learning';
import Background3D from './components/ui/Background3D';
import ChatButton from './components/chatbot/ChatButton';
import ChatWindow from './components/chatbot/ChatWindow';
import { getAIResponse } from './services/aiService';
import './styles/global.css';

const App = () => {
  const [screen, setScreen] = useState('splash');
  const [userData, setUserData] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleSplashComplete = () => {
    setScreen('home');
  };

  const handleStart = () => {
    setScreen('form');
  };

  const handleFormSubmit = async (data) => {
    setUserData(data);
    setScreen('loading');
    try {
      const results = await getAIResponse(data);
      setRecommendations(results);
      setScreen('result');
    } catch (error) {
      console.error("AI Generation failed", error);
      alert("Something went wrong with the AI mentor. Please try again.");
      setScreen('form');
    }
  };

  const handleRegenerate = async () => {
    setScreen('loading');
    try {
      const results = await getAIResponse(userData);
      setRecommendations(results);
      setScreen('result');
    } catch (error) {
      alert("Failed to regenerate recommendations.");
      setScreen('result');
    }
  };

  const handleReset = () => {
    setScreen('home');
    setUserData(null);
    setRecommendations(null);
  };

  const handleStartLearning = () => {
    setScreen('learning');
  };

  const handleBackToResult = () => {
    setScreen('result');
  };

  const toggleChat = () => {
    setIsChatOpen(prev => !prev);
  };

  return (
    <div className="app">
      <Background3D />
      <AnimatePresence mode="wait">
        {screen === 'splash' ? (
          <Splash key="splash" onComplete={handleSplashComplete} />
        ) : (
          <div key="main-app" style={{ width: '100%' }}>
            <Header />
            <main className="main-content">
              {screen === 'home' && <Home key="home" onNext={handleStart} />}
              {screen === 'form' && <Form key="form" onSubmit={handleFormSubmit} />}
              {screen === 'loading' && <Loading key="loading" />}
              {screen === 'result' && recommendations && (
                <Result 
                  key="result"
                  userData={userData} 
                  recommendations={recommendations} 
                  onReset={handleReset} 
                  onRegenerate={handleRegenerate}
                  onStartLearning={handleStartLearning}
                />
              )}
              {screen === 'learning' && recommendations && (
                <Learning 
                  key="learning"
                  roadmap={recommendations.roadmap}
                  onBack={handleBackToResult}
                />
              )}
            </main>
          </div>
        )}
      </AnimatePresence>
      
      {/* Global AI Mentor Chatbot */}
      {screen !== 'splash' && (
        <>
          <ChatWindow isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
          <ChatButton isOpen={isChatOpen} onClick={toggleChat} />
        </>
      )}
    </div>
  );
};

export default App;
