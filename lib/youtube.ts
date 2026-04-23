import 'server-only';

export const YOUTUBE_CHANNEL_ID = 'UCusiu-uFL2PAtdGIaGg7PZw';
export const YOUTUBE_CHANNEL_URL = `https://www.youtube.com/channel/${YOUTUBE_CHANNEL_ID}?sub_confirmation=1`;

export type RecentVideo = {
  id: string;
  title: string;
  publishedAt: string;
  thumbnail: string;
};

const UA = 'Mozilla/5.0 (compatible; OngoingAI-site/1.0)';

export async function getLiveVideoId(): Promise<string | null> {
  try {
    const res = await fetch(
      `https://www.youtube.com/channel/${YOUTUBE_CHANNEL_ID}/live`,
      {
        headers: { 'User-Agent': UA, 'Accept-Language': 'en-US,en;q=0.9' },
        next: { revalidate: 60, tags: ['youtube-live'] },
      },
    );
    if (!res.ok) return null;
    const html = await res.text();
    const canonical = html.match(
      /<link rel="canonical" href="https:\/\/www\.youtube\.com\/watch\?v=([A-Za-z0-9_-]{11})"/,
    );
    if (!canonical) return null;
    if (!html.includes('"isLive":true')) return null;
    return canonical[1];
  } catch {
    return null;
  }
}

export async function getRecentVideos(limit = 6): Promise<RecentVideo[]> {
  try {
    const res = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`,
      {
        headers: { 'User-Agent': UA },
        next: { revalidate: 1800, tags: ['youtube-recents'] },
      },
    );
    if (!res.ok) return [];
    const xml = await res.text();
    const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)];
    return entries
      .map((m): RecentVideo | null => {
        const block = m[1];
        const id = block.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1];
        const rawTitle = block.match(/<title>([\s\S]*?)<\/title>/)?.[1];
        const publishedAt = block.match(/<published>([^<]+)<\/published>/)?.[1];
        if (!id || !rawTitle || !publishedAt) return null;
        return {
          id,
          title: decodeEntities(rawTitle),
          publishedAt,
          thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
        };
      })
      .filter((v): v is RecentVideo => v !== null)
      .slice(0, limit);
  } catch {
    return [];
  }
}

function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");
}

export function formatRelative(publishedAt: string, now: Date = new Date()): string {
  const published = new Date(publishedAt);
  const diffMs = now.getTime() - published.getTime();
  const mins = Math.round(diffMs / 60_000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days < 7) return `${days}d ago`;
  const weeks = Math.round(days / 7);
  if (weeks < 5) return `${weeks}w ago`;
  const months = Math.round(days / 30);
  if (months < 12) return `${months}mo ago`;
  const years = Math.round(days / 365);
  return `${years}y ago`;
}
