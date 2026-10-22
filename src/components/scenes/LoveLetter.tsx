import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Eye, Sparkles, Quote, Maximize2, X } from 'lucide-react';
import { audioService } from '../../utils/audioSynthesizer';
import { romanticConfig } from '../../config/romanticConfig';

interface LoveLetterProps {
  onNext: () => void;
}

export const LoveLetter: React.FC<LoveLetterProps> = ({ onNext }) => {
  const [displayedParagraphs, setDisplayedParagraphs] = useState<number>(1);
  const [showAllInstantly, setShowAllInstantly] = useState<boolean>(false);
  const [isEnlarged, setIsEnlarged] = useState<boolean>(false);

  const { paragraphs, greeting, signOff, sender, ctaButton, eyesPortrait } = romanticConfig.loveLetter;

  useEffect(() => {
    if (showAllInstantly) {
      return;
    }

    const interval = setInterval(() => {
      setDisplayedParagraphs((prev) => {
        if (prev < paragraphs.length) {
          audioService.playSoftClick();
          return prev + 1;
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 1800);

    return () => clearInterval(interval);
  }, [showAllInstantly, paragraphs.length]);

  const handleShowAll = () => {
    setShowAllInstantly(true);
    setDisplayedParagraphs(paragraphs.length);
    audioService.playSoftClick();
  };

  const handleHugClick = () => {
    try {
      audioService.playChime();
    } catch {
      // Safe fallback
    }
    onNext();
  };

  const handleOpenModal = () => {
    audioService.playSoftClick();
    setIsEnlarged(true);
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
        padding: '60px 20px',
        position: 'relative',
        zIndex: 10,
        backgroundColor: '#09090F',
      }}
    >
      {/* Background Spotlight */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          width: '700px',
          height: '700px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(216, 184, 121, 0.15) 0%, rgba(88, 23, 45, 0.35) 45%, transparent 75%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
        }}
      />

      {/* Main Grid: Letter on Left, Slow-Motion Portrait & Quote on Right */}
      <div
        style={{
          maxWidth: '1240px',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '32px',
          alignItems: 'stretch',
          position: 'relative',
        }}
      >
        {/* Letter Card (Glass Parchment Aesthetic) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="glass-burgundy"
          style={{
            padding: '44px 32px',
            position: 'relative',
            border: '1px solid rgba(216, 184, 121, 0.35)',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7), 0 0 30px rgba(216, 184, 121, 0.15)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          {/* Wax Seal / Golden Stamp Embellishment */}
          <div
            style={{
              position: 'absolute',
              top: '-24px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #D62855, #8C1C38)',
              border: '2px solid #D8B879',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 15px rgba(214, 40, 85, 0.6)',
            }}
          >
            <Heart size={22} fill="#D8B879" color="#D8B879" />
          </div>

          <div>
            {/* Letter Header */}
            <div style={{ borderBottom: '1px solid rgba(216, 184, 121, 0.2)', paddingBottom: '16px', marginBottom: '24px' }}>
              <div
                className="font-handwriting"
                style={{
                  fontSize: 'clamp(2.2rem, 5vw, 3rem)',
                  color: '#D8B879',
                  textAlign: 'left',
                }}
              >
                {greeting}
              </div>
            </div>

            {/* Typewriter / Paragraph Reveal Body */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '18px',
                textAlign: 'left',
                lineHeight: 1.8,
              }}
            >
              {paragraphs.slice(0, displayedParagraphs).map((paragraph, idx) => (
                <motion.p
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="font-garamond"
                  style={{
                    fontSize: 'clamp(1.05rem, 2.2vw, 1.25rem)',
                    color: 'rgba(255, 244, 232, 0.95)',
                    letterSpacing: '0.02em',
                  }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </div>

          <div>
            {/* Sign off and Signature */}
            {displayedParagraphs >= paragraphs.length && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                style={{
                  marginTop: '32px',
                  paddingTop: '18px',
                  borderTop: '1px dashed rgba(216, 184, 121, 0.25)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                }}
              >
                <span
                  className="font-garamond"
                  style={{
                    fontSize: '1.15rem',
                    color: 'rgba(255, 244, 232, 0.8)',
                    fontStyle: 'italic',
                  }}
                >
                  {signOff}
                </span>
                <span
                  className="font-handwriting"
                  style={{
                    fontSize: 'clamp(2rem, 4.5vw, 2.6rem)',
                    color: '#D8B879',
                    marginTop: '4px',
                  }}
                >
                  {sender}
                </span>
              </motion.div>
            )}

            {/* Read Instantly Toggle */}
            {!showAllInstantly && displayedParagraphs < paragraphs.length && (
              <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                <button
                  onClick={handleShowAll}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'rgba(216, 184, 121, 0.7)',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <Eye size={14} />
                  <span>Read entire letter instantly</span>
                </button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Slow-Motion Portrait & Quote Card (Next to Letter) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="animate-slow-glow"
          style={{
            background: 'linear-gradient(150deg, rgba(38, 14, 26, 0.9), rgba(16, 13, 23, 0.95))',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(216, 184, 121, 0.38)',
            borderRadius: '24px',
            padding: '32px 28px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '24px',
            position: 'relative',
          }}
        >
          {/* Top Header Badge */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 16px',
                borderRadius: '9999px',
                background: 'rgba(216, 184, 121, 0.12)',
                border: '1px solid rgba(216, 184, 121, 0.35)',
                fontSize: '0.8rem',
                color: '#D8B879',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                fontWeight: 600,
              }}
            >
              <Sparkles size={14} color="#D8B879" />
              <span>{eyesPortrait.badge}</span>
            </div>

            <button
              onClick={handleOpenModal}
              title="View full screen slow-motion"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(216, 184, 121, 0.25)',
                color: '#D8B879',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              <Maximize2 size={16} />
            </button>
          </div>

          {/* Slow-Motion Image Showcase */}
          <div
            onClick={handleOpenModal}
            style={{
              position: 'relative',
              borderRadius: '18px',
              overflow: 'hidden',
              cursor: 'pointer',
              border: '1px solid rgba(216, 184, 121, 0.3)',
              boxShadow: '0 15px 35px rgba(0, 0, 0, 0.6)',
              height: '300px',
              backgroundColor: '#09090F',
            }}
          >
            {/* Slow-motion animated image */}
            <motion.img
              src={eyesPortrait.url}
              alt="Soulful Eyes"
              animate={{
                scale: [1, 1.1, 1.04, 1],
                x: ['0%', '1.5%', '-1%', '0%'],
                y: ['0%', '-1.2%', '1%', '0%'],
              }}
              transition={{
                duration: 16,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
              }}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                filter: 'brightness(1.03) contrast(1.05)',
              }}
            />

            {/* Slow light sheen sweep */}
            <div
              className="animate-slow-sheen"
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(115deg, transparent 20%, rgba(255, 244, 232, 0.22) 50%, transparent 80%)',
                pointerEvents: 'none',
              }}
            />

            {/* Edge vignette */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(circle at center, transparent 40%, rgba(9, 9, 15, 0.55) 100%)',
                pointerEvents: 'none',
              }}
            />

            {/* Slow-Motion Live Indicator */}
            <div
              style={{
                position: 'absolute',
                bottom: '12px',
                left: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '5px 12px',
                borderRadius: '9999px',
                background: 'rgba(9, 9, 15, 0.75)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(216, 184, 121, 0.3)',
                fontSize: '0.74rem',
                color: '#FFF4E8',
                letterSpacing: '0.04em',
              }}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#D62855',
                  boxShadow: '0 0 10px #D62855',
                  animation: 'heartPulse 2s infinite',
                }}
              />
              <span>Slo-mo • Soulful Gaze</span>
            </div>

            <div
              style={{
                position: 'absolute',
                bottom: '12px',
                right: '12px',
                padding: '4px 10px',
                borderRadius: '9999px',
                background: 'rgba(0, 0, 0, 0.6)',
                backdropFilter: 'blur(6px)',
                fontSize: '0.72rem',
                color: 'rgba(255, 244, 232, 0.8)',
              }}
            >
              Tap to Expand 🔍
            </div>
          </div>

          {/* Quote Section */}
          <div style={{ textAlign: 'left', position: 'relative' }}>
            <Quote
              size={28}
              color="#D8B879"
              style={{
                opacity: 0.85,
                marginBottom: '8px',
                transform: 'scaleX(-1)',
              }}
            />

            <h3
              className="font-cinzel"
              style={{
                fontSize: 'clamp(1.1rem, 2vw, 1.25rem)',
                color: '#D8B879',
                letterSpacing: '0.03em',
                marginBottom: '10px',
              }}
            >
              {eyesPortrait.title}
            </h3>

            <p
              className="font-garamond"
              style={{
                fontSize: 'clamp(1.1rem, 2.2vw, 1.3rem)',
                lineHeight: 1.6,
                color: '#FFF4E8',
                fontStyle: 'italic',
                letterSpacing: '0.01em',
                marginBottom: '12px',
              }}
            >
              "{eyesPortrait.quote}"
            </p>

            <p
              style={{
                fontSize: '0.92rem',
                lineHeight: 1.6,
                color: 'rgba(255, 244, 232, 0.72)',
                marginBottom: '16px',
              }}
            >
              {eyesPortrait.subQuote}
            </p>

            {/* Dedication footer */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '14px',
                borderTop: '1px dashed rgba(216, 184, 121, 0.25)',
              }}
            >
              <span
                className="font-handwriting"
                style={{
                  fontSize: 'clamp(1.35rem, 2.5vw, 1.6rem)',
                  color: '#D8B879',
                }}
              >
                {eyesPortrait.dedication}
              </span>
              <div style={{ display: 'flex', gap: '6px' }}>
                <Heart size={16} fill="#D62855" color="#D62855" />
                <Heart size={16} fill="#D8B879" color="#D8B879" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Proceed to Hugging Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        style={{ marginTop: '40px', display: 'flex', justifyContent: 'center' }}
      >
        <button
          id="hugging-action-button"
          onClick={handleHugClick}
          className="btn-primary animate-pulse-glow"
          style={{
            padding: '16px 42px',
            fontSize: '1.15rem',
            cursor: 'pointer',
            boxShadow: '0 10px 30px rgba(214, 40, 85, 0.5), 0 0 20px rgba(214, 40, 85, 0.3)',
          }}
        >
          <Heart size={20} fill="#FFF" color="#FFF" />
          <span>{ctaButton}</span>
        </button>
      </motion.div>

      {/* Full Screen Slow-Motion Modal */}
      <AnimatePresence>
        {isEnlarged && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsEnlarged(false)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 1000,
              backgroundColor: 'rgba(9, 9, 15, 0.94)',
              backdropFilter: 'blur(18px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px',
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsEnlarged(false)}
              style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(216, 184, 121, 0.3)',
                color: '#FFF',
                borderRadius: '50%',
                width: '44px',
                height: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 1010,
              }}
            >
              <X size={22} />
            </button>

            {/* Modal Inner Container */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: '750px',
                width: '100%',
                borderRadius: '24px',
                overflow: 'hidden',
                border: '2px solid rgba(216, 184, 121, 0.45)',
                boxShadow: '0 30px 80px rgba(0, 0, 0, 0.9), 0 0 50px rgba(216, 184, 121, 0.25)',
                background: '#15121C',
                position: 'relative',
              }}
            >
              {/* Slow-motion enlarged view */}
              <div style={{ position: 'relative', height: '420px', overflow: 'hidden' }}>
                <motion.img
                  src={eyesPortrait.url}
                  alt="Her Eyes"
                  animate={{
                    scale: [1, 1.12, 1.05, 1],
                    x: ['0%', '2%', '-1.5%', '0%'],
                    y: ['0%', '-1.5%', '1.5%', '0%'],
                  }}
                  transition={{
                    duration: 18,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'easeInOut',
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
                <div
                  className="animate-slow-sheen"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(115deg, transparent 20%, rgba(255, 244, 232, 0.25) 50%, transparent 80%)',
                    pointerEvents: 'none',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(circle at center, transparent 40%, rgba(9, 9, 15, 0.7) 100%)',
                    pointerEvents: 'none',
                  }}
                />
              </div>

              {/* Modal Quote Info */}
              <div style={{ padding: '28px 32px', textAlign: 'center' }}>
                <Quote size={28} color="#D8B879" style={{ opacity: 0.85, margin: '0 auto 8px auto' }} />
                <p
                  className="font-garamond"
                  style={{
                    fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
                    lineHeight: 1.6,
                    color: '#FFF4E8',
                    fontStyle: 'italic',
                    marginBottom: '10px',
                  }}
                >
                  "{eyesPortrait.quote}"
                </p>
                <div
                  className="font-handwriting"
                  style={{
                    fontSize: '1.8rem',
                    color: '#D8B879',
                  }}
                >
                  {eyesPortrait.dedication}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
