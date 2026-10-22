import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  radius: number;
  color: string;
  vx: number;
  vy: number;
  alpha: number;
  maxAlpha: number;
  alphaSpeed: number;
  type: 'goldDust' | 'rosePetal' | 'bokeh' | 'heart';
  angle: number;
  angularSpeed: number;
  size: number;
}

export const ParticleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const isMobile = width < 768;
    const particleCount = isMobile ? 45 : 95;
    const particles: Particle[] = [];

    const goldColors = ['#D8B879', '#F7E4BE', '#FFF4E8', '#E6C78E'];
    const roseColors = ['#D62855', '#F5B7C8', '#FF4D79', '#E06287'];

    for (let i = 0; i < particleCount; i++) {
      const rand = Math.random();
      let type: Particle['type'] = 'goldDust';
      if (rand < 0.6) {
        type = 'goldDust';
      } else if (rand < 0.8) {
        type = 'rosePetal';
      } else if (rand < 0.93) {
        type = 'bokeh';
      } else {
        type = 'heart';
      }

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: type === 'bokeh' ? Math.random() * 24 + 10 : Math.random() * 2.2 + 0.8,
        color:
          type === 'rosePetal' || type === 'heart'
            ? roseColors[Math.floor(Math.random() * roseColors.length)]
            : goldColors[Math.floor(Math.random() * goldColors.length)],
        vx: (Math.random() - 0.5) * 0.4,
        vy: type === 'rosePetal' ? Math.random() * 0.5 + 0.3 : (Math.random() - 0.5) * 0.35 - 0.2,
        alpha: Math.random() * 0.7 + 0.1,
        maxAlpha: type === 'bokeh' ? 0.15 : Math.random() * 0.65 + 0.25,
        alphaSpeed: Math.random() * 0.008 + 0.002,
        type,
        angle: Math.random() * Math.PI * 2,
        angularSpeed: (Math.random() - 0.5) * 0.02,
        size: Math.random() * 6 + 4,
      });
    }

    // Helper to draw tiny hearts
    const drawHeart = (c: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, alpha: number) => {
      c.save();
      c.translate(x, y);
      c.scale(size / 10, size / 10);
      c.fillStyle = color;
      c.globalAlpha = alpha;
      c.beginPath();
      c.moveTo(0, 0);
      c.bezierCurveTo(-5, -5, -10, 0, 0, 10);
      c.bezierCurveTo(10, 0, 5, -5, 0, 0);
      c.fill();
      c.restore();
    };

    // Helper to draw soft falling rose petals
    const drawPetal = (c: CanvasRenderingContext2D, p: Particle) => {
      c.save();
      c.translate(p.x, p.y);
      c.rotate(p.angle);
      c.fillStyle = p.color;
      c.globalAlpha = p.alpha;
      c.beginPath();
      c.ellipse(0, 0, p.size * 0.8, p.size * 1.5, 0, 0, Math.PI * 2);
      c.fill();
      c.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.angle += p.angularSpeed;

        // Alpha pulsing
        p.alpha += p.alphaSpeed;
        if (p.alpha > p.maxAlpha || p.alpha < 0.05) {
          p.alphaSpeed = -p.alphaSpeed;
        }

        // Screen boundary wraps
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        if (p.type === 'heart') {
          drawHeart(ctx, p.x, p.y, p.size, p.color, p.alpha);
        } else if (p.type === 'rosePetal') {
          drawPetal(ctx, p);
        } else if (p.type === 'bokeh') {
          ctx.save();
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.filter = 'blur(6px)';
          ctx.fill();
          ctx.restore();
        } else {
          // Delicate golden dust particle with soft glow
          ctx.save();
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.shadowBlur = 8;
          ctx.shadowColor = p.color;
          ctx.fill();
          ctx.restore();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 2,
        width: '100%',
        height: '100%',
      }}
      aria-hidden="true"
    />
  );
};
