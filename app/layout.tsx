import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MCG — Moscow Consulting Group',
  description: 'MCG works on matters of capital and governance.',
  openGraph: {
    title: 'MCG — Moscow Consulting Group',
    description: 'MCG works on matters of capital and governance.',
    type: 'website',
    url: 'https://mcg.miheenko.chatgpt.site/',
    images: [{
      url: 'https://mcg.miheenko.chatgpt.site/og.png',
      alt: 'MCG — Capital & governance',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MCG — Moscow Consulting Group',
    description: 'MCG works on matters of capital and governance.',
    images: ['https://mcg.miheenko.chatgpt.site/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
