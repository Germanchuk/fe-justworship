import classNames from "classnames";
import React from "react";

function wrapChordsWithSpan(chordString) {
    return chordString.replace(/(\S+)(\s*)/g, '<span class="bg-base-300 chord--around">$1</span>$2');
}

function isChordsLine(line) {
  // Updated pattern to include dots, pipes, and spaces
  const chordPattern =
    /^(\s*\|\s*)?([A-H](#|b)?(m|M|dim|aug|sus|add|7|9|11|13)?(\/[A-G](#|b)?)?(\s*\.?\s*)?)+(\s*\|\s*)?$/;

  // Remove leading and trailing spaces, then test with the updated pattern
  return chordPattern.test(line.trim());
}

function textToHtml(text) {
  const lines = text.split("\n");
  return lines.map((line) => {
    if (isChordsLine(line)) {
      return `<div class="text-primary" style="white-space: pre-wrap">${wrapChordsWithSpan(line)}</div>`;
    }

    return `<div style="white-space: pre-wrap">${line}</div>`;
  }).join("");
}

export default function MagicInput({ className, children }) {
  const [text, setText] = React.useState(children);

  function handleText(value) {
    setText(value);
  }

  console.log(textToHtml(text));

  return (
    <div className="MagicInput">
      <div
        className={classNames("MagicInput__text", className)}
        dangerouslySetInnerHTML={{
          __html: textToHtml(text),
        }}
      />
      <textarea
        className={classNames("MagicInput__textarea", className)}
        value={text}
        onChange={(e) => handleText(e.target.value)}
        autoComplete="off"
        autoCorrect="off"
      />
    </div>
  );
}
