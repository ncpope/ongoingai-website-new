export const TOPIC_OPTIONS = [
  { value: 'product-updates', label: 'Product updates' },
  { value: 'tutorials', label: 'Tutorials & how-tos' },
  { value: 'changelog', label: 'Changelog' },
  { value: 'community', label: 'Community & events' },
] as const;

export const CADENCE_OPTIONS = [
  {
    value: 'weekly',
    label: 'Weekly digest',
    desc: 'Every Friday morning. The short one.',
  },
  {
    value: 'monthly',
    label: 'Monthly roundup',
    desc: 'First of the month. Longer reads.',
  },
] as const;

export type SubscribeState = {
  ok: boolean;
  step?: 1 | 2 | 3;
  errors?: {
    email?: string;
    topics?: string;
    cadence?: string;
    form?: string;
  };
};

export const initialSubscribeState: SubscribeState = { ok: true };
