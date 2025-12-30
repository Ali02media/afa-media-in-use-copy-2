
import React from 'react';
import ScrollReveal from './ScrollReveal';

const steps = [
  {
    id: '01',
    title: 'Strategic Alignment',
    subtitle: 'Discovery Session',
    description: 'We initiate a direct strategy meeting to discuss your specific business needs, mapping out the exact operational objectives required for growth.'
  },
  {
    id: '02',
    title: 'Deep Reconnaissance',
    subtitle: '3-Layer Analysis',
    description: 'We research your audience on three deep levels: External (Circumstances), Internal (Pain Points), and Psychological (Identity) to guarantee resonance.'
  },
  {
    id: '03',
    title: 'System Architecture',
    subtitle: 'Build & Transparency',
    description: 'We engineer your custom system, transmitting detailed weekly progress updates to ensure the build aligns perfectly with your vision.',
    highlight: true
  },
  {
    id: '04',
    title: 'Deployment & Scale',
    subtitle: 'Launch Protocol',
    description: 'The system goes live. We analyze real-time performance data, optimize for conversion efficiency, and scale the campaigns that deliver ROI.'
  }
];

const ProcessTimeline: React.FC = () => {
  return (
    <div className="relative max-w-4xl mx-auto mt-20 px-4">
      {/* Vertical Central Line */}
      <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-neon-blue/50 to-transparent md:-translate-x-1/2" />

      <div className="space-y-12 md:space-y-24 relative">
        {steps.map((step, index) => {
          const isEven = index % 2 === 0;
          return (
            <div key={step.id} className={`flex flex-col md:flex-row items-start md:items-center ${isEven ? '' : 'md:flex-row-reverse'} gap-8 md:gap-0`}>
              
              {/* Text Content Side */}
              <div className={`md:w-1/2 pl-12 md:pl-0 ${isEven ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}`}>
                <ScrollReveal delay={index * 100}>
                  <div className="text-neon-blue font-mono text-xs font-bold tracking-[0.2em] mb-2">PHASE // {step.id}</div>
                  <h3 className="text-2xl font-bold text-white mb-1">{step.title}</h3>
                  <h4 className="text-sm font-mono text-gray-500 mb-4 uppercase">{step.subtitle}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </ScrollReveal>
              </div>

              {/* Center Node */}
              <div className="absolute left-[20px] md:left-1/2 -translate-x-1/2 flex items-center justify-center">
                <ScrollReveal delay={index * 100 + 50}>
                  <div className={`w-4 h-4 rounded-full border-2 border-black z-10 ${step.highlight ? 'bg-neon-blue shadow-[0_0_15px_#00f3ff]' : 'bg-gray-800 border-gray-600'}`}>
                    {step.highlight && <div className="absolute inset-0 w-full h-full rounded-full bg-neon-blue animate-ping opacity-50" />}
                  </div>
                </ScrollReveal>
              </div>

              {/* Spacer for the other side */}
              <div className="hidden md:block md:w-1/2" />
              
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProcessTimeline;
