import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MCG — Moscow Consulting Group',
  description: 'MCG — стратегические решения для реального бизнеса.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
