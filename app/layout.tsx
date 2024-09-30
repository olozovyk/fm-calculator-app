import type { Metadata } from 'next';
import { League_Spartan } from 'next/font/google';
import favicon from './favicon.png';
import './globals.css';

const leagueSpartan = League_Spartan({
  subsets: ['latin'],
  display: 'swap',
  weight: '700',
});

export const metadata: Metadata = {
  title: 'Calculator App',
  description: 'Calculator App',
  icons: {
    icon: favicon.src,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={leagueSpartan.className}>{children}</body>
    </html>
  );
}
