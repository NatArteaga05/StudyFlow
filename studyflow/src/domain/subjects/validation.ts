const graphemeSegmenter = new Intl.Segmenter("es", { granularity: "grapheme" });
const unicodeWhitespaceAtEdges = /^\p{White_Space}+|\p{White_Space}+$/gu;

function trimUnicodeWhitespace(value: string): string {
  return value.replace(unicodeWhitespaceAtEdges, "");
}

function countGraphemes(value: string): number {
  return Array.from(graphemeSegmenter.segment(value)).length;
}

export function isValidSubjectName(name: string): boolean {
  return trimUnicodeWhitespace(name).length > 0 && countGraphemes(name) <= 100;
}

export function normalizeSubjectName(name: string): string {
  return trimUnicodeWhitespace(name).toLowerCase();
}
