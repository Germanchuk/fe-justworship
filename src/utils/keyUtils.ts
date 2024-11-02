export const keys = [
  "A",
  "Asharp",
  "B",
  "C",
  "Csharp",
  "D",
  "Dsharp",
  "E",
  "F",
  "Fsharp",
  "G",
  "Gsharp",
];

export function transpose(mainKey, transposition) {
  const index = keys.findIndex((key) => key === mainKey);

  // Враховуємо кругову природу ключів
  const newIndex = (index + keys.length - transposition) % keys.length;

  return keys[newIndex];
}

export function deriveTranspositionFromKey(desiredKey, rootKey) {
  // Find the index of the main key and target key
  const keyIndex = keys.findIndex((key) => key === rootKey);
  const targetKeyIndex = keys.findIndex((key) => key === desiredKey);

  // Calculate the transposition (positive only)
  const transposition = (targetKeyIndex - keyIndex + keys.length) % keys.length;

  return transposition;
}

export function transposeLine(line, transposition) {
  // Зберігаємо початкові пробіли за допомогою регулярного виразу
  const chordsWithSpaces = line.match(/(\S+|\s+)/g);

  const transposedChords = chordsWithSpaces.map((str) => {
    // Перевіряємо, чи є це акорди
    const chord = (str.match(/[A-G]/) || [])[0];
    console.log(chord);
    const sharp = str.includes("#") ? "sharp" : "";

    if (chord) {
      const newChord = transpose(chord + sharp, transposition).replace(
        "sharp",
        "#"
      );

      const ending = str.replace(/[A-G]/, "").replace("#", "");

      return newChord + ending;
    } else {
      // Повертаємо пробіли без змін
      return str;
    }
  });

  // Об'єднуємо результати в рядок
  return transposedChords.join("");
}

export function isChordsLine(line) {
  const str = line.replace(/[|.]/g, " ");
  // Regular expression for matching chord patterns
  const chordRegex =
    /\b(?:G,C,D|A,B,C|E,C,D)|(?:[ABCDEFG](?:#|b)?)(?:\/[ABCDEFG]b)?(?:(?:(?:maj|min|sus|add|aug|dim)(?:\d{0,2}(?:#\d{1,2}|sus\d)?)?)|(?:m\d{0,2}(?:(?:maj|add|#)\d{0,2})?)|(?:-?\d{0,2}(?:\([^)]*\)|#\d{1,2})?))?/;

  // Split the string by spaces and check if each part matches the chord pattern
  const chords = str.trim().split(/\s+/);

  // Test each chord in the string against the chord regex
  return chords.every((chord) => chordRegex.test(chord));
}

export function remapChords(content, transposition) {
  const updatedContent = content.map((section) => ({
    content: section.content
      .split("\n")
      .map((line) => {
        if (isChordsLine(line)) {
          return transposeLine(line, transposition);
        }
        return line;
      })
      .join("\n"),
  }));

  return updatedContent;
}
