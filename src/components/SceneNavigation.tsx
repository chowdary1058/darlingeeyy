import type { SceneType } from '../types';
import { SCENES } from '../types';
import { audioService } from '../utils/audioSynthesizer';
import { Sparkles } from 'lucide-react';

interface SceneNavigationProps {
  currentScene: SceneType;
  onSelectScene: (scene: SceneType) => void;
  onReleaseBalloons?: () => void;
}

export const SceneNavigation: React.FC<SceneNavigationProps> = ({
  currentScene,
  onSelectScene,
  onReleaseBalloons,
}) => {
  const currentIndex = SCENES.findIndex((s) => s.id === currentScene);

  const handleNavClick = (sceneId: SceneType) => {
    audioService.playSoftClick();
    onSelectScene(sceneId);
  };

  const handleBalloonBtn = () => {
    audioService.playChime();
    onReleaseBalloons?.();
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

        {onReleaseBalloons && (
          <button
            onClick={handleBalloonBtn}
            title="Release Heart Balloons 🎈"
            aria-label="Release Heart Balloons"
            style={{
              background: 'rgba(214, 40, 85, 0.18)',
              border: '1px solid rgba(255, 111, 145, 0.35)',
              borderRadius: '9999px',
              padding: '2px 8px',
              cursor: 'pointer',
              color: '#FF758F',
              fontSize: '0.75rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              marginLeft: '4px',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(214, 40, 85, 0.35)';
              e.currentTarget.style.transform = 'scale(1.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(214, 40, 85, 0.18)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <span>🎈</span>
            <span style={{ fontSize: '0.7rem' }}>Balloons</span>
          </button>
        )}
      </div>
    </nav>
  );
};
