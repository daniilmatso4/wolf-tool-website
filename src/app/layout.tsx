import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BackgroundGrid from '@/components/ui/BackgroundGrid';

export const metadata: Metadata = {
  title: {
    default: 'Wolf Tool - AI Sales Prospecting That Closes Deals',
    template: '%s | Wolf Tool',
  },
  description:
    'Unleash AI-powered sales agents to find, engage, and close prospects on LinkedIn. Gamified pipeline management with a Wolf of Wall Street twist.',
  keywords: [
    'AI sales tool',
    'LinkedIn prospecting',
    'sales automation',
    'CRM',
    'sales pipeline',
    'AI agents',
    'lead generation',
  ],
  openGraph: {
    title: 'Wolf Tool - AI Sales Prospecting That Closes Deals',
    description:
      'Unleash AI-powered sales agents to find, engage, and close prospects on LinkedIn.',
    url: 'https://wolfpack.ai',
    siteName: 'Wolf Tool',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wolf Tool - AI Sales Prospecting That Closes Deals',
    description:
      'Unleash AI-powered sales agents to find, engage, and close prospects on LinkedIn.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body suppressHydrationWarning className="antialiased min-h-screen">
        <BackgroundGrid />
        <Navbar />
        <main className="relative z-10 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
