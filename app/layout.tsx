import { Metadata } from 'next';
import { ReactNode } from 'react';
import './globals.scss';

export const metadata: Metadata = {
  applicationName: 'Hyperhire',
  title: 'Hyperhire',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
