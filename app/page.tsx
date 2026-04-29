import type { Metadata } from 'next';
import { Nav } from '@/components/Nav';
import { Hero } from '@/components/Hero';
import { Features } from '@/components/Features';
import { CTABanner } from '@/components/CTABanner';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

export default function Page() {
  return (
    <>
      <Nav />
      <div id="waitlist">
        <Hero />
      </div>
      <Features />
      <CTABanner />
      <Footer />
    </>
  );
}
