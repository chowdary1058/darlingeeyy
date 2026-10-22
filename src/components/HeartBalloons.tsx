import React, { useState, useEffect, useCallback, useRef, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { audioService } from '../utils/audioSynthesizer';
import { Sparkles, Heart } from 'lucide-react';

export interface BalloonTheme {
  id: string;
  name: string;
  highlight: string;
  primary: string;
  dark: string;
  shadowGlow: string;
  stringColor: string;
}

const ROMANTIC_RED_THEMES: BalloonTheme[] = [
  {
    id: 'cherry',
    name: 'Radiant Cherry Red',
    highlight: '#FF8DA1',
    primary: '#E60039',
    dark: '#7A001C',
    shadowGlow: 'rgba(230, 0, 57, 0.45)',
    stringColor: 'rgba(255, 175, 190, 0.75)',
  },
  {
    id: 'ruby',
    name: 'Ruby Crimson',
    highlight: '#FFA8BA',
    primary: '#C9184A',
    dark: '#590D22',
    shadowGlow: 'rgba(201, 24, 74, 0.5)',
    stringColor: 'rgba(255, 190, 205, 0.75)',
  },
  {
    id: 'softCrimson',
    name: 'Soft Crimson Rose',
    highlight: '#FFCCD5',
    primary: '#FF4D6D',
    dark: '#800F2F',
    shadowGlow: 'rgba(255, 77, 109, 0.45)',
    stringColor: 'rgba(255, 210, 220, 0.75)',
  },
  {
    id: 'velvetWine',
    name: 'Deep Velvet Burgundy',
    highlight: '#DB4D71',
    primary: '#8A0A2E',
    dark: '#3D0010',
    shadowGlow: 'rgba(138, 10, 46, 0.55)',
    stringColor: 'rgba(230, 150, 170, 0.65)',
  },
  {
    id: 'roseCoral',
    name: 'Luminous Rose Coral',
    highlight: '#FFE5EC',
    primary: '#FF3366',
    dark: '#99002E',
    shadowGlow: 'rgba(255, 51, 102, 0.45)',
    stringColor: 'rgba(255, 200, 215, 0.75)',
  },
];

type BalloonShape = 'oval' | 'heart';
type CornerOrigin = 'left' | 'right';

interface BalloonItem {
  id: string;
  shape: BalloonShape;
  corner: CornerOrigin;
  startLeftPercent: number; // 2% to 15% (left) or 83% to 96% (right)
  driftX: number; // Inward drift towards center
  width: number; // 46px to 84px
  scale: number; // 0.75 to 1.3
  duration: number; // 8s to 14s (slow, dreamy helium ascent)
  delay: number; // 0s to 1.5s
  swayDistance: number; // 18px to 36px
  swayDuration: number; // 2.4s to 4s
  rotation: number; // -12deg to 12deg
  theme: BalloonTheme;
  opacity: number;
  hasSparkles: boolean;
  zIndex: number;
}

interface BlastedTextItem {
  id: string;
  x: number;
  y: number;
  text: string;
}

interface HeartBalloonsProps {
  /** Trigger key changes (like scene changes) release an extra celebratory flurry */
  triggerKey?: string;
  /** Max concurrent balloons allowed on screen */
  maxBalloons?: number;
}

/**
 * 3D Classic Oval Red Balloon with realistic radial lighting,
 * specular foil/latex gloss, tied knot, and fluttering string.
 */
const OvalBalloonSVG: React.FC<{ theme: BalloonTheme; balloonId: string }> = ({
  theme,
  balloonId,
}) => {
  const gradId = `oval-grad-${balloonId}`;
  const knotGradId = `knot-grad-${balloonId}`;

  return (
    <svg
      viewBox="0 0 100 170"
      width="100%"
      height="100%"
      style={{
        overflow: 'visible',
        filter: `drop-shadow(0 12px 24px ${theme.shadowGlow}) drop-shadow(0 4px 10px rgba(0,0,0,0.5))`,
      }}
    >
      <defs>
        {/* Realistic 3D radial light highlight */}
        <radialGradient id={gradId} cx="34%" cy="26%" r="68%">
          <stop offset="0%" stopColor={theme.highlight} stopOpacity="1" />
          <stop offset="40%" stopColor={theme.primary} stopOpacity="1" />
          <stop offset="88%" stopColor={theme.dark} stopOpacity="1" />
          <stop offset="100%" stopColor="#1E0007" stopOpacity="0.95" />
        </radialGradient>

        <linearGradient id={knotGradId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={theme.primary} />
          <stop offset="100%" stopColor={theme.dark} />
        </linearGradient>

        <filter id={`blur-o-${balloonId}`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="0.8" />
        </filter>
      </defs>

      {/* Swaying ribbon / string */}
      <path
        d="M 50 100 C 42 116, 58 130, 47 146 C 38 160, 54 172, 48 186"
        fill="none"
        stroke={theme.stringColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.9"
      />

      {/* Balloon Knot at bottom */}
      <path
        d="M 44 95 L 56 95 L 59 101 L 41 101 Z"
        fill={`url(#${knotGradId})`}
      />
      <circle cx="50" cy="101" r="2.2" fill={theme.dark} />

      {/* Main Oval Balloon Body */}
      <path
        d="M 50 4 C 22 4, 6 26, 6 56 C 6 82, 26 95, 45 98 L 55 98 C 74 95, 94 82, 94 56 C 94 26, 78 4, 50 4 Z"
        fill={`url(#${gradId})`}
      />

      {/* Specular curved gloss reflection */}
      <ellipse
        cx="30"
        cy="32"
        rx="9"
        ry="20"
        transform="rotate(-26 30 32)"
        fill="#FFFFFF"
        fillOpacity="0.55"
        filter={`url(#blur-o-${balloonId})`}
      />

      {/* Secondary bright gleam */}
      <ellipse
        cx="25"
        cy="24"
        rx="4.5"
        ry="7"
        transform="rotate(-26 25 24)"
        fill="#FFFFFF"
        fillOpacity="0.75"
      />

      {/* Subtle rim light along bottom right */}
      <path
        d="M 86 42 C 86 68, 72 84, 55 93"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="2.2"
        strokeOpacity="0.32"
        strokeLinecap="round"
        filter={`url(#blur-o-${balloonId})`}
      />
    </svg>
  );
};

/**
 * 3D Heart-Shaped Red Balloon with realistic 3D volume,
 * specular gloss reflection, tie knot, and waving string.
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
        filter: `drop-shadow(0 12px 24px ${theme.shadowGlow}) drop-shadow(0 4px 10px rgba(0,0,0,0.5))`,
      }}
    >
      <defs>
        <radialGradient id={gradId} cx="36%" cy="26%" r="68%">
          <stop offset="0%" stopColor={theme.highlight} stopOpacity="1" />
          <stop offset="45%" stopColor={theme.primary} stopOpacity="1" />
          <stop offset="90%" stopColor={theme.dark} stopOpacity="1" />
          <stop offset="100%" stopColor="#1E0007" stopOpacity="0.95" />
        </radialGradient>

        <linearGradient id={knotGradId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={theme.primary} />
          <stop offset="100%" stopColor={theme.dark} />
        </linearGradient>

        <filter id={`hblur-${balloonId}`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="0.8" />
        </filter>
      </defs>

      {/* Floating Curling String / Ribbon */}
      <path
        d="M 50 87 C 42 102, 56 116, 47 132 C 38 146, 55 160, 48 174"
        fill="none"
        stroke={theme.stringColor}
        strokeWidth="1.5"
        strokeLinecap="round"
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

      {/* Specular Curved Foil Gloss */}
      <path
        d="M 18 16 C 26 8, 38 10, 42 16 C 36 21, 25 21, 18 16 Z"
        fill="#FFFFFF"
        fillOpacity="0.48"
        filter={`url(#hblur-${balloonId})`}
      />

      {/* Primary Gloss Oval */}
      <ellipse
        cx="28"
        cy="22"
        rx="9"
        ry="5"
        transform="rotate(-30 28 22)"
        fill="#FFFFFF"
        fillOpacity="0.6"
      />

      {/* Pin-point gleam */}
      <circle cx="20" cy="29" r="2.5" fill="#FFFFFF" fillOpacity="0.55" />

      {/* Rim light along right curve */}
      <path
        d="M 88 32 C 86 52, 70 68, 52 79"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="2.2"
        strokeOpacity="0.32"
        strokeLinecap="round"
        filter={`url(#hblur-${balloonId})`}
      />
    </svg>
  );
};

export const HeartBalloons: React.FC<HeartBalloonsProps> = ({
  triggerKey = 'default',
  maxBalloons = 14,
}) => {
  const [balloons, setBalloons] = useState<BalloonItem[]>([]);
  const [blastedTexts, setBlastedTexts] = useState<BlastedTextItem[]>([]);
  const containerId = useId();
  const balloonCounterRef = useRef<number>(0);

  // Helper to create a single balloon launching from bottom-left or bottom-right
  const createBalloon = useCallback(
    (cornerOverride?: CornerOrigin, delay: number = 0): BalloonItem => {
      balloonCounterRef.current += 1;
      const id = `balloon-${Date.now()}-${balloonCounterRef.current}`;
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

      // Choose origin corner: bottom-left or bottom-right
      const corner: CornerOrigin =
        cornerOverride || (Math.random() < 0.5 ? 'left' : 'right');

      // Bottom-left starts at 2%-14%, bottom-right starts at 84%-96%
      const startLeftPercent =
        corner === 'left'
          ? Math.random() * 12 + 2
          : Math.random() * 12 + 84;

      // Inward drift towards center as it rises
      const driftX =
        corner === 'left'
          ? Math.random() * 45 + 15 // drifts rightward
          : -(Math.random() * 45 + 15); // drifts leftward

      // 40% chance heart-shaped, 60% chance classic oval 3D balloon
      const shape: BalloonShape = Math.random() < 0.4 ? 'heart' : 'oval';

      // Varied depth, scale, and speeds
      const depthRand = Math.random();
      let scale = 1;
      let duration = 11;
      let opacity = 0.95;
      let zIndex = 30;

      if (depthRand < 0.3) {
        // Background layer: smaller, slower, dreamy
        scale = 0.72 + Math.random() * 0.18;
        duration = 13 + Math.random() * 3.5;
        opacity = 0.75;
        zIndex = 16;
      } else if (depthRand < 0.8) {
        // Midground layer: balanced
        scale = 0.95 + Math.random() * 0.2;
        duration = 10 + Math.random() * 2.5;
        opacity = 0.92;
        zIndex = 26;
      } else {
        // Foreground hero balloon: bold, vibrant
        scale = 1.15 + Math.random() * 0.25;
        duration = 8.5 + Math.random() * 2;
        opacity = 1;
        zIndex = 36;
      }

      const baseWidth = isMobile ? 48 : 62;
      const theme =
        ROMANTIC_RED_THEMES[
          Math.floor(Math.random() * ROMANTIC_RED_THEMES.length)
        ];

      return {
        id,
        shape,
        corner,
        startLeftPercent,
        driftX,
        width: baseWidth * scale,
        scale,
        duration,
        delay,
        swayDistance: 18 + Math.random() * 20,
        swayDuration: 2.6 + Math.random() * 1.4,
        rotation: (Math.random() - 0.5) * 20,
        theme,
        opacity,
        hasSparkles: Math.random() < 0.35, // Some balloons have delicate orbiting sparkles
        zIndex,
      };
    },
    []
  );

  // Initial populate with balloons at staggered intervals from both corners
  useEffect(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const initialCount = isMobile ? 6 : 8;

    const initialBalloons: BalloonItem[] = [];
    for (let i = 0; i < initialCount; i++) {
      const corner = i % 2 === 0 ? 'left' : 'right';
      initialBalloons.push(createBalloon(corner, i * 0.4));
    }
    setBalloons(initialBalloons);
  }, [createBalloon]);

  // Continuous Spawning: periodically add new balloons from both corners
  useEffect(() => {
    const interval = setInterval(() => {
      setBalloons((prev) => {
        if (prev.length >= maxBalloons) return prev;
        // Alternate or randomly pick corner
        const corner: CornerOrigin = Math.random() < 0.5 ? 'left' : 'right';
        const newBalloon = createBalloon(corner, 0);
        return [...prev, newBalloon];
      });
    }, 2400);

    return () => clearInterval(interval);
  }, [createBalloon, maxBalloons]);

  // Page/Scene change trigger: release a celebratory flurry from both corners
  useEffect(() => {
    // When scene changes, launch 4-6 balloons immediately
    const burstCount = 6;
    const flurry: BalloonItem[] = [];
    for (let i = 0; i < burstCount; i++) {
      const corner = i % 2 === 0 ? 'left' : 'right';
      flurry.push(createBalloon(corner, i * 0.25));
    }

    setBalloons((prev) => [...prev, ...flurry]);
  }, [triggerKey, createBalloon]);

  // Periodic cleanup of balloons that have completed their journey
  const removeBalloon = useCallback((id: string) => {
    setBalloons((prev) => prev.filter((b) => b.id !== id));
  }, []);

  // Handle clicking or tapping a balloon: Pop + Confetti Burst + Spawn Small "I Love You ❤️" at the blasted area
  const handleBalloonClick = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
    balloon: BalloonItem
  ) => {
    e.stopPropagation();
    e.preventDefault();

    // Sound effects
    audioService.playBalloonPop();
    setTimeout(() => audioService.playChime(), 120);

    // Get exact blasted coordinates
    let clientX = window.innerWidth / 2;
    let clientY = window.innerHeight / 2;

    if ('clientX' in e && typeof e.clientX === 'number') {
      clientX = e.clientX;
      clientY = e.clientY;
    } else if ('touches' in e && e.touches && e.touches[0]) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    }

    const normX = clientX / window.innerWidth;
    const normY = clientY / window.innerHeight;

    // Trigger magical heart confetti and glitter explosion at blasted point
    try {
      const heartShape =
        typeof confetti.shapeFromPath === 'function'
          ? confetti.shapeFromPath({
              path: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z',
            })
          : 'circle';

      // Initial burst of red hearts & gold sparkles
      confetti({
        particleCount: 22,
        spread: 65,
        startVelocity: 20,
        origin: { x: normX, y: normY },
        colors: [
          balloon.theme.primary,
          balloon.theme.highlight,
          '#FF0054',
          '#D8B879',
          '#FFFFFF',
        ],
        shapes: [heartShape, 'circle'],
        ticks: 90,
        gravity: 0.7,
        scalar: 1.05,
      });

      // Secondary gentle glitter
      setTimeout(() => {
        confetti({
          particleCount: 12,
          spread: 80,
          startVelocity: 14,
          origin: { x: normX, y: normY },
          colors: ['#D8B879', '#FFCCD5', '#FFF4E8'],
          ticks: 60,
          gravity: 0.5,
          scalar: 0.8,
        });
      }, 120);
    } catch {
      // Safe fallback
    }

    // Immediately remove popped balloon
    removeBalloon(balloon.id);

    // Keep within screen edges
    const clampedX = Math.max(90, Math.min(window.innerWidth - 90, clientX));
    const clampedY = Math.max(35, Math.min(window.innerHeight - 35, clientY));

    // Spawn cute, small "I Love You ❤️" badge directly at the blasted location
    const newBlastedText: BlastedTextItem = {
      id: `blast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      x: clampedX,
      y: clampedY,
      text: 'I Love You ❤️',
    };

    setBlastedTexts((prev) => [...prev, newBlastedText]);

    // Clean up after floating and fading out
    setTimeout(() => {
      setBlastedTexts((prev) => prev.filter((item) => item.id !== newBlastedText.id));
    }, 2400);
  };

  return (
    <>
      {/* Balloons Animation Layer */}
      <div
        id={`romantic-balloons-container-${containerId}`}
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
            const swayOffset = b.swayDistance;

            return (
              <motion.div
                key={b.id}
                initial={{
                  y: '110vh',
                  x: 0,
                  opacity: 0,
                }}
                animate={{
                  y: '-35vh',
                  x: b.driftX,
                  opacity: [0, b.opacity, b.opacity, b.opacity, 0],
                }}
                exit={{
                  scale: 1.4,
                  opacity: 0,
                  transition: { duration: 0.18 },
                }}
                transition={{
                  y: {
                    duration: b.duration,
                    delay: b.delay,
                    ease: 'linear', // Natural steady helium ascent
                  },
                  x: {
                    duration: b.duration,
                    delay: b.delay,
                    ease: 'easeInOut',
                  },
                  opacity: {
                    duration: b.duration,
                    delay: b.delay,
                    times: [0, 0.08, 0.85, 0.95, 1],
                    ease: 'linear',
                  },
                }}
                onAnimationComplete={() => removeBalloon(b.id)}
                style={{
                  position: 'absolute',
                  left: `${b.startLeftPercent}%`,
                  width: `${b.width}px`,
                  height: `${b.width * 1.7}px`,
                  zIndex: b.zIndex,
                  pointerEvents: 'none',
                }}
              >
                {/* Harmonic Swaying & Tilting Inner Container */}
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
                    scale: 1.14,
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{
                    scale: 0.88,
                  }}
                  onClick={(e) => handleBalloonClick(e, b)}
                  onTouchEnd={(e) => handleBalloonClick(e, b)}
                  title="Click to pop with love ❤️"
                  style={{
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'auto',
                    cursor: 'pointer',
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    position: 'relative',
                  }}
                >
                  {/* Render 3D Heart or Oval Red Balloon */}
                  {b.shape === 'heart' ? (
                    <HeartBalloonSVG theme={b.theme} balloonId={b.id} />
                  ) : (
                    <OvalBalloonSVG theme={b.theme} balloonId={b.id} />
                  )}

                  {/* Optional Orbiting Sparkles / Floating Hearts */}
                  {b.hasSparkles && (
                    <motion.div
                      animate={{
                        y: [-6, 6, -6],
                        opacity: [0.35, 0.95, 0.35],
                        scale: [0.8, 1.2, 0.8],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 2.2,
                        ease: 'easeInOut',
                      }}
                      style={{
                        position: 'absolute',
                        top: '-6px',
                        right: '-8px',
                        pointerEvents: 'none',
                        color: '#D8B879',
                        filter: 'drop-shadow(0 0 6px rgba(216, 184, 121, 0.8))',
                      }}
                    >
                      <Sparkles size={14} />
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Small “I Love You ❤️” Text Badges popping at the exact blasted location */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 90,
          overflow: 'hidden',
        }}
        aria-hidden="true"
      >
        <AnimatePresence>
          {blastedTexts.map((item) => (
            <motion.div
              key={item.id}
              initial={{
                scale: 0.3,
                opacity: 0,
                x: item.x,
                y: item.y,
              }}
              animate={{
                scale: [0.3, 1.1, 1],
                opacity: [0, 1, 1, 0.9, 0],
                y: item.y - 50,
              }}
              exit={{
                scale: 0.75,
                opacity: 0,
                y: item.y - 65,
                transition: { duration: 0.3 },
              }}
              transition={{
                duration: 2.2,
                times: [0, 0.15, 0.65, 0.85, 1],
                ease: 'easeOut',
              }}
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              {/* Floating micro hearts rising from the text */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ y: 0, opacity: 0, scale: 0.5 }}
                  animate={{
                    y: -22 - i * 8,
                    x: (i - 1) * 10,
                    opacity: [0, 1, 0],
                    scale: [0.5, 1, 0.6],
                  }}
                  transition={{
                    duration: 1.4,
                    delay: 0.08 + i * 0.1,
                    ease: 'easeOut',
                  }}
                  style={{
                    position: 'absolute',
                    top: '-6px',
                    color: '#FF4D6D',
                    filter: 'drop-shadow(0 0 5px rgba(255, 77, 109, 0.9))',
                  }}
                >
                  <Heart size={10 + i * 2} fill="currentColor" />
                </motion.div>
              ))}

              {/* Compact, adorable romantic badge */}
              <div
                style={{
                  background:
                    'radial-gradient(ellipse at center, rgba(160, 20, 60, 0.95) 0%, rgba(35, 10, 20, 0.96) 100%)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1.2px solid rgba(255, 130, 160, 0.65)',
                  boxShadow:
                    '0 8px 24px rgba(214, 40, 85, 0.55), 0 2px 8px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 244, 232, 0.4)',
                  borderRadius: '9999px',
                  padding: '5px 14px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  whiteSpace: 'nowrap',
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <Sparkles size={12} color="#D8B879" />
                <span
                  style={{
                    fontFamily: "'Great Vibes', cursive",
                    fontSize: '1.55rem',
                    color: '#FFF4E8',
                    textShadow:
                      '0 0 12px rgba(255, 77, 109, 0.95), 0 0 20px rgba(214, 40, 85, 0.6)',
                    lineHeight: 1,
                    letterSpacing: '0.01em',
                  }}
                >
                  {item.text}
                </span>
                <Sparkles size={12} color="#D8B879" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
};

export default HeartBalloons;
