import './globals.css';
import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'DevRel Labs - Building the Future of Open Source Development',
    template: '%s | DevRel Labs'
  },
  icons: {
    icon: "/devrel-labs/favicon.ico"
  },
  description: 'DevRel Labs is a collaborative GitHub organization by the nihitdotdev team, dedicated to creating innovative developer tools, fostering open source communities, and advancing modern software development for next-generation developers.',
  keywords: [
    'DevRel Labs',
    'Developer Relations',
    'Open Source',
    'GitHub Organization',
    'nihitdotdev',
    'Developer Tools',
    'Software Development',
    'Programming',
    'Tech Community',
    'OSS',
    'JavaScript',
    'TypeScript',
    'React',
    'Next.js',
    'Developer Community',
    'Code Collaboration',
    'Innovation',
    'Future of Development'
  ],
  authors: [
    { name: 'nihitdotdev team' },
    { name: 'DevRel Labs' }
  ],
  creator: 'nihitdotdev team',
  publisher: 'DevRel Labs',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://devrel-labs.dev',
    siteName: 'DevRel Labs',
    title: 'DevRel Labs - Building the Future of Open Source Development',
    description: 'A collaborative GitHub organization creating innovative developer tools and fostering open source communities for next-generation developers.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=630&fit=crop&crop=entropy&auto=format',
        width: 1200,
        height: 630,
        alt: 'DevRel Labs - Developer Relations and Open Source Innovation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@devrel_labs',
    creator: '@nihitdotdev',
    title: 'DevRel Labs - Building the Future of Open Source',
    description: 'Collaborative GitHub organization creating innovative developer tools and fostering open source communities.',
    images: [
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=630&fit=crop&crop=entropy&auto=format'
    ],
  },
  alternates: {
    canonical: 'https://devrel-labs.dev',
  },
  category: 'Technology',
  classification: 'Developer Tools and Open Source Software',
  other: {
    'github:org': 'devrel-labs',
    'github:url': 'https://github.com/organizations/devrel-labs',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico?v=2" />
      <body className={jetbrainsMono.className}>{children}</body>
    </html>
  );
}