// src/components/Header.tsx
import React, { useContext, useState } from 'react';
import { ShoppingCart, Menu, X, Cloud, Globe } from 'lucide-react';
import { useCartContext } from '../context/CartContext'; // Use the context
import { LanguageContext } from '../context/LanguageContext';
import LanguagePopup from './LanguagePopup';

interface HeaderProps {
  currentSection: string;
  onNavigate: (section: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentSection, onNavigate }) => {
  const { getTotalItems, setIsCartOpen } = useCartContext(); // Updated to useCartContext
  const { t } = useContext(LanguageContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isWeatherOpen, setIsWeatherOpen] = useState(false);
  const [isLanguagePopupOpen, setIsLanguagePopupOpen] = useState(false);

  const navItems = [
    { id: 'home', label: t('header.home') },
    { id: 'services', label: t('header.services') },
    { id: 'contact', label: t('header.contact') },
    { id: 'terms', label: t('header.terms') },
  ];

  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onNavigate('home')}>
              <img
                src="/image.png"
                alt="Agrow Logo"
                className="h-10 w-auto"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling!.style.display = 'block';
                }}
              />
              <div className="hidden">
                <div className="bg-primary p-2 rounded-lg">
                  <div className="h-6 w-6 text-white font-bold flex items-center justify-center">A</div>
                </div>
                <span className="text-2xl font-bold text-primary">Agrow</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`font-medium transition-colors duration-200 ${
                    currentSection === item.id
                      ? 'text-primary border-b-2 border-primary pb-1'
                      : 'text-text hover:text-primary'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Weather, Language, Cart, and Mobile Menu */}
            <div className="flex items-center space-x-4">
              {/* Weather Button */}
              <button
                onClick={() => setIsWeatherOpen(true)}
                className="relative p-2 text-text hover:text-secondary transition-colors duration-200"
                title={t('header.weather')}
              >
                <Cloud className="h-6 w-6" />
              </button>

              {/* Language Button */}
              <button
                onClick={() => setIsLanguagePopupOpen(true)}
                className="flex items-center p-2 text-text hover:text-primary transition-colors duration-200"
                title="Select Language"
              >
                <Globe className="h-6 w-6" />
              </button>

              {/* Cart Button */}
              <button
                onClick={handleCartClick}
                className="relative p-2 text-text hover:text-primary transition-colors duration-200"
                title="Shopping Cart"
              >
                <ShoppingCart className="h-6 w-6" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {getTotalItems()}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-text"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <nav className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`text-left py-2 px-4 rounded-lg transition-colors duration-200 ${
                      currentSection === item.id
                        ? 'bg-accent/20 text-primary font-medium'
                        : 'text-text hover:bg-background'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Weather Overlay */}
      {isWeatherOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-in slide-in-from-top-4 duration-300">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-secondary to-primary text-white">
              <div className="flex items-center space-x-3">
                <Cloud className="h-6 w-6" />
                <h2 className="text-xl font-bold">{t('header.weather')}</h2>
              </div>
              <button
                onClick={() => setIsWeatherOpen(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
              <WeatherContent />
            </div>
          </div>
        </div>
      )}

      {/* Language Popup */}
      {isLanguagePopupOpen && (
        <LanguagePopup onClose={() => setIsLanguagePopupOpen(false)} />
      )}
    </>
  );
};

