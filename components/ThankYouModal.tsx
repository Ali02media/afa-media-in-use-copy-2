
import React from 'react';
import { CheckCircle2, X, Calendar } from 'lucide-react';
import Button from './Button';
import Confetti from './Confetti';

interface ThankYouModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ThankYouModal: React.FC<ThankYouModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <>
      <Confetti />
      <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/90 backdrop-blur-xl transition-opacity animate-fade-in-up" 
          onClick={onClose}
        />
        
        {/* Modal Content */}
        <div className="relative w-full max-w-md bg-black border border-neon-blue/50 rounded-2xl shadow-[0_0_50px_rgba(0,243,255,0.2)] overflow-hidden animate-fade-in-up transform transition-all flex flex-col items-center text-center p-8 md:p-12">
          
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-blue to-transparent animate-glow-pulse" />
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-neon-blue/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-neon-purple/10 rounded-full blur-3xl" />
          </div>

          {/* Icon */}
          <div className="relative mb-8">
              <div className="absolute inset-0 bg-neon-blue/20 blur-xl rounded-full animate-pulse" />
              <div className="relative w-20 h-20 bg-black border-2 border-neon-blue rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(0,243,255,0.4)]">
                  <CheckCircle2 size={40} className="text-neon-blue" />
              </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-wide">PHASE 1 COMPLETE</h2>
          <div className="flex items-center justify-center gap-2 text-neon-blue/80 font-mono text-xs uppercase tracking-widest mb-6">
              <Calendar size={12} className="animate-pulse" />
              <span>Initiating Phase 2</span>
          </div>

          <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-8">
            Intelligence received and encrypted. 
            <br /><br />
            To finalize the protocol, you must <span className="text-neon-blue font-bold">synchronize a time slot</span> for your secure strategy briefing.
          </p>

          <Button 
            className="w-full justify-center"
            data-cal-link="ali-ahmed-lwiikf/30min"
            data-cal-namespace="30min"
            data-cal-config='{"layout":"month_view"}'
          >
            Secure Time Slot
          </Button>

          <button onClick={onClose} className="mt-6 text-xs text-gray-500 hover:text-white font-mono uppercase tracking-wider">
            Return to Base (Skip)
          </button>
        </div>
      </div>
    </>
  );
};

export default ThankYouModal;
