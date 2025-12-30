
import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "h-12 md:h-24" }) => {
  // Ensuring the logo remains crisp with w-1000 resize parameter
  const logoUrl = "https://ik.imagekit.io/hxkb52bem/afa%20media%20logo%20no%20BG.png?tr=trim-true,w-1000&v=6.0";

  return (
    <img 
      src={logoUrl} 
      alt="AFA Media" 
      className={`${className} object-contain max-w-full`}
    />
  );
};

export default Logo;
