import React from 'react';
import { Shield, FileText, Users, AlertCircle } from 'lucide-react';

const Terms: React.FC = () => {
  const sections = [
    {
      icon: FileText,
      title: 'Terms of Service',
      content: [
        'By accessing and using Agrow\'s website and services, you agree to be bound by these Terms of Use.',
        'Our services are provided for agricultural and educational purposes only.',
        'You must be at least 18 years old to use our services or have parental consent.',
        'All information provided must be accurate and up-to-date.'
      ]
    },
    {
      icon: Shield,
      title: 'Privacy & Data Protection',
      content: [
        'We collect and process personal data in accordance with applicable privacy laws.',
        'Your personal information is used solely for service delivery and customer support.',
        'We implement industry-standard security measures to protect your data.',
        'We do not sell or share your personal information with third parties without consent.'
      ]
    },
    {
      icon: Users,
      title: 'User Responsibilities',
      content: [
        'Users must provide accurate information when creating accounts or placing orders.',
        'Proper use of agricultural equipment is the responsibility of the purchaser.',
        'Users must comply with local regulations regarding agricultural technology use.',
        'Any misuse of our products or services may result in account termination.'
      ]
    },
    {
      icon: AlertCircle,
      title: 'Limitations & Disclaimers',
      content: [
        'Agrow products are designed to assist farming operations but do not guarantee specific outcomes.',
        'We are not liable for crop failures or losses due to external factors beyond our control.',
        'Warranty terms are specific to each product and are detailed in product documentation.',
        'Our liability is limited to the purchase price of the product or service.'
      ]
    }
  ];

  return (
    <section className="py-20 bg-background min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-primary mb-4">Terms of Use</h1>
          <p className="text-xl text-text/70">
            Please read these terms carefully before using our services.
          </p>
          <p className="text-sm text-text/60 mt-2">
            Last updated: May 2025
          </p>
        </div>

        <div className="space-y-12">
          {sections.map((section, index) => (
            <div key={index} className="bg-white rounded-xl p-8 border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="bg-accent/20 p-3 rounded-lg mr-4">
                  <section.icon className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-primary">{section.title}</h2>
              </div>
              <div className="space-y-4">
                {section.content.map((item, itemIndex) => (
                  <p key={itemIndex} className="text-text/70 leading-relaxed">
                    {item}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-accent/10 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-primary mb-4">Questions about our Terms?</h3>
          <p className="text-text/70 mb-6">
            If you have any questions about these Terms of Use, please don't hesitate to contact us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:legal@agrow.com"
              className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors"
            >
              Email Legal Team
            </a>
            <a
              href="tel:+15551234567"
              className="border border-primary text-primary px-6 py-3 rounded-lg font-medium hover:bg-accent/20 transition-colors"
            >
              Call Support
            </a>
          </div>
        </div>

        <div className="mt-12 text-center text-sm text-text/60">
          <p>
            By continuing to use our services, you acknowledge that you have read, 
            understood, and agree to be bound by these Terms of Use.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Terms;