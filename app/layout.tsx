import type { Metadata, Viewport } from 'next';
import '@fontsource-variable/inter';
import './globals.css';
import { PwaProvider } from '@/components/pwa/PwaProvider';

export const metadata: Metadata = {
  title: { default: 'africanqueen', template: '%s | africanqueen' },
  description: 'Free tech training, mentorship, grants and jobs for African women.',
  manifest: '/manifest.webmanifest',
  icons: { icon: '/icons/icon-192.png', apple: '/icons/apple-touch-icon.png' },
  appleWebApp: { capable: true, title: 'africanqueen', statusBarStyle: 'default' },
};

export const viewport: Viewport = { themeColor: '#6D28D9', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[90] focus:rounded-md focus:bg-white focus:px-3 focus:py-2">
          Skip to content
        </a>
        {children}
        <PwaProvider />
      </body>
    </html>
  );
}
