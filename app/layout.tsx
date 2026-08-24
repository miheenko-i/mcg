import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MCG — Moscow Consulting Group',
  description: 'MCG — strategic solutions for real business.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
