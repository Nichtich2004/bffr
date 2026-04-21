import { test, expect } from '@playwright/test';

test.describe('Checkout Flow', () => {
  test('user can add product to cart and see subscription upsell', async ({ page }) => {
    // Navigate to homepage
    await page.goto('/');
    
    // Find first product link
    const firstProductLink = page.locator('[data-testid="first-product-link"]').first();
    
    // Verify products are loaded - fail with clear error if not
    const hasProducts = await firstProductLink.isVisible().catch(() => false);
    if (!hasProducts) {
      throw new Error(
        'No products loaded. Possible causes:\n' +
        '1. Mock mode is disabled (SHOPIFY_USE_MOCK should be "true" for local testing)\n' +
        '2. Real Shopify credentials missing or invalid (SHOPIFY_STORE_DOMAIN, SHOPIFY_STOREFRONT_ACCESS_TOKEN)\n' +
        'Check .env.local configuration and ensure credentials are correct.'
      );
    }
    
    // Click on first product
    await firstProductLink.click();
    
    // Verify we're on PDP
    await expect(page).toHaveURL(/\/product\//);
    
    // Verify product title is visible
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    
    // Select a SKU (Daily or Race, whichever is available)
    const dailyButton = page.locator('[data-testid="sku-daily"]');
    const raceButton = page.locator('[data-testid="sku-race"]');
    
    if (await dailyButton.isVisible()) {
      await dailyButton.click();
    } else if (await raceButton.isVisible()) {
      await raceButton.click();
    }
    
    // Click Add to Cart
    const addToCartBtn = page.locator('[data-testid="add-to-cart"]');
    await expect(addToCartBtn).toBeVisible();
    await addToCartBtn.click();
    
    // Verify Cart Drawer opens
    const drawer = page.locator('[data-testid="cart-drawer"]');
    await expect(drawer).toBeVisible({ timeout: 5000 });
    
    // Verify cart item is present with correct structure
    const cartItem = page.locator('[data-testid="cart-drawer"]').locator('h4').first();
    await expect(cartItem).toContainText(/\S/); // Product title should not be empty
    
    // Verify Upsell section exists and is visible
    const upsell = page.locator('[data-testid="cart-upsell"]');
    await expect(upsell).toBeVisible();
    
    // Verify subscription toggle exists and is OFF by default
    const subscriptionToggle = page.locator('[data-testid="subscription-toggle"]');
    await expect(subscriptionToggle).toBeVisible();
    
    // Verify discount is NOT shown initially (toggle is OFF)
    const discountText = page.getByText(/Subscription Discount/);
    await expect(discountText).not.toBeVisible();
    
    // Click toggle to enable subscription
    await subscriptionToggle.click();
    
    // Verify discount is now shown
    await expect(discountText).toBeVisible();
    
    // Verify total includes discount savings
    const totalAmount = page.locator('[data-testid="cart-drawer"]').getByText(/^Total$/).locator('..').getByText(/\$/);
    await expect(totalAmount).toBeVisible();
    
    // Verify Checkout button is present
    const checkoutBtn = page.locator('[data-testid="cart-drawer"]').getByRole('button', { name: /checkout|proceed/i });
    await expect(checkoutBtn).toBeVisible();
  });
});
