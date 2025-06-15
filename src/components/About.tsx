// src/components/About.tsx
import React, { useContext } from 'react';
import { Globe, TrendingUp, MessageCircle, Clock } from 'lucide-react';
import { LanguageContext } from '../context/LanguageContext';

const About: React.FC = () => {
  const { t } = useContext(LanguageContext);

  const features = [
    {
      icon: MessageCircle,
      title: 'WhatsApp Marketplace',
      description: 'Purchase high-quality seeds, fertilizers, and plants directly through our convenient WhatsApp marketplace at fair prices.',
    },
    {
      icon: Clock,
      title: 'Real-Time Updates',
      description: 'Get instant weather updates and essential farming information to help you make informed decisions for your crops.',
    },
    {
      icon: Globe,
      title: t('about.features.local_reach.title'),
      description: t('about.features.local_reach.description'),
    },
    {
      icon: TrendingUp,
      title: t('about.features.growth_focused.title'),
      description: t('about.features.growth_focused.description'),
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">About Agrow</h2>
          <p className="text-xl text-text/70 max-w-3xl mx-auto">
            Your trusted farming partner dedicated to making agriculture smarter, simpler, and more profitable for farmers across India.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img
              src="/About.jpeg"
              alt="Smart Farming with Agrow"
              className="rounded-2xl shadow-lg"
            />
          </div>
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-primary">Grow Smarter with Agrow</h3>
            <p className="text-text/70 leading-relaxed">
              Access vital farming information on our comprehensive website and get real-time weather updates to plan your crops with confidence. Our platform brings together everything you need to farm smarter and grow your profits.
            </p>
            <div className="bg-gradient-to-r from-accent/20 to-primary/10 p-4 rounded-lg border-l-4 border-primary">
              <p className="text-text font-medium">
                Through our WhatsApp marketplace, you can directly purchase quality seeds, fertilizers, and plants, saving time and ensuring you get the best for your farm - all in one trusted platform.
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="bg-gradient-to-br from-accent/20 to-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-accent/30 group-hover:to-primary/20 transition-all duration-300">
                <feature.icon className="h-8 w-8 text-primary" />
              </div>
              <h4 className="text-lg font-bold text-primary mb-2">{feature.title}</h4>
              <p className="text-text/70 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;