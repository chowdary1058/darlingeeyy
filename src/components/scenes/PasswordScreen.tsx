import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, Delete, RotateCcw, Sparkles, HelpCircle } from 'lucide-react';
import { audioService } from '../../utils/audioSynthesizer';
import { romanticConfig } from '../../config/romanticConfig';

interface PasswordScreenProps {
  onUnlock: () => void;
}

export const PasswordScreen: React.FC<PasswordScreenProps> = ({ onUnlock }) => {
  const [pin, setPin] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isShaking, setIsShaking] = useState<boolean>(false);
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);

  const targetCode = romanticConfig.password.code;

  const handleKeyPress = (num: string) => {
    audioService.playSoftClick();
    if (pin.length < 6) {
      const nextPin = pin + num;
      setPin(nextPin);
      setErrorMessage('');

      // Auto-unlock check if reaches code length
      if (nextPin === targetCode) {
        triggerSuccess();
      }
    }
  };

  const handleBackspace = () => {
    audioService.playSoftClick();
    setPin((prev) => prev.slice(0, -1));
    setErrorMessage('');
  };

  const handleClear = () => {
    audioService.playSoftClick();
    setPin('');
    setErrorMessage('');
  };

  const triggerSuccess = () => {
    setIsUnlocked(true);
    audioService.playMagicUnlock();
    setTimeout(() => {
      onUnlock();
    }, 1200);
  };

  const handleUnlockClick = () => {
    if (pin === targetCode) {
      triggerSuccess();
    } else {
      setIsShaking(true);
      audioService.playHeartbeat();
      setErrorMessage(`Almost there, ${romanticConfig.nickname}! Try our special date again. ❤️`);
      setTimeout(() => setIsShaking(false), 500);
    }
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
        padding: '24px',
        position: 'relative',
        zIndex: 10,
        backgroundColor: '#09090F',
      }}
    >
      {/* Deep Burgundy Glow Behind Card */}
      <div
        style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(88, 23, 45, 0.45) 0%, rgba(214, 40, 85, 0.15) 50%, transparent 75%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className={`glass-burgundy ${isShaking ? 'animate-shake' : ''}`}
        style={{
          width: '100%',
          maxWidth: '420px',
          padding: '36px 28px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Secret Lock Romantic Memory Photo */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '18px' }}>
          <div
            style={{
              position: 'relative',
              width: '120px',
              height: '120px',
              borderRadius: '24px',
              overflow: 'hidden',
              backgroundColor: '#15121C',
              border: '2px solid rgba(216, 184, 121, 0.55)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.6), 0 0 20px rgba(216, 184, 121, 0.25)',
            }}
          >
            <img
              src={romanticConfig.password.photoUrl || '/images/secret-lock.jpg'}
              alt="Secret Lock Memory"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>

        {/* Lock Status */}
        <div style={{ marginBottom: '14px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              fontSize: '0.8rem',
              color: isUnlocked ? '#D8B879' : 'rgba(255, 244, 232, 0.65)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(0, 0, 0, 0.3)',
              padding: '4px 12px',
              borderRadius: '999px',
              border: '1px solid rgba(216, 184, 121, 0.25)',
            }}
          >
            {isUnlocked ? <Unlock size={14} color="#D8B879" /> : <Lock size={14} color="#D8B879" />}
            <span>{isUnlocked ? 'Gate Unlocked' : 'Romantic Gate'}</span>
          </span>
        </div>

        {/* Heading */}
        <h2
          className="font-serif-luxury"
          style={{
            fontSize: 'clamp(1.5rem, 3.5vw, 1.85rem)',
            color: '#FFF4E8',
            marginBottom: '8px',
          }}
        >
          One Little Secret, {romanticConfig.nickname} 💌
        </h2>

        {/* Subtitle */}
        <p
          className="font-garamond"
          style={{
            fontSize: '1.05rem',
            color: 'rgba(255, 244, 232, 0.75)',
            marginBottom: '24px',
            fontStyle: 'italic',
          }}
        >
          Only someone who knows our special date can unlock this surprise.
        </p>

        {/* PIN Indicators (Hearts / Dots) */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '20px',
            minHeight: '36px',
          }}
        >
          {Array.from({ length: 4 }).map((_, idx) => {
            const hasDigit = idx < pin.length;
            return (
              <motion.div
                key={idx}
                animate={hasDigit ? { scale: [1, 1.3, 1] } : { scale: 1 }}
                style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  backgroundColor: hasDigit ? '#D62855' : 'rgba(255, 244, 232, 0.15)',
                  border: hasDigit ? '2px solid #D8B879' : '1px solid rgba(216, 184, 121, 0.3)',
                  boxShadow: hasDigit ? '0 0 10px rgba(214, 40, 85, 0.6)' : 'none',
                  transition: 'all 0.25s ease',
                }}
              />
            );
          })}
        </div>

        {/* Error / Encouragement Feedback */}
        <AnimatePresence>
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{
                color: '#F5B7C8',
                fontSize: '0.88rem',
                marginBottom: '16px',
                fontWeight: 500,
              }}
            >
              {errorMessage}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Numeric Keypad */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '12px',
            marginBottom: '20px',
          }}
        >
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
            <button
              key={digit}
              onClick={() => handleKeyPress(digit)}
              className="glass-panel"
              style={{
                padding: '16px',
                fontSize: '1.35rem',
                fontWeight: 600,
                color: '#FFF4E8',
                cursor: 'pointer',
                borderRadius: '14px',
                transition: 'all 0.15s ease',
                border: '1px solid rgba(216, 184, 121, 0.18)',
              }}
              onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.94)')}
              onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              {digit}
            </button>
          ))}

          {/* Clear Button */}
          <button
            onClick={handleClear}
            className="glass-panel"
            style={{
              padding: '16px',
              fontSize: '0.9rem',
              color: 'rgba(255, 244, 232, 0.7)',
              cursor: 'pointer',
              borderRadius: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(216, 184, 121, 0.15)',
            }}
            title="Clear"
            aria-label="Clear PIN"
          >
            <RotateCcw size={18} />
          </button>

          {/* 0 Button */}
          <button
            onClick={() => handleKeyPress('0')}
            className="glass-panel"
            style={{
              padding: '16px',
              fontSize: '1.35rem',
              fontWeight: 600,
              color: '#FFF4E8',
              cursor: 'pointer',
              borderRadius: '14px',
              border: '1px solid rgba(216, 184, 121, 0.18)',
            }}
            onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.94)')}
            onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            0
          </button>

          {/* Backspace Button */}
          <button
            onClick={handleBackspace}
            className="glass-panel"
            style={{
              padding: '16px',
              color: 'rgba(255, 244, 232, 0.7)',
              cursor: 'pointer',
              borderRadius: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(216, 184, 121, 0.15)',
            }}
            title="Backspace"
            aria-label="Backspace"
          >
            <Delete size={20} />
          </button>
        </div>

        {/* Enter / Unlock Action Button */}
        <button
          onClick={handleUnlockClick}
          className="btn-gold"
          style={{
            width: '100%',
            padding: '14px',
            fontSize: '1.05rem',
            marginBottom: '16px',
          }}
        >
          <Sparkles size={18} color="#09090F" />
          <span>Unlock Surprise 💖</span>
        </button>

        {/* Playful Hint Toggle */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => setShowHint(!showHint)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'rgba(216, 184, 121, 0.8)',
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              textDecoration: 'underline',
            }}
          >
            <HelpCircle size={14} />
            <span>{showHint ? 'Hide Hint' : 'Need a hint, Maa? 💭'}</span>
          </button>

          {showHint && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              style={{
                fontSize: '0.82rem',
                color: 'rgba(255, 244, 232, 0.75)',
                background: 'rgba(0, 0, 0, 0.35)',
                padding: '8px 14px',
                borderRadius: '8px',
                border: '1px solid rgba(216, 184, 121, 0.2)',
              }}
            >
              Default Code: <strong>{romanticConfig.password.code}</strong> ({romanticConfig.password.hint})
            </motion.div>
          )}

          <span style={{ fontSize: '0.72rem', color: 'rgba(255, 244, 232, 0.45)' }}>
            Playful romantic gate • Configurable in src/config/romanticConfig.ts
          </span>
        </div>
      </motion.div>
    </div>
  );
};
