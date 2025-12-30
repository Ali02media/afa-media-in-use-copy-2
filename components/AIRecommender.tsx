import React, { useState } from 'react';
import { Sparkles, Target } from 'lucide-react';
import { getServiceRecommendation } from '../services/geminiService';
import Button from './Button';
import LoadingSpinner from './LoadingSpinner';

const AIRecommender: React.FC = () => {
  const [niche, setNiche] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ service: string; reason: string } | null>(null);

  const handleAnalyze = async () => {
    if (!niche.trim()) return;
    setLoading(true);
    setResult(null);
    
    const recommendation = await getServiceRecommendation(niche);
    setResult(recommendation);
    setLoading(false);
  };

  return (
    <div className="w-full max-w-3xl mx-auto mb-24 relative z-20">
      <div className="relative p-[1px] rounded-2xl bg-gradient-to-r from-gray-800 via-neon-blue/50 to-gray-800 shadow-[0_0_30px_rgba(0,243,255,0.1)]">
        <div className="bg-black rounded-[15px] p-6 md:p-8 relative overflow-hidden">
          {/* Background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-neon-blue/5 blur-3xl -z-10" />

          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 text-neon-blue mb-3 bg-neon-blue/10 px-3 py-1 rounded-full border border-neon-blue/20">
              <Target size={14} />
              <span className="font-mono text-[10px] uppercase tracking-widest font-bold">System Matcher</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Identify Your Protocol</h3>
            <p className="text-gray-400 text-sm">Enter your niche (e.g., "Real Estate", "SaaS", "Dentist"). Our AI will calculate your optimal entry point.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 relative z-10">
            <input
              type="text"
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
              placeholder="Enter your industry..."
              className="flex-1 bg-gray-900/80 border border-gray-700 text-white px-6 py-4 rounded-xl focus:border-neon-blue focus:ring-1 focus:ring-neon-blue outline-none transition-all placeholder-gray-600"
            />
            <Button onClick={handleAnalyze} disabled={loading} className="min-w-[140px] justify-center">
              {loading ? <LoadingSpinner size={20} /> : 'Analyze'}
            </Button>
          </div>

          {/* Result Display */}
          {result && (
            <div className="mt-8 p-6 bg-gradient-to-r from-neon-blue/10 to-transparent border-l-2 border-neon-blue rounded-r-xl animate-fade-in-up">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-neon-blue/20 rounded-lg text-neon-blue shrink-0">
                  <Sparkles size={24} />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-neon-blue uppercase mb-1 tracking-widest">Recommended Configuration</div>
                  <h4 className="text-xl font-bold text-white mb-2">{result.service}</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    <span className="text-neon-blue font-mono mr-2">{'>'}</span>
                    {result.reason}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIRecommender;