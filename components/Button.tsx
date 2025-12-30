import React from 'react';
import { ChevronRight } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  icon?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', icon = true, className = '', ...props }) => {
  const baseStyles = "relative group px-8 py-4 font-mono text-sm font-bold uppercase tracking-widest transition-all duration-300 overflow-hidden";
  
  const variants = {
    primary: "bg-neon-blue/10 text-neon-blue border border-neon-blue hover:bg-neon-blue hover:text-black shadow-[0_0_20px_rgba(0,243,255,0.2)] hover:shadow-[0_0_40px_rgba(0,243,255,0.6)]",
    secondary: "bg-white text-black border border-white hover:bg-gray-200",
    outline: "bg-transparent text-gray-300 border border-gray-700 hover:border-gray-400 hover:text-white"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
        {icon && <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />}
      </span>
    </button>
  );
};

export default Button;