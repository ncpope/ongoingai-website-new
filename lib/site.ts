export const SITE_URL = 'https://ongoing.ai';

export const ORGANIZATION = {
  name: 'OngoingAI',
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description:
    'OngoingAI helps founders get cited by AI search engines like ChatGPT, Claude, and Perplexity by engineering content for citability, not ranking.',
  sameAs: [
    'https://x.com/ongoingai',
    'https://www.facebook.com/OngoingAI',
    'https://github.com/ongoingai',
    'https://www.youtube.com/channel/UCusiu-uFL2PAtdGIaGg7PZw',
  ],
} as const;

export type PersonRecord = {
  id: string;
  name: string;
  role: string;
  bio: string;
  sameAs: string[];
  image?: string;
};

export const NATHAN: PersonRecord = {
  id: 'nathan',
  name: 'Nathan',
  role: 'Founder, OngoingAI',
  bio: 'Founder of OngoingAI. Writes about generative engine optimization, citability, and how content actually gets used by ChatGPT, Claude, Perplexity, and Gemini.',
  sameAs: [
    'https://x.com/nathancpope',
    'https://www.linkedin.com/in/nathan-pope-5559152ba/',
    'https://github.com/ncpope',
  ],
};

export const PEOPLE: Record<string, PersonRecord> = {
  [NATHAN.id]: NATHAN,
};

export function absoluteUrl(path: string): string {
  if (path.startsWith('http')) return path;
  if (!path.startsWith('/')) return `${SITE_URL}/${path}`;
  return `${SITE_URL}${path}`;
}
