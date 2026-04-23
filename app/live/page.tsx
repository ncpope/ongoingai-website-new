import type { Metadata } from 'next';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { LiveStream } from '@/components/LiveStream';

export const metadata: Metadata = {
  title: 'Live — OngoingAI',
  description:
    'Watch OngoingAI build live on YouTube. Daily streams of real work, real tools, and real feedback from the community.',
};

export default function LivePage() {
  return (
    <>
      <Nav />
      <main style={{ padding: '48px 0 32px' }}>
        <LiveStream variant="page" />
      </main>
      <Footer />
    </>
  );
}
