import classNames from "classnames";
import { useRef } from "react";
import InlineSection from "./InlineSection/InlineSection.tsx";
import { useSections, useEditMode } from "../../../hooks/song";
import { handleSongTextChange } from "./actions";

export default function LyricsPlayground({
  transposition = 0,
  className,
}: any) {
  const editMode = useEditMode();
  const sections = useSections();
  const textareaRef = useRef(null);

  const textareaValue =
    sections?.
      map((s, idx) => {
        const sep = idx < sections.length - 1 ? "\n".repeat(s.spacing ?? 2) : "";
        return s.content + sep;
      })
      .join("") ?? "";

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
      {!editMode && (<textarea
        ref={textareaRef}
        className={classNames(
          "LyricsPlayground__textarea border border-solid border-base-300 p-2",
        )}
        value={textareaValue}
        onChange={handleSongTextChange}
        autoComplete="off"
        autoCorrect="off"
      />)}
    </div>
  );
}
