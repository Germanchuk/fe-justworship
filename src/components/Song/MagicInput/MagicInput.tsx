import classNames from "classnames";

export default function MagicInput({
  wrapperClassName,
  className,
  value = "",
  setValue,
  editMode = false,
}: any) {
  return (
    <div className={classNames("MagicInput", wrapperClassName)}>
      <div className={classNames("MagicInput__output", className)}>
        {value.split("\n").map(renderLine)}
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
          className="text-primary chords"
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

  // Check if the input matches any of the song structure items
  return songStructureItems.map((i) => i).some((item) => input.includes(item));
}
