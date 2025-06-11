import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import InlineSection from "./InlineSection/InlineSection.tsx";
import diffSections from "../../utils/diffSections.ts";
import parseSections from "../../utils/parseSections.ts";
import { useSong, useSections, useSetSections } from "../../hooks/song";

export default function LyricsPlayground({
  transposition = 0,
  className,
}: any) {
  const song = useSong();
  const sections = useSections();
  const setSections = useSetSections();
  const [textareaValue, setTextareaValue] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    if (sections) {
      const combined = sections
        .map((s, idx) => {
          const sep = idx < sections.length - 1 ? "\n".repeat(s.spacing ?? 2) : "";
          return s.content + sep;
        })
        .join("");
      setTextareaValue(combined);
    }
  }, [sections]);

  // Обробка зміни у textarea з врахуванням id від бекенду
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const rawText = e.target.value;
    setTextareaValue(rawText);

    const parsed = parseSections(rawText);
    const newContents = parsed.map((p) => p.content);

    const oldSections = sections || [];
    const updatedSections = diffSections(oldSections, newContents).map(
      (section, idx) => ({
        ...section,
        spacing: parsed[idx]?.spacing ?? section.spacing ?? 2,
      }),
    );
    setSections(updatedSections);
  };

  return (
    <div className={classNames("LyricsPlayground", "min-h-96", className)}>
      <div className={classNames("LyricsPlayground__output p-2")}>
        {sections?.map((section, index) => {
          return (
            <>
              <InlineSection
                key={section.id ?? index}
                section={section}
                transposition={transposition}
              />
              {index < sections.length - 1 &&
                Array.from({ length: (section.spacing ?? 2) - 1 }).map((_, i) => (
                  <br key={`br-${index}-${i}`} />
                ))}
            </>
          );
        })}
      </div>
      <textarea
        ref={textareaRef}
        className={classNames(
          "LyricsPlayground__textarea border border-solid border-base-300 p-2",
        )}
        value={textareaValue}
        onChange={handleChange}
        autoComplete="off"
        autoCorrect="off"
      />
    </div>
  );
}
