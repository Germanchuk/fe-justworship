import classNames from "classnames";
import { isChordsLine, isChordsLine2 } from "../../utils/keyUtils.ts";
import ChordLine from "./ChordLine/ChordLine.tsx";
import { transpose } from "chord-transposer";
import { isSongStructureLine } from "../../utils/structureCaptionDetector.ts";
import { useEditMode } from '../../hooks/song/selectors.ts';

function NormalText({ children }) {
  return <div style={{ whiteSpace: "pre-wrap" }}>{children}</div>;
}

export default function MagicInput({
  wrapperClassName,
  className,
  value = "",
  setValue,
  transposition = 0,
  useModifiers = false,
}: any) {
  const editMode = useEditMode();
  const actualTransposition = editMode ? 0 : transposition;
  return (
    <div className={classNames("MagicInput", wrapperClassName)}>
      <div className={classNames("MagicInput__output", className)}>
        {value.split("\n").map((line, index) => {
          if (useModifiers) {
            const modifier = modifiers.find((m) => m.detector(line, index));
            return modifier ? (
              modifier.Component(line, index, actualTransposition)
            ) : (
              <NormalText key={index}>{line}</NormalText>
            );
          } else {
            if (line) {
              return <NormalText key={index}>{line}</NormalText>;
            } else {
              return (
                <div key={index}>
                  <br />
                </div>
              );
            }
          }
        })}
      </div>
      {editMode && (
        <textarea
          className={classNames(
            "MagicInput__textarea border border-solid border-base-300",
            className
          )}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoComplete="off"
          autoCorrect="off"
        />
      )}
    </div>
  );
}

const modifiers = [
  {
    internalName: "emptyLine",
    detector: (line) => !line,
    Component: (_, index) => (
      <div key={index}>
        <br />
      </div>
    ),
  },
  {
    internalName: "chordsLine",
    detector: (line) => isChordsLine(line) && isChordsLine2(line),
    Component: (line, index, transposition) => (
      <ChordLine key={index}>
        {transposition ? transpose(line).down(transposition).toString() : line}
      </ChordLine>
    ),
  },
  {
    internalName: "blockTitle",
    detector: (line, index) => index === 0 && isSongStructureLine(line),
    Component: (line, index) => (
      <div
        className="MagicInput__blockTitle inline-block bg-accent rounded whitespace-pre"
        key={index}
      >
        {line}
      </div>
    ),
  },
];
