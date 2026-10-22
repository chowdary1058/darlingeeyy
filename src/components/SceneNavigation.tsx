import type { SceneType } from '../types';
import { SCENES } from '../types';
import { audioService } from '../utils/audioSynthesizer';
import { Sparkles } from 'lucide-react';

interface SceneNavigationProps {
  currentScene: SceneType;
  onSelectScene: (scene: SceneType) => void;
}

export const SceneNavigation: React.FC<SceneNavigationProps> = ({ currentScene, onSelectScene }) => {
  const currentIndex = SCENES.findIndex((s) => s.id === currentScene);

  const handleNavClick = (sceneId: SceneType) => {
    audioService.playSoftClick();
    onSelectScene(sceneId);
  };

  return (
    <nav
      style={{
        position: 'fixed',
        top: '20px',
        left: '20px',
        zIndex: 90,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}
      aria-label="Story Chapters"
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
        <span
          style={{
            fontSize: '0.8rem',
            color: '#D8B879',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
          }}
        >
          <Sparkles size={14} color="#D62855" />
          <span>Chapter {currentIndex + 1} / {SCENES.length}</span>
        </span>

        {/* Dots progress indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          {SCENES.map((s, idx) => {
            const isActive = s.id === currentScene;
            const isCompleted = idx < currentIndex;
            return (
              <button
                key={s.id}
                onClick={() => handleNavClick(s.id)}
                title={`${idx + 1}. ${s.title}`}
                aria-label={`Jump to ${s.title}`}
                style={{
                  width: isActive ? '18px' : '6px',
                  height: '6px',
                  borderRadius: '3px',
                  backgroundColor: isActive
                    ? '#D62855'
                    : isCompleted
                    ? 'rgba(216, 184, 121, 0.7)'
                    : 'rgba(255, 244, 232, 0.2)',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              />
            );
          })}
        </div>

        {/* Current Chapter label on larger screens */}
        <span
          style={{
            fontSize: '0.78rem',
            color: 'rgba(255, 244, 232, 0.8)',
            maxWidth: '130px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {SCENES[currentIndex]?.shortTitle}
        </span>
      </div>
    </nav>
  );
};
