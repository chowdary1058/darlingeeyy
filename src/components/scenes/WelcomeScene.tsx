import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Image as ImageIcon } from 'lucide-react';
import { audioService } from '../../utils/audioSynthesizer';
import { romanticConfig } from '../../config/romanticConfig';

interface WelcomeSceneProps {
  onNext: () => void;
}

export const WelcomeScene: React.FC<WelcomeSceneProps> = ({ onNext }) => {
  const [step, setStep] = useState<number>(0);
  const [imgError, setImgError] = useState<boolean>(false);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 600);   // "Look who's here... 🥹❤️"
    const t2 = setTimeout(() => setStep(2), 2200);  // "Welcome to your little surprise, Bangarammm...."
    const t3 = setTimeout(() => setStep(3), 4000);  // "Today, the world celebrates you..."
    const t4 = setTimeout(() => setStep(4), 5400);  // Button appears

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  const handleBegin = () => {
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
        padding: '30px 20px',
        position: 'relative',
        zIndex: 10,
        backgroundColor: '#09090F',
      }}
    >
      {/* Background Volumetric Aura */}
      <div
        style={{
          position: 'absolute',
          width: '550px',
          height: '550px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(216, 184, 121, 0.18) 0%, rgba(214, 40, 85, 0.22) 40%, transparent 75%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '640px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* Step 1 Greeting */}
        {step >= 1 && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="font-handwriting"
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.4rem)',
              color: '#D8B879',
              marginBottom: '16px',
            }}
          >
            {romanticConfig.welcome.heading}
          </motion.div>
        )}

        {/* Luxury Portrait Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'relative',
            marginBottom: '28px',
          }}
        >
          {/* Golden Ring Glow */}
          <div
            style={{
              position: 'absolute',
              inset: -8,
              borderRadius: '28px',
              background: 'linear-gradient(135deg, rgba(216, 184, 121, 0.6), rgba(214, 40, 85, 0.6))',
              filter: 'blur(12px)',
              opacity: 0.7,
            }}
          />

          <div
            className="glass-gold"
            style={{
              position: 'relative',
              padding: '12px',
              borderRadius: '24px',
              width: '260px',
              height: '310px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              boxShadow: '0 20px 45px rgba(0,0,0,0.6)',
            }}
          >
            {!imgError ? (
              <img
                src={romanticConfig.welcome.photoUrl}
                alt="Bangarammm.... Portrait"
                onError={() => setImgError(true)}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '16px',
                  transition: 'transform 0.5s ease',
                }}
              />
            ) : (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #15121C, #58172D)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#D8B879',
                  padding: '16px',
                }}
              >
                <ImageIcon size={40} style={{ marginBottom: '10px' }} />
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>My Dearest Maa</span>
                <span style={{ fontSize: '0.72rem', opacity: 0.7, marginTop: '4px' }}>
                  (Add photo to public/images/portrait-placeholder.jpg)
                </span>
              </div>
            )}

            {/* Corner Ornamental Heart */}
            <div
              style={{
                position: 'absolute',
                bottom: '16px',
                right: '16px',
                background: 'rgba(9, 9, 15, 0.75)',
                backdropFilter: 'blur(8px)',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(216, 184, 121, 0.4)',
              }}
            >
              <Heart size={18} fill="#D62855" color="#D62855" />
            </div>
          </div>
        </motion.div>

        {/* Step 2 Subheading */}
        {step >= 2 && (
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="font-serif-luxury"
            style={{
              fontSize: 'clamp(1.6rem, 3.8vw, 2.3rem)',
              color: '#FFF4E8',
              marginBottom: '12px',
              fontWeight: 700,
            }}
          >
            Welcome to your little surprise,{' '}
            <span className="text-shimmer-gold">{romanticConfig.partnerName}</span>
          </motion.h2>
        )}

        {/* Step 3 Emotional Message */}
        {step >= 3 && (
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="font-garamond"
            style={{
              fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)',
              color: 'rgba(255, 244, 232, 0.85)',
              maxWidth: '560px',
              marginBottom: '32px',
              fontStyle: 'italic',
              lineHeight: 1.6,
            }}
          >
            "{romanticConfig.welcome.message}"
          </motion.p>
        )}

        {/* Step 4 Let's Begin Button */}
        {step >= 4 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <button
              onClick={handleBegin}
              className="btn-primary"
              style={{
                fontSize: '1.1rem',
                padding: '16px 36px',
              }}
            >
              <Sparkles size={18} color="#FFF4E8" />
              <span>{romanticConfig.welcome.ctaButton}</span>
            </button>
          </motion.div>
        )}

        {/* Skip button for rapid accessibility */}
        {step < 4 && (
          <button
            onClick={() => setStep(4)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'rgba(255, 244, 232, 0.35)',
              fontSize: '0.8rem',
              cursor: 'pointer',
              marginTop: '20px',
            }}
          >
            Skip waiting →
          </button>
        )}
      </div>
    </div>
  );
};
