import React from 'react';
import { Users, Shield, Smartphone, TrendingUp } from 'lucide-react';

const Mission: React.FC = () => {
  const values = [
    {
      icon: Users,
      title: 'Supporting Small Farmers',
      description: 'Dedicated to transforming the lives of India\'s small and marginal farmers through accessible technology.'
    },
    {
      icon: Smartphone,
      title: 'Easy Access',
      description: 'Simple-to-use website and WhatsApp marketplace that makes farming information and supplies easily accessible.'
    },
    {
      icon: Shield,
      title: 'Trusted Partnership',
      description: 'Your reliable partner every step of the way, from sowing season to harvest management.'
    },
    {
      icon: TrendingUp,
      title: 'Smart Growth',
      description: 'Helping farmers grow smarter with data-driven insights and quality products at fair prices.'
    }
  ];

  return (
    <section className="py-20 bg-accent/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">Our Mission</h2>
          <p className="text-xl text-text/70 max-w-3xl mx-auto">
            Transforming agriculture by making farming simpler, smarter, and more profitable for every farmer across India.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-primary">
              Your Trusted Farming Partner
            </h3>
            <p className="text-text/70 leading-relaxed">
              At Agrow, we're dedicated to transforming the lives of India's small and marginal farmers by making farming simpler, smarter, and more profitable. Our easy-to-use platform provides essential farming information and real-time weather updates to help you plan your crops with confidence.
            </p>
            <p className="text-text/70 leading-relaxed">
              Through our WhatsApp marketplace, you can directly purchase high-quality seeds, fertilizers, and plants at fair prices, saving time and ensuring you get the best for your farm. Whether you're preparing for the sowing season or managing your harvest, Agrow is with you every step of the way.
            </p>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-primary/20">
              <h4 className="font-bold text-primary mb-2">Join Our Community</h4>
              <p className="text-text/70">
                Join thousands of farmers who are growing smarter with Agrow. Connect with us today and discover how we can help transform your farming journey.
              </p>
            </div>
          </div>
          <div>
            <img
              src="/Mission.jpg"
              alt="Farmers Growing with Agrow"
              className="rounded-2xl shadow-lg"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm text-center hover:shadow-md transition-shadow border border-gray-100">
              <div className="bg-accent/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <value.icon className="h-8 w-8 text-primary" />
              </div>
              <h4 className="text-xl font-bold text-primary mb-2">{value.title}</h4>
              <p className="text-text/70">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Mission;