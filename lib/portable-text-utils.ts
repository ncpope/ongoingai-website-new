type MaybeSpan = { _type?: string; text?: unknown };
type MaybeBlock = {
  _type?: string;
  style?: string;
  children?: ReadonlyArray<MaybeSpan>;
};

export function blockPlainText(block: unknown): string {
  if (!block || typeof block !== 'object') return '';
  const b = block as MaybeBlock;
  return (b.children ?? [])
    .map((c) => (typeof c?.text === 'string' ? c.text : ''))
    .join('');
}

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

// Pull a clean SEO/social description from PortableText body. Skips headings,
// joins paragraph text, collapses whitespace, and truncates at a word boundary.
export function excerptFromBody(body: unknown, max = 160): string {
  if (!Array.isArray(body)) return '';
  const text = body
    .filter((b): b is MaybeBlock => {
      if (!b || typeof b !== 'object') return false;
      const block = b as MaybeBlock;
      if (block._type !== 'block') return false;
      const style = block.style ?? 'normal';
      return style === 'normal' || style === 'blockquote';
    })
    .map((b) => blockPlainText(b))
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (text.length <= max) return text;
  const slice = text.slice(0, max);
  const lastSpace = slice.lastIndexOf(' ');
  return `${slice.slice(0, lastSpace > 60 ? lastSpace : max).trimEnd()}…`;
}
