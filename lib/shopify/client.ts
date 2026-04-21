import 'server-only';
import { GraphQLClient } from 'graphql-request';
import { mockProducts, getMockProductByHandle } from './mock-data';

const useMockMode = process.env.SHOPIFY_USE_MOCK === 'true';
const storeDomain = process.env.SHOPIFY_STORE_DOMAIN;
const accessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const nodeEnv = process.env.NODE_ENV;

// Log mock mode status
if (useMockMode) {
  console.info('[Shopify] Running in MOCK mode - using local product data');
  
  // Warn if mock mode is active in production
  if (nodeEnv === 'production') {
    console.warn(
      '[Shopify] WARNING: Mock mode is enabled in production! ' +
      'Real Shopify credentials should be used in production environments.'
    );
  }
} else {
  console.info('[Shopify] Running in LIVE mode - connecting to Shopify store');
}

// Only require credentials if not in mock mode
if (!useMockMode) {
  if (!storeDomain) {
    throw new Error('SHOPIFY_STORE_DOMAIN is required');
  }

  if (!accessToken) {
    throw new Error('SHOPIFY_STOREFRONT_ACCESS_TOKEN is required');
  }
}

// Create client only if credentials are available
let shopifyClient: GraphQLClient | null = null;

if (storeDomain && accessToken) {
  const endpoint = `https://${storeDomain}/api/2024-01/graphql.json`;
  shopifyClient = new GraphQLClient(endpoint, {
    headers: {
      'X-Shopify-Storefront-Access-Token': accessToken,
      'Content-Type': 'application/json',
    },
  });
}

export { shopifyClient };

interface MoneyV2 {
  amount: string;
  currencyCode: string;
}

interface ProductVariantNode {
  id: string;
  title: string;
  priceV2: MoneyV2;
}

export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  priceRange: {
    minVariantPrice: MoneyV2;
  };
  featuredImage?: {
    url: string;
    altText?: string;
  };
  variants: {
    edges: Array<{
      node: ProductVariantNode;
    }>;
  };
}

interface ProductsQueryResponse {
  products: {
    edges: Array<{
      node: ShopifyProduct;
    }>;
  };
}

interface ProductByHandleResponse {
  productByHandle: ShopifyProduct | null;
}

const PRODUCTS_QUERY = `
  query GetProducts {
    products(first: 10) {
      edges {
        node {
          id
          title
          handle
          description
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          featuredImage {
            url
            altText
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                priceV2 {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  }
`;

const PRODUCT_BY_HANDLE_QUERY = `
  query GetProduct($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      handle
      description
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      featuredImage {
        url
        altText
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            priceV2 {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;

export async function getProducts(): Promise<ShopifyProduct[]> {
  if (useMockMode) {
    return mockProducts;
  }

  try {
    if (!shopifyClient) {
      throw new Error('Shopify client not initialized');
    }
    const data = await shopifyClient.request<ProductsQueryResponse>(PRODUCTS_QUERY);
    return data.products.edges.map((edge) => edge.node);
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

export async function getProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  if (useMockMode) {
    return getMockProductByHandle(handle);
  }

  try {
    if (!shopifyClient) {
      throw new Error('Shopify client not initialized');
    }
    const data = await shopifyClient.request<ProductByHandleResponse>(
      PRODUCT_BY_HANDLE_QUERY,
      { handle }
    );
    return data.productByHandle;
  } catch (error) {
    console.error(`Error fetching product by handle ${handle}:`, error);
    throw error;
  }
}
