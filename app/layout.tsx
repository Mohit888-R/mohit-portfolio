import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ContentProvider } from '@/app/context/ContentContext';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Mohit Singh - Designer & Developer',
  description: 'Minimalist portfolio inspired by clean design principles.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <ContentProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ContentProvider>
      </body>
    </html>
  );
}