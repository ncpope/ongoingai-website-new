'use client';

import { useEffect, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { AlertCircle } from 'lucide-react';
import { subscribe } from './actions';
import {
  CADENCE_OPTIONS,
  TOPIC_OPTIONS,
  initialSubscribeState,
  type SubscribeState,
} from './config';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TOTAL_STEPS = 3;

type Step = 1 | 2 | 3;

export function NewsletterForm() {
  const [step, setStep] = useState<Step>(1);
  const [email, setEmail] = useState('');
  const [topics, setTopics] = useState<string[]>([]);
  const [cadence, setCadence] = useState('');
  const [clientError, setClientError] = useState<string | null>(null);

  const [state, formAction] = useFormState<SubscribeState, FormData>(
    subscribe,
    initialSubscribeState,
  );

  useEffect(() => {
    if (!state.ok && state.step) {
      setStep(state.step);
      setClientError(null);
    }
  }, [state]);

  const serverError =
    !state.ok && state.step === step
      ? state.errors?.email ??
        state.errors?.topics ??
        state.errors?.cadence ??
        state.errors?.form ??
        null
      : null;
  const error = clientError ?? serverError;

  const goNext = () => {
    setClientError(null);
    if (step === 1) {
      if (!EMAIL_RE.test(email.trim())) {
        setClientError("That doesn't look like a valid email.");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (topics.length === 0) {
        setClientError('Pick at least one topic to hear about.');
        return;
      }
      if (!cadence) {
        setClientError('Choose how often you want to hear from us.');
        return;
      }
      setStep(3);
    }
  };

  const goBack = () => {
    setClientError(null);
    setStep((s) => (s > 1 ? ((s - 1) as Step) : s));
  };

  const toggleTopic = (value: string) => {
    setTopics((prev) =>
      prev.includes(value) ? prev.filter((t) => t !== value) : [...prev, value],
    );
  };

  return (
    <form
      action={formAction}
      style={{
        background: 'var(--bg-elevated)',
        border: '1px solid var(--border-strong)',
        borderRadius: 14,
        padding: '32px',
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
      }}
    >
      <ProgressBar step={step} total={TOTAL_STEPS} />

      {/* Hidden inputs preserve earlier-step values for the server action */}
      <input type="hidden" name="email" value={email.trim().toLowerCase()} />
      {topics.map((t) => (
        <input key={t} type="hidden" name="topics" value={t} />
      ))}
      <input type="hidden" name="cadence" value={cadence} />

      <StepShell key={step}>
        {step === 1 && (
          <StepEmail
            email={email}
            onChange={setEmail}
            onSubmitEnter={goNext}
          />
        )}
        {step === 2 && (
          <StepPreferences
            topics={topics}
            cadence={cadence}
            onToggleTopic={toggleTopic}
            onChangeCadence={setCadence}
          />
        )}
        {step === 3 && (
          <StepReview email={email} topics={topics} cadence={cadence} />
        )}
      </StepShell>

      {error && <ErrorBanner>{error}</ErrorBanner>}

      <ButtonRow>
        {step > 1 && (
          <SecondaryButton type="button" onClick={goBack}>
            ← Back
          </SecondaryButton>
        )}
        {step < TOTAL_STEPS ? (
          <PrimaryButton type="button" onClick={goNext}>
            Continue →
          </PrimaryButton>
        ) : (
          <SubmitButton />
        )}
      </ButtonRow>
    </form>
  );
}

function ProgressBar({ step, total }: { step: number; total: number }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--orange-500)',
        }}
      >
        Step {step} of {total}
      </span>
      <div
        role="progressbar"
        aria-valuenow={step}
        aria-valuemin={1}
        aria-valuemax={total}
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${total}, 1fr)`,
          gap: 6,
        }}
      >
        {Array.from({ length: total }).map((_, i) => {
          const filled = i + 1 <= step;
          return (
            <span
              key={i}
              style={{
                height: 4,
                borderRadius: 999,
                background: filled ? 'var(--orange-400)' : 'var(--border-1)',
                transition:
                  'background-color 200ms cubic-bezier(0.2, 0.9, 0.3, 1)',
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

function StepShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
      className="newsletter-step"
    >
      {children}
    </div>
  );
}

function StepEmail({
  email,
  onChange,
  onSubmitEnter,
}: {
  email: string;
  onChange: (v: string) => void;
  onSubmitEnter: () => void;
}) {
  return (
    <>
      <StepHeading
        title="What email should we send to?"
        sub="We'll send a confirmation link before adding you to anything."
      />
      <label
        htmlFor="email-input"
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 13,
          fontWeight: 500,
          color: 'var(--fg-2)',
        }}
      >
        Email address
      </label>
      <input
        id="email-input"
        type="email"
        autoComplete="email"
        inputMode="email"
        autoFocus
        placeholder="you@example.com"
        value={email}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            onSubmitEnter();
          }
        }}
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 16,
          padding: '12px 14px',
          background: 'var(--bg)',
          color: 'var(--fg-1)',
          border: '1px solid var(--border-2)',
          borderRadius: 10,
          outline: 'none',
        }}
        className="newsletter-input"
      />
    </>
  );
}

function StepPreferences({
  topics,
  cadence,
  onToggleTopic,
  onChangeCadence,
}: {
  topics: string[];
  cadence: string;
  onToggleTopic: (v: string) => void;
  onChangeCadence: (v: string) => void;
}) {
  return (
    <>
      <StepHeading
        title="What do you want to hear about?"
        sub="Mix and match. You can change this later."
      />
      <fieldset
        style={{ border: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}
      >
        <legend
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 13,
            fontWeight: 500,
            color: 'var(--fg-2)',
            marginBottom: 4,
          }}
        >
          Topics
        </legend>
        {TOPIC_OPTIONS.map((t) => {
          const checked = topics.includes(t.value);
          return (
            <label
              key={t.value}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '12px 14px',
                background: checked ? 'var(--orange-50)' : 'var(--bg)',
                border: `1px solid ${checked ? 'var(--orange-400)' : 'var(--border-2)'}`,
                borderRadius: 10,
                cursor: 'pointer',
                fontFamily: 'var(--font-sans)',
                fontSize: 15,
                color: 'var(--fg-1)',
                transition:
                  'background-color 160ms cubic-bezier(0.2, 0.9, 0.3, 1), border-color 160ms cubic-bezier(0.2, 0.9, 0.3, 1)',
              }}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => onToggleTopic(t.value)}
                style={{ width: 16, height: 16, accentColor: 'var(--orange-500)' }}
              />
              {t.label}
            </label>
          );
        })}
      </fieldset>

      <fieldset
        style={{ border: 'none', padding: 0, margin: '8px 0 0', display: 'flex', flexDirection: 'column', gap: 8 }}
      >
        <legend
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 13,
            fontWeight: 500,
            color: 'var(--fg-2)',
            marginBottom: 4,
          }}
        >
          Cadence
        </legend>
        {CADENCE_OPTIONS.map((c) => {
          const checked = cadence === c.value;
          return (
            <label
              key={c.value}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 12,
                padding: '14px',
                background: checked ? 'var(--orange-50)' : 'var(--bg)',
                border: `1px solid ${checked ? 'var(--orange-400)' : 'var(--border-2)'}`,
                borderRadius: 10,
                cursor: 'pointer',
                fontFamily: 'var(--font-sans)',
                transition:
                  'background-color 160ms cubic-bezier(0.2, 0.9, 0.3, 1), border-color 160ms cubic-bezier(0.2, 0.9, 0.3, 1)',
              }}
            >
              <input
                type="radio"
                name="cadence-radio"
                checked={checked}
                onChange={() => onChangeCadence(c.value)}
                style={{ width: 16, height: 16, marginTop: 4, accentColor: 'var(--orange-500)' }}
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--fg-1)' }}>
                  {c.label}
                </span>
                <span style={{ fontSize: 13, color: 'var(--fg-3)' }}>{c.desc}</span>
              </div>
            </label>
          );
        })}
      </fieldset>
    </>
  );
}

function StepReview({
  email,
  topics,
  cadence,
}: {
  email: string;
  topics: string[];
  cadence: string;
}) {
  const topicLabels = TOPIC_OPTIONS.filter((t) => topics.includes(t.value)).map(
    (t) => t.label,
  );
  const cadenceLabel = CADENCE_OPTIONS.find((c) => c.value === cadence)?.label;
  return (
    <>
      <StepHeading
        title="Look good?"
        sub="One click and we'll send a confirmation email."
      />
      <dl
        style={{
          margin: 0,
          display: 'grid',
          gridTemplateColumns: 'auto 1fr',
          rowGap: 12,
          columnGap: 16,
          fontFamily: 'var(--font-sans)',
          fontSize: 14,
          padding: '16px 18px',
          background: 'var(--bg)',
          border: '1px solid var(--border-1)',
          borderRadius: 10,
        }}
      >
        <ReviewRow term="Email" desc={email} />
        <ReviewRow term="Topics" desc={topicLabels.join(' · ')} />
        <ReviewRow term="Cadence" desc={cadenceLabel ?? ''} />
      </dl>
    </>
  );
}

function ReviewRow({ term, desc }: { term: string; desc: string }) {
  return (
    <>
      <dt
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--fg-3)',
          alignSelf: 'center',
        }}
      >
        {term}
      </dt>
      <dd style={{ margin: 0, color: 'var(--fg-1)', fontWeight: 500 }}>{desc}</dd>
    </>
  );
}

function StepHeading({ title, sub }: { title: string; sub: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(26px, 4.5vw, 32px)',
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
          margin: 0,
        }}
      >
        {title}
      </h2>
      <p style={{ margin: 0, color: 'var(--fg-3)', fontSize: 15 }}>{sub}</p>
    </div>
  );
}

function ErrorBanner({ children }: { children: React.ReactNode }) {
  return (
    <div
      role="alert"
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 10,
        padding: '12px 14px',
        background: 'rgba(194, 65, 12, 0.08)',
        border: '1px solid rgba(194, 65, 12, 0.35)',
        borderRadius: 10,
        color: 'var(--danger)',
        fontFamily: 'var(--font-sans)',
        fontSize: 14,
      }}
    >
      <AlertCircle size={18} strokeWidth={1.5} style={{ flexShrink: 0, marginTop: 1 }} />
      <span>{children}</span>
    </div>
  );
}

function ButtonRow({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: 'flex',
        gap: 10,
        justifyContent: 'flex-end',
        flexWrap: 'wrap',
      }}
    >
      {children}
    </div>
  );
}

function PrimaryButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>,
) {
  const { children, style, ...rest } = props;
  return (
    <button
      {...rest}
      style={{
        background: 'var(--orange-400)',
        color: 'var(--fg-on-accent)',
        border: '1px solid var(--ink-900)',
        padding: '12px 20px',
        borderRadius: 10,
        fontFamily: 'var(--font-sans)',
        fontSize: 15,
        fontWeight: 600,
        cursor: 'pointer',
        ...style,
      }}
    >
      {children}
    </button>
  );
}

function SecondaryButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>,
) {
  const { children, style, ...rest } = props;
  return (
    <button
      {...rest}
      style={{
        background: 'transparent',
        color: 'var(--fg-1)',
        border: '1px solid var(--border-2)',
        padding: '12px 20px',
        borderRadius: 10,
        fontFamily: 'var(--font-sans)',
        fontSize: 15,
        fontWeight: 500,
        cursor: 'pointer',
        ...style,
      }}
    >
      {children}
    </button>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <PrimaryButton type="submit" disabled={pending} aria-disabled={pending}>
      {pending ? 'Subscribing…' : 'Subscribe →'}
    </PrimaryButton>
  );
}
