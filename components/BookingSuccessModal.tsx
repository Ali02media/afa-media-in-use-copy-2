
import React from 'react';
import { CheckCircle2, ShieldCheck, X } from 'lucide-react';
import Button from './Button';
import Confetti from './Confetti';

interface BookingSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingSuccessModal: React.FC<BookingSuccessModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <>
      <Confetti />
      <div className="fixed inset-0 z-[120] flex items-center justify-center px-4">
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/95 backdrop-blur-xl transition-opacity animate-fade-in-up" 
          onClick={onClose}
        />
        
        {/* Modal Content */}
        <div className="relative w-full max-w-md bg-black border border-green-500/50 rounded-2xl shadow-[0_0_50px_rgba(34,197,94,0.2)] overflow-hidden animate-fade-in-up transform transition-all flex flex-col items-center text-center p-8 md:p-12">
          
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent animate-glow-pulse" />
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-green-500/10 rounded-full blur-3xl" />
          </div>

          {/* Icon */}
          <div className="relative mb-8">
              <div className="absolute inset-0 bg-green-500/20 blur-xl rounded-full animate-pulse" />
              <div className="relative w-20 h-20 bg-black border-2 border-green-500 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(34,197,94,0.4)]">
                  <ShieldCheck size={40} className="text-green-500" />
              </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-wide">MISSION CONFIRMED</h2>
          <div className="flex items-center justify-center gap-2 text-green-500/80 font-mono text-xs uppercase tracking-widest mb-6">
              <CheckCircle2 size={12} />
              <span>Strategy Session Locked</span>
          </div>

          <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-8">
            Your briefing time has been secured in our neural network. 
            <br /><br />
            A calendar invitation has been transmitted to your inbox. Prepare your assets for the strategy alignment.
          </p>

          <Button 
            className="w-full justify-center !border-green-500 !text-green-500 hover:!bg-green-500 hover:!text-black"
            onClick={onClose}
          >
            Return to Dashboard
          </Button>
        </div>
      </div>
    </>
  );
};

export default BookingSuccessModal;
