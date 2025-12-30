
import React from 'react';
import { X, CheckCircle2, Zap, Mail, Layers } from 'lucide-react';
import Button from './Button';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceId: string | null;
}

const ServiceModal: React.FC<ServiceModalProps> = ({ isOpen, onClose, serviceId }) => {
  if (!isOpen || !serviceId) return null;

  const renderContent = () => {
    switch (serviceId) {
      case 'core':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-neon-blue mb-2">
              <Zap size={24} />
              <h3 className="text-lg md:text-xl font-bold font-mono uppercase tracking-widest">Core Protocol: SmartSite + Meta Ads</h3>
            </div>
            
            <div className="bg-neon-blue/10 border border-neon-blue/40 p-4 md:p-6 rounded-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-neon-blue/20 blur-2xl rounded-full -mr-8 -mt-8" />
              <h4 className="text-xl md:text-2xl font-bold text-white mb-2">Meta Ads Management is <span className="text-neon-blue">100% FREE</span></h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                We do not charge a management fee for your ads. You only pay for the system.
                Our AI optimizes your campaigns automatically.
              </p>
            </div>

            <div className="space-y-4">
              <h5 className="font-bold text-white">Operational Terms:</h5>
              <ul className="space-y-3">
                <li className="flex gap-3 text-gray-300 text-sm items-start">
                  <CheckCircle2 className="text-neon-blue min-w-[16px] mt-0.5" size={16} />
                  <span><strong>You Pay:</strong> £330 for the SmartSite System (Hosting, Design, Lead CRM).</span>
                </li>
                <li className="flex gap-3 text-gray-300 text-sm items-start">
                  <CheckCircle2 className="text-neon-blue min-w-[16px] mt-0.5" size={16} />
                  <span><strong>You Cover:</strong> Ad Spend paid directly to Meta (Facebook/Instagram).</span>
                </li>
                <li className="flex gap-3 text-gray-300 text-sm items-start">
                  <CheckCircle2 className="text-neon-blue min-w-[16px] mt-0.5" size={16} />
                  <span><strong>We Provide:</strong> Full ad setup, copywriting, creative, and ongoing optimization for <strong>$0 service fees</strong>.</span>
                </li>
                 <li className="flex gap-3 text-gray-300 text-sm items-start">
                  <CheckCircle2 className="text-neon-blue min-w-[16px] mt-0.5" size={16} />
                  <span><strong>Freedom:</strong> Cancel the system anytime. No handcuffs.</span>
                </li>
              </ul>
            </div>

            <Button onClick={onClose} className="w-full mt-4">Activate Core System</Button>
          </div>
        );

      case 'addon':
        return (
          <div className="space-y-6">
             <div className="flex items-center gap-3 text-neon-purple mb-2">
              <Mail size={24} />
              <h3 className="text-lg md:text-xl font-bold font-mono uppercase tracking-widest">Neural Sales Funnels</h3>
            </div>

            <p className="text-gray-400 text-sm">Psychology-backed email architectures designed to move leads down the funnel. Select your configuration:</p>

            <div className="grid gap-4">
              {/* Package 1 - 1 Email */}
              <div className="p-4 border border-gray-700 rounded-xl hover:border-neon-purple hover:bg-neon-purple/5 transition-all cursor-pointer group">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-bold text-white group-hover:text-neon-purple transition-colors">The Flashpoint Single</h4>
                  <span className="text-xs font-mono text-gray-500 border border-gray-700 px-2 py-1 rounded">1 Sales Email</span>
                </div>
                <p className="text-xs text-gray-400">A single, high-potency email designed to reactivate dormant lists or launch a quick offer.</p>
              </div>

              {/* Package 2 - 3 Emails */}
              <div className="p-4 border border-gray-700 rounded-xl hover:border-neon-purple hover:bg-neon-purple/5 transition-all cursor-pointer group">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-bold text-white group-hover:text-neon-purple transition-colors">The Conversion Triad</h4>
                  <span className="text-xs font-mono text-gray-500 border border-gray-700 px-2 py-1 rounded">3 Email Funnel</span>
                </div>
                <p className="text-xs text-gray-400">The classic "Value → Logic → Urgency" structure. Perfect for welcome sequences or mini-promos.</p>
              </div>

               {/* Package 3 - 4 Emails */}
               <div className="p-4 border border-neon-purple/50 bg-neon-purple/5 rounded-xl cursor-pointer relative overflow-hidden shadow-[0_0_15px_rgba(188,19,254,0.1)] hover:shadow-[0_0_25px_rgba(188,19,254,0.2)] transition-all">
                <div className="absolute top-0 right-0 bg-neon-purple text-black text-[9px] font-bold px-2 py-1">BEST SELLER</div>
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-bold text-white text-neon-purple">Cash Injection Protocol</h4>
                  <span className="text-xs font-bold text-black bg-neon-purple px-2 py-1 rounded">4 Email Funnel</span>
                </div>
                <p className="text-xs text-gray-300">A comprehensive 4-day open/close cart campaign designed to maximize revenue in a short window.</p>
              </div>
            </div>

             <Button onClick={onClose} variant="outline" className="w-full mt-4">Select Funnel Architecture</Button>
          </div>
        );

      case 'upgrade':
        return (
           <div className="space-y-6">
             <div className="flex items-center gap-3 text-white mb-2">
              <Layers size={24} />
              <h3 className="text-lg md:text-xl font-bold font-mono uppercase tracking-widest">Upgrade: Full Brand Architecture</h3>
            </div>
             <p className="text-gray-300 leading-relaxed text-sm">
               Expand beyond a landing page. We build a complete, multi-page digital ecosystem for established authorities, featuring a fully integrated <strong>Custom AI Chatbot</strong>.
             </p>
             <ul className="space-y-3 bg-gray-900 p-4 md:p-6 rounded-xl border border-gray-800">
                <li className="flex gap-3 text-gray-300 text-sm">
                  <CheckCircle2 className="text-white min-w-[16px]" size={16} />
                  <span>4 Custom Designed Pages</span>
                </li>
                <li className="flex gap-3 text-gray-300 text-sm">
                  <CheckCircle2 className="text-white min-w-[16px]" size={16} />
                  <span>Custom AI Chatbot Integration</span>
                </li>
                <li className="flex gap-3 text-gray-300 text-sm">
                  <CheckCircle2 className="text-white min-w-[16px]" size={16} />
                  <span>Lead Capture Spreadsheet / Meeting Booking System</span>
                </li>
                 <li className="flex gap-3 text-gray-300 text-sm">
                  <CheckCircle2 className="text-white min-w-[16px]" size={16} />
                  <span>3D / WebGL Elements</span>
                </li>
             </ul>
             <Button onClick={onClose} variant="secondary" className="w-full mt-4">Start Custom Project</Button>
           </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-md transition-opacity" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-lg bg-black border border-gray-800 rounded-2xl shadow-[0_0_50px_rgba(0,243,255,0.15)] overflow-hidden animate-fade-in-up transform transition-all max-h-[85vh] flex flex-col">
        {/* Decorative Top Bar */}
        <div className="h-1 w-full bg-gradient-to-r from-neon-blue via-neon-purple to-neon-blue animate-glow-pulse shrink-0" />
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors p-2 bg-gray-900/50 rounded-full hover:bg-gray-800 z-10"
        >
          <X size={20} />
        </button>

        <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default ServiceModal;
