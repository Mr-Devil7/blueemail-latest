// src/components/LanguagePopup.tsx
import React, { useContext, useState, useEffect } from 'react';
import { X, Globe } from 'lucide-react';
import { LanguageContext } from '../context/LanguageContext';

interface LanguagePopupProps {
  onClose?: () => void; // Optional prop to allow manual closing (e.g., from Header)
}

const LanguagePopup: React.FC<LanguagePopupProps> = ({ onClose }) => {
  const { language, setLanguage, t } = useContext(LanguageContext);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(language);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिन्दी' },
    { code: 'ta', name: 'தமிழ்' },
    { code: 'te', name: 'తెలుగు' },
    { code: 'ml', name: 'മലയാളം' },
    { code: 'mr', name: 'मारवाड़ी' },
    { code: 'rj', name: 'राजस्थानी' },
  ];

  // Check for first-time visitors
  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      setIsOpen(true);
      localStorage.setItem('hasVisited', 'true');
    }
  }, []);

  // Allow manual opening via prop (e.g., from Header)
  useEffect(() => {
    if (onClose !== undefined) {
      setIsOpen(true);
    }
  }, [onClose]);

  const handleConfirm = () => {
    setLanguage(selectedLanguage);
    setIsOpen(false);
    if (onClose) onClose();
  };

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div
        className="bg-white rounded-2xl shadow-xl max-w-md w-full transform transition-all duration-300 scale-95 opacity-0 animate-pop-up"
      >
        {/* Header with Gradient */}
        <div className="bg-gradient-to-r from-primary to-secondary text-white p-4 rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Globe className="h-6 w-6" />
            <h2 className="text-xl font-semibold">{t('language_popup.title')}</h2>
          </div>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        {/* Body */}
        <div className="p-6">
          <label className="block text-text font-medium mb-2">
            {t('language_popup.select')}
          </label>
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all text-text bg-background hover:bg-accent/10"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
          <button
            onClick={handleConfirm}
            className="mt-4 w-full bg-gradient-to-r from-primary to-primary-dark text-white py-3 rounded-lg font-medium hover:from-primary-dark hover:to-primary transition-all duration-200 shadow-md"
          >
            {t('language_popup.confirm')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LanguagePopup;