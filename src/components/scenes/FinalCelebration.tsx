import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, RotateCcw } from 'lucide-react';
import { audioService } from '../../utils/audioSynthesizer';
import { romanticConfig } from '../../config/romanticConfig';

interface FinalCelebrationProps {
  onReplay: () => void;
}

export const FinalCelebration: React.FC<FinalCelebrationProps> = ({ onReplay }) => {
  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    // Grand finale timeline
    const t1 = setTimeout(() => setStep(1), 800);   // "Bangarammm.... ❤️"
    const t2 = setTimeout(() => setStep(2), 2600);  // "Of all the little things life gives us..."
    const t3 = setTimeout(() => setStep(3), 4800);  // "Today, tomorrow, and on every birthday to come..."
    const t4 = setTimeout(() => {
      setStep(4); // "Happy Birthday, Maa. ❤️"
      launchGrandFinaleConfetti();
    }, 7000);
    const t5 = setTimeout(() => setStep(5), 9000);  // "With love, always... — Sai"
    const t6 = setTimeout(() => setStep(6), 10800); // "FOREVER US ❤️" & Replay button

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
    };
  }, []);

  const launchGrandFinaleConfetti = () => {
    // Left & Right celebratory firework cannons
    const end = Date.now() + 2.5 * 1000;
    const colors = ['#D8B879', '#D62855', '#FFF4E8', '#FF4D79'];

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  const handleReplayClick = () => {
    audioService.playChime();
    onReplay();
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
        padding: '60px 20px',
        position: 'relative',
        zIndex: 10,
        backgroundColor: '#09090F',
      }}
    >
      {/* Background Volumetric Aura */}
      <motion.div
        animate={{ scale: [1, 1.25, 1], opacity: [0.25, 0.55, 0.35] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          width: '650px',
          height: '650px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(214, 40, 85, 0.35) 0%, rgba(216, 184, 121, 0.25) 45%, transparent 75%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
        }}
      />

      {/* Central Pulsing Glowing Heart */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.4 }}
        style={{ marginBottom: '32px', position: 'relative' }}
      >
        <div className="animate-heart-pulse">
          <Heart size={68} fill="#D62855" color="#D62855" className="glow-heart" />
        </div>

        {/* Ambient Ring */}
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{
            position: 'absolute',
            inset: -14,
            borderRadius: '50%',
            border: '1px solid rgba(216, 184, 121, 0.4)',
            pointerEvents: 'none',
          }}
        />
      </motion.div>

      {/* Narrative Sequence */}
      <div style={{ maxWidth: '720px', width: '100%', minHeight: '300px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* Line 1: Partner Name */}
        {step >= 1 && (
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="font-serif-luxury"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.2rem)',
              fontWeight: 700,
            }}
          >
            <span className="text-shimmer-gold">{romanticConfig.finalCelebration.partnerName}</span>
          </motion.h2>
        )}

        {/* Line 2: Grateful moments */}
        {step >= 2 && (
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1 }}
            className="font-garamond"
            style={{
              fontSize: 'clamp(1.2rem, 2.7vw, 1.55rem)',
              color: 'rgba(255, 244, 232, 0.9)',
              lineHeight: 1.6,
              fontStyle: 'italic',
            }}
          >
            "{romanticConfig.finalCelebration.lines[0]}"
          </motion.p>
        )}

        {/* Line 3: Reasons to smile */}
        {step >= 3 && (
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1 }}
            className="font-garamond"
            style={{
              fontSize: 'clamp(1.2rem, 2.7vw, 1.55rem)',
              color: 'rgba(255, 244, 232, 0.9)',
              lineHeight: 1.6,
              fontStyle: 'italic',
            }}
          >
            "{romanticConfig.finalCelebration.lines[1]}"
          </motion.p>
        )}

        {/* Line 4: Happy Birthday, Maa. ❤️ */}
        {step >= 4 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            className="font-serif-luxury"
            style={{
              fontSize: 'clamp(2.2rem, 5.5vw, 3.6rem)',
              color: '#D62855',
              fontWeight: 700,
              textShadow: '0 0 30px rgba(214, 40, 85, 0.7)',
              marginTop: '10px',
            }}
          >
            {romanticConfig.finalCelebration.wishes}
          </motion.div>
        )}

        {/* Line 5: Sign off from Sai */}
        {step >= 5 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="font-handwriting"
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
              color: '#D8B879',
              marginTop: '10px',
            }}
          >
            {romanticConfig.finalCelebration.signOff}{' '}
            <span style={{ color: '#FFF4E8' }}>{romanticConfig.finalCelebration.sender}</span>
          </motion.div>
        )}

        {/* Line 6: Cute Couple Emblem + FOREVER US ❤️ */}
        {step >= 6 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            style={{
              marginTop: '20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            {/* Cute Couple Cats Badge */}
            <div
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '24px',
                overflow: 'hidden',
                backgroundColor: '#FFF4E8',
                border: '2px solid rgba(216, 184, 121, 0.5)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.6), 0 0 25px rgba(216, 184, 121, 0.35)',
                padding: '4px',
              }}
            >
              <img
                src="/images/cute-couple-cats.png"
                alt="Sai & Maa Forever"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '20px',
                }}
              />
            </div>

            <div
              className="font-cinzel"
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.4rem)',
                letterSpacing: '0.2em',
                fontWeight: 900,
              }}
            >
              <span className="text-shimmer-gold">{romanticConfig.finalCelebration.celebrationText}</span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Replay Button */}
      {step >= 6 && (
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ marginTop: '48px' }}
        >
          <button
            onClick={handleReplayClick}
            className="btn-outline"
            style={{
              padding: '16px 36px',
              fontSize: '1.05rem',
              borderColor: 'rgba(216, 184, 121, 0.5)',
              backgroundColor: 'rgba(21, 18, 28, 0.8)',
            }}
          >
            <RotateCcw size={18} color="#D8B879" />
            <span>{romanticConfig.finalCelebration.replayButton}</span>
          </button>
        </motion.div>
      )}

      {/* Skip button for fast viewing */}
      {step < 6 && (
        <button
          onClick={() => {
            setStep(6);
            launchGrandFinaleConfetti();
          }}
          style={{
            position: 'absolute',
            bottom: '24px',
            background: 'transparent',
            border: 'none',
            color: 'rgba(255, 244, 232, 0.3)',
            fontSize: '0.8rem',
            cursor: 'pointer',
          }}
        >
          Skip waiting →
        </button>
      )}
    </div>
  );
};
