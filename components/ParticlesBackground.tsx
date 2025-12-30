
import React, { useRef, useEffect } from 'react';

const ParticlesBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    const particles: { x: number; y: number; vx: number; vy: number; size: number }[] = [];
    const isMobile = width < 768;
    
    // REDUCED DENSITY: Matching user request for "a bit less"
    const PARTICLE_COUNT = isMobile ? 35 : 85; 
    const CONNECTION_DISTANCE = isMobile ? 140 : 190;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35, // Slightly slower, more elegant movement
        vy: (Math.random() - 0.5) * 0.35,
        size: Math.random() * 1.5 + 1.2, // Sharper, brighter dots
      });
    }

    const draw = () => {
      // Solid black background for high contrast
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      // Set colors for the network elements
      ctx.fillStyle = 'rgba(0, 243, 255, 0.9)'; // Brighter dots
      ctx.lineWidth = 0.7;

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.x += p1.vx;
        p1.y += p1.vy;

        // Wrap around logic
        if (p1.x < 0) p1.x = width;
        if (p1.x > width) p1.x = 0;
        if (p1.y < 0) p1.y = height;
        if (p1.y > height) p1.y = 0;

        // Draw the dot
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.size, 0, Math.PI * 2);
        ctx.fill();

        // Connect lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DISTANCE) {
            const alpha = 1 - (dist / CONNECTION_DISTANCE);
            // More visible lines as requested
            ctx.strokeStyle = `rgba(0, 243, 255, ${alpha * 0.35})`; 
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none bg-black"
    />
  );
};

export default ParticlesBackground;
