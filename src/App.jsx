import React, { useState } from 'react';
import Header from './components/layout/Header';
import Splash from './components/screens/Splash';
import Home from './components/screens/Home';
import Form from './components/screens/Form';
import Loading from './components/screens/Loading';
import Result from './components/screens/Result';
import { getRecommendations } from './utils/recommender';
import './styles/global.css';

const App = () => {
  const [screen, setScreen] = useState('splash');
  const [userData, setUserData] = useState(null);
  const [recommendations, setRecommendations] = useState(null);

  const handleSplashComplete = () => {
    setScreen('home');
  };

  const handleStart = () => {
    setScreen('form');
  };

  const handleFormSubmit = (data) => {
    setUserData(data);
    setScreen('loading');
  };

  const handleLoadingComplete = () => {
    const results = getRecommendations(userData.interest, userData.level, userData.goal, userData.commitment);
    setRecommendations(results);
    setScreen('result');
  };

  const handleRegenerate = () => {
    // Re-run the recommender to get fresh randomized results
    const results = getRecommendations(userData.interest, userData.level, userData.goal, userData.commitment);
    setRecommendations(results);
  };

  const handleReset = () => {
    setScreen('home');
    setUserData(null);
    setRecommendations(null);
  };

  return (
    <div className="app">
      {screen === 'splash' ? (
        <Splash onComplete={handleSplashComplete} />
      ) : (
        <>
          <Header />
          <main className="main-content">
            {screen === 'home' && <Home onNext={handleStart} />}
            {screen === 'form' && <Form onSubmit={handleFormSubmit} />}
            {screen === 'loading' && <Loading onComplete={handleLoadingComplete} />}
            {screen === 'result' && recommendations && (
              <Result 
                userData={userData} 
                recommendations={recommendations} 
                onReset={handleReset} 
                onRegenerate={handleRegenerate}
              />
            )}
          </main>
        </>
      )}
    </div>
  );
};

export default App;
