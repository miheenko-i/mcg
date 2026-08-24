import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MCG — Moscow Consulting Group',
  description:
    'MCG — глобальная сеть профессионалов мирового уровня с широким набором талантов и экспертизы.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
