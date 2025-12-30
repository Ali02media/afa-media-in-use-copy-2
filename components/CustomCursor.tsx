
import React, { useEffect, useState, useRef } from 'react';

const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  // Use refs for high-performance updates (bypassing React render cycle)
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  
  const mousePos = useRef({ x: 0, y: 0 });
  const followerPos = useRef({ x: 0, y: 0 });
  const isHovering = useRef(false);

  useEffect(() => {
    // detect touch
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    setIsVisible(true);

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      mousePos.current = { x: clientX, y: clientY };
      
      // Update main dot instantly for accuracy (Zero Latency)
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0) translate(-50%, -50%)`;
      }

      // Check hover target
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'input' ||
        target.tagName.toLowerCase() === 'textarea' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('cursor-pointer');
      
      isHovering.current = !!isClickable;
    };

    window.addEventListener('mousemove', onMouseMove);
    
    let animationFrameId: number;
    
    const animateFollower = () => {
      if (followerRef.current) {
        // Smooth LERP for follower
        // Increased easing to 0.2 for a snappier, more accurate feel
        const ease = 0.2;
        
        followerPos.current.x += (mousePos.current.x - followerPos.current.x) * ease;
        followerPos.current.y += (mousePos.current.y - followerPos.current.y) * ease;
        
        const scale = isHovering.current ? 1.8 : 1;
        const opacity = isHovering.current ? '0.5' : '0.3';
        const bg = isHovering.current ? 'rgba(0, 243, 255, 0.1)' : 'transparent';

        followerRef.current.style.transform = `translate3d(${followerPos.current.x}px, ${followerPos.current.y}px, 0) translate(-50%, -50%) scale(${scale})`;
        followerRef.current.style.opacity = opacity;
        followerRef.current.style.backgroundColor = bg;
      }
      animationFrameId = requestAnimationFrame(animateFollower);
    };
    
    animateFollower();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Main dot - Precise & Zero Latency */}
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-neon-blue rounded-full pointer-events-none z-[9999] mix-blend-difference shadow-[0_0_5px_#00f3ff]"
        style={{ opacity: 1 }} 
      />
      {/* Follower Ring - Smooth Lag */}
      <div 
        ref={followerRef}
        className="fixed top-0 left-0 w-8 h-8 border border-neon-blue rounded-full pointer-events-none z-[9998] transition-colors duration-200"
        style={{ opacity: 0.3 }} 
      />
    </>
  );
};

export default CustomCursor;
