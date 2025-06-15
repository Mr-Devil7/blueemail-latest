// src/App.tsx
import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Offerings from './components/Offerings';
import Mission from './components/Mission';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Terms from './components/Terms';
import Services from './components/Services';
import Cart from './components/Cart';
import LanguagePopup from './components/LanguagePopup';
import { CartProvider } from './context/CartContext'; // Import the CartProvider

function App() {
  const [currentSection, setCurrentSection] = useState('home');

  const handleNavigate = (section: string) => {
    setCurrentSection(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    switch (currentSection) {
      case 'terms':
        return <Terms />;
      case 'contact':
        return <Contact />;
      case 'services':
        return <Services />;
      case 'home':
      default:
        return (
          <>
            <Hero onNavigate={handleNavigate} />
            <About />
            <Offerings onNavigate={handleNavigate} />
            <Mission />
            <Testimonials onNavigate={handleNavigate} />
          </>
        );
    }
  };

  return (
    <CartProvider> {/* Wrap the app with CartProvider */}
      <div className="min-h-screen bg-white">
        <Header currentSection={currentSection} onNavigate={handleNavigate} />
        <main>{renderContent()}</main>
        <Footer onNavigate={handleNavigate} />
        <Cart />
        <LanguagePopup />
      </div>
    </CartProvider>
  );
}

export default App;