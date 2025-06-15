// src/components/ProductCard.tsx
import React from 'react';
import { ShoppingCart, Check } from 'lucide-react';
import { Product } from '../types';
import { useCartContext } from '../context/CartContext'; // Changed from useCart

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCartContext(); // Changed from useCart
  const [isAdded, setIsAdded] = React.useState(false);

  const handleAddToCart = () => {
    addToCart(product); // Adds to the shared cart state
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
      <div className="relative h-48 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = 'https://images.pexels.com/photos/1105019/pexels-photo-1105019.jpeg?auto=compress&cs=tinysrgb&w=500';
          }}
        />
        <div className="absolute top-4 left-4">
          <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
            {product.code}
          </span>
        </div>
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium">
              Out of Stock
            </span>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="mb-2">
          <span className="text-sm text-primary font-medium">{product.category}</span>
        </div>
        <h3 className="text-xl font-bold text-primary mb-2">{product.name}</h3>
        <p className="text-text/70 mb-2 text-sm">Quantity: {product.quantity}</p>
        <p className="text-text/70 mb-4 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-primary">
            ₹{product.price.toFixed(2)}
          </div>
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock || isAdded}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              isAdded
                ? 'bg-accent/20 text-primary'
                : product.inStock
                ? 'bg-primary text-white hover:bg-primary-dark'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="h-4 w-4" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingCart className="h-4 w-4" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;