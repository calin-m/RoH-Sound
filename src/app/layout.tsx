import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'RoH Sound | Pure Acoustic Architecture & Precision Wireless',
  description:
    'Experience RoH Sound flagship wireless headphones with 45mm custom titanium-graphene drivers, 48dB neural hybrid ANC, and 360-degree spatial audio in a light minimalist aesthetic.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-[#fafaf9] text-zinc-900 selection:bg-zinc-900 selection:text-white"
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
