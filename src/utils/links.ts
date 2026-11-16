/**
 * Turns known names in project text into external links.
 *
 * Project copy is plain text. Only the labels listed in `KNOWN_LINKS` become
 * links, so no HTML is ever parsed from content strings.
 */

/** Exact label to URL. Add entries here instead of writing HTML in content. */
export const KNOWN_LINKS: Readonly<Record<string, string>> = {
  'Azure-Samples/azure-search-openai-demo': 'https://github.com/Azure-Samples/azure-search-openai-demo',
};

/** A piece of text, optionally linked. */
export type TextSegment = { text: string; href?: string };

/**
 * Splits text into plain and linked segments for every known label it contains.
 *
 * @param text - Plain project text
 * @returns Segments in order; joining their `text` gives back the input
 */
export function splitKnownLinks(text: string): TextSegment[] {
  const labels = Object.keys(KNOWN_LINKS);
  if (labels.length === 0) {
    return [{ text }];
  }
  const escaped = labels.map((label) => label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const pattern = new RegExp(`(${escaped.join('|')})`, 'g');
  return text
    .split(pattern)
    .filter((part) => part !== '')
    .map((part) =>
      Object.hasOwn(KNOWN_LINKS, part) ? { text: part, href: KNOWN_LINKS[part] } : { text: part }
    );
}
