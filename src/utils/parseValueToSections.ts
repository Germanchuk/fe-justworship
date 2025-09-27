export interface ParsedSection {
  content: string;
  /** Number of newline characters immediately following this section */
  spacing: number;
}

/**
 * Convert textarea contents into an array of sections. Two or more
 * consecutive newlines denote the boundary between sections. The number of
 * newlines encountered is stored in the `spacing` field so blank lines can be
 * preserved when reconstructing the text later.
 */
export default function parseValueToSections(rawText: string): ParsedSection[] {
  const result: ParsedSection[] = [];
  let buffer = "";

  for (let i = 0; i < rawText.length; ) {
    if (rawText[i] !== "\n") {
      buffer += rawText[i];
      i += 1;
      continue;
    }

    let j = i;
    while (j < rawText.length && rawText[j] === "\n") j += 1;
    const count = j - i;

    if (count >= 2) {
      result.push({ content: buffer, spacing: count });
      buffer = "";
    } else {
      buffer += "\n";
    }

    i = j;
  }

  if (buffer.length > 0 || result.length === 0) {
    result.push({ content: buffer, spacing: 0 });
  }

  return result;
}
