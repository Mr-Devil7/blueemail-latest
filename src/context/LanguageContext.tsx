// src/context/LanguageContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import enTranslations from '../translations/en.json';
import hiTranslations from '../translations/hi.json';
import taTranslations from '../translations/ta.json';
import teTranslations from '../translations/te.json';
import mlTranslations from '../translations/ml.json';
import mrTranslations from '../translations/mr.json';
import rjTranslations from '../translations/rj.json';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const translations: { [key: string]: any } = {
  en: enTranslations,
  hi: hiTranslations,
  ta: taTranslations,
  te: teTranslations,
  ml: mlTranslations,
  mr: mrTranslations,
  rj: rjTranslations,
};

export const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key) => key,
});

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<string>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    const keys = key.split('.');
    let value = translations[language];
    for (const k of keys) {
      value = value?.[k] || key;
    }
    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
