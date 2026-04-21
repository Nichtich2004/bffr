import type { Metadata } from 'next';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import { clsx } from 'clsx';
import { Header } from '@/components/layout/Header';
import { CartDrawer } from '@/components/ui/CartDrawer';
import { Providers } from './providers';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'BFFR - Buffer Smarter. Perform Harder.',
  description: 'A clinical performance system for athletes who want a smarter pre-effort ritual.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className={clsx(inter.className, 'bg-dark-bg text-text-primary')}>
        <Providers>
          <Header />
          {children}
          <CartDrawer />
        </Providers>
      </body>
    </html>
  );
}
