import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { audioService } from '../../utils/audioSynthesizer';
import { romanticConfig } from '../../config/romanticConfig';

interface OpeningSceneProps {
  onNext: () => void;
}

export const OpeningScene: React.FC<OpeningSceneProps> = ({ onNext }) => {
  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    // Cinematic timeline reveals
    const timer1 = setTimeout(() => setStep(1), 800);  // "Some surprises are made for the world..."
    const timer2 = setTimeout(() => setStep(2), 2600); // "But this one is only for you, Maa. ❤️"
    const timer3 = setTimeout(() => setStep(3), 4400); // "Made with all my love, by Sai."
    const timer4 = setTimeout(() => setStep(4), 5800); // Button appears

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  const handleEnter = () => {
    audioService.playChime();
    onNext();
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '24px',
        position: 'relative',
        zIndex: 10,
        backgroundColor: '#09090F',
      }}
    >
      {/* Background Volumetric Aura */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: [0.15, 0.35, 0.2], scale: [0.9, 1.15, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          width: '450px',
          height: '450px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(214, 40, 85, 0.25) 0%, rgba(216, 184, 121, 0.1) 40%, transparent 70%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }}
      />

      {/* Central Pulsing Heart */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ marginBottom: '32px', position: 'relative' }}
      >
        <div className="animate-heart-pulse">
          <Heart
            size={56}
            fill="#D62855"
            color="#D62855"
            className="glow-heart"
          />
        </div>

        {/* Ambient Ring */}
        <motion.div
          animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3.2, repeat: Infinity }}
          style={{
            position: 'absolute',
            inset: -12,
            borderRadius: '50%',
            border: '1px solid rgba(216, 184, 121, 0.35)',
            pointerEvents: 'none',
          }}
        />
      </motion.div>

      {/* Narrative Typography Revealed Step by Step */}
      <div style={{ maxWidth: '680px', minHeight: '180px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {step >= 1 && (
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="font-garamond"
            style={{
              fontSize: 'clamp(1.15rem, 2.5vw, 1.45rem)',
              color: 'rgba(255, 244, 232, 0.75)',
              letterSpacing: '0.04em',
              fontStyle: 'italic',
            }}
          >
            "Some surprises are made for the world..."
          </motion.p>
        )}

        {step >= 2 && (
          <motion.h1
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.4 }}
            className="font-serif-luxury"
            style={{
              fontSize: 'clamp(1.8rem, 4.5vw, 2.8rem)',
              fontWeight: 700,
              lineHeight: 1.3,
            }}
          >
            <span className="text-shimmer-rose">But this one is only for you, </span>
            <span style={{ color: '#D8B879' }}>{romanticConfig.nickname}. ❤️</span>
          </motion.h1>
        )}

        {step >= 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="font-handwriting"
            style={{
              fontSize: 'clamp(1.5rem, 3.2vw, 2.1rem)',
              color: '#D8B879',
              marginTop: '4px',
            }}
          >
            Made with all my love, by {romanticConfig.yourName}.
          </motion.div>
        )}
      </div>

      {/* Softly Glowing Entrance Button */}
      {step >= 4 && (
        <motion.div
          initial={{ opacity: 0, y: 25, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          style={{ marginTop: '40px' }}
        >
          <button
            onClick={handleEnter}
            className="btn-primary"
            style={{
              fontSize: '1.1rem',
              padding: '16px 36px',
            }}
          >
            <Sparkles size={18} color="#FFF4E8" />
            <span>Enter Our Little World ✨</span>
          </button>
        </motion.div>
      )}

      {/* Skip/Fast forward for accessibility */}
      {step < 4 && (
        <button
          onClick={() => setStep(4)}
          style={{
            position: 'absolute',
            bottom: '24px',
            background: 'transparent',
            border: 'none',
            color: 'rgba(255, 244, 232, 0.4)',
            fontSize: '0.8rem',
            cursor: 'pointer',
          }}
        >
          Skip Intro →
        </button>
      )}
    </div>
  );
};
