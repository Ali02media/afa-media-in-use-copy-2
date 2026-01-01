
import { Brain, Zap, Layout, Mail, Globe, Target, Bot } from 'lucide-react';
import { ServicePackage, FeatureItem, TestimonialItem } from './types';

export const APP_NAME = "AFA MEDIA";

/**
 * GOOGLE SHEETS INTEGRATION
 * Updated Web App URL provided by user
 */
export const GOOGLE_SHEETS_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbx25Mljxmvm41jw0XDQneqLcCNZBKr8doLmjPk3kwhw2W81e1OpGyt4EZZjHUIXQfDfsw/exec";


export const SERVICES: ServicePackage[] = [
  {
    id: 'core',
    title: 'AI SmartSite + Meta Ads',
    description: 'The sovereign growth engine. A hyper-optimized conversion terminal fused with algorithmic traffic acquisition. We don\'t just get leads; we engineer market dominance.',
    features: [
      'Conversion-Focused "SmartSite"',
      'Free Meta Ads Management',
      'Automated Lead Nurturing',
      'CRM Integration'
    ],
    highlight: false,
    priceRange: 'Starting at $2,500/mo'
  },
  {
    id: 'addon',
    title: 'Neural Sales Funnels',
    description: 'Psych-ops for your revenue stream. Automated, psychology-backed transmission sequences designed to rewrite lead behavior and trigger high-velocity purchasing decisions.',
    features: [
      'High-Impact Single Blasts',
      '3-Step Nurture Loops',
      '4-Day Cash Injection Campaigns',
      'Psychological Triggers'
    ],
    highlight: false
  },
  {
    id: 'upgrade',
    title: 'Full Multi-Page Upgrade',
    description: 'Total digital sovereignty. A vast, SEO-fortified ecosystem designed for maximum authority. Dominate search indices and establish an unshakeable brand presence.',
    features: [
      '5+ Custom Pages',
      'Custom AI Chatbot',
      'Advanced SEO Setup',
      'Blog/Content Hub',
      'CMS Integration'
    ],
    highlight: true
  }
];

export const PAIN_POINTS: FeatureItem[] = [
  {
    title: "Static Sites Bleed Revenue",
    description: "A website without AI is just a digital brochure. If you aren't engaging visitors immediately via 24/7 chatbots, you lose 60% of potential leads.",
    icon: Layout
  },
  {
    title: "Generic Copy is Invisible",
    description: "Surface-level emails get deleted. If your marketing doesn't articulate your lead's internal pain better than they can, it fails to connect.",
    icon: Mail
  },
  {
    title: "The Generalist Trap",
    description: "Using a 'one-size-fits-all' template for a specialized niche is a liability. Generic tools cannot handle your specific operational demands.",
    icon: Zap
  }
];

export const SOLUTIONS: FeatureItem[] = [
  {
    title: "AI-Powered Sentience",
    description: "Websites that talk back. We integrate custom AI Agents that understand context, answer queries, and qualify leads 24/7 while you sleep.",
    icon: Bot,
    badge: "NEW"
  },
  {
    title: "Psycho-Emotive Resonance",
    description: "Our email systems understand your audience. We craft deep, emotionally connected copy that validates their pain and compels action.",
    icon: Brain
  },
  {
    title: "Niche-Locked Architecture",
    description: "We don't use templates. We engineer advanced, custom digital ecosystems specifically equipped for your industry's unique workflow.",
    icon: Globe
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    quote: "I love it. It looks really professional. It's straight to the point, no fuss. Clean and clear, it's much better than the old one. Thats really great work Ali, thank you so much.",
    author: "Oya",
    company: "On Point Painting",
    url: "https://www.onpointpainting.uk/"
  },
  {
    quote: "The site is great even on the phone it looks great. Thank you so much for your efforts brother",
    author: "Gökhan Aydoğdu",
    company: "Legentax",
    url: "https://www.legentax.co.uk/"
  }
];
