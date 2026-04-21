import 'server-only';
import { LoopsClient } from 'loops';

let client: LoopsClient | null = null;

export function getLoopsClient(): LoopsClient {
  if (client) return client;

  const apiKey = process.env.LOOPS_API_KEY;
  if (!apiKey) {
    throw new Error(
      'LOOPS_API_KEY is not set. Add it to .env.local — see .env.example.',
    );
  }

  client = new LoopsClient(apiKey);
  return client;
}
