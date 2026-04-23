const YOUTUBE_CHANNEL_ID = 'UCusiu-uFL2PAtdGIaGg7PZw';
const YOUTUBE_URL =
  'https://www.youtube.com/channel/UCusiu-uFL2PAtdGIaGg7PZw?sub_confirmation=1';

type LiveStreamProps = {
  variant?: 'section' | 'page';
};

export function LiveStream({ variant = 'section' }: LiveStreamProps) {
  const isPage = variant === 'page';

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
              color: 'var(--orange-500)',
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: 999,
                background: 'var(--orange-500)',
                boxShadow: '0 0 0 4px rgba(240,122,27,.18)',
              }}
            />
            Live &amp; daily on YouTube
          </div>
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
          href={YOUTUBE_URL}
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

      <p
        style={{
          margin: '16px 0 0',
          fontFamily: 'var(--font-sans)',
          fontSize: 14,
          color: 'var(--fg-3)',
          textWrap: 'pretty',
        }}
      >
        Not live right now?{' '}
        <a
          href={YOUTUBE_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'var(--fg-1)', textUnderlineOffset: 3 }}
        >
          Subscribe on YouTube
        </a>{' '}
        to catch the next stream — we&rsquo;re on daily.
      </p>
    </section>
  );
}
