import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: number;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 20, className = "" }) => {
  return (
    <Loader2 
      size={size} 
      className={`animate-spin text-neon-blue drop-shadow-[0_0_8px_rgba(0,243,255,0.6)] ${className}`} 
    />
  );
};

export default LoadingSpinner;