import React, { useState } from 'react';
import { Mail, Phone, MessageCircle, Send, Users, Facebook } from 'lucide-react';
import { ContactForm } from '../types';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Send to WhatsApp
    const message = `New Contact Form Submission:\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nMessage: ${formData.message}`;
    const whatsappUrl = `https://wa.me/918904959058?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      value: '+91 89049 59058',
      action: 'tel:+918904959058'
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'contact.agrow@gmail.com',
      action: 'mailto:contact.agrow@gmail.com'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp Community',
      value: 'Join our farming community',
      action: 'https://chat.whatsapp.com/IaJoBCwAkCTBHBSjintHSl'
    }
  ];

  const socialLinks = [
    {
      icon: MessageCircle,
      title: 'WhatsApp Support',
      description: 'Get instant support and connect with our team',
      action: () => window.open('https://wa.me/918904959058', '_blank'),
      color: 'bg-green-500'
    },
    {
      icon: Facebook,
      title: 'Facebook Page',
      description: 'Follow us for updates and farming tips',
      action: () => window.open('https://www.facebook.com/profile.php?id=61575954306775', '_blank'),
      color: 'bg-blue-600'
    },
    {
      icon: Users,
      title: 'Facebook Community',
      description: 'Join our farming community group',
      action: () => window.open('https://www.facebook.com/groups/agrowcommunity', '_blank'),
      color: 'bg-blue-500'
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">Get in Touch</h2>
          <p className="text-xl text-text/70 max-w-3xl mx-auto">
            Ready to transform your farming operations? Contact our team of experts 
            to discuss your needs and find the perfect solution for your farm.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-primary mb-6">Contact Information</h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.action}
                    target={info.title === 'WhatsApp Community' ? '_blank' : undefined}
                    rel={info.title === 'WhatsApp Community' ? 'noopener noreferrer' : undefined}
                    className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                  >
                    <div className="bg-accent/20 p-3 rounded-lg mr-4">
                      <info.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-primary">{info.title}</h4>
                      <p className="text-text/70">{info.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Social Media Links */}
            <div>
              <h3 className="text-2xl font-bold text-primary mb-6">Connect With Us</h3>
              <div className="space-y-4">
                {socialLinks.map((social, index) => (
                  <div
                    key={index}
                    onClick={social.action}
                    className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-100 hover:border-primary/20"
                  >
                    <div className={`${social.color} p-3 rounded-lg mr-4`}>
                      <social.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium text-primary">{social.title}</h4>
                      <p className="text-text/70 text-sm">{social.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-primary text-white p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Quick Support</h3>
              <p className="text-white/90 mb-6">
                Need immediate assistance? Contact us directly via WhatsApp for 
                quick support and real-time communication with our team.
              </p>
              <button
                onClick={() => window.open('https://wa.me/918904959058', '_blank')}
                className="bg-white text-primary px-6 py-3 rounded-lg font-medium hover:bg-accent/20 transition-colors flex items-center space-x-2"
              >
                <MessageCircle className="h-5 w-5" />
                <span>Chat on WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold text-primary mb-6">Send us a Message</h3>
            
            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="bg-accent/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="h-8 w-8 text-primary" />
                </div>
                <h4 className="text-xl font-bold text-primary mb-2">Message Sent!</h4>
                <p className="text-text/70">We'll get back to you soon via WhatsApp.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-text mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-text mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-text mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-text mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Tell us about your needs..."
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;