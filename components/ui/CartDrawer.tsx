'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './Button';
import { getCartItems, removeCartItem, updateCartItemQuantity } from '@/lib/cart/store';
import type { CartItem } from '@/lib/cart/types';

export function CartDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<CartItem[]>([]);
  const [isSubscription, setIsSubscription] = useState(false);
  
  useEffect(() => {
    const handleCartOpen = () => setIsOpen(true);
    const handleCartUpdate = () => setItems(getCartItems());
    
    window.addEventListener('bffr:cart-open', handleCartOpen);
    window.addEventListener('bffr:cart-updated', handleCartUpdate);
    
    setItems(getCartItems());
    
    return () => {
      window.removeEventListener('bffr:cart-open', handleCartOpen);
      window.removeEventListener('bffr:cart-updated', handleCartUpdate);
    };
  }, []);
  
  const handleClose = () => setIsOpen(false);
  const handleRemoveItem = (merchandiseId: string) => {
    removeCartItem(merchandiseId);
    setItems(getCartItems());
  };
  
  const handleQuantityChange = (merchandiseId: string, quantity: number) => {
    updateCartItemQuantity(merchandiseId, quantity);
    setItems(getCartItems());
  };
  
  const subtotal = items.reduce((sum, item) => 
    sum + (parseFloat(item.price) * item.quantity), 0
  );
  
  const discount = isSubscription ? subtotal * 0.15 : 0;
  const total = subtotal - discount;
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-dark-bg/80 z-40 backdrop-blur-sm"
            onClick={handleClose}
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            data-testid="cart-drawer"
            className="fixed right-0 top-0 h-full w-full max-w-md bg-dark-surface z-50 
                       border-l border-border-subtle flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="p-6 border-b border-border-subtle">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-space-grotesk font-bold text-text-primary">Your Cart</h2>
                <button 
                  onClick={handleClose}
                  className="p-2 text-text-muted hover:text-neon-green transition-colors rounded-lg
                             hover:bg-dark-surface-2"
                  aria-label="Close cart"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 scrollbar-dark">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <svg 
                    className="w-16 h-16 text-text-muted/30 mx-auto mb-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={1.5} 
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
                    />
                  </svg>
                  <p className="text-text-muted">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.merchandiseId}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 100 }}
                      className="flex justify-between items-start p-4 border border-border-subtle 
                                 rounded-lg bg-dark-bg/30 gap-4 hover:border-neon-green/30 
                                 transition-colors"
                    >
                      <div className="flex-1">
                        <h4 className="font-semibold text-text-primary">{item.title}</h4>
                        <p className="text-sm text-text-muted mb-3">{item.variantTitle}</p>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => handleQuantityChange(item.merchandiseId, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center border border-border-subtle 
                                       rounded hover:bg-dark-surface-2 hover:border-neon-green transition-colors
                                       text-text-primary"
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="text-sm font-jetbrains text-text-primary w-8 text-center">
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => handleQuantityChange(item.merchandiseId, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center border border-border-subtle 
                                       rounded hover:bg-dark-surface-2 hover:border-neon-green transition-colors
                                       text-text-primary"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      
                      <div className="text-right flex flex-col items-end gap-2">
                        <p className="font-bold text-text-primary font-jetbrains">
                          ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                        </p>
                        <button
                          onClick={() => handleRemoveItem(item.merchandiseId)}
                          className="text-xs text-text-muted hover:text-error transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Footer with Subscription Toggle & Total */}
            {items.length > 0 && (
              <div className="p-6 border-t border-border-subtle bg-dark-surface-2/50">
                {/* Subscription Toggle */}
                <div className="mb-6 p-4 bg-neon-green/10 border border-neon-green/20 rounded-lg">
                  <label className="flex items-center justify-between cursor-pointer">
                    <div>
                      <p className="font-semibold text-text-primary">Subscribe & Save 15%</p>
                      <p className="text-xs text-text-muted">Recurring monthly delivery</p>
                    </div>
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={isSubscription}
                        onChange={(e) => setIsSubscription(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-border-subtle rounded-full peer 
                                      peer-checked:bg-neon-green transition-colors">
                        <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-text-primary rounded-full 
                                        transition-transform ${isSubscription ? 'translate-x-5' : 'translate-x-0'}`}
                        />
                      </div>
                    </div>
                  </label>
                </div>

                {/* Pricing */}
                <div className="space-y-2 mb-6 font-jetbrains">
                  <div className="flex justify-between text-text-muted">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-success">
                      <span>Subscription Discount (15%)</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-xl font-bold text-text-primary pt-2 border-t border-border-subtle">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <Button 
                  className="w-full bg-neon-green text-dark-bg hover:bg-neon-green/90 
                             font-bold py-4 text-lg"
                  onClick={() => alert('Checkout coming soon!')}
                >
                  Checkout
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
