import React, { useState, useEffect, useCallback, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { audioService } from '../utils/audioSynthesizer';

export interface BalloonTheme {
  id: string;
  name: string;
  highlight: string;
  primary: string;
  dark: string;
  shadowGlow: string;
  stringColor: string;
}

const BALLOON_THEMES: BalloonTheme[] = [
  {
    id: 'ruby',
    name: 'Ruby Crimson',
    highlight: '#FFA3B8',
    primary: '#E61E50',
    dark: '#730623',
    shadowGlow: 'rgba(230, 30, 80, 0.45)',
    stringColor: 'rgba(255, 180, 200, 0.75)',
  },
  {
    id: 'roseGold',
    name: 'Rose Gold',
    highlight: '#FFE5EC',
    primary: '#FF6F91',
    dark: '#9C1A3C',
    shadowGlow: 'rgba(255, 111, 145, 0.45)',
    stringColor: 'rgba(255, 215, 225, 0.75)',
  },
  {
    id: 'gold',
    name: 'Champagne Gold',
    highlight: '#FFF7D6',
    primary: '#D8B879',
    dark: '#6A4D1A',
    shadowGlow: 'rgba(216, 184, 121, 0.5)',
    stringColor: 'rgba(235, 210, 150, 0.75)',
  },
  {
    id: 'burgundy',
    name: 'Deep Burgundy',
    highlight: '#DB4D71',
    primary: '#800F2F',
    dark: '#330010',
    shadowGlow: 'rgba(128, 15, 47, 0.55)',
    stringColor: 'rgba(215, 140, 160, 0.65)',
  },
  {
    id: 'blush',
    name: 'Pastel Blush',
    highlight: '#FFFFFF',
    primary: '#FF9EAA',
    dark: '#C4576C',
    shadowGlow: 'rgba(255, 158, 170, 0.4)',
    stringColor: 'rgba(255, 230, 238, 0.75)',
  },
  {
    id: 'champagne',
    name: 'Pearl Champagne',
    highlight: '#FFFFFF',
    primary: '#F7E4BE',
    dark: '#947B4B',
    shadowGlow: 'rgba(247, 228, 190, 0.4)',
    stringColor: 'rgba(245, 235, 215, 0.7)',
  },
];

interface BalloonItem {
  id: string;
  leftPercent: number; // 3% to 95%
  width: number; // 48px to 95px
  scale: number;
  duration: number; // 4.5s to 8s
  delay: number; // 0s to 2.2s
  swayDistance: number; // 14px to 32px
  swayDuration: number; // 2s to 3.5s
  swayDirection: number; // 1 or -1
  rotation: number; // -12deg to 12deg
  theme: BalloonTheme;
  opacity: number;
  blur: number;
  zIndex: number;
}

interface HeartBalloonsProps {
  /** Changing this key triggers a fresh ascending cluster of heart balloons */
  triggerKey: string;
  /** Number of balloons released per page change */
  balloonCount?: number;
}

/**
 * Individual Realistic Foil Heart Balloon SVG with specular gloss,
 * 3D volume, tie knot, and waving ribbon string.
 */
const HeartBalloonSVG: React.FC<{ theme: BalloonTheme; balloonId: string }> = ({
  theme,
  balloonId,
}) => {
  const gradId = `heart-grad-${balloonId}`;
  const knotGradId = `knot-grad-${balloonId}`;

  return (
    <svg
      viewBox="0 0 100 170"
      width="100%"
      height="100%"
      style={{
        overflow: 'visible',
        filter: `drop-shadow(0 10px 22px ${theme.shadowGlow}) drop-shadow(0 4px 8px rgba(0,0,0,0.4))`,
        cursor: 'pointer',
      }}
    >
      <defs>
        {/* Radial highlight mimicking helium balloon curved surface */}
        <radialGradient id={gradId} cx="36%" cy="26%" r="68%">
          <stop offset="0%" stopColor={theme.highlight} stopOpacity="1" />
          <stop offset="48%" stopColor={theme.primary} stopOpacity="1" />
          <stop offset="100%" stopColor={theme.dark} stopOpacity="1" />
        </radialGradient>

        {/* Knot gradient */}
        <linearGradient id={knotGradId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={theme.primary} />
          <stop offset="100%" stopColor={theme.dark} />
        </linearGradient>

        {/* Specular gloss filter */}
        <filter id={`soft-blur-${balloonId}`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="0.8" />
        </filter>
      </defs>

      {/* Floating Curling String / Ribbon dangling from the knot */}
      <path
        d="M 50 87 C 42 100, 56 112, 47 128 C 38 144, 55 156, 48 170"
        fill="none"
        stroke={theme.stringColor}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeDasharray="none"
        opacity="0.9"
      />

      {/* Balloon Knot at bottom tip */}
      <path
        d="M 45 81 L 55 81 L 58 87 L 42 87 Z"
        fill={`url(#${knotGradId})`}
      />
      <circle cx="50" cy="87.5" r="2.2" fill={theme.dark} />

      {/* Main Heart Balloon Body */}
      <path
        d="M 50 81 C 18 56, 0 38, 0 22 C 0 8, 11 0, 26 0 C 36 0, 45 6, 50 14 C 55 6, 64 0, 74 0 C 89 0, 100 8, 100 22 C 100 38, 82 56, 50 81 Z"
        fill={`url(#${gradId})`}
      />

      {/* Specular Curved Highlight (Foil Gloss) */}
      <path
        d="M 18 16 C 26 8, 38 10, 42 16 C 36 21, 25 21, 18 16 Z"
        fill="#FFFFFF"
        fillOpacity="0.45"
        filter={`url(#soft-blur-${balloonId})`}
      />

      {/* Primary Gloss Oval */}
      <ellipse
        cx="28"
        cy="22"
        rx="9"
        ry="5"
        transform="rotate(-30 28 22)"
        fill="#FFFFFF"
        fillOpacity="0.55"
      />

      {/* Pin-point gleam */}
      <circle cx="20" cy="29" r="2.5" fill="#FFFFFF" fillOpacity="0.5" />

      {/* Secondary subtle rim light along right bottom edge */}
      <path
        d="M 88 32 C 86 52, 70 68, 52 79"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="2.2"
        strokeOpacity="0.32"
        strokeLinecap="round"
        filter={`url(#soft-blur-${balloonId})`}
      />
    </svg>
  );
};

export const HeartBalloons: React.FC<HeartBalloonsProps> = ({
  triggerKey,
  balloonCount = 22,
}) => {
  const [balloons, setBalloons] = useState<BalloonItem[]>([]);
  const containerId = useId();

  // Generator for a wave of floating heart balloons
  const spawnBalloons = useCallback(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const count = isMobile ? Math.min(14, balloonCount) : balloonCount;
    const now = Date.now();

    const newBalloons: BalloonItem[] = [];

    // Distribute balloons across screen columns with randomized offsets
    for (let i = 0; i < count; i++) {
      // Stratified random spread across horizontal viewport (4% to 94%)
      const columnSegment = 90 / count;
      const leftPercent = Math.min(
        94,
        Math.max(4, 4 + i * columnSegment + (Math.random() - 0.5) * columnSegment * 0.9)
      );

      // Depth perception: foreground, midground, background
      const depthRand = Math.random();
      let scale = 1;
      let duration = 6;
      let blur = 0;
      let opacity = 0.95;
      let zIndex = 30;

      if (depthRand < 0.3) {
        // Far background: smaller, slower, slightly soft-focused
        scale = 0.65 + Math.random() * 0.2;
        duration = 7 + Math.random() * 2.5;
        blur = 1.2;
        opacity = 0.65;
        zIndex = 15;
      } else if (depthRand < 0.75) {
        // Midground: balanced
        scale = 0.9 + Math.random() * 0.25;
        duration = 5.2 + Math.random() * 1.8;
        blur = 0;
        opacity = 0.92;
        zIndex = 28;
      } else {
        // Foreground hero balloon: bold, vibrant, faster ascent
        scale = 1.15 + Math.random() * 0.3;
        duration = 4.2 + Math.random() * 1.4;
        blur = 0;
        opacity = 1;
        zIndex = 38;
      }

      const baseWidth = isMobile ? 50 : 64;
      const theme = BALLOON_THEMES[Math.floor(Math.random() * BALLOON_THEMES.length)];

      newBalloons.push({
        id: `balloon-${now}-${i}-${Math.random().toString(36).substring(2, 7)}`,
        leftPercent,
        width: baseWidth * scale,
        scale,
        duration,
        delay: Math.random() * 1.8, // staggered release over 1.8s
        swayDistance: 16 + Math.random() * 24,
        swayDuration: 2.2 + Math.random() * 1.4,
        swayDirection: Math.random() > 0.5 ? 1 : -1,
        rotation: (Math.random() - 0.5) * 22,
        theme,
        opacity,
        blur,
        zIndex,
      });
    }

    setBalloons((prev) => [...prev, ...newBalloons]);

    // Cleanup finished balloons after their longest journey
    const maxLifetime = 11000; // 11s max duration + delay
    const timer = setTimeout(() => {
      setBalloons((prev) => prev.filter((b) => !newBalloons.some((nb) => nb.id === b.id)));
    }, maxLifetime);

    return () => clearTimeout(timer);
  }, [balloonCount]);

  // Trigger balloon ascension whenever triggerKey (current scene) changes
  useEffect(() => {
    const cleanup = spawnBalloons();
    return cleanup;
  }, [triggerKey, spawnBalloons]);

  // Handle interactive popping of a balloon
  const handleBalloonClick = (
    e: React.MouseEvent<HTMLDivElement>,
    balloon: BalloonItem
  ) => {
    e.stopPropagation();
    e.preventDefault();

    // Play balloon pop audio
    audioService.playBalloonPop();

    // Trigger mini festive particle burst from pop point
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 3) / window.innerHeight;

    confetti({
      particleCount: 16,
      spread: 60,
      startVelocity: 18,
      origin: { x, y },
      colors: [balloon.theme.primary, balloon.theme.highlight, '#D8B879', '#FFFFFF'],
      shapes: ['circle'],
      ticks: 80,
      gravity: 0.7,
      scalar: 0.75,
    });

    // Remove popped balloon instantly
    setBalloons((prev) => prev.filter((b) => b.id !== balloon.id));
  };

  return (
    <div
      id={`heart-balloons-container-${containerId}`}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 25,
        overflow: 'hidden',
      }}
      aria-hidden="true"
    >
      <AnimatePresence>
        {balloons.map((b) => {
          const swayOffset = b.swayDistance * b.swayDirection;

          return (
            <motion.div
              key={b.id}
              initial={{
                y: '108vh',
                opacity: 0,
              }}
              animate={{
                y: '-35vh',
                opacity: [0, b.opacity, b.opacity, b.opacity, 0],
              }}
              exit={{
                scale: 1.4,
                opacity: 0,
                transition: { duration: 0.15 },
              }}
              transition={{
                y: {
                  duration: b.duration,
                  delay: b.delay,
                  ease: 'linear', // Steady helium ascension
                },
                opacity: {
                  duration: b.duration,
                  delay: b.delay,
                  times: [0, 0.08, 0.85, 0.95, 1],
                  ease: 'linear',
                },
              }}
              style={{
                position: 'absolute',
                left: `${b.leftPercent}%`,
                width: `${b.width}px`,
                height: `${b.width * 1.7}px`,
                zIndex: b.zIndex,
                pointerEvents: 'none',
                filter: b.blur > 0 ? `blur(${b.blur}px)` : undefined,
              }}
            >
              {/* Inner Swaying & Tilting Div (Oscillates side-to-side) */}
              <motion.div
                animate={{
                  x: [-swayOffset, swayOffset, -swayOffset],
                  rotate: [
                    b.rotation - 6,
                    b.rotation + 6,
                    b.rotation - 6,
                  ],
                }}
                transition={{
                  repeat: Infinity,
                  duration: b.swayDuration,
                  ease: 'easeInOut',
                }}
                whileHover={{
                  scale: 1.12,
                  transition: { duration: 0.2 },
                }}
                whileTap={{
                  scale: 0.85,
                }}
                onClick={(e) => handleBalloonClick(e, b)}
                title="Tap to pop with love ❤️"
                style={{
                  width: '100%',
                  height: '100%',
                  pointerEvents: 'auto',
                  cursor: 'pointer',
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                }}
              >
                <HeartBalloonSVG theme={b.theme} balloonId={b.id} />
              </motion.div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default HeartBalloons;
