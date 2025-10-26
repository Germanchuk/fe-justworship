export const sectionsToLinesStream = (sections) => {
  // this function transforms sections array obtained from be/db - to array of strings
  // we need this to show data in splited text areas and other cases
  // output string should exactly represent input sections
  return (sections?.map((s) => {
    const sep = "\n".repeat(s.spacing ?? 2);
    return s.content + sep;
  })
    .join("") ?? "").split("\n");
};
