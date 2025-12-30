import React from 'react';

interface GlitchTransitionProps {
  isActive: boolean;
}

const GlitchTransition: React.FC<GlitchTransitionProps> = ({ isActive }) => {
  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden pointer-events-none">
      {/* Noise Background */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-40 animate-noise mix-blend-overlay" />
      
      {/* Scanlines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.5)_51%)] bg-[length:100%_4px] opacity-20 pointer-events-none" />

      {/* Central Flash Text */}
      <div className="relative z-10 flex flex-col items-center">
         <h2 className="text-4xl md:text-6xl font-mono font-bold text-white tracking-widest uppercase glitch-text animate-pulse">
            NAVIGATING
         </h2>
         <div className="w-full h-1 bg-neon-blue mt-4 animate-scale-x" />
         <p className="text-neon-blue font-mono text-xs mt-2 tracking-[0.5em]">REROUTING_SYSTEM_VIEW</p>
      </div>

      {/* Color Shift Overlays */}
      <div className="absolute inset-0 bg-red-500/10 mix-blend-color-dodge animate-pulse" style={{ animationDuration: '0.1s' }} />
      <div className="absolute inset-0 bg-blue-500/10 mix-blend-color-dodge animate-pulse" style={{ animationDuration: '0.15s', animationDelay: '0.05s' }} />
      
      <style dangerouslySetInnerHTML={{__html: `
        .glitch-text {
            text-shadow: 2px 0 #ff0000, -2px 0 #00f3ff;
        }
        @keyframes scale-x {
            0% { transform: scaleX(0); }
            50% { transform: scaleX(1); }
            100% { transform: scaleX(0); }
        }
        .animate-scale-x {
            animation: scale-x 0.4s ease-in-out infinite;
        }
      `}} />
    </div>
  );
};

export default GlitchTransition;