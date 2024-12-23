import classNames from "classnames";
import { isChordsLine, transposeLine } from "../../../utils/keyUtils";
import ChordLine from "./ChordLine/ChordLine";

function NormalText({ children }) {
  return <div style={{ whiteSpace: "pre-wrap" }}>{children}</div>;
}

export default function MagicInput({
  wrapperClassName,
  className,
  value = "",
  setValue,
  editMode = false,
  transposition = 0,
  useModifiers = false,
}: any) {
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
    detector: (line) => isChordsLine(line),
    Component: (line, index, transposition) => (
      <ChordLine key={index} chordsTooltipEnabled={true}>
        {transposition ? transposeLine(line, transposition) : line}
      </ChordLine>
    ),
  },
  {
    internalName: "blockTitle",
    detector: (line, index) => index === 0 && isSongStructureItem(line),
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

function isSongStructureItem(str) {
  // Normalize the input to lowercase and trim any extra spaces
  const input = str.trim().toLowerCase();

  // Define arrays of possible song structure terms in English and Ukrainian
  const songStructureItems = [
    "verse",
    "chorus",
    "bridge",
    "intro",
    "instrumental",
    "tag",
    "outro",
    "ver",
    "ch",
    "br",
    "in",
    "out", // common abbreviations in English
    "куплет",
    "приспів",
    "міст",
    "вступ",
    "кінцівка",
    "куп",
    "пр",
    "мі",
    "вс",
    "кін", // common abbreviations in Ukrainian
  ];

  // Check if the input matches any of the song structure items
  return songStructureItems.map((i) => i).some((item) => input.includes(item));
}
