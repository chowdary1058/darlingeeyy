import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { SceneType } from './types';
import { ParticleCanvas } from './components/ParticleCanvas';
import { SceneNavigation } from './components/SceneNavigation';

// Individual Scenes
import { OpeningScene } from './components/scenes/OpeningScene';
import { PasswordScreen } from './components/scenes/PasswordScreen';
import { WelcomeScene } from './components/scenes/WelcomeScene';
import { LoveQuestions } from './components/scenes/LoveQuestions';
import { BirthdayReveal } from './components/scenes/BirthdayReveal';
import { LoveLetter } from './components/scenes/LoveLetter';
import { VirtualHug } from './components/scenes/VirtualHug';
import { MissYouScene } from './components/scenes/MissYouScene';
import { MemoryGallery } from './components/scenes/MemoryGallery';
import { FinalCelebration } from './components/scenes/FinalCelebration';

export const App: React.FC = () => {
  const [currentScene, setCurrentScene] = useState<SceneType>('opening');

  // Smooth scroll to top whenever scene changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentScene]);

  const handleSceneTransition = (nextScene: SceneType) => {
    setCurrentScene(nextScene);
  };

  const handleReplay = () => {
    setCurrentScene('opening');
  };

  return (
    <div className="app-container">
      {/* Background Cinematic Particles (Golden Dust, Floating Petals, Hearts) */}
      <ParticleCanvas />

      {/* Cinematic Vignette Overlay */}
      <div className="cinematic-vignette" />

      {/* Persistent Scene Chapter Progress Navigation */}
      <SceneNavigation
        currentScene={currentScene}
        onSelectScene={handleSceneTransition}
      />

      {/* Scene Content with Cinematic Transitions */}
      <main style={{ width: '100%', minHeight: '100vh', position: 'relative', zIndex: 10 }}>
        <AnimatePresence mode="wait">
          {currentScene === 'opening' && (
            <motion.div
              key="opening"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.8 }}
            >
              <OpeningScene onNext={() => handleSceneTransition('password')} />
            </motion.div>
          )}

          {currentScene === 'password' && (
            <motion.div
              key="password"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.7 }}
            >
              <PasswordScreen onUnlock={() => handleSceneTransition('welcome')} />
            </motion.div>
          )}

          {currentScene === 'welcome' && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.7 }}
            >
              <WelcomeScene onNext={() => handleSceneTransition('questions')} />
            </motion.div>
          )}

          {currentScene === 'questions' && (
            <motion.div
              key="questions"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.7 }}
            >
              <LoveQuestions onComplete={() => handleSceneTransition('reveal')} />
            </motion.div>
          )}

          {currentScene === 'reveal' && (
            <motion.div
              key="reveal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.9 }}
            >
              <BirthdayReveal onNext={() => handleSceneTransition('letter')} />
            </motion.div>
          )}

          {currentScene === 'letter' && (
            <motion.div
              key="letter"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8 }}
            >
              <LoveLetter onNext={() => handleSceneTransition('hug')} />
            </motion.div>
          )}

          {currentScene === 'hug' && (
            <motion.div
              key="hug"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.8 }}
            >
              <VirtualHug onNext={() => handleSceneTransition('miss_you')} />
            </motion.div>
          )}

          {currentScene === 'miss_you' && (
            <motion.div
              key="miss_you"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9 }}
            >
              <MissYouScene onNext={() => handleSceneTransition('gallery')} />
            </motion.div>
          )}

          {currentScene === 'gallery' && (
            <motion.div
              key="gallery"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8 }}
            >
              <MemoryGallery onNext={() => handleSceneTransition('final')} />
            </motion.div>
          )}

          {currentScene === 'final' && (
            <motion.div
              key="final"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <FinalCelebration onReplay={handleReplay} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default App;
