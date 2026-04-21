'use client';

import { useState } from 'react';
import { Nav } from '@/components/Nav';
import { Hero } from '@/components/Hero';
import { LogoRow } from '@/components/LogoRow';
import { CodeDemo } from '@/components/CodeDemo';
import { Features } from '@/components/Features';
import { Testimonial } from '@/components/Testimonial';
import { Pricing } from '@/components/Pricing';
import { CTABanner } from '@/components/CTABanner';
import { Footer } from '@/components/Footer';
import { InstallModal } from '@/components/InstallModal';

export default function Page() {
  const [installOpen, setInstallOpen] = useState(false);

  return (
    <>
      <Nav onCta={() => setInstallOpen(true)} />
      <Hero />
      <LogoRow />
      <CodeDemo />
      <Features />
      <Testimonial />
      <Pricing />
      <CTABanner />
      <Footer />
      {installOpen && <InstallModal onClose={() => setInstallOpen(false)} />}
    </>
  );
}
