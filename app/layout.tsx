import React from 'react';
import type { Metadata } from 'next';
import { League_Spartan } from 'next/font/google';
import favicon from './favicon.png';
import './globals.css';
import s from './layout.module.scss';

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
      <body className={`${leagueSpartan.className} ${s.body}`}>{children}</body>
    </html>
  );
}
