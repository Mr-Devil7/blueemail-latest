import React from 'react';
import { Mail, Phone, Facebook, Instagram, MessageCircle, Users } from 'lucide-react';

interface FooterProps {
  onNavigate: (section: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: 'About Us', action: () => onNavigate('home') },
      { label: 'Our Mission', action: () => onNavigate('home') },
      { label: 'Services', action: () => onNavigate('services') },
      { label: 'Contact', action: () => onNavigate('contact') }
    ],
    products: [
      { label: 'Insecticides', action: () => {
        onNavigate('services');
        // Set category after navigation
        setTimeout(() => {
          const event = new CustomEvent('setCategory', { detail: 'Insecticides' });
          window.dispatchEvent(event);
        }, 100);
      }},
      { label: 'Seeds', action: () => {
        onNavigate('services');
        setTimeout(() => {
          const event = new CustomEvent('setCategory', { detail: 'Seeds' });
          window.dispatchEvent(event);
        }, 100);
      }},
      { label: 'Fertilizers', action: () => {
        onNavigate('services');
        setTimeout(() => {
          const event = new CustomEvent('setCategory', { detail: 'Fertilizers' });
          window.dispatchEvent(event);
        }, 100);
      }},
      { label: 'Plants', action: () => {
        onNavigate('services');
        setTimeout(() => {
          const event = new CustomEvent('setCategory', { detail: 'Plants' });
          window.dispatchEvent(event);
        }, 100);
      }}
    ],
    support: [
      { label: 'Documentation', action: () => {} },
      { label: 'Installation Guide', action: () => {} },
      { label: 'Technical Support', action: () => onNavigate('contact') },
      { label: 'Warranty', action: () => {} }
    ],
    legal: [
      { label: 'Terms of Use', action: () => onNavigate('terms') },
      { label: 'Privacy Policy', action: () => {} },
      { label: 'Cookie Policy', action: () => {} },
      { label: 'GDPR Compliance', action: () => {} }
    ]
  };

  const socialLinks = [
    { 
      icon: Facebook, 
      href: 'https://www.facebook.com/profile.php?id=61575954306775', 
      label: 'Facebook Page' 
    },
    { 
      icon: Users, 
      href: 'https://www.facebook.com/groups/agrowcommunity', 
      label: 'Facebook Community' 
    },
    { 
      icon: Instagram, 
      href: 'https://www.instagram.com/agrow.official/', 
      label: 'Instagram' 
    },
    { 
      icon: MessageCircle, 
      href: 'https://chat.whatsapp.com/IaJoBCwAkCTBHBSjintHSl', 
      label: 'WhatsApp Community' 
    }
  ];

  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <img
                src="/image.png"
                alt="Agrow Logo"
                className="h-8 w-auto brightness-0 invert"
                onError={(e) => {
                  // Fallback to text logo if image fails to load
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling!.style.display = 'flex';
                }}
              />
              <div className="hidden items-center space-x-2">
                <div className="bg-white p-2 rounded-lg">
                  <div className="h-6 w-6 text-primary font-bold flex items-center justify-center">A</div>
                </div>
                <span className="text-2xl font-bold">Agrow</span>
              </div>
            </div>
            <p className="text-white/80 mb-6 leading-relaxed">
              Agrow is your one-stop app for seeds, fertilizers, plants, weather updates, and more, empowering Indian farmers to grow smarter. Join our community today! 🌾
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-accent" />
                <span className="text-white/80">contact.agrow@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-accent" />
                <span className="text-white/80">+91 89049 59058</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={link.action}
                    className="text-white/80 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Products</h3>
            <ul className="space-y-2">
              {footerLinks.products.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={link.action}
                    className="text-white/80 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={link.action}
                    className="text-white/80 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-6 mb-4 md:mb-0">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-accent transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
            <div className="text-center md:text-right">
              <p className="text-white/60">
                © {currentYear} Agrow. All rights reserved.
              </p>
              <p className="text-white/40 text-sm mt-1">
                Registered trademark of Agrow
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;