import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CartDrawer } from '@/components/ui/CartDrawer';
import * as cartStore from '@/lib/cart/store';

// Mock the cart store
vi.mock('@/lib/cart/store', () => ({
  getCartItems: vi.fn(() => []),
  addCartItem: vi.fn(),
  removeCartItem: vi.fn(),
  updateCartItemQuantity: vi.fn(),
  openCartDrawer: vi.fn(),
}));

describe('CartDrawer', () => {
  const mockCartItem = {
    id: 'variant-1',
    merchandiseId: 'gid://shopify/ProductVariant/1',
    title: 'BFFR Daily',
    variantTitle: 'Daily - 30 servings',
    price: '29.99',
    currencyCode: 'USD',
    quantity: 1,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    // Drawer starts closed
    (cartStore.getCartItems as any).mockReturnValue([]);
  });

  it('renders drawer closed by default', () => {
    render(<CartDrawer />);
    expect(screen.queryByTestId('cart-drawer')).not.toBeInTheDocument();
  });

  it('opens drawer when bffr:cart-open event is dispatched', async () => {
    render(<CartDrawer />);
    
    // Dispatch the cart-open event
    window.dispatchEvent(new CustomEvent('bffr:cart-open'));
    
    await waitFor(() => {
      expect(screen.getByTestId('cart-drawer')).toBeInTheDocument();
    });
  });

  it('displays empty cart message when no items', async () => {
    render(<CartDrawer />);
    window.dispatchEvent(new CustomEvent('bffr:cart-open'));
    
    await waitFor(() => {
      expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
    });
  });

  it('displays cart items when present', async () => {
    (cartStore.getCartItems as any).mockReturnValue([mockCartItem]);
    
    render(<CartDrawer />);
    window.dispatchEvent(new CustomEvent('bffr:cart-open'));
    
    await waitFor(() => {
      expect(screen.getByText('BFFR Daily')).toBeInTheDocument();
      expect(screen.getByText('Daily - 30 servings')).toBeInTheDocument();
    });
  });

  it('closes drawer when backdrop is clicked', async () => {
    render(<CartDrawer />);
    window.dispatchEvent(new CustomEvent('bffr:cart-open'));
    
    await waitFor(() => {
      expect(screen.getByTestId('cart-drawer')).toBeInTheDocument();
    });
    
    // Click backdrop
    const backdrop = document.querySelector('[class*="fixed inset-0"]') as HTMLElement;
    fireEvent.click(backdrop);
    
    await waitFor(() => {
      expect(screen.queryByTestId('cart-drawer')).not.toBeInTheDocument();
    });
  });

  it('closes drawer when close button is clicked', async () => {
    render(<CartDrawer />);
    window.dispatchEvent(new CustomEvent('bffr:cart-open'));
    
    await waitFor(() => {
      expect(screen.getByTestId('cart-drawer')).toBeInTheDocument();
    });
    
    // Click close button (the SVG close icon)
    const closeButtons = screen.getAllByRole('button');
    const closeButton = closeButtons.find(btn => {
      const svg = btn.querySelector('svg');
      return svg !== null;
    });
    
    if (closeButton) {
      fireEvent.click(closeButton);
      
      await waitFor(() => {
        expect(screen.queryByTestId('cart-drawer')).not.toBeInTheDocument();
      });
    }
  });

  it('displays subscription upsell section when items present', async () => {
    (cartStore.getCartItems as any).mockReturnValue([mockCartItem]);
    
    render(<CartDrawer />);
    window.dispatchEvent(new CustomEvent('bffr:cart-open'));
    
    await waitFor(() => {
      expect(screen.getByText('Subscribe & Save 15%')).toBeInTheDocument();
      expect(screen.getByText('Recurring monthly delivery')).toBeInTheDocument();
    });
  });

  it('toggles subscription and shows discount', async () => {
    (cartStore.getCartItems as any).mockReturnValue([mockCartItem]);
    
    render(<CartDrawer />);
    window.dispatchEvent(new CustomEvent('bffr:cart-open'));
    
    await waitFor(() => {
      expect(screen.getByText('Subscribe & Save 15%')).toBeInTheDocument();
    });
    
    // Discount should not be visible initially
    expect(screen.queryByText(/Subscription Discount/)).not.toBeInTheDocument();
    
    // Click toggle (checkbox)
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    
    // Discount should now be visible
    await waitFor(() => {
      expect(screen.getByText(/Subscription Discount \(15%\)/)).toBeInTheDocument();
    });
  });

  it('updates cart items when bffr:cart-updated event is dispatched', async () => {
    const { rerender } = render(<CartDrawer />);
    window.dispatchEvent(new CustomEvent('bffr:cart-open'));
    
    await waitFor(() => {
      expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
    });
    
    // Update mock to return items
    (cartStore.getCartItems as any).mockReturnValue([mockCartItem]);
    
    // Dispatch cart-updated event
    window.dispatchEvent(new CustomEvent('bffr:cart-updated'));
    
    await waitFor(() => {
      expect(screen.getByText('BFFR Daily')).toBeInTheDocument();
    });
  });

  it('disables checkout button when cart is empty', async () => {
    render(<CartDrawer />);
    window.dispatchEvent(new CustomEvent('bffr:cart-open'));
    
    await waitFor(() => {
      // Checkout button should not be visible when cart is empty
      expect(screen.queryByRole('button', { name: /checkout/i })).not.toBeInTheDocument();
    });
  });

  it('enables checkout button when items present', async () => {
    (cartStore.getCartItems as any).mockReturnValue([mockCartItem]);
    
    render(<CartDrawer />);
    window.dispatchEvent(new CustomEvent('bffr:cart-open'));
    
    await waitFor(() => {
      const checkoutBtn = screen.getByRole('button', { name: /checkout/i });
      expect(checkoutBtn).not.toBeDisabled();
    });
  });

  it('calls removeCartItem when remove button is clicked', async () => {
    (cartStore.getCartItems as any).mockReturnValue([mockCartItem]);
    
    render(<CartDrawer />);
    window.dispatchEvent(new CustomEvent('bffr:cart-open'));
    
    await waitFor(() => {
      expect(screen.getByText('Remove')).toBeInTheDocument();
    });
    
    const removeBtn = screen.getByText('Remove');
    fireEvent.click(removeBtn);
    
    expect(cartStore.removeCartItem).toHaveBeenCalledWith('gid://shopify/ProductVariant/1');
  });
});
