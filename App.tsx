
import React, { useState, useEffect } from 'react';
import { ChevronDown, Sparkles, CheckCircle2, ArrowRight, Menu, X, Phone, Mail } from 'lucide-react';
import ParticlesBackground from './components/ParticlesBackground';
import ServiceModal from './components/ServiceModal';
import CustomCursor from './components/CustomCursor';
import ProcessTimeline from './components/ProcessTimeline';
import ThankYouModal from './components/ThankYouModal';
import BookingSuccessModal from './components/BookingSuccessModal';
import Logo from './components/Logo';
import LoadingSpinner from './components/LoadingSpinner';
import ScrollReveal from './components/ScrollReveal';
import { SERVICES, PAIN_POINTS, SOLUTIONS, TESTIMONIALS, GOOGLE_SHEETS_WEBHOOK_URL } from './constants';

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [showBookingSuccess, setShowBookingSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', url: '', service: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const smoothScrollTo = (targetId: string) => {
    const targetElement = document.getElementById(targetId);
    if (!targetElement) return;
    setMobileMenuOpen(false);
    const headerOffset = 90;
    const elementPosition = targetElement.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  };

  const handleNavClick = (id: string) => smoothScrollTo(id);
  const handleServiceClick = (id: string) => setActiveModal(id);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.service) {
      setFormErrors({ 
        name: !formData.name ? 'Required' : '', 
        email: !formData.email ? 'Required' : '',
        service: !formData.service ? 'Required' : ''
      });
      return;
    }
    setFormStatus('submitting');
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => data.append(key, (value as string).trim()));
      await fetch(GOOGLE_SHEETS_WEBHOOK_URL, { method: 'POST', mode: 'no-cors', body: data });
      setFormStatus('success');
      setShowThankYou(true);
      setFormData({ name: '', email: '', phone: '', url: '', service: '', message: '' });
    } catch (error) {
      setFormStatus('error');
    }
  };

  const getInputClass = (fieldName: string) => `
    w-full bg-[#0a0a0f] border ${formErrors[fieldName] ? 'border-red-500' : 'border-gray-800'} rounded-lg p-4 text-white outline-none transition-all focus:border-neon-blue/50
    disabled:opacity-50 font-sans text-sm
  `;

  return (
    <div className="relative min-h-screen text-white font-sans selection:bg-neon-blue selection:text-black bg-black overflow-x-hidden w-full flex flex-col items-center">
      <CustomCursor />
      <ParticlesBackground />
      
      <ServiceModal isOpen={!!activeModal} onClose={() => setActiveModal(null)} serviceId={activeModal} />
      <ThankYouModal isOpen={showThankYou} onClose={() => { setShowThankYou(false); setFormStatus('idle'); }} />
      <BookingSuccessModal isOpen={showBookingSuccess} onClose={() => setShowBookingSuccess(false)} />
      
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${scrolled ? 'bg-black/95 backdrop-blur-md border-b border-gray-900 py-2 md:py-3' : 'bg-transparent py-4 md:py-6'}`}>
        <div className="max-w-7xl mx-auto px-5 flex justify-between items-center">
          <div className="cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <Logo className="h-12 md:h-24 w-auto transition-all duration-300 transform hover:scale-105" />
          </div>
          <div className="hidden md:flex items-center gap-10 text-[10px] font-mono font-bold text-gray-400 tracking-[0.2em] uppercase">
            <button onClick={() => handleNavClick('problem')} className="hover:text-neon-blue transition-colors outline-none">The Problem</button>
            <button onClick={() => handleNavClick('services')} className="hover:text-neon-blue transition-colors outline-none">Systems</button>
            <button onClick={() => handleNavClick('process')} className="hover:text-neon-blue transition-colors outline-none">Process</button>
            <button onClick={() => handleNavClick('contact')} className="text-white hover:text-neon-blue transition-colors outline-none">Start Project //</button>
          </div>
          <button className="md:hidden text-white p-2 outline-none" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {/* Mobile Menu Drawer */}
        <div className={`fixed inset-0 bg-black/95 backdrop-blur-xl z-[90] md:hidden transition-transform duration-500 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex flex-col items-center justify-center h-full gap-8 px-6">
                <button onClick={() => handleNavClick('problem')} className="text-xl font-mono text-gray-400 uppercase tracking-widest">The Problem</button>
                <button onClick={() => handleNavClick('services')} className="text-xl font-mono text-gray-400 uppercase tracking-widest">Systems</button>
                <button onClick={() => handleNavClick('process')} className="text-xl font-mono text-gray-400 uppercase tracking-widest">Process</button>
                <button onClick={() => handleNavClick('contact')} className="w-full text-center text-lg font-mono text-neon-blue uppercase tracking-widest border border-neon-blue/30 px-8 py-4 rounded-full">Start Project</button>
            </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative min-h-[100dvh] flex flex-col justify-center items-center text-center px-6 pt-24 md:pt-20 w-full overflow-hidden">
        {/* Anti-shift centered glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[300px] md:h-[400px] bg-neon-blue/10 blur-[120px] rounded-full pointer-events-none z-0 opacity-80" />

        <div className="max-w-5xl mx-auto z-10 w-full">
          <ScrollReveal>
            <h1 className="text-4xl md:text-[5.5rem] font-bold tracking-tight mb-8 leading-[1.1] uppercase">
              SCALE WITH<br />
              <span 
                className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f3ff] to-[#bc13fe] drop-shadow-[0_0_15px_rgba(0,243,255,0.4)]"
                style={{ WebkitBackgroundClip: 'text' }}
              >
                INTELLIGENCE
              </span>
            </h1>
          </ScrollReveal>
          
          <ScrollReveal delay={200}>
            <p className="text-gray-400 text-base md:text-xl max-w-2xl mx-auto mb-10 md:mb-12 leading-relaxed font-light px-2">
              We replace outdated websites with AI-Powered SmartSites & High-Conversion Meta Ads. The future of client acquisition is here.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center w-full max-w-xs sm:max-w-none mx-auto">
              <button onClick={() => handleNavClick('contact')} className="w-full sm:w-auto px-8 md:px-10 py-5 bg-transparent border border-[#00f3ff] text-[#00f3ff] font-mono text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#00f3ff]/10 transition-all shadow-[0_0_20px_rgba(0,243,255,0.2)] inline-flex items-center justify-center gap-3 group outline-none">
                BOOK DISCOVERY CALL <ChevronDown className="-rotate-90 group-hover:translate-x-1 transition-transform" size={14} />
              </button>
              <button onClick={() => handleNavClick('services')} className="w-full sm:w-auto px-8 md:px-10 py-5 bg-transparent border border-gray-800 text-gray-400 font-mono text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] hover:border-gray-500 hover:text-white transition-all inline-flex items-center justify-center gap-2 outline-none">
                Explore Systems
              </button>
            </div>
          </ScrollReveal>
        </div>
      </header>

      {/* Problem Section */}
      <section id="problem" className="py-24 md:py-32 relative scroll-mt-24 w-full overflow-hidden flex flex-col items-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <ScrollReveal>
            <div className="mb-16 md:mb-20 text-center md:text-left">
              <h2 className="text-[10px] font-mono text-neon-blue mb-4 uppercase tracking-[0.4em] font-bold">System Failure</h2>
              <h3 className="text-3xl md:text-5xl font-bold">Why The Old Way Is Broken</h3>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {PAIN_POINTS.map((item, i) => (
              <ScrollReveal key={i} delay={i * 150}>
                <div className="bg-[#050505]/60 backdrop-blur-sm p-8 md:p-10 rounded-2xl border border-white/5 hover:border-red-500/30 transition-all duration-300 transform hover:scale-[1.02] group h-full">
                  <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center mb-8 md:mb-10 text-red-500 border border-red-500/20 group-hover:scale-110 transition-transform">
                    <item.icon size={20} />
                  </div>
                  <h4 className="text-xl md:text-2xl font-bold mb-4 md:mb-5 tracking-tight group-hover:text-red-400 transition-colors">{item.title}</h4>
                  <p className="text-gray-500 leading-relaxed text-sm md:text-[15px]">{item.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Upgrade Protocol Section */}
      <section id="upgrade" className="py-24 md:py-32 relative scroll-mt-24 w-full overflow-hidden flex flex-col items-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <ScrollReveal>
            <div className="text-center mb-16 md:mb-20">
              <h2 className="text-[10px] font-mono text-neon-blue mb-4 uppercase tracking-[0.4em] font-bold">System Architecture</h2>
              <h3 className="text-3xl md:text-5xl font-bold uppercase">The Upgrade Protocol</h3>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {SOLUTIONS.map((item, i) => (
              <ScrollReveal key={i} delay={i * 150}>
                <div className="bg-[#050505]/60 backdrop-blur-sm p-8 md:p-10 rounded-2xl border border-white/5 relative overflow-hidden group hover:border-neon-blue/30 transition-all duration-300 transform hover:scale-[1.02] h-full">
                  {item.badge && <div className="absolute top-6 right-6 bg-[#00f3ff] text-black text-[9px] font-black px-2 py-0.5 rounded tracking-tighter shadow-[0_0_15px_#00f3ff]">{item.badge}</div>}
                  <div className="w-12 h-12 bg-neon-blue/10 rounded-lg flex items-center justify-center mb-8 md:mb-10 text-neon-blue border border-neon-blue/20 shadow-[0_0_15px_rgba(0,243,255,0.1)] group-hover:shadow-[0_0_25px_rgba(0,243,255,0.3)] transition-all">
                    <item.icon size={20} />
                  </div>
                  <h4 className="text-xl md:text-2xl font-bold mb-4 md:mb-5 tracking-tight group-hover:text-white transition-colors">{item.title}</h4>
                  <p className="text-gray-500 leading-relaxed text-sm md:text-[15px]">{item.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process Roadmap */}
      <section id="process" className="py-24 md:py-32 overflow-hidden scroll-mt-24 w-full flex flex-col items-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <ScrollReveal>
            <div className="text-center mb-16 md:mb-20">
              <h3 className="text-3xl md:text-4xl font-bold uppercase tracking-tight">Execution Roadmap</h3>
            </div>
          </ScrollReveal>
          <ProcessTimeline />
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 md:py-32 relative scroll-mt-24 w-full overflow-hidden flex flex-col items-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <ScrollReveal>
            <div className="text-center mb-16 md:mb-20">
              <h2 className="text-[10px] font-mono text-neon-purple mb-4 uppercase tracking-[0.4em] font-bold">Operational Modules</h2>
              <h3 className="text-4xl md:text-6xl font-bold mb-6 md:mb-8 uppercase tracking-tighter">Choose Your Weapon</h3>
              <p className="text-gray-500 max-w-xl mx-auto text-base md:text-lg font-light leading-relaxed">Modular growth systems designed to integrate seamlessly with your business.</p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start">
            <ScrollReveal delay={100}>
              <div onClick={() => handleServiceClick('addon')} className="bg-[#050505]/60 backdrop-blur-sm p-8 md:p-10 rounded-3xl border border-white/5 hover:border-neon-blue/20 transition-all duration-500 cursor-pointer group transform hover:scale-[1.03] h-full">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-8 md:mb-10 text-gray-500 group-hover:text-neon-blue transition-all"><Sparkles size={24} /></div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight group-hover:text-white transition-colors">Neural Sales Funnels</h3>
                <p className="text-gray-500 mb-8 md:mb-10 leading-relaxed text-sm">Automated transmission sequences designed to trigger high-velocity purchasing decisions.</p>
                <div className="space-y-4 md:space-y-5 mb-8 md:mb-12">
                  {['High-Impact Single Blasts', '3-Step Nurture Loops', '4-Day Cash Injection', 'Psychological Triggers'].map(f => (
                    <div key={f} className="flex gap-4 items-center text-xs md:text-[13px] text-gray-400">
                      <CheckCircle2 size={16} className="text-gray-700 group-hover:text-neon-blue transition-colors" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest group-hover:text-neon-blue transition-colors">View Packages</span>
                  <ArrowRight size={16} className="text-gray-700 group-hover:text-neon-blue transition-all" />
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div onClick={() => handleServiceClick('upgrade')} className="bg-[#070b0e]/80 backdrop-blur-md p-8 md:p-10 rounded-3xl border border-[#00f3ff]/30 shadow-[0_0_50px_rgba(0,243,255,0.1)] relative md:min-h-[650px] cursor-pointer group transform hover:scale-[1.05] transition-all duration-500">
                <div className="absolute top-6 right-6 bg-neon-blue text-black text-[9px] font-black px-3 py-1 rounded uppercase tracking-wider animate-pulse">Most Popular</div>
                <div className="w-14 h-14 rounded-xl bg-[#00f3ff]/10 border border-[#00f3ff]/20 flex items-center justify-center mb-8 md:mb-10 text-neon-blue group-hover:scale-110 transition-transform"><Sparkles size={28} /></div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight">Full Multi-Page Upgrade</h3>
                <p className="text-gray-300 mb-8 md:mb-10 leading-relaxed text-sm">Total digital sovereignty. A vast, SEO-fortified ecosystem designed for maximum authority.</p>
                <div className="space-y-5 md:space-y-6 mb-8 md:mb-12">
                  {['5+ Custom Pages', 'Custom AI Chatbot', 'Advanced SEO Setup', 'Blog/Content Hub'].map(f => (
                    <div key={f} className="flex gap-4 items-center text-sm md:text-[15px] text-gray-200 font-medium">
                      <CheckCircle2 size={18} className="text-neon-blue shadow-[0_0_10px_rgba(0,243,255,0.5)]" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[11px] font-black text-neon-blue uppercase tracking-[0.2em]">View Packages</span>
                  <ArrowRight size={18} className="text-neon-blue group-hover:translate-x-3 transition-transform" />
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={300}>
              <div onClick={() => handleServiceClick('core')} className="bg-[#050505]/60 backdrop-blur-sm p-8 md:p-10 rounded-3xl border border-white/5 hover:border-neon-blue/20 transition-all duration-500 cursor-pointer group transform hover:scale-[1.03] h-full">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-8 md:mb-10 text-gray-500 group-hover:text-neon-blue transition-all"><Sparkles size={24} /></div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight group-hover:text-white transition-colors">AI SmartSite + Meta Ads</h3>
                <p className="text-gray-500 mb-8 md:mb-10 leading-relaxed text-sm">A hyper-optimized conversion terminal fused with algorithmic traffic acquisition.</p>
                <div className="space-y-4 md:space-y-5 mb-8 md:mb-12">
                  {['Conversion "SmartSite"', 'Free Meta Ads Mgmt', 'Auto Lead Nurturing', 'CRM Integration'].map(f => (
                    <div key={f} className="flex gap-4 items-center text-xs md:text-[13px] text-gray-400">
                      <CheckCircle2 size={16} className="text-gray-700 group-hover:text-neon-blue transition-colors" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest group-hover:text-neon-blue transition-colors">View Packages</span>
                  <ArrowRight size={16} className="text-gray-700 group-hover:text-neon-blue transition-all" />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Client Logs */}
      <section className="py-24 md:py-32 relative scroll-mt-24 w-full overflow-hidden flex flex-col items-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <ScrollReveal>
            <div className="text-center mb-16 md:mb-20">
              <h2 className="text-[10px] font-mono text-neon-blue mb-4 uppercase tracking-[0.4em] font-bold">System Validation</h2>
              <h3 className="text-4xl md:text-5xl font-bold uppercase tracking-tight">Client Logs</h3>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-6 md:gap-10">
            {TESTIMONIALS.map((item, i) => (
              <ScrollReveal key={i} delay={i * 200}>
                <div className="bg-[#0a0a0f]/80 backdrop-blur-sm p-8 md:p-10 rounded-3xl border border-white/5 flex flex-col justify-between group hover:border-neon-blue/20 transition-all duration-300">
                  <div>
                    <div className="text-gray-700 mb-6 md:mb-8 group-hover:text-neon-blue transition-colors"><Sparkles size={32} /></div>
                    <p className="text-lg md:text-2xl text-gray-300 italic font-light leading-relaxed mb-8 md:mb-10">"{item.quote}"</p>
                  </div>
                  <div>
                    <div className="h-px bg-white/5 mb-6 md:mb-8" />
                    <h4 className="text-lg md:text-xl font-bold text-white mb-1 uppercase tracking-tight">{item.author}</h4>
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-[10px] font-mono text-gray-600 uppercase tracking-widest hover:text-neon-blue transition-colors">View Deployment</a>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 md:py-32 relative border-t border-white/5 scroll-mt-24 w-full overflow-hidden flex flex-col items-center">
        <div className="max-w-4xl mx-auto px-6 text-center w-full">
          <ScrollReveal>
            <h2 className="text-4xl md:text-7xl font-bold mb-8 md:mb-10 tracking-tight uppercase px-2">
              Ready To <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f3ff] to-[#bc13fe]">Evolve?</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <p className="text-gray-500 mb-12 md:mb-16 text-base md:text-lg max-w-2xl mx-auto px-4">Join the agency that uses actual intelligence to grow your business. Limited spots available for this quarter.</p>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <form className="max-w-xl mx-auto space-y-6 md:space-y-8 text-left w-full" onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-[10px] font-mono text-gray-600 mb-3 uppercase tracking-[0.3em]">Identification</label>
                    <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className={getInputClass('name')} />
                </div>
                <div>
                    <label className="block text-[10px] font-mono text-gray-600 mb-3 uppercase tracking-[0.3em]">Coordinates</label>
                    <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className={getInputClass('email')} />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-mono text-gray-600 mb-3 uppercase tracking-[0.3em]">Signal Line (Phone)</label>
                <input type="tel" name="phone" placeholder="Phone Number (Optional)" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className={getInputClass('phone')} />
              </div>
              <div>
                <label className="block text-[10px] font-mono text-gray-600 mb-3 uppercase tracking-[0.3em]">Target URL (Optional)</label>
                <input type="text" name="url" placeholder="Current Website (e.g. https://yoursite.com)" value={formData.url} onChange={(e) => setFormData({...formData, url: e.target.value})} className={getInputClass('url')} />
              </div>
              <div>
                <label className="block text-[10px] font-mono text-gray-600 mb-3 uppercase tracking-[0.3em]">Operational Module (Service)</label>
                <select 
                  name="service" 
                  value={formData.service} 
                  onChange={(e) => setFormData({...formData, service: e.target.value})} 
                  className={getInputClass('service')}
                >
                  <option value="" disabled className="bg-black">Select Service Protocol</option>
                  <option value="AI SmartSite + Meta Ads" className="bg-black">AI SmartSite + Meta Ads</option>
                  <option value="Neural Sales Funnels" className="bg-black">Neural Sales Funnels</option>
                  <option value="Full Multi-Page Upgrade" className="bg-black">Full Multi-Page Upgrade</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-mono text-gray-600 mb-3 uppercase tracking-[0.3em]">Mission Brief (Message)</label>
                <textarea name="message" placeholder="Briefly describe your objectives (Optional)" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className={`${getInputClass('message')} h-32 resize-none`} />
              </div>
              <button 
                type="submit"
                className="w-full py-5 border border-neon-blue text-neon-blue font-mono text-[11px] md:text-xs font-bold uppercase tracking-[0.3em] hover:bg-neon-blue/10 transition-all inline-flex items-center justify-center gap-3 group disabled:opacity-50 shadow-[0_0_15px_rgba(0,243,255,0.1)] hover:shadow-[0_0_30px_rgba(0,243,255,0.3)] outline-none" 
                disabled={formStatus === 'submitting'}
              >
                {formStatus === 'submitting' ? <LoadingSpinner /> : (
                    <span className="flex items-center gap-3">
                        BOOK DISCOVERY CALL 
                        <ChevronDown className="-rotate-90 group-hover:translate-x-1 transition-transform" size={14} />
                    </span>
                )}
              </button>
            </form>
          </ScrollReveal>
        </div>
      </section>

      {/* Mini Footer */}
      <footer className="py-16 md:py-20 border-t border-white/5 bg-black/95 relative overflow-hidden w-full flex flex-col items-center">
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-neon-blue/5 blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-start mb-16">
            
            <div className="flex flex-col gap-4 items-center md:items-start text-center md:text-left">
              <div className="flex items-center gap-3">
                <Logo className="h-8 md:h-10 w-auto" />
                <div className="flex flex-col items-start">
                  <span className="text-white font-bold tracking-tighter text-lg leading-none">AFA MEDIA</span>
                  <span className="text-gray-600 text-[9px] font-mono uppercase tracking-[0.2em] mt-1">Intelligence // Unit</span>
                </div>
              </div>
              <p className="text-gray-500 text-xs leading-relaxed max-w-xs font-light">
                Engineering high-velocity growth systems for the intelligence era.
              </p>
            </div>

            <div className="flex flex-col gap-4 items-center md:items-start">
              <span className="text-white font-mono text-[10px] font-bold uppercase tracking-[0.3em]">Protocol Navigation</span>
              <div className="grid grid-cols-2 gap-y-4 gap-x-8 md:gap-x-4">
                {['Problem', 'Services', 'Process', 'Contact'].map((item) => (
                  <button 
                    key={item}
                    onClick={() => handleNavClick(item.toLowerCase())}
                    className="text-gray-500 hover:text-neon-blue transition-colors text-[10px] md:text-[11px] uppercase tracking-widest text-left font-mono"
                  >
                    // {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-6 items-center md:items-start">
              <span className="text-white font-mono text-[10px] font-bold uppercase tracking-[0.3em]">Direct Transmission</span>
              <div className="space-y-4 w-full flex flex-col items-center md:items-start">
                <div className="flex items-center gap-3 text-gray-500 font-mono text-[10px] uppercase tracking-widest group">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-neon-blue/10 transition-colors">
                    <Phone size={14} className="text-neon-blue" />
                  </div>
                  <a href="tel:+447516294378" className="hover:text-white transition-colors tracking-[0.1em]">+44 7516 294378</a>
                </div>
                <div className="flex items-center gap-3 text-gray-500 font-mono text-[10px] uppercase tracking-widest group">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-neon-blue/10 transition-colors">
                    <Mail size={14} className="text-neon-blue" />
                  </div>
                  <a href="mailto:ali@afamedia.co.uk" className="hover:text-white transition-colors tracking-[0.1em]">ali@afamedia.co.uk</a>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4 text-center md:text-left">
            <div className="text-gray-700 text-[9px] font-mono uppercase tracking-[0.4em]">© {new Date().getFullYear()} AFA MEDIA. ALL RIGHTS RESERVED.</div>
            <div className="flex items-center gap-6">
              <span className="text-gray-800 text-[9px] font-mono uppercase tracking-widest">System Ver: 4.2.4_STABLE</span>
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
