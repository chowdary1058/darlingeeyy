import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Moon, Star, Camera, Heart } from 'lucide-react';
import { audioService } from '../../utils/audioSynthesizer';
import { romanticConfig } from '../../config/romanticConfig';

interface MissYouSceneProps {
  onNext: () => void;
}

export const MissYouScene: React.FC<MissYouSceneProps> = ({ onNext }) => {
  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 600);   // "Sometimes, all I want..."
    const t2 = setTimeout(() => setStep(2), 2400);  // "...is to be right there beside you, Maa."
    const t3 = setTimeout(() => setStep(3), 4200);  // "I wish I could see your smile..."
    const t4 = setTimeout(() => setStep(4), 6000);  // "Until then, let this little surprise..."
    const t5 = setTimeout(() => setStep(5), 7200);  // Button appears

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, []);

  const handleNext = () => {
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
        padding: '50px 20px',
        position: 'relative',
        zIndex: 10,
        backgroundColor: '#09090F',
      }}
    >
      {/* Deep Celestial Glow */}
      <div
        style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(30, 25, 55, 0.6) 0%, rgba(88, 23, 45, 0.25) 50%, transparent 80%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
        }}
      />

      {/* Moon Crescent & Floating Starlight */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
        style={{
          position: 'relative',
          marginBottom: '32px',
        }}
      >
        <div
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(216, 184, 121, 0.2), rgba(21, 18, 28, 0.8))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(216, 184, 121, 0.35)',
            boxShadow: '0 0 35px rgba(216, 184, 121, 0.3)',
          }}
        >
          <Moon size={38} color="#D8B879" />
        </div>

        {/* Orbiting Stars */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            inset: -20,
            pointerEvents: 'none',
          }}
        >
          <Star size={14} color="#FFF4E8" style={{ position: 'absolute', top: 0, left: '50%' }} />
          <Star size={12} color="#D8B879" style={{ position: 'absolute', bottom: '10%', left: '10%' }} />
        </motion.div>
      </motion.div>

      {/* Narrative Sequence */}
      <div style={{ maxWidth: '640px', width: '100%', minHeight: '220px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
        
        {step >= 1 && (
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="font-garamond"
            style={{
              fontSize: 'clamp(1.25rem, 2.8vw, 1.6rem)',
              color: 'rgba(255, 244, 232, 0.75)',
              fontStyle: 'italic',
            }}
          >
            "Sometimes, all I want..."
          </motion.p>
        )}

        {step >= 2 && (
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="font-serif-luxury"
            style={{
              fontSize: 'clamp(1.75rem, 4.2vw, 2.6rem)',
              fontWeight: 700,
              lineHeight: 1.35,
            }}
          >
            <span className="text-shimmer-rose">...is to be right there beside you, </span>
            <span style={{ color: '#D8B879' }}>{romanticConfig.nickname}.</span>
          </motion.h2>
        )}

        {step >= 3 && (
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="font-garamond"
            style={{
              fontSize: 'clamp(1.15rem, 2.5vw, 1.4rem)',
              color: 'rgba(255, 244, 232, 0.9)',
              lineHeight: 1.6,
              fontStyle: 'italic',
            }}
          >
            "I wish I could see your smile, hear your laugh, and make this birthday even more special for you."
          </motion.p>
        )}

        {step >= 4 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="font-sans"
            style={{
              fontSize: 'clamp(1.05rem, 2.2vw, 1.25rem)',
              color: '#F5B7C8',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginTop: '6px',
            }}
          >
            <Heart size={18} fill="#D62855" color="#D62855" />
            <span>Until then, let this little surprise remind you that you are loved. ❤️</span>
          </motion.div>
        )}
      </div>

      {/* Button to Memories Gallery */}
      {step >= 5 && (
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ marginTop: '42px' }}
        >
          <button
            onClick={handleNext}
            className="btn-gold"
            style={{
              padding: '16px 36px',
              fontSize: '1.08rem',
            }}
          >
            <Camera size={20} color="#09090F" />
            <span>{romanticConfig.missYou.ctaButton}</span>
          </button>
        </motion.div>
      )}

      {/* Skip button for rapid preview */}
      {step < 5 && (
        <button
          onClick={() => setStep(5)}
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
