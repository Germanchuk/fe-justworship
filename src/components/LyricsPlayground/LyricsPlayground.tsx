import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import InlineSection from "./InlineSection/InlineSection.tsx";
import diffSections from "../../utils/diffSections.ts";
import parseSections from "../../utils/parseSections.ts";

export default function LyricsPlayground({song, setSong}: any) {

  const [textareaValue, setTextareaValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const historyRef = useRef<Array<{ value: string; sections: any[] }>>([]);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const isUndoingRef = useRef(false);
  const UNDO_LIMIT = 15;

  useEffect(() => {
    if (song?.sections) {
      const combined = song.sections
        .map((s, idx) => {
          const sep = idx < song.sections.length - 1 ? "\n".repeat(s.spacing ?? 2) : "";
          return s.content + sep;
        })
        .join("");
      setTextareaValue(combined);
      historyRef.current = [{ value: combined, sections: song.sections }];
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

  const recordHistory = () => {
    const last = historyRef.current[historyRef.current.length - 1];
    if (!last || last.value !== textareaValue) {
      historyRef.current.push({ value: textareaValue, sections: song.sections });
      if (historyRef.current.length > UNDO_LIMIT) {
        historyRef.current.shift();
      }
    }
  };

  useEffect(() => {
    if (isUndoingRef.current) return;
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(recordHistory, 3000);
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [textareaValue]);

  const handleUndo = () => {
    if (historyRef.current.length <= 1) return;
    historyRef.current.pop();
    const last = historyRef.current[historyRef.current.length - 1];
    isUndoingRef.current = true;
    setTextareaValue(last.value);
    setSong((prevSong: any) => ({ ...prevSong, sections: last.sections }));
    setTimeout(() => { isUndoingRef.current = false; }, 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
      e.preventDefault();
      handleUndo();
    }
  };

  return (
    <div className={classNames("LyricsPlayground", "min-h-96")}>
      <button
        className="btn btn-xs LyricsPlayground__undo"
        onClick={handleUndo}
        disabled={historyRef.current.length <= 1}
      >
        Undo
      </button>
      <div className={classNames("LyricsPlayground__output p-2")}>
        {song?.sections.map((section, index) => {
          return (
            <>
              <InlineSection key={section.id ?? index} section={section} />
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
        onKeyDown={handleKeyDown}
        autoComplete="off"
        autoCorrect="off"
      />
    </div>
  );
}
