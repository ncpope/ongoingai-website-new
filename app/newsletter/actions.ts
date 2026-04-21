'use server';

import { redirect } from 'next/navigation';
import { APIError, RateLimitExceededError } from 'loops';
import { getLoopsClient } from '@/lib/loops';
import { CADENCE_OPTIONS, TOPIC_OPTIONS, type SubscribeState } from './config';

const TOPIC_VALUES = TOPIC_OPTIONS.map((t) => t.value) as readonly string[];
const CADENCE_VALUES = CADENCE_OPTIONS.map((c) => c.value) as readonly string[];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function subscribe(
  _prev: SubscribeState,
  formData: FormData,
): Promise<SubscribeState> {
  const email = String(formData.get('email') ?? '').trim().toLowerCase();
  const topics = formData.getAll('topics').map(String);
  const cadence = String(formData.get('cadence') ?? '');

  if (!email || !EMAIL_RE.test(email)) {
    return {
      ok: false,
      step: 1,
      errors: { email: "That doesn't look like a valid email." },
    };
  }

  if (topics.length === 0 || topics.some((t) => !TOPIC_VALUES.includes(t))) {
    return {
      ok: false,
      step: 2,
      errors: { topics: 'Pick at least one topic to hear about.' },
    };
  }

  if (!CADENCE_VALUES.includes(cadence)) {
    return {
      ok: false,
      step: 2,
      errors: { cadence: 'Choose how often you want to hear from us.' },
    };
  }

  try {
    const loops = getLoopsClient();
    await loops.updateContact({
      email,
      properties: {
        source: 'newsletter-signup',
        topics: topics.join(','),
        cadence,
        subscribedAt: new Date().toISOString(),
      },
    });
  } catch (err) {
    console.error('[newsletter] Loops updateContact failed:', err);

    if (err instanceof RateLimitExceededError) {
      return {
        ok: false,
        step: 3,
        errors: {
          form: 'Too many signups right now. Try again in a minute?',
        },
      };
    }

    if (err instanceof APIError) {
      const message =
        err.json && 'message' in err.json && typeof err.json.message === 'string'
          ? err.json.message
          : "Couldn't subscribe you right now. Try again in a minute?";
      return { ok: false, step: 3, errors: { form: message } };
    }

    return {
      ok: false,
      step: 3,
      errors: { form: 'Something broke on our end. Try again in a minute?' },
    };
  }

  redirect(`/newsletter/success?email=${encodeURIComponent(email)}`);
}
