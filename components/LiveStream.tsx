import {
  YOUTUBE_CHANNEL_ID,
  YOUTUBE_CHANNEL_URL,
  formatRelative,
  getLiveVideoId,
  getRecentVideos,
  type RecentVideo,
} from '@/lib/youtube';

type LiveStreamProps = {
  variant?: 'section' | 'page';
};

export async function LiveStream({ variant = 'section' }: LiveStreamProps) {
  const isPage = variant === 'page';
  const [liveVideoId, recents] = await Promise.all([
    getLiveVideoId(),
    getRecentVideos(6),
  ]);
  const isLive = liveVideoId !== null;

  return (
    <section
      id="live"
      style={{
        padding: isPage ? '24px 32px 80px' : '32px 32px 80px',
        maxWidth: 1200,
        margin: '0 auto',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          gap: 24,
          marginBottom: 20,
          flexWrap: 'wrap',
        }}
      >
        <div>
          <Eyebrow isLive={isLive} />
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: isPage ? 'clamp(40px, 6vw, 56px)' : 'clamp(32px, 5vw, 44px)',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              margin: '10px 0 0',
              color: 'var(--fg-1)',
              maxWidth: 780,
            }}
          >
            Watch us <em style={{ fontStyle: 'italic' }}>build</em>.
          </h2>
        </div>
        <a
          href={YOUTUBE_CHANNEL_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: 'transparent',
            color: 'var(--fg-1)',
            border: '1px solid var(--border-2)',
            padding: '12px 18px',
            borderRadius: 10,
            fontFamily: 'var(--font-sans)',
            fontSize: 14,
            fontWeight: 500,
            textDecoration: 'none',
          }}
        >
          Subscribe on YouTube →
        </a>
      </div>

      {isLive ? (
        <LiveEmbed />
      ) : recents.length > 0 ? (
        <RecentsView recents={recents} />
      ) : (
        <LiveEmbed />
      )}

      <p
        style={{
          margin: '16px 0 0',
          fontFamily: 'var(--font-sans)',
          fontSize: 14,
          color: 'var(--fg-3)',
          textWrap: 'pretty',
        }}
      >
        {isLive ? (
          <>
            We&rsquo;re on right now —{' '}
            <a
              href={YOUTUBE_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--fg-1)', textUnderlineOffset: 3 }}
            >
              subscribe on YouTube
            </a>{' '}
            so you don&rsquo;t miss the next one.
          </>
        ) : (
          <>
            Not live right now —{' '}
            <a
              href={YOUTUBE_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--fg-1)', textUnderlineOffset: 3 }}
            >
              subscribe on YouTube
            </a>{' '}
            to catch the next stream. We&rsquo;re on daily.
          </>
        )}
      </p>
    </section>
  );
}

function Eyebrow({ isLive }: { isLive: boolean }) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        fontWeight: 500,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: isLive ? 'var(--orange-500)' : 'var(--fg-3)',
      }}
    >
      <span
        aria-hidden
        style={{
          width: 8,
          height: 8,
          borderRadius: 999,
          background: isLive ? 'var(--orange-500)' : 'var(--ink-400)',
          boxShadow: isLive ? '0 0 0 4px rgba(240,122,27,.18)' : 'none',
        }}
      />
      {isLive ? 'Live now on YouTube' : 'Latest episodes — live & daily on YouTube'}
    </div>
  );
}

function LiveEmbed() {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        paddingTop: '56.25%',
        background: 'var(--ink-900)',
        border: '1px solid var(--ink-900)',
        borderRadius: 14,
        overflow: 'hidden',
      }}
    >
      <iframe
        src={`https://www.youtube.com/embed/live_stream?channel=${YOUTUBE_CHANNEL_ID}`}
        title="OngoingAI live stream"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          border: 0,
        }}
      />
    </div>
  );
}

function RecentsView({ recents }: { recents: RecentVideo[] }) {
  const [hero, ...rest] = recents;
  const grid = rest.slice(0, 3);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div
        style={{
          position: 'relative',
          width: '100%',
          paddingTop: '56.25%',
          background: 'var(--ink-900)',
          border: '1px solid var(--ink-900)',
          borderRadius: 14,
          overflow: 'hidden',
        }}
      >
        <iframe
          src={`https://www.youtube.com/embed/${hero.id}?rel=0`}
          title={hero.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            border: 0,
          }}
        />
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 16,
        }}
      >
        {grid.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
}

function VideoCard({ video }: { video: RecentVideo }) {
  return (
    <a
      href={`https://www.youtube.com/watch?v=${video.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="video-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        textDecoration: 'none',
        color: 'inherit',
        borderRadius: 12,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          paddingTop: '56.25%',
          background: 'var(--ink-900)',
          border: '1px solid var(--border-1)',
          borderRadius: 10,
          overflow: 'hidden',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={video.thumbnail}
          alt=""
          loading="lazy"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
        <span
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            display: 'grid',
            placeItems: 'center',
            background:
              'linear-gradient(180deg, rgba(14,13,11,0) 40%, rgba(14,13,11,0.55) 100%)',
            opacity: 0,
            transition: 'opacity 160ms ease',
          }}
          data-card-overlay
        >
          <span
            style={{
              width: 44,
              height: 44,
              borderRadius: 999,
              background: 'var(--orange-400)',
              color: 'var(--fg-on-accent)',
              display: 'grid',
              placeItems: 'center',
              fontSize: 16,
              fontWeight: 700,
              boxShadow: '0 8px 24px rgba(14,13,11,0.35)',
            }}
          >
            ▶
          </span>
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: '0 2px' }}>
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 14,
            fontWeight: 600,
            lineHeight: 1.35,
            color: 'var(--fg-1)',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {video.title}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--fg-3)',
          }}
        >
          {formatRelative(video.publishedAt)}
        </span>
      </div>
    </a>
  );
}
