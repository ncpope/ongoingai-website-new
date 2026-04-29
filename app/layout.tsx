import type { Metadata } from 'next';
import { Instrument_Serif } from 'next/font/google';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ongoing.ai'),
  title: 'OngoingAI — Be the answer ChatGPT cites',
  description:
    'OngoingAI scans your site, surfaces the gaps blocking LLM citation, and gives you the exact pages to write next — grounded in your own ICP, not generic keywords.',
  icons: {
    icon: '/logo-mark.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