// WeatherContent component
const WeatherContent: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [selectedCity, setSelectedCity] = React.useState<'rajasthan' | 'chennai'>('rajasthan');

  const weatherData = {
    rajasthan: {
      location: t('weather.rajasthan.location'),
      temperature: 32,
      condition: t('weather.rajasthan.condition'),
      humidity: 35,
      windSpeed: 8,
      visibility: 15,
      pressure: 1010,
      forecast: [
        { day: t('weather.rajasthan.forecast.today'), high: 35, low: 22, condition: t('weather.rajasthan.forecast.sunny'), icon: 'sunny' },
        { day: t('weather.rajasthan.forecast.tomorrow'), high: 37, low: 24, condition: t('weather.rajasthan.forecast.hot'), icon: 'sunny' },
        { day: t('weather.rajasthan.forecast.wed'), high: 34, low: 21, condition: t('weather.rajasthan.forecast.cloudy'), icon: 'partly-cloudy' },
        { day: t('weather.rajasthan.forecast.thu'), high: 33, low: 20, condition: t('weather.rajasthan.forecast.sunny'), icon: 'sunny' },
        { day: t('weather.rajasthan.forecast.fri'), high: 36, low: 23, condition: t('weather.rajasthan.forecast.hot'), icon: 'sunny' },
      ],
      tips: [
        t('weather.rajasthan.tips.irrigation'),
        t('weather.rajasthan.tips.shade'),
        t('weather.rajasthan.tips.drip'),
      ],
    },
    chennai: {
      location: t('weather.chennai.location'),
      temperature: 28,
      condition: t('weather.chennai.condition'),
      humidity: 78,
      windSpeed: 15,
      visibility: 8,
      pressure: 1008,
      forecast: [
        { day: t('weather.chennai.forecast.today'), high: 30, low: 25, condition: t('weather.chennai.forecast.cloudy'), icon: 'partly-cloudy' },
        { day: t('weather.chennai.forecast.tomorrow'), high: 29, low: 24, condition: t('weather.chennai.forecast.rainy'), icon: 'rainy' },
        { day: t('weather.chennai.forecast.wed'), high: 31, low: 26, condition: t('weather.chennai.forecast.sunny'), icon: 'sunny' },
        { day: t('weather.chennai.forecast.thu'), high: 28, low: 23, condition: t('weather.chennai.forecast.rainy'), icon: 'rainy' },
        { day: t('weather.chennai.forecast.fri'), high: 32, low: 27, condition: t('weather.chennai.forecast.sunny'), icon: 'sunny' },
      ],
      tips: [
        t('weather.chennai.tips.fungus'),
        t('weather.chennai.tips.drainage'),
        t('weather.chennai.tips.ventilation'),
      ],
    },
  };

  const currentWeather = weatherData[selectedCity];

  const getWeatherIcon = (condition: string) => {
    const iconClass = 'h-8 w-8';
    switch (condition) {
      case 'sunny':
        return <div className={`${iconClass} text-yellow-500`}>☀️</div>;
      case 'partly-cloudy':
        return <div className={`${iconClass} text-gray-500`}>⛅</div>;
      case 'rainy':
        return <div className={`${iconClass} text-blue-500`}>🌧️</div>;
      case 'cloudy':
        return <div className={`${iconClass} text-gray-600`}>☁️</div>;
      default:
        return <div className={`${iconClass} text-yellow-500`}>☀️</div>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={() => setSelectedCity('rajasthan')}
          className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
            selectedCity === 'rajasthan' ? 'bg-secondary text-white shadow-lg' : 'bg-background text-text hover:bg-accent/20'
          }`}
        >
          🏜️ {t('weather.rajasthan.location')}
        </button>
        <button
          onClick={() => setSelectedCity('chennai')}
          className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
            selectedCity === 'chennai' ? 'bg-primary text-white shadow-lg' : 'bg-background text-text hover:bg-accent/20'
          }`}
        >
          🌊 {t('weather.chennai.location')}
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-accent/20 to-primary/10 rounded-xl p-6 text-center">
            <h3 className="text-lg font-semibold text-text mb-2">{currentWeather.location}</h3>
            <div className="text-4xl font-bold text-primary mb-2">{currentWeather.temperature}°C</div>
            <p className="text-text/70 font-medium mb-4">{currentWeather.condition}</p>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-white/70 rounded-lg p-2">
                <div className="text-secondary font-medium">{t('weather.humidity')}</div>
                <div className="font-bold">{currentWeather.humidity}%</div>
              </div>
              <div className="bg-white/70 rounded-lg p-2">
                <div className="text-primary font-medium">{t('weather.wind')}</div>
                <div className="font-bold">{currentWeather.windSpeed} km/h</div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-primary mb-4">{t('weather.forecast_title')}</h3>
            <div className="grid grid-cols-5 gap-3">
              {currentWeather.forecast.map((day, index) => (
                <div key={index} className="text-center p-3 rounded-lg hover:bg-accent/10 transition-colors">
                  <p className="font-semibold text-text mb-2 text-sm">{day.day}</p>
                  <div className="mb-2 flex justify-center">{getWeatherIcon(day.icon)}</div>
                  <div className="space-y-1">
                    <p className="text-lg font-bold text-primary">{day.high}°</p>
                    <p className="text-sm text-text/60">{day.low}°</p>
                  </div>
                  <p className="text-xs text-text/60 mt-1">{day.condition}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-accent/20 to-primary/10 rounded-xl p-6">
        <h4 className="text-xl font-bold text-primary mb-4">{t('weather.tips_title')}</h4>
        <div className="grid md:grid-cols-3 gap-4">
          {currentWeather.tips.map((tip, index) => (
            <div key={index} className="bg-white/80 rounded-lg p-4">
              <p className="text-text text-sm leading-relaxed">{tip}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center text-sm text-text/60">{t('weather.source')}</div>
    </div>
  );
};

export default Header;