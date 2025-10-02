// frontend/src/app/layout.tsx

import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'IdeaBoard: Launch Your Best Ideas',
  description: 'The simple, real-time, anonymous idea board application built with Next.js, Tailwind, and Django.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className + " antialiased"}>{children}</body>
    </html>
  );
}