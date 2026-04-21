import { ShopifyProduct } from './client';

export const mockProducts: ShopifyProduct[] = [
  {
    id: 'mock-green-tea-1',
    title: 'Green Tea',
    handle: 'green-tea',
    description:
      'Morning Loading Formula. Subtle taste · 0 Calories · Vegan · No Caffeine · Uncomplicated formula',
    priceRange: {
      minVariantPrice: {
        amount: '6.00',
        currencyCode: 'USD',
      },
    },
    featuredImage: {
      url: '/grrentea.png',
      altText: 'BFFR Green Tea - Morning Loading Formula',
    },
    variants: {
      edges: [
        {
          node: {
            id: 'mock-green-tea-1-container',
            title: '1 Container (15p)',
            priceV2: {
              amount: '6.00',
              currencyCode: 'USD',
            },
          },
        },
        {
          node: {
            id: 'mock-green-tea-2-containers',
            title: '2 Containers (30p)',
            priceV2: {
              amount: '11.00',
              currencyCode: 'USD',
            },
          },
        },
        {
          node: {
            id: 'mock-green-tea-4-containers',
            title: '4 Containers (60p)',
            priceV2: {
              amount: '21.00',
              currencyCode: 'USD',
            },
          },
        },
        {
          node: {
            id: 'mock-green-tea-s-dose',
            title: 'S (Light Dose)',
            priceV2: {
              amount: '6.00',
              currencyCode: 'USD',
            },
          },
        },
        {
          node: {
            id: 'mock-green-tea-m-dose',
            title: 'M (Standard Dose)',
            priceV2: {
              amount: '6.00',
              currencyCode: 'USD',
            },
          },
        },
        {
          node: {
            id: 'mock-green-tea-l-dose',
            title: 'L (Heavy Dose)',
            priceV2: {
              amount: '6.00',
              currencyCode: 'USD',
            },
          },
        },
      ],
    },
  },
  {
    id: 'mock-tropical-1',
    title: 'Tropical',
    handle: 'tropical',
    description:
      'Pre-Race Formula. Bold taste · With Caffeine · Pre-effort ritual',
    priceRange: {
      minVariantPrice: {
        amount: '6.00',
        currencyCode: 'USD',
      },
    },
    featuredImage: {
      url: '/tropical.png',
      altText: 'BFFR Tropical - Pre-Race Formula',
    },
    variants: {
      edges: [
        {
          node: {
            id: 'mock-tropical-1-container',
            title: '1 Container (15p)',
            priceV2: {
              amount: '6.00',
              currencyCode: 'USD',
            },
          },
        },
        {
          node: {
            id: 'mock-tropical-2-containers',
            title: '2 Containers (30p)',
            priceV2: {
              amount: '11.00',
              currencyCode: 'USD',
            },
          },
        },
        {
          node: {
            id: 'mock-tropical-4-containers',
            title: '4 Containers (60p)',
            priceV2: {
              amount: '21.00',
              currencyCode: 'USD',
            },
          },
        },
        {
          node: {
            id: 'mock-tropical-s-dose',
            title: 'S (Light Dose)',
            priceV2: {
              amount: '6.00',
              currencyCode: 'USD',
            },
          },
        },
        {
          node: {
            id: 'mock-tropical-m-dose',
            title: 'M (Standard Dose)',
            priceV2: {
              amount: '6.00',
              currencyCode: 'USD',
            },
          },
        },
        {
          node: {
            id: 'mock-tropical-l-dose',
            title: 'L (Heavy Dose)',
            priceV2: {
              amount: '6.00',
              currencyCode: 'USD',
            },
          },
        },
      ],
    },
  },
  {
    id: 'mock-monthly-subscription-1',
    title: 'Monthly Subscription',
    handle: 'monthly-subscription',
    description:
      'Mix of both - Recurring delivery · Save 15% · 2 Containers (Green + Tropical) · Cancel anytime',
    priceRange: {
      minVariantPrice: {
        amount: '12.00',
        currencyCode: 'USD',
      },
    },
    featuredImage: {
      url: '/hero.png',
      altText: 'BFFR Monthly Subscription - Green Tea & Tropical',
    },
    variants: {
      edges: [
        {
          node: {
            id: 'mock-subscription-monthly',
            title: 'Monthly ($12.00/month)',
            priceV2: {
              amount: '12.00',
              currencyCode: 'USD',
            },
          },
        },
      ],
    },
  },
];

export function getMockProductByHandle(handle: string): ShopifyProduct | null {
  return mockProducts.find((product) => product.handle === handle) || null;
}
