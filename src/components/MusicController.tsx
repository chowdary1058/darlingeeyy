import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music, Play, Pause } from 'lucide-react';
import { audioService } from '../utils/audioSynthesizer';
import { romanticConfig } from '../config/romanticConfig';

interface MusicControllerProps {
  hasStartedStory?: boolean;
}

export const MusicController: React.FC<MusicControllerProps> = ({ hasStartedStory }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.6);
  const [showPrompt, setShowPrompt] = useState<boolean>(false);

  useEffect(() => {
    // When story begins, prompt or gently attempt to play
    if (hasStartedStory && !isPlaying) {
      setShowPrompt(true);
    }
  }, [hasStartedStory]);

  const handleTogglePlay = async () => {
    audioService.playSoftClick();
    const playing = await audioService.toggleMusic(romanticConfig.music.audioPath);
    setIsPlaying(playing);
    setShowPrompt(false);
  };

  const handleToggleMute = () => {
    audioService.playSoftClick();
    const muted = audioService.toggleMute();
    setIsMuted(muted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    audioService.setVolume(val);
    if (isMuted && val > 0) {
      setIsMuted(false);
      audioService.setMute(false);
    }
  };

  return (
    <>
      {/* Floating Gentle Prompt if music hasn't started yet */}
      {showPrompt && !isPlaying && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 100,
            maxWidth: '320px',
            animation: 'floatSlow 4s ease-in-out infinite',
          }}
        >
          <button
            onClick={handleTogglePlay}
            className="glass-burgundy"
            style={{
              padding: '12px 18px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              color: '#FFF4E8',
              cursor: 'pointer',
              border: '1px solid rgba(216, 184, 121, 0.4)',
              textAlign: 'left',
              width: '100%',
            }}
          >
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #D62855, #D8B879)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Music size={18} color="#09090F" />
            </div>
            <div>
              <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#D8B879' }}>
                Romantic Ambience 🎵
              </div>
              <div style={{ fontSize: '0.75rem', opacity: 0.85 }}>
                Tap to play our gentle piano melody
              </div>
            </div>
          </button>
        </div>
      )}

      {/* Persistent Audio Pill (Top Right) */}
      <div
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 90,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <div
          className="glass-pill"
          style={{
            padding: '6px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            boxShadow: '0 8px 25px rgba(0,0,0,0.4)',
          }}
        >
          {/* Play/Pause Button */}
          <button
            onClick={handleTogglePlay}
            style={{
              background: isPlaying ? 'rgba(214, 40, 85, 0.25)' : 'transparent',
              border: 'none',
              color: isPlaying ? '#D62855' : '#D8B879',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              transition: 'all 0.3s ease',
            }}
            title={isPlaying ? 'Pause Music' : 'Play Music'}
            aria-label={isPlaying ? 'Pause Music' : 'Play Music'}
          >
            {isPlaying ? <Pause size={15} /> : <Play size={15} style={{ marginLeft: '2px' }} />}
          </button>

          {/* Equalizer Visualizer Bars when playing */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '3px',
              height: '16px',
            }}
          >
            {[0.8, 1.4, 0.6, 1.2, 0.9].map((heightScale, i) => (
              <span
                key={i}
                style={{
                  width: '3px',
                  height: isPlaying ? `${12 * heightScale}px` : '4px',
                  backgroundColor: isPlaying ? '#D8B879' : 'rgba(216, 184, 121, 0.3)',
                  borderRadius: '2px',
                  transition: 'height 0.3s ease',
                  animation: isPlaying ? `gentleFlicker ${0.8 + i * 0.2}s infinite alternate` : 'none',
                }}
              />
            ))}
          </div>

          {/* Mute/Unmute */}
          <button
            onClick={handleToggleMute}
            style={{
              background: 'transparent',
              border: 'none',
              color: isMuted ? '#FF4D79' : '#FFF4E8',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '4px',
              opacity: 0.85,
            }}
            title={isMuted ? 'Unmute' : 'Mute'}
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>

          {/* Mini Volume Slider on hover/desktop */}
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            aria-label="Volume Slider"
            style={{
              width: '50px',
              accentColor: '#D8B879',
              cursor: 'pointer',
              opacity: 0.7,
            }}
          />
        </div>
      </div>
    </>
  );
};
