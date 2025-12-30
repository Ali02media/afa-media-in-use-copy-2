
import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "h-24" }) => {
  // Increased width to 1000 to ensure crispness at large display sizes
  const logoUrl = "https://ik.imagekit.io/hxkb52bem/afa%20media%20logo%20no%20BG.png?tr=trim-true,w-1000&v=6.0";

  return (
    <img 
      src={logoUrl} 
      alt="AFA Media" 
      className={`${className} object-contain`}
    />
  );
};

export default Logo;
