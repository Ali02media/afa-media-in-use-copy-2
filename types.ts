import React from 'react';

export interface ServicePackage {
  id: string;
  title: string;
  description: string;
  features: string[];
  highlight?: boolean;
  priceRange?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
  image?: string;
}

export interface FeatureItem {
  title: string;
  description: string;
  icon: React.ElementType;
  badge?: string;
}

export interface TestimonialItem {
  quote: string;
  author: string;
  company: string;
  url: string;
}