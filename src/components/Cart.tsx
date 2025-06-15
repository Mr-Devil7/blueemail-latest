// src/components/Cart.tsx
import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, MessageCircle } from 'lucide-react';
import { useCartContext } from '../context/CartContext'; // Use the context

const Cart: React.FC = () => {
  const { 
    cartItems, 
    isCartOpen, 
    setIsCartOpen, 
    updateQuantity, 
    removeFromCart, 
    getTotalPrice,
    clearCart 
  } = useCartContext(); // Updated to useCartContext

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    setShowConfirmation(true);
  };

  const confirmOrder = () => {
    const orderDetails = cartItems.map(item => 
      `- ${item.product.name} (${item.product.code}): ${item.quantity} units @ ₹${item.product.price}/unit = ₹${(item.product.price * item.quantity).toFixed(2)}`
    ).join('\n');
    
    const total = getTotalPrice().toFixed(2);
    const message = `Order from Agrow:\n${orderDetails}\nTotal: ₹${total}\nPlease confirm my order!`;
    
    const whatsappUrl = `https://wa.me/918904959058?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    clearCart();
    setIsCartOpen(false);
    setShowConfirmation(false);
  };

  const cancelOrder = () => {
    setShowConfirmation(false);
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-primary text-white">
          <h2 className="text-xl font-bold">Shopping Cart</h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto max-h-96">
          {cartItems.length === 0 ? (
            <div className="p-6 text-center text-text/60">
              <p className="mb-2">Your cart is empty.</p>
              <p className="text-primary font-medium">Start shopping!</p>
            </div>
          ) : (
            <div className="p-6 space-y-4">
              {cartItems.map((item) => (
                <div key={item.product.id} className="flex items-center space-x-4 p-3 border border-gray-200 rounded-lg">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-lg"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.pexels.com/photos/1105019/pexels-photo-1105019.jpeg?auto=compress&cs=tinysrgb&w=500';
                    }}
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-primary">{item.product.name}</h3>
                    <p className="text-sm text-text/60">({item.product.code})</p>
                    <p className="text-sm text-text/60">{item.product.quantity}</p>
                    <p className="text-primary font-medium">₹{item.product.price.toFixed(2)}/unit</p>
                    <p className="text-sm font-medium text-secondary">
                      Subtotal: ₹{(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 hover:bg-accent/20 rounded"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 hover:bg-accent/20 rounded"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-1 hover:bg-red-100 rounded text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-medium">Total:</span>
              <span className="text-2xl font-bold text-primary">
                ₹{getTotalPrice().toFixed(2)}
              </span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors flex items-center justify-center space-x-2"
            >
              <MessageCircle className="h-5 w-5" />
              <span>Place Order on WhatsApp</span>
            </button>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/70 z-60 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-6">
            <div className="text-center">
              <MessageCircle className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-primary mb-2">Confirm Order</h3>
              <p className="text-text/70 mb-6">
                You'll be redirected to WhatsApp to place your order.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={cancelOrder}
                  className="flex-1 border border-gray-300 text-text px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmOrder}
                  className="flex-1 bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-dark transition-colors"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;