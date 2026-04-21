'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { getCartItems } from '@/lib/cart/store';

export function Header() {
  const [cartCount, setCartCount] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const updateCartCount = () => {
      const items = getCartItems();
      const count = items.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(count);
    };

    updateCartCount();
    window.addEventListener('bffr:cart-updated', updateCartCount);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('bffr:cart-updated', updateCartCount);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleCartClick = () => {
    window.dispatchEvent(new Event('bffr:cart-open'));
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
          isScrolled 
            ? 'bg-dark-bg/95 backdrop-blur-lg border-b border-border-subtle shadow-lg' 
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="group relative z-50" onClick={closeMobileMenu}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative h-12 w-auto"
              >
                <Image
                  src="/logo.png"
                  alt="BFFR"
                  width={140}
                  height={48}
                  className="h-12 w-auto object-contain"
                  priority
                />
              </motion.div>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              <Link 
                href="/#flavors" 
                className="text-text-muted hover:text-neon-green transition-colors font-medium"
              >
                Products
              </Link>
              <Link 
                href="/science" 
                className="text-text-muted hover:text-neon-green transition-colors font-medium"
              >
                Science
              </Link>
              <Link 
                href="/story" 
                className="text-text-muted hover:text-neon-green transition-colors font-medium"
              >
                Story
              </Link>
            </nav>

            <div className="flex items-center gap-2 relative z-50">
              <button
                onClick={handleCartClick}
                className="relative p-3 hover:bg-dark-surface rounded-lg transition-colors
                           focus:outline-none focus:ring-2 focus:ring-neon-green"
                aria-label={`Cart: ${cartCount} items`}
              >
                <svg className="w-6 h-6 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
                  />
                </svg>
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-neon-green rounded-full flex items-center justify-center"
                    >
                      <span className="text-dark-bg text-xs font-bold">
                        {cartCount > 9 ? '9+' : cartCount}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-3 hover:bg-dark-surface rounded-lg transition-colors
                           focus:outline-none focus:ring-2 focus:ring-neon-green"
                aria-label="Menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <svg className="w-6 h-6 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-dark-bg/80 backdrop-blur-sm z-20 md:hidden"
              onClick={closeMobileMenu}
            />
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-20 right-0 bottom-0 w-64 bg-dark-surface border-l border-border-subtle z-20 md:hidden"
            >
              <div className="flex flex-col gap-2 p-6">
                <Link href="/#flavors" onClick={closeMobileMenu}
                  className="px-4 py-3 text-text-muted hover:text-neon-green hover:bg-dark-bg rounded-lg transition-all font-medium">
                  Products
                </Link>
                <Link href="/science" onClick={closeMobileMenu}
                  className="px-4 py-3 text-text-muted hover:text-neon-green hover:bg-dark-bg rounded-lg transition-all font-medium">
                  Science
                </Link>
                <Link href="/story" onClick={closeMobileMenu}
                  className="px-4 py-3 text-text-muted hover:text-neon-green hover:bg-dark-bg rounded-lg transition-all font-medium">
                  Story
                </Link>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
