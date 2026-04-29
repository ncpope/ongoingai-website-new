'use server';

import { APIError, RateLimitExceededError } from 'loops';
import { getLoopsClient } from '@/lib/loops';

export type WaitlistState = {
  ok: boolean;
  email?: string;
  error?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function joinWaitlist(
  _prev: WaitlistState,
  formData: FormData,
): Promise<WaitlistState> {
  const email = String(formData.get('email') ?? '')
    .trim()
    .toLowerCase();
  const siteUrlRaw = String(formData.get('siteUrl') ?? '').trim();
  const siteUrl = normalizeUrl(siteUrlRaw);

  if (!email || !EMAIL_RE.test(email)) {
    return { ok: false, error: "That doesn't look like a valid email." };
  }

  try {
    const loops = getLoopsClient();
    await loops.updateContact({
      email,
      properties: {
        source: 'waitlist-signup',
        siteUrl: siteUrl ?? '',
        joinedAt: new Date().toISOString(),
      },
    });
  } catch (err) {
    console.error('[waitlist] Loops updateContact failed:', err);
    if (err instanceof RateLimitExceededError) {
      return { ok: false, error: 'Too many signups right now. Try again in a minute?' };
    }
    if (err instanceof APIError) {
      const message =
        err.json && 'message' in err.json && typeof err.json.message === 'string'
          ? err.json.message
          : "Couldn't add you right now. Try again in a minute?";
      return { ok: false, error: message };
    }
    return {
      ok: false,
      error: 'Something broke on our end. Try again in a minute?',
    };
  }

  return { ok: true, email };
}

function normalizeUrl(raw: string): string | null {
  if (!raw) return null;
  const trimmed = raw.replace(/^https?:\/\//i, '').replace(/\/$/, '').trim();
  if (!/^[a-z0-9.-]+\.[a-z]{2,}/i.test(trimmed)) return null;
  return trimmed.toLowerCase();
}
