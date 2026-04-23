import type { Metadata } from 'next';
import { Nav } from '@/components/Nav';
import { Hero } from '@/components/Hero';
import { LogoRow } from '@/components/LogoRow';
import { LiveStream } from '@/components/LiveStream';
import { Features } from '@/components/Features';
import { Testimonial } from '@/components/Testimonial';
import { CTABanner } from '@/components/CTABanner';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

export default function Page() {
  return (
    <>
      <Nav />
      <Hero />
      <LogoRow />
      <LiveStream />
      <Features />
      <Testimonial />
      <CTABanner />
      <Footer />
    </>
  );
}
