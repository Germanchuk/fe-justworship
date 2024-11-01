import classNames from "classnames";
import { isChordsLine, transposeLine } from "../../../utils/keyUtils";

export default function MagicInput({
  wrapperClassName,
  className,
  value = "",
  setValue,
  editMode = false,
  transposition = 0,
}: any) {
  return (
    <div className={classNames("MagicInput", wrapperClassName)}>
      <div className={classNames("MagicInput__output", className)}>
        {value
          .split("\n")
          .map((line, index) =>
            renderLine(line, index, editMode, transposition)
          )}
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

function renderLine(line, index, editMode, transposition) {
  switch (identifyLine(line, index)) {
    case "blockTitle":
      return (
        <div
          className="MagicInput__blockTitle inline-block bg-accent rounded"
          style={{ whiteSpace: "pre-wrap" }}
          key={index}
        >
          {line}
        </div>
      );

    case "chord":
      return (
        <div
          key={index}
          className="text-primary chords"
          style={{ whiteSpace: "pre-wrap" }}
        >
          {!editMode && !!transposition
            ? transposeLine(line, transposition)
            : line}
        </div>
      );

    case "text":
      return (
        <div style={{ whiteSpace: "pre-wrap" }} key={index}>
          {line}
        </div>
      );

    case "empty":
      return (
        <div key={index}>
          <br />
        </div>
      );
  }
}

function identifyLine(line, index) {
  if (!line) {
    return "empty";
  }
  if (index === 0 && isSongStructureItem(line)) {
    return "blockTitle";
  }
  if (isChordsLine(line)) {
    return "chord";
  }
  return "text";
}

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
