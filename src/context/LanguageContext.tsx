// src/context/LanguageContext.tsx
import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import enTranslations from '../translations/en.json';
import hiTranslations from '../translations/hi.json';
import taTranslations from '../translations/ta.json';
import teTranslations from '../translations/te.json';
import mlTranslations from '../translations/ml.json';
import mrTranslations from '../translations/mr.json';
import rjTranslations from '../translations/rj.json';

// Define the shape of the translations (nested key-value pairs)
interface Translation {
  [key: string]: string | Translation;
}

// Define supported languages
type Language = 'en' | 'hi' | 'ta' | 'te' | 'ml' | 'mr' | 'rj';

// Map of translations for each language
const translations: Record<Language, Translation> = {
  en: enTranslations,
  hi: hiTranslations,
  ta: taTranslations,
  te: teTranslations,
  ml: mlTranslations,
  mr: mrTranslations,
  rj: rjTranslations,
};

// Define the context type
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// Create the context with default values
export const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key) => key,
});

// Props for the LanguageProvider component
interface LanguageProviderProps {
  children: ReactNode;
}

// LanguageProvider component
export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  // Load saved language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language | null;
    if (savedLanguage && savedLanguage in translations) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Translation function to look up nested keys
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: Translation | string = translations[language];
    for (const k of keys) {
      if (typeof value === 'string' || value === undefined) {
        return key; // Return the key as fallback if the path is invalid
      }
      value = value[k];
    }
    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};