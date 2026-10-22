import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';
import { audioService } from '../../utils/audioSynthesizer';
import { romanticConfig } from '../../config/romanticConfig';

interface VirtualHugProps {
  onNext: () => void;
}

export const VirtualHug: React.FC<VirtualHugProps> = ({ onNext }) => {
  const [isEmbraced, setIsEmbraced] = useState<boolean>(false);
  const [hugStrength, setHugStrength] = useState<number>(0);

  const handleTriggerHug = () => {
    try {
      audioService.playHeartbeat();
    } catch {
      // Safe fallback
    }
    setIsEmbraced(true);
    setHugStrength((prev) => prev + 1);

    // Play heartbeat sounds in sequence
    setTimeout(() => {
      try {
        audioService.playHeartbeat();
      } catch {
        // Safe
      }
    }, 800);

    setTimeout(() => {
      try {
        audioService.playChime();
      } catch {
        // Safe
      }
    }, 1600);
  };

  const handleProceed = () => {
    try {
      audioService.playSoftClick();
    } catch {
      // Safe fallback
    }
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
        padding: '30px 16px 60px 16px',
        position: 'relative',
        zIndex: 10,
        backgroundColor: '#09090F',
        overflowY: 'auto',
      }}
    >
      {/* Soft Romantic Backlight & Volumetric Aura */}
      <motion.div
        animate={isEmbraced ? { scale: [1, 1.25, 1.1], opacity: [0.35, 0.75, 0.5] } : {}}
        transition={{ duration: 2.2, repeat: isEmbraced ? Infinity : 0 }}
        style={{
          position: 'absolute',
          width: '450px',
          height: '450px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(214, 40, 85, 0.35) 0%, rgba(216, 184, 121, 0.2) 45%, transparent 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '580px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* Animated Cute Couple Cats Illustration */}
        <div
          style={{
            position: 'relative',
            width: '240px',
            height: '200px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Heart Aura behind couple */}
          <AnimatePresence>
            {isEmbraced && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [1, 1.35, 1.15], opacity: [0.7, 1, 0.85] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  width: '230px',
                  height: '230px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(214, 40, 85, 0.6) 0%, rgba(216, 184, 121, 0.35) 60%, transparent 80%)',
                  filter: 'blur(18px)',
                  zIndex: 1,
                }}
              />
            )}
          </AnimatePresence>

          {/* Adorable Cat Hug Card */}
          <motion.div
            onClick={handleTriggerHug}
            whileTap={{ scale: 0.95 }}
            animate={isEmbraced ? { scale: [1, 1.07, 1.02], y: [0, -5, 0] } : { y: [0, -4, 0] }}
            transition={isEmbraced ? { duration: 1.2, repeat: Infinity } : { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            className="glass-burgundy"
            style={{
              position: 'relative',
              zIndex: 2,
              borderRadius: '22px',
              padding: '10px',
              cursor: 'pointer',
              border: isEmbraced ? '2px solid rgba(214, 40, 85, 0.85)' : '1px solid rgba(216, 184, 121, 0.45)',
              boxShadow: isEmbraced ? '0 15px 40px rgba(214, 40, 85, 0.55), 0 0 25px rgba(216, 184, 121, 0.3)' : '0 10px 30px rgba(0, 0, 0, 0.5)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: '200px',
                height: '145px',
                borderRadius: '16px',
                overflow: 'hidden',
                backgroundColor: '#FFF4E8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              <img
                src="/images/cute-hugging-cats.png"
                alt="Sai & Maa Hugging"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />

              {/* Floating Heart Overlay */}
              <div
                className="animate-heart-pulse"
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '15px',
                  zIndex: 3,
                }}
              >
                <Heart size={20} fill="#D62855" color="#D62855" />
              </div>
            </div>

            {/* Couple Label */}
            <div
              className="font-handwriting"
              style={{
                fontSize: '1.25rem',
                color: '#D8B879',
                marginTop: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span>Sai & Maa</span>
              <Heart size={13} fill="#D62855" color="#D62855" />
            </div>
          </motion.div>
        </div>

        {/* Narrative Lines (Responsive with word wrapping) */}
        <div style={{ width: '100%', maxWidth: '520px', marginBottom: '24px', padding: '0 8px' }}>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-garamond"
            style={{
              fontSize: 'clamp(1.1rem, 3vw, 1.4rem)',
              color: '#D8B879',
              fontStyle: 'italic',
              marginBottom: '8px',
            }}
          >
            "{romanticConfig.virtualHug.lines[0]}"
          </motion.p>

          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-serif-luxury"
            style={{
              fontSize: 'clamp(1.15rem, 3.8vw, 1.6rem)',
              color: '#FFF4E8',
              lineHeight: 1.4,
              fontWeight: 600,
              marginBottom: '10px',
              wordBreak: 'break-word',
              padding: '0 6px',
            }}
          >
            {romanticConfig.virtualHug.lines[1]}
          </motion.h3>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="font-garamond"
            style={{
              fontSize: 'clamp(1rem, 2.8vw, 1.15rem)',
              color: 'rgba(255, 244, 232, 0.85)',
              fontStyle: 'italic',
              lineHeight: 1.5,
            }}
          >
            {romanticConfig.virtualHug.lines[2]}
          </motion.p>
        </div>

        {/* Interactive Embrace Trigger & Navigation */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
          <button
            onClick={handleTriggerHug}
            className="btn-primary animate-pulse-glow"
            style={{
              padding: '14px 34px',
              fontSize: '1.05rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 10px 25px rgba(214, 40, 85, 0.55)',
            }}
          >
            <Heart size={20} fill="#FFF" color="#FFF" />
            <span>
              {hugStrength > 0
                ? `Hugging with Love (${hugStrength}) ❤️`
                : romanticConfig.virtualHug.actionPrompt}
            </span>
          </button>

          {isEmbraced && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                color: '#D8B879',
                fontSize: '0.92rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '0 12px',
                textAlign: 'center',
              }}
            >
              <Sparkles size={16} />
              <span>{romanticConfig.virtualHug.embracedMessage}</span>
            </motion.div>
          )}

          {/* Button to proceed to Miss You Scene */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{ marginTop: '8px', width: '100%', display: 'flex', justifyContent: 'center' }}
          >
            <button
              onClick={handleProceed}
              className="btn-gold"
              style={{
                padding: '14px 32px',
                fontSize: '1.02rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 8px 25px rgba(216, 184, 121, 0.35)',
              }}
            >
              <span>{romanticConfig.virtualHug.ctaButton}</span>
              <ArrowRight size={18} />
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
