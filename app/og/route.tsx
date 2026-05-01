import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const runtime = 'nodejs';

const SIZE = { width: 1200, height: 630 } as const;

const CREAM = '#FAF8F5';
const INK_900 = '#0E0D0B';
const INK_700 = '#2E2B27';
const INK_500 = '#6E6960';
const ORANGE_400 = '#FD953B';
const ORANGE_500 = '#F07A1B';
const ORANGE_700 = '#9E4708';

let cachedFonts: { normal: Buffer; italic: Buffer } | null = null;

async function loadInstrumentSerif() {
  if (cachedFonts) return cachedFonts;
  const dir = join(process.cwd(), 'public', 'fonts');
  const [normal, italic] = await Promise.all([
    readFile(join(dir, 'InstrumentSerif-Regular.ttf')),
    readFile(join(dir, 'InstrumentSerif-Italic.ttf')),
  ]);
  cachedFonts = { normal, italic };
  return cachedFonts;
}

export async function GET(req: NextRequest): Promise<Response> {
  const { searchParams } = req.nextUrl;
  const title = (searchParams.get('title') ?? 'OngoingAI').slice(0, 180);
  const eyebrow = (searchParams.get('eyebrow') ?? 'OngoingAI').slice(0, 60);
  const tagline =
    searchParams.get('tagline') ?? 'Be the answer ChatGPT cites.';

  const { normal, italic } = await loadInstrumentSerif();

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: CREAM,
          padding: '72px 80px',
          position: 'relative',
          fontFamily: 'Instrument Serif',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 10,
            background: ORANGE_400,
            display: 'flex',
          }}
        />

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            fontFamily: 'Geist',
            fontSize: 20,
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: ORANGE_700,
          }}
        >
          <span
            style={{
              width: 12,
              height: 12,
              borderRadius: 999,
              background: ORANGE_500,
              display: 'flex',
            }}
          />
          {eyebrow}
        </div>

        <div
          style={{
            display: 'flex',
            marginTop: 'auto',
            fontSize: 84,
            lineHeight: 1.04,
            letterSpacing: '-0.025em',
            color: INK_900,
            maxWidth: 1040,
          }}
        >
          {title}
        </div>

        <div
          style={{
            marginTop: 36,
            paddingTop: 24,
            borderTop: `1px solid ${INK_500}33`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: INK_700,
          }}
        >
          <span
            style={{
              fontFamily: 'Geist',
              fontSize: 22,
              fontWeight: 600,
              color: INK_900,
            }}
          >
            ongoing.ai
          </span>
          <span
            style={{
              fontStyle: 'italic',
              fontSize: 28,
              color: INK_700,
            }}
          >
            {tagline}
          </span>
        </div>
      </div>
    ),
    {
      ...SIZE,
      fonts: [
        {
          name: 'Instrument Serif',
          data: normal,
          style: 'normal',
          weight: 400,
        },
        {
          name: 'Instrument Serif',
          data: italic,
          style: 'italic',
          weight: 400,
        },
      ],
    },
  );
}
