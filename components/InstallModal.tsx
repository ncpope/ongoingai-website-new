'use client';

type InstallModalProps = {
  onClose: () => void;
};

export function InstallModal({ onClose }: InstallModalProps) {
  return (
    <div
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(14,13,11,.4)',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 32,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--bg-elevated)',
          border: '1px solid var(--ink-900)',
          borderRadius: 14,
          padding: 32,
          maxWidth: 480,
          width: '100%',
          boxShadow: 'var(--shadow-lg)',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--orange-500)',
          }}
        >
          Install
        </span>
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 32,
            margin: '8px 0 16px',
            letterSpacing: '-0.02em',
          }}
        >
          One line. Thirty seconds.
        </h3>
        <pre
          style={{
            background: 'var(--ink-900)',
            color: 'var(--ink-50)',
            padding: 16,
            borderRadius: 10,
            fontFamily: 'var(--font-mono)',
            fontSize: 13,
            margin: 0,
            overflow: 'auto',
          }}
        >
          curl -fsSL ongoing.ai/i | sh
        </pre>
        <button
          onClick={onClose}
          style={{
            marginTop: 20,
            background: 'var(--orange-400)',
            color: 'var(--fg-on-accent)',
            border: '1px solid var(--ink-900)',
            padding: '10px 18px',
            borderRadius: 10,
            fontFamily: 'var(--font-sans)',
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Got it →
        </button>
      </div>
    </div>
  );
}
