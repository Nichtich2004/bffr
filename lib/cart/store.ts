import { CartItem } from './types';

const CART_STORAGE_KEY = 'bffr-cart';

export function getCartItems(): CartItem[] {
  if (typeof window === 'undefined') {
    return [];
  }
  
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    console.error('Failed to read cart from localStorage');
    return [];
  }
}

export function addCartItem(item: CartItem): CartItem[] {
  if (typeof window === 'undefined') {
    return [];
  }
  
  const items = getCartItems();
  const existingIndex = items.findIndex(
    (i) => i.merchandiseId === item.merchandiseId
  );
  
  if (existingIndex > -1) {
    items[existingIndex].quantity += item.quantity;
  } else {
    items.push(item);
  }
  
  saveCart(items);
  dispatchCartEvents();
  return items;
}

export function updateCartItemQuantity(
  merchandiseId: string,
  quantity: number
): CartItem[] {
  if (typeof window === 'undefined') {
    return [];
  }
  
  const items = getCartItems();
  const item = items.find((i) => i.merchandiseId === merchandiseId);
  
  if (item) {
    if (quantity <= 0) {
      return removeCartItem(merchandiseId);
    }
    item.quantity = quantity;
    saveCart(items);
    dispatchCartEvents();
  }
  
  return items;
}

export function removeCartItem(merchandiseId: string): CartItem[] {
  if (typeof window === 'undefined') {
    return [];
  }
  
  const items = getCartItems().filter((i) => i.merchandiseId !== merchandiseId);
  saveCart(items);
  dispatchCartEvents();
  return items;
}

export function clearCart(): CartItem[] {
  if (typeof window === 'undefined') {
    return [];
  }
  
  saveCart([]);
  dispatchCartEvents();
  return [];
}

export function openCartDrawer(): void {
  if (typeof window === 'undefined') {
    return;
  }
  
  window.dispatchEvent(new CustomEvent('bffr:cart-open'));
}

function saveCart(items: CartItem[]): void {
  if (typeof window === 'undefined') {
    return;
  }
  
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch {
    console.error('Failed to save cart to localStorage');
  }
}

function dispatchCartEvents(): void {
  if (typeof window === 'undefined') {
    return;
  }
  
  window.dispatchEvent(new CustomEvent('bffr:cart-updated'));
}
