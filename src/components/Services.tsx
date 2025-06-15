import React, { useState, useEffect } from 'react';
import { products } from '../data/products';
import ProductCard from './ProductCard';

const Services: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Insecticides');
  
  const categories = [
    { id: 'Insecticides', name: 'Insecticides', icon: '🛡️' },
    { id: 'Seeds', name: 'Seeds', icon: '🌱' },
    { id: 'Fertilizers', name: 'Fertilizers', icon: '🧪' },
    { id: 'Plants', name: 'Plants', icon: '🌿' }
  ];

  // Listen for category change events from footer
  useEffect(() => {
    const handleCategoryChange = (event: CustomEvent) => {
      setSelectedCategory(event.detail);
    };

    window.addEventListener('setCategory', handleCategoryChange as EventListener);
    
    return () => {
      window.removeEventListener('setCategory', handleCategoryChange as EventListener);
    };
  }, []);

  const filteredProducts = products.filter(product => product.category === selectedCategory);

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">Our Products & Services</h2>
          <p className="text-xl text-text/70 max-w-3xl mx-auto">
            Discover our comprehensive range of agricultural products designed 
            to optimize your farming operations and maximize productivity.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-white text-text hover:bg-accent/20 border border-gray-200'
              }`}
            >
              <span className="text-lg">{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        {/* Category Description */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-primary mb-2">
            {categories.find(cat => cat.id === selectedCategory)?.name}
          </h3>
          <p className="text-text/70">
            {selectedCategory === 'Insecticides' && 'Effective pest control solutions for healthy crop protection'}
            {selectedCategory === 'Seeds' && 'Premium quality seeds for optimal crop yield and growth'}
            {selectedCategory === 'Fertilizers' && 'Organic and chemical fertilizers for enhanced soil nutrition'}
            {selectedCategory === 'Plants' && 'Beautiful plants and saplings for landscaping and gardening'}
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Product Count */}
        <div className="text-center mt-8">
          <p className="text-text/60">
            Showing {filteredProducts.length} products in {selectedCategory}
          </p>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-primary text-white rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">Need Custom Solutions?</h3>
            <p className="text-white/90 mb-6 text-lg">
              We offer customized agricultural solutions tailored to your specific needs. 
              Get in touch with our experts to discuss your requirements.
            </p>
            <button 
              onClick={() => window.open('https://wa.me/918904959058', '_blank')}
              className="bg-white text-primary px-8 py-3 rounded-lg font-medium hover:bg-accent/20 transition-colors"
            >
              Contact Our Experts
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;