import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  getCartItems,
  addCartItem,
  updateCartItemQuantity,
  removeCartItem,
  clearCart,
  openCartDrawer,
} from '@/lib/cart/store';
import type { CartItem } from '@/lib/cart/types';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('Cart Store', () => {
  const mockCartItem: CartItem = {
    id: 'variant-1',
    merchandiseId: 'gid://shopify/ProductVariant/1',
    title: 'BFFR Daily',
    variantTitle: 'Daily - 30 servings',
    price: '29.99',
    currencyCode: 'USD',
    quantity: 1,
  };

  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  describe('getCartItems', () => {
    it('returns empty array when cart is empty', () => {
      const items = getCartItems();
      expect(items).toEqual([]);
    });

    it('returns items from localStorage', () => {
      localStorage.setItem('bffr-cart', JSON.stringify([mockCartItem]));
      const items = getCartItems();
      expect(items).toHaveLength(1);
      expect(items[0]).toEqual(mockCartItem);
    });

    it('handles corrupted localStorage gracefully', () => {
      localStorage.setItem('bffr-cart', 'invalid json');
      const items = getCartItems();
      expect(items).toEqual([]);
    });
  });

  describe('addCartItem', () => {
    it('adds a new item to empty cart', () => {
      const result = addCartItem(mockCartItem);
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual(mockCartItem);
    });

    it('increments quantity when adding duplicate merchandise', () => {
      addCartItem(mockCartItem);
      const result = addCartItem({ ...mockCartItem, quantity: 2 });
      
      expect(result).toHaveLength(1);
      expect(result[0].quantity).toBe(3); // 1 + 2
    });

    it('adds different items separately', () => {
      addCartItem(mockCartItem);
      const secondItem: CartItem = {
        ...mockCartItem,
        merchandiseId: 'gid://shopify/ProductVariant/2',
        variantTitle: 'Race - 30 servings',
        price: '39.99',
      };
      
      const result = addCartItem(secondItem);
      expect(result).toHaveLength(2);
    });

    it('dispatches cart-updated event', () => {
      const dispatchSpy = vi.spyOn(window, 'dispatchEvent');
      addCartItem(mockCartItem);
      
      expect(dispatchSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'bffr:cart-updated',
        })
      );
    });
  });

  describe('updateCartItemQuantity', () => {
    beforeEach(() => {
      addCartItem(mockCartItem);
    });

    it('updates quantity of existing item', () => {
      const result = updateCartItemQuantity('gid://shopify/ProductVariant/1', 5);
      expect(result[0].quantity).toBe(5);
    });

    it('removes item when quantity is 0 or less', () => {
      const result = updateCartItemQuantity('gid://shopify/ProductVariant/1', 0);
      expect(result).toHaveLength(0);
    });

    it('does nothing for non-existent item', () => {
      const result = updateCartItemQuantity('non-existent', 5);
      expect(result).toHaveLength(1);
      expect(result[0].quantity).toBe(1); // unchanged
    });
  });

  describe('removeCartItem', () => {
    beforeEach(() => {
      addCartItem(mockCartItem);
      addCartItem({
        ...mockCartItem,
        merchandiseId: 'gid://shopify/ProductVariant/2',
        quantity: 1,
      });
    });

    it('removes specific item from cart', () => {
      const result = removeCartItem('gid://shopify/ProductVariant/1');
      expect(result).toHaveLength(1);
      expect(result[0].merchandiseId).toBe('gid://shopify/ProductVariant/2');
    });

    it('dispatches cart-updated event', () => {
      const dispatchSpy = vi.spyOn(window, 'dispatchEvent');
      removeCartItem('gid://shopify/ProductVariant/1');
      
      expect(dispatchSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'bffr:cart-updated',
        })
      );
    });
  });

  describe('clearCart', () => {
    beforeEach(() => {
      addCartItem(mockCartItem);
    });

    it('removes all items', () => {
      const result = clearCart();
      expect(result).toHaveLength(0);
    });

    it('removes data from localStorage', () => {
      clearCart();
      const stored = localStorage.getItem('bffr-cart');
      expect(stored).toBe('[]');
    });
  });

  describe('openCartDrawer', () => {
    it('dispatches cart-open event', () => {
      const dispatchSpy = vi.spyOn(window, 'dispatchEvent');
      openCartDrawer();
      
      expect(dispatchSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'bffr:cart-open',
        })
      );
    });
  });
});
