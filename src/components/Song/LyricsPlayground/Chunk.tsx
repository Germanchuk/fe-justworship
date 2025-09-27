import {useEditMode, useTransposition} from "../../../hooks/song/selectors.ts";
import classNames from "classnames";
import {modifiers, NormalText} from "./InlineSection/InlineSection.tsx";

export function Chunk({
  index = 0,
  chunk,
  onChange,
  onKeyDown = null,
  size,
  className = "",
}) {
  const editMode = useEditMode();
  const transposition = useTransposition();
  const actualTransposition = editMode ? 0 : transposition;

  return (
    <div
      className={
      classNames(
        className,
        "LyricsPlayground",
        "min-h-96 bg-white",
        {["LyricsPlayground--editMode"]: editMode}
      )
    }
    >
      <div className={classNames("LyricsPlayground__output")}>
        {chunk?.map((line, index) => {
          const isFirstSectionLine = !chunk[index - 1]; // if previous line empty- it's first line in section
          const modifier = modifiers.find((m) => m.detector(line, isFirstSectionLine));
          return modifier
            ? modifier.Component(line, index, actualTransposition)
            : <NormalText key={index}>{line}</NormalText>
        })}
      </div>
      {editMode && (
        <textarea
          data-chunk-index={index}
          className={classNames(
            "LyricsPlayground__textarea",
            "focus:shadow-accent pr-4 pl-1"
          )}
          value={chunk.join("\n")}
          onChange={onChange}
          onKeyDown={onKeyDown}
          autoComplete="off"
          autoCorrect="off"
          rows={size}
        />
      )}
    </div>
  );
}