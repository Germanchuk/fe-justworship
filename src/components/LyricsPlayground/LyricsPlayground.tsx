import classNames from "classnames";
import {useEffect, useRef, useState} from "react";
import InlineSection from "./InlineSection/InlineSection.tsx";
import diffSections from "../../utils/diffSections.ts";
import parseSections from "../../utils/parseSections.ts";

export default function LyricsPlayground({
  song,
  setSong,
  transposition = 0,
  editMode = false,
  className,
}: any) {

  const [textareaValue, setTextareaValue] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    if (song?.sections) {
      const combined = song.sections
        .map((s, idx) => {
          const sep = idx < song.sections.length - 1 ? "\n".repeat(s.spacing ?? 2) : "";
          return s.content + sep;
        })
        .join("");
      setTextareaValue(combined);
    }
  }, [song?.sections]);

  // Обробка зміни у textarea з врахуванням id від бекенду
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const rawText = e.target.value;
    setTextareaValue(rawText);

    const parsed = parseSections(rawText);
    const newContents = parsed.map((p) => p.content);

    setSong((prevSong: any) => {
      const oldSections = prevSong.sections || [];
      const updatedSections = diffSections(oldSections, newContents).map(
        (section, idx) => ({
          ...section,
          spacing: parsed[idx]?.spacing ?? section.spacing ?? 2,
        })
      );

      return { ...prevSong, sections: updatedSections };
    });
  };

  return (
    <div className={classNames("LyricsPlayground", "min-h-96", className)}>
      <div className={classNames("LyricsPlayground__output p-2")}>
        {song?.sections.map((section, index) => {
          return (
            <>
              <InlineSection
                key={section.id ?? index}
                section={section}
                transposition={transposition}
                editMode={editMode}
              />
              {index < song.sections.length - 1 &&
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
