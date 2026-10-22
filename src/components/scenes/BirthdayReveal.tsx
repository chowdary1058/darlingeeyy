import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Flame, Mail, Image as ImageIcon } from 'lucide-react';
import { audioService } from '../../utils/audioSynthesizer';
import { romanticConfig } from '../../config/romanticConfig';

interface BirthdayRevealProps {
  onNext: () => void;
}

export const BirthdayReveal: React.FC<BirthdayRevealProps> = ({ onNext }) => {
  const [candlesBlown, setCandlesBlown] = useState<boolean>(false);
  const [imgError, setImgError] = useState<boolean>(false);

  useEffect(() => {
    // Initial celebratory fireworks / confetti burst
    const launchConfetti = () => {
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#D62855', '#D8B879', '#FFF4E8', '#F5B7C8'],
      });
    };

    launchConfetti();
    const timer = setTimeout(launchConfetti, 1200);

    return () => clearTimeout(timer);
  }, []);

  const handleBlowCandles = () => {
    audioService.playBlowCandle();
    setCandlesBlown(true);

    // Bigger celebratory golden burst
    confetti({
      particleCount: 120,
      spread: 120,
      origin: { y: 0.5 },
      colors: ['#D8B879', '#FFD700', '#D62855', '#FFFFFF'],
    });
  };

  const handleProceed = () => {
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
      {/* Background Golden / Crimson Glow */}
      <div
        style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(216, 184, 121, 0.2) 0%, rgba(88, 23, 45, 0.4) 50%, transparent 75%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '780px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* Dedication Line */}
        <motion.p
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="font-handwriting"
          style={{
            fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
            color: '#D8B879',
            marginBottom: '6px',
          }}
        >
          {romanticConfig.birthdayReveal.dedication}
        </motion.p>

        {/* Main Grand Birthday Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{ marginBottom: '24px' }}
        >
          <h1
            className="font-cinzel"
            style={{
              fontSize: 'clamp(2rem, 5.5vw, 3.8rem)',
              letterSpacing: '0.12em',
              fontWeight: 900,
              lineHeight: 1.15,
            }}
          >
            <span className="text-shimmer-gold">{romanticConfig.birthdayReveal.mainHeading}</span>
          </h1>

          <div
            className="font-serif-luxury"
            style={{
              fontSize: 'clamp(1.8rem, 4.5vw, 3rem)',
              color: '#D62855',
              fontWeight: 700,
              marginTop: '4px',
              textShadow: '0 0 25px rgba(214, 40, 85, 0.6)',
            }}
          >
            {romanticConfig.birthdayReveal.partnerTitle}
          </div>
        </motion.div>

        {/* Center Stage: Interactive Birthday Cake + Portrait Gallery */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '24px',
            marginBottom: '32px',
            width: '100%',
          }}
        >
          {/* Replaceable Portrait Frame */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="glass-burgundy"
            style={{
              padding: '10px',
              borderRadius: '22px',
              width: '210px',
              height: '260px',
              position: 'relative',
              boxShadow: '0 15px 40px rgba(0,0,0,0.5)',
            }}
          >
            {!imgError ? (
              <img
                src={romanticConfig.birthdayReveal.photoUrl}
                alt="Birthday Girl Bangarammm...."
                onError={() => setImgError(true)}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '16px',
                }}
              />
            ) : (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '16px',
                  background: '#15121C',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#D8B879',
                }}
              >
                <ImageIcon size={36} />
                <span style={{ fontSize: '0.8rem', marginTop: '6px' }}>Maa ❤️</span>
              </div>
            )}
            <div
              style={{
                position: 'absolute',
                top: '-10px',
                right: '-10px',
                background: '#D62855',
                color: '#FFF',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 15px rgba(214, 40, 85, 0.8)',
              }}
            >
              👑
            </div>
          </motion.div>

          {/* Interactive Birthday Cake Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="glass-gold"
            style={{
              padding: '24px 20px',
              borderRadius: '22px',
              width: '280px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              boxShadow: '0 15px 40px rgba(0,0,0,0.5)',
            }}
          >
            {/* SVG Interactive Birthday Cake */}
            <div style={{ position: 'relative', width: '180px', height: '160px', marginBottom: '12px' }}>
              <svg viewBox="0 0 200 180" width="100%" height="100%">
                {/* Cake Plate */}
                <ellipse cx="100" cy="165" rx="85" ry="12" fill="#D8B879" opacity="0.6" />
                <ellipse cx="100" cy="162" rx="80" ry="10" fill="#FFF4E8" opacity="0.8" />

                {/* Bottom Tier */}
                <path d="M 35 125 C 35 145, 165 145, 165 125 L 165 155 C 165 170, 35 170, 35 155 Z" fill="#58172D" />
                <ellipse cx="100" cy="125" rx="65" ry="14" fill="#8C2548" />

                {/* Bottom Tier Frosting Drips */}
                <path d="M 35 125 Q 50 140, 65 127 Q 80 142, 100 128 Q 120 142, 140 127 Q 155 140, 165 125" stroke="#FFF4E8" strokeWidth="4" fill="none" />

                {/* Top Tier */}
                <path d="M 55 85 C 55 102, 145 102, 145 85 L 145 115 C 145 128, 55 128, 55 115 Z" fill="#D62855" />
                <ellipse cx="100" cy="85" rx="45" ry="11" fill="#FF4D79" />

                {/* Gold beads */}
                {[65, 80, 100, 120, 135].map((cx, i) => (
                  <circle key={i} cx={cx} cy={88} r="3" fill="#D8B879" />
                ))}

                {/* 3 Candles */}
                {[75, 100, 125].map((candleX, idx) => (
                  <g key={idx}>
                    {/* Candle body */}
                    <rect x={candleX - 3} y="45" width="6" height="35" rx="2" fill="#FFF4E8" />
                    <line x1={candleX} y1="42" x2={candleX} y2="45" stroke="#333" strokeWidth="1.5" />

                    {/* Flame (Only if not blown) */}
                    {!candlesBlown ? (
                      <g className="animate-flicker">
                        <ellipse cx={candleX} cy="35" rx="4" ry="8" fill="#FFD700" className="glow-candle" />
                        <ellipse cx={candleX} cy="36" rx="2" ry="4" fill="#FF4500" />
                      </g>
                    ) : (
                      // Smoke puff after blowing
                      <circle cx={candleX} cy="38" r="3" fill="rgba(255,255,255,0.4)" />
                    )}
                  </g>
                ))}
              </svg>
            </div>

            {/* Cake Interaction prompt */}
            {!candlesBlown ? (
              <button
                onClick={handleBlowCandles}
                className="btn-primary"
                style={{
                  padding: '10px 18px',
                  fontSize: '0.9rem',
                  gap: '6px',
                }}
              >
                <Flame size={16} />
                <span>Make a Wish & Blow Candles 🎂</span>
              </button>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  color: '#D8B879',
                  fontSize: '0.92rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Sparkles size={16} />
                <span>Your wish has been sent to the stars, Maa! ✨</span>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Emotional Message */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7 }}
          className="font-garamond"
          style={{
            fontSize: 'clamp(1.15rem, 2.6vw, 1.45rem)',
            color: 'rgba(255, 244, 232, 0.9)',
            maxWidth: '640px',
            lineHeight: 1.6,
            fontStyle: 'italic',
            marginBottom: '36px',
          }}
        >
          "{romanticConfig.birthdayReveal.emotionalMessage}"
        </motion.p>

        {/* Call To Action Button: Proceed to Heartfelt Letter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9 }}
        >
          <button
            onClick={handleProceed}
            className="btn-gold"
            style={{
              padding: '16px 36px',
              fontSize: '1.08rem',
            }}
          >
            <Mail size={18} color="#09090F" />
            <span>{romanticConfig.birthdayReveal.ctaButton}</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
};
