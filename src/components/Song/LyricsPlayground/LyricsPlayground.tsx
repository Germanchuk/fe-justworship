import classNames from "classnames";
import { useRef } from "react";
import InlineSection from "./InlineSection/InlineSection.tsx";
import { useSections, useEditMode } from "../../../hooks/song/selectors.ts";
import { handleSongTextChange } from "./actions";

export default function LyricsPlayground() {
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
    <div className={classNames("py-2", {["shadow-2xl"]: editMode})}>
      <div className={classNames("LyricsPlayground", "min-h-96", {["LyricsPlayground--editMode"]: editMode})}>
        <div className={classNames("LyricsPlayground__output")}>
          {sections?.map((section, index) => {
            return (
              <>
                <InlineSection
                  key={section.id ?? index}
                  section={section}
                />
                {index < sections.length - 1 &&
                  Array.from({ length: (section.spacing ?? 2) - 1 }).map((_, i) => (
                    <div className={classNames("Line")}><br key={`br-${index}-${i}`} /></div>
                  ))}
              </>
            );
          })}
        </div>
        {editMode && (<textarea
          ref={textareaRef}
          className={classNames(
            "LyricsPlayground__textarea",
          )}
          value={textareaValue}
          onChange={handleSongTextChange}
          autoComplete="off"
          autoCorrect="off"
        />)}
      </div>
    </div>
  );
}
