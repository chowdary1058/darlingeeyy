import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, ZoomIn, ArrowRight, Image as ImageIcon } from 'lucide-react';
import { audioService } from '../../utils/audioSynthesizer';
import { romanticConfig } from '../../config/romanticConfig';

interface MemoryGalleryProps {
  onNext: () => void;
}

export const MemoryGallery: React.FC<MemoryGalleryProps> = ({ onNext }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<typeof romanticConfig.photoGallery.photos[0] | null>(null);
  const [failedImages, setFailedImages] = useState<Record<number, boolean>>({});

  const photos = romanticConfig.photoGallery.photos;

  const handleImageError = (id: number) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  const handlePhotoClick = (photo: typeof romanticConfig.photoGallery.photos[0]) => {
    audioService.playSoftClick();
    setSelectedPhoto(photo);
  };

  const handleCloseLightbox = () => {
    audioService.playSoftClick();
    setSelectedPhoto(null);
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
        padding: '80px 20px 60px 20px',
        position: 'relative',
        zIndex: 10,
        backgroundColor: '#09090F',
      }}
    >
      {/* Background Ambience */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          width: '700px',
          height: '700px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(216, 184, 121, 0.15) 0%, rgba(88, 23, 45, 0.3) 45%, transparent 75%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '960px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* Gallery Title Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          style={{ textAlign: 'center', marginBottom: '40px' }}
        >
          <div
            className="font-handwriting"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: '#D8B879', marginBottom: '6px' }}
          >
            {romanticConfig.photoGallery.title}
          </div>
          <p
            className="font-garamond"
            style={{ fontSize: '1.2rem', color: 'rgba(255, 244, 232, 0.75)', fontStyle: 'italic' }}
          >
            {romanticConfig.photoGallery.subtitle}
          </p>
        </motion.div>

        {/* Scrapbook Polaroid Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '28px',
            width: '100%',
            marginBottom: '48px',
          }}
        >
          {photos.map((item, index) => {
            // Subtle rotation for genuine scrapbook Polaroid aesthetic
            const rotations = [-2.5, 2, -1.5, 2.5, -2, 1.8];
            const rot = rotations[index % rotations.length];

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                whileHover={{ scale: 1.04, rotate: 0, zIndex: 10 }}
                onClick={() => handlePhotoClick(item)}
                className="glass-panel"
                style={{
                  padding: '14px 14px 22px 14px',
                  borderRadius: '16px',
                  background: 'linear-gradient(145deg, rgba(30, 25, 40, 0.85) 0%, rgba(15, 12, 22, 0.95) 100%)',
                  border: '1px solid rgba(216, 184, 121, 0.3)',
                  boxShadow: '0 15px 35px rgba(0, 0, 0, 0.6)',
                  cursor: 'pointer',
                  transform: `rotate(${rot}deg)`,
                  transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease',
                  position: 'relative',
                }}
              >
                {/* Scrapbook Emoji Badge on Top of Each Picture */}
                <div
                  style={{
                    position: 'absolute',
                    top: '-18px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 10,
                    width: '42px',
                    height: '42px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, rgba(30, 25, 40, 0.95), rgba(15, 12, 22, 0.98))',
                    backdropFilter: 'blur(8px)',
                    border: '2px solid rgba(216, 184, 121, 0.7)',
                    borderRadius: '50%',
                    boxShadow: '0 6px 18px rgba(0, 0, 0, 0.65), 0 0 15px rgba(216, 184, 121, 0.35)',
                    fontSize: '1.45rem',
                    pointerEvents: 'none',
                  }}
                >
                  <span style={{ transform: 'translateY(-1px)' }}>{item.emoji || '❤️'}</span>
                </div>

                {/* Photo Frame Container */}
                <div
                  style={{
                    width: '100%',
                    height: '240px',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    marginBottom: '14px',
                    position: 'relative',
                    backgroundColor: '#15121C',
                  }}
                >
                  {!failedImages[item.id] ? (
                    <img
                      src={item.url}
                      alt={item.caption}
                      onError={() => handleImageError(item.id)}
                      loading="lazy"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.6s ease',
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#D8B879',
                        padding: '16px',
                        textAlign: 'center',
                      }}
                    >
                      <ImageIcon size={32} style={{ marginBottom: '8px' }} />
                      <span style={{ fontSize: '0.85rem' }}>Replaceable Photo #{item.id}</span>
                      <span style={{ fontSize: '0.7rem', opacity: 0.7, marginTop: '4px' }}>
                        (Save to {item.url})
                      </span>
                    </div>
                  )}

                  {/* Zoom In Badge on Hover */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '10px',
                      right: '10px',
                      background: 'rgba(9, 9, 15, 0.7)',
                      padding: '6px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFF4E8',
                    }}
                  >
                    <ZoomIn size={14} />
                  </div>
                </div>

                {/* Handwritten Polaroid Caption */}
                <div style={{ textAlign: 'center', padding: '0 4px' }}>
                  <p
                    className="font-handwriting"
                    style={{
                      fontSize: '1.45rem',
                      color: '#D8B879',
                      lineHeight: 1.25,
                    }}
                  >
                    "{item.caption}"
                  </p>
                  {item.location && (
                    <span
                      style={{
                        fontSize: '0.72rem',
                        color: 'rgba(255, 244, 232, 0.5)',
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase',
                        display: 'block',
                        marginTop: '4px',
                      }}
                    >
                      {item.location}
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Button to proceed to Final Celebration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <button
            onClick={handleProceed}
            className="btn-primary"
            style={{
              padding: '16px 38px',
              fontSize: '1.1rem',
            }}
          >
            <Heart size={20} fill="#FFF" color="#FFF" />
            <span>{romanticConfig.photoGallery.ctaButton}</span>
            <ArrowRight size={18} />
          </button>
        </motion.div>
      </div>

      {/* Lightbox Modal for Full Screen Photo View */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseLightbox}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(9, 9, 15, 0.92)',
              backdropFilter: 'blur(16px)',
              zIndex: 200,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px',
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-gold"
              style={{
                maxWidth: '680px',
                width: '100%',
                maxHeight: '90vh',
                padding: '20px',
                borderRadius: '24px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative',
              }}
            >
              {/* Close Button */}
              <button
                onClick={handleCloseLightbox}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: 'rgba(21, 18, 28, 0.8)',
                  border: '1px solid rgba(216, 184, 121, 0.3)',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFF4E8',
                  cursor: 'pointer',
                  zIndex: 10,
                }}
                aria-label="Close photo preview"
              >
                <X size={20} />
              </button>

              <div
                style={{
                  width: '100%',
                  maxHeight: '65vh',
                  overflow: 'hidden',
                  borderRadius: '16px',
                  marginBottom: '16px',
                }}
              >
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.caption}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    maxHeight: '65vh',
                  }}
                />
              </div>

              {selectedPhoto.emoji && (
                <div
                  style={{
                    fontSize: '1.75rem',
                    marginBottom: '6px',
                    letterSpacing: '4px',
                    textAlign: 'center',
                  }}
                >
                  {selectedPhoto.emoji}
                </div>
              )}

              <p
                className="font-handwriting"
                style={{
                  fontSize: 'clamp(1.6rem, 3.8vw, 2.2rem)',
                  color: '#D8B879',
                  textAlign: 'center',
                }}
              >
                "{selectedPhoto.caption}"
              </p>

              {selectedPhoto.location && (
                <span
                  style={{
                    fontSize: '0.85rem',
                    color: 'rgba(255, 244, 232, 0.7)',
                    marginTop: '4px',
                  }}
                >
                  📍 {selectedPhoto.location} • {selectedPhoto.date}
                </span>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
