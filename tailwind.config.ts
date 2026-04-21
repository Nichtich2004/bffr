import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // ===== NEUTRALS (Dark Mode-First) =====
        'dark-bg': '#050708',           // Website Background - fast schwarz
        'dark-surface': '#0E1113',      // Cards, Panels - leicht heller
        'dark-surface-2': '#181D20',    // Abgesetzte Blöcke (Buy-Box, Footer)
        
        // Text
        'text-primary': '#F9FAFB',      // Fast weiß, sehr hoher Kontrast
        'text-muted': '#9CA3AF',        // Bodycopy, AA-konform
        
        // Structure
        'border-subtle': '#1F2933',     // Rahmen, Divider
        
        // ===== BRAND / PRIMARY =====
        'brand-green': '#16A34A',       // Logo, Brand Primary (kräftiges Sportgrün)
        'neon-green': '#22C55E',        // CTA, Glows, Highlights (nur Effekte)
        'tropical-orange': '#F97316',   // Tropical Flavor
        'mint-blue': '#0EA5E9',         // Optional für Mint-Sorte
        
        // States
        'success': '#4ADE80',           // Success Messages
        'error': '#F97373',             // Error Messages
        
        // Legacy (nur für Backward Compatibility - können später entfernt werden)
        'buffer-green': '#16A34A',      // = brand-green
        'deep-field': '#0E1113',        // = dark-surface
        'sage-mist': '#9CA3AF',         // = text-muted
        'sage-light': '#D0DBD0',        // Wird durch text-primary ersetzt
        'science-blue': '#0EA5E9',      // = mint-blue
        'speed-blue': '#00B1FF',        // Deprecated
        'off-white': '#F9FAFB',         // = text-primary
        'race-orange': '#F97316',       // = tropical-orange
        'warm-accent': '#C95C20',       // Deprecated
      },
      fontFamily: {
        'space-grotesk': ['var(--font-space-grotesk)', 'sans-serif'],
        'inter': ['var(--font-inter)', 'sans-serif'],
        'jetbrains': ['var(--font-jetbrains-mono)', 'monospace'],
      },
      boxShadow: {
        'glow-green': '0 0 60px rgba(34, 197, 94, 0.25)',      // Neon-Green Glow
        'glow-orange': '0 0 60px rgba(249, 115, 22, 0.25)',    // Orange Glow
        'glow-subtle': '0 0 40px rgba(34, 197, 94, 0.15)',     // Subtiler Glow
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};

export default config;
