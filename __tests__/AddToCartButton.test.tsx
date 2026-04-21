import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AddToCartButton } from '@/components/ui/AddToCartButton';
import * as cartStore from '@/lib/cart/store';

// Mock the cart store
vi.mock('@/lib/cart/store');

describe('AddToCartButton', () => {
  const mockVariants = [
    {
      id: 'daily-1',
      title: 'Daily',
      price: { amount: '29.99', currencyCode: 'USD' },
    },
    {
      id: 'race-1',
      title: 'Race',
      price: { amount: '39.99', currencyCode: 'USD' },
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders Daily and Race SKU buttons', () => {
    render(
      <AddToCartButton
        productTitle="BFFR"
        variants={mockVariants}
      />
    );

    expect(screen.getByTestId('sku-daily')).toBeInTheDocument();
    expect(screen.getByTestId('sku-race')).toBeInTheDocument();
  });

  it('renders add-to-cart button', () => {
    render(
      <AddToCartButton
        productTitle="BFFR"
        variants={mockVariants}
      />
    );

    expect(screen.getByTestId('add-to-cart')).toBeInTheDocument();
  });

  it('defaults to first variant', () => {
    render(
      <AddToCartButton
        productTitle="BFFR"
        variants={mockVariants}
      />
    );

    const dailyButton = screen.getByTestId('sku-daily');
    expect(dailyButton).toHaveClass('bg-neon-green');
  });

  it('allows selecting different variants', () => {
    render(
      <AddToCartButton
        productTitle="BFFR"
        variants={mockVariants}
      />
    );

    const raceButton = screen.getByTestId('sku-race');
    fireEvent.click(raceButton);

    expect(raceButton).toHaveClass('bg-neon-green');
  });

  it('calls addCartItem and openCartDrawer on add to cart', () => {
    render(
      <AddToCartButton
        productTitle="BFFR"
        variants={mockVariants}
      />
    );

    const addToCartBtn = screen.getByTestId('add-to-cart');
    fireEvent.click(addToCartBtn);

    expect(cartStore.addCartItem).toHaveBeenCalled();
    expect(cartStore.openCartDrawer).toHaveBeenCalled();
  });
});
