'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { siteData } from '../data';
import type { SiteData } from '@/types/project';

interface ContentContextType {
  content: SiteData;
  updateContent: (updates: Partial<SiteData>) => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteData>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolioContent');
      return saved ? JSON.parse(saved) : siteData;
    }
    return siteData;
  });

  const updateContent = (updates: Partial<SiteData>) => {
    const newContent = { ...content, ...updates };
    setContent(newContent);
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolioContent', JSON.stringify(newContent));
    }
  };

  return (
    <ContentContext.Provider value={{ content, updateContent }}>
      {children}
    </ContentContext.Provider>
  );
}

export const useContent = () => {
  const context = useContext(ContentContext);
  if (undefined === context) {
    throw new Error('useContent must be used within ContentProvider');
  }
  return context;
};