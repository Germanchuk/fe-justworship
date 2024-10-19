import "./Section.css";
import {
  ArrowTrendingUpIcon,
  PlusIcon,
  XCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import classNames from "classnames";
import MagicInput from "../../MagicInput/MagicInput";

export default function Section({
  value = "",
  setValue,
  deleteBlock = null,
  addBlockBelow = null,
  editMode = false,
}: any) {
  //
  return (
    <div
      className={classNames("Section", {
        "ring-1 rounded ring-base-300": editMode,
      })}
    >
      {editMode && (
        <div className={classNames("Section__controls")}>
          <div>
            <button
              className="btn btn-sm btn-square rounded"
              onClick={deleteBlock}
            >
              <ArrowTrendingUpIcon className="w-4 h-4" />
            </button>
          </div>
          <div>
            <button
              className="btn btn-sm btn-square bg-error rounded"
              onClick={deleteBlock}
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
      <MagicInput value={value} setValue={setValue} editMode={editMode} />
      {editMode && (
        <div className={classNames("Section__controls")}>
          <div></div>
          <div>
            <button
              className="btn btn-sm btn-square rounded"
              onClick={addBlockBelow}
            >
              <PlusIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function renderLine(line, index) {
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
          className="text-primary"
          style={{ whiteSpace: "pre-wrap" }}
        >
          {line}
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

function isChordsLine(line) {
  const specialLine = line.replace(/[|.]/g, " ");
  // Updated pattern to include dots, pipes, and spaces
  const chordPattern =
    /^(\s*\|\s*)?([A-H](#|b)?(m|M|dim|aug|sus|add|7|9|11|13)?(\/[A-G](#|b)?)?(\s*\.?\s*)?)+(\s*\|\s*)?$/;

  // Remove leading and trailing spaces, then test with the updated pattern
  return chordPattern.test(specialLine.trim());
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

  console.log(songStructureItems);

  // Check if the input matches any of the song structure items
  return songStructureItems.map((i) => i).some((item) => input.includes(item));
}
