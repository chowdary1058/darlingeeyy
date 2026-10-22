import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { audioService } from '../../utils/audioSynthesizer';
import { romanticConfig } from '../../config/romanticConfig';

interface LoveQuestionsProps {
  onComplete: () => void;
}

export const LoveQuestions: React.FC<LoveQuestionsProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [responseModal, setResponseModal] = useState<{
    isOpen: boolean;
    isYes: boolean;
    message: string;
  }>({
    isOpen: false,
    isYes: true,
    message: '',
  });

  const questions = romanticConfig.romanticQuestions;
  const currentQ = questions[currentIndex];

  const handleYes = () => {
    audioService.playChime();
    setResponseModal({
      isOpen: true,
      isYes: true,
      message: currentQ.yesResponse,
    });
  };

  const handleNo = () => {
    audioService.playHeartbeat();
    setResponseModal({
      isOpen: true,
      isYes: false,
      message: currentQ.noResponse,
    });
  };

  const handleModalNext = () => {
    audioService.playSoftClick();
    setResponseModal({ isOpen: false, isYes: true, message: '' });

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Completed all 4 questions!
      onComplete();
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
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(214, 40, 85, 0.2) 0%, rgba(88, 23, 45, 0.35) 45%, transparent 75%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ width: '100%', maxWidth: '580px', position: 'relative' }}>
        
        {/* Progress header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            padding: '0 8px',
          }}
        >
          <span
            className="font-handwriting"
            style={{ fontSize: '1.4rem', color: '#D8B879' }}
          >
            Question {currentIndex + 1} of {questions.length}
          </span>
          <div style={{ display: 'flex', gap: '6px' }}>
            {questions.map((_, idx) => (
              <span
                key={idx}
                style={{
                  width: idx === currentIndex ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  backgroundColor: idx <= currentIndex ? '#D62855' : 'rgba(255, 244, 232, 0.2)',
                  transition: 'all 0.4s ease',
                }}
              />
            ))}
          </div>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ.id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="glass-burgundy"
            style={{
              padding: '40px 32px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              minHeight: '320px',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            {/* Cute Peeking Cats Illustration */}
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                width: '130px',
                height: '100px',
                borderRadius: '18px',
                overflow: 'hidden',
                backgroundColor: '#FAF0E6',
                border: '2px solid rgba(216, 184, 121, 0.45)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5), 0 0 15px rgba(216, 184, 121, 0.25)',
                marginBottom: '20px',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src="/images/cute-peeking-cats.png"
                alt="Sai and Maa Cute Cats"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
              />
            </motion.div>

            {/* Question Text */}
            <h3
              className="font-serif-luxury"
              style={{
                fontSize: 'clamp(1.35rem, 3.2vw, 1.75rem)',
                color: '#FFF4E8',
                lineHeight: 1.45,
                fontWeight: 600,
                marginBottom: '36px',
              }}
            >
              "{currentQ.question}"
            </h3>

            {/* Buttons */}
            <div
              style={{
                display: 'flex',
                gap: '16px',
                flexWrap: 'wrap',
                justifyContent: 'center',
                width: '100%',
              }}
            >
              {/* YES Button */}
              <button
                onClick={handleYes}
                className="btn-primary"
                style={{
                  minWidth: '160px',
                  padding: '14px 28px',
                  fontSize: '1.05rem',
                }}
              >
                <span>{currentQ.yesText}</span>
              </button>

              {/* NO Button (Playful interaction) */}
              <button
                onClick={handleNo}
                className="btn-outline"
                style={{
                  minWidth: '140px',
                  padding: '14px 24px',
                  fontSize: '1rem',
                  borderColor: 'rgba(245, 183, 200, 0.3)',
                }}
              >
                <span>{currentQ.noText}</span>
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Modal / Affectionate Feedback Popup */}
        <AnimatePresence>
          {responseModal.isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(9, 9, 15, 0.85)',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 100,
                padding: '20px',
              }}
            >
              {currentIndex === 0 ? (
                /* Question 1: Majestic 3D Universe Reveal */
                <motion.div
                  initial={{ scale: 0.8, y: 30, opacity: 0 }}
                  animate={{ scale: 1, y: 0, opacity: 1 }}
                  exit={{ scale: 0.85, y: 20, opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="glass-burgundy"
                  style={{
                    maxWidth: '540px',
                    width: '100%',
                    padding: '28px 22px',
                    textAlign: 'center',
                    borderRadius: '26px',
                    border: '1.5px solid rgba(216, 184, 121, 0.55)',
                    boxShadow: '0 25px 70px rgba(0,0,0,0.85), 0 0 40px rgba(214, 40, 85, 0.4), 0 0 35px rgba(216, 184, 121, 0.25)',
                    position: 'relative',
                  }}
                >
                  {/* Cosmic Tag */}
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '5px 16px',
                      borderRadius: '999px',
                      background: 'rgba(216, 184, 121, 0.15)',
                      border: '1px solid rgba(216, 184, 121, 0.4)',
                      color: '#D8B879',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      marginBottom: '16px',
                    }}
                  >
                    <Sparkles size={15} color="#D8B879" />
                    <span>My Universe, My Maa 🌌✨</span>
                  </div>

                  {/* 3D Universe Image Showcase */}
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: '240px',
                      borderRadius: '18px',
                      overflow: 'hidden',
                      marginBottom: '20px',
                      border: '2px solid rgba(216, 184, 121, 0.6)',
                      boxShadow: '0 15px 40px rgba(0,0,0,0.7), 0 0 25px rgba(216, 184, 121, 0.3)',
                    }}
                  >
                    <motion.img
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                      src="/images/universe-3d.jpg"
                      alt="3D Cosmic Universe for Maa"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'radial-gradient(circle at center, transparent 45%, rgba(9, 9, 15, 0.4) 100%)',
                        pointerEvents: 'none',
                      }}
                    />
                  </div>

                  {/* Emotional Message */}
                  <p
                    className="font-garamond"
                    style={{
                      fontSize: '1.25rem',
                      color: '#FFF4E8',
                      lineHeight: 1.55,
                      marginBottom: '22px',
                      fontStyle: 'italic',
                    }}
                  >
                    "{responseModal.message}"
                  </p>

                  {/* Move to Next Question Button */}
                  <button
                    onClick={handleModalNext}
                    className="btn-primary"
                    style={{
                      width: '100%',
                      padding: '15px',
                      fontSize: '1.08rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                      boxShadow: '0 8px 25px rgba(214, 40, 85, 0.5)',
                    }}
                  >
                    <span>Move to Next Question 💫</span>
                    <ArrowRight size={18} />
                  </button>
                </motion.div>
              ) : (
                /* Regular Reaction Modal for Questions 2, 3, 4 */
                <motion.div
                  initial={{ scale: 0.85, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.85, y: 20 }}
                  className="glass-gold"
                  style={{
                    maxWidth: '440px',
                    width: '100%',
                    padding: '36px 28px',
                    textAlign: 'center',
                    borderRadius: '24px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '18px' }}>
                    <div
                      style={{
                        width: '90px',
                        height: '90px',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        border: '3px solid #D8B879',
                        boxShadow: '0 0 20px rgba(216, 184, 121, 0.45)',
                        backgroundColor: '#FFF4E8',
                      }}
                    >
                      <img
                        src={responseModal.isYes ? "/images/cute-couple-cats.png" : "/images/cute-peeking-cats.png"}
                        alt="Reaction"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  </div>

                  <p
                    className="font-garamond"
                    style={{
                      fontSize: '1.35rem',
                      color: '#FFF4E8',
                      lineHeight: 1.5,
                      marginBottom: '24px',
                      fontStyle: 'italic',
                    }}
                  >
                    "{responseModal.message}"
                  </p>

                  <button
                    onClick={handleModalNext}
                    className="btn-primary"
                    style={{ width: '100%', padding: '14px', fontSize: '1.05rem', cursor: 'pointer' }}
                  >
                    <span>
                      {currentIndex < questions.length - 1
                        ? 'Next Question ❤️'
                        : 'Show My Birthday Surprise! 🎁✨'}
                    </span>
                    <ArrowRight size={18} />
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
