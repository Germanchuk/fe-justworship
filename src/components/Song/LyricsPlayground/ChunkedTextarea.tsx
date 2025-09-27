import React, { useRef, useLayoutEffect } from "react";
import {Chunk} from "./Chunk.tsx";
import {useMaxLines} from "./useMaxLines.ts";

// REQUIREMENTS:
// - If text reach the end of area - it should move to the start of next one
// - If I do new line in the end of area - it should jump to the next one and create new line there
// - If I do delete at the start of area - it should move to the previous area
// - If I do new line in the middle of area - it shouldn't miss caret position
// - If I do deletion in the middle of area - it shouldn't miss caret position

function getTextareaByIndex(index): HTMLTextAreaElement | null {
  return document.querySelector(`textarea[data-chunk-index="${index}"]`);
}

export default function ChunkedTextarea({ linesStream, setLines}) {
  const MAX_LINES = useMaxLines();
  const caretRef = useRef(null);

  function handleChange(chunkIndex, target) {
    caretRef.current = {
      caretPosition: target.selectionStart,
      targetChunk: chunkIndex
    };

    const newValue = target.value;
    const newLines = newValue.split("\n");

    setLines((prev) => {
      const lines = [...prev];
      const start = chunkIndex * MAX_LINES;
      lines.splice(start, MAX_LINES, ...newLines);

      return lines;
    });
  }

  const chunks = linesStream.reduce((acc, _, i) => {
    if (i % MAX_LINES === 0) acc.push(linesStream.slice(i, i + MAX_LINES));
    return acc;
  }, []);

  if (chunks[chunks.length - 1].length === 10) {
    // pre-add area at the end to have it for .focus()
    chunks.push([""]);
  }

  useLayoutEffect(() => {
    if (caretRef.current) {
      const { caretPosition, targetChunk} = caretRef.current;
      getTextareaByIndex(targetChunk)?.setSelectionRange(caretPosition, caretPosition);
    }
    caretRef.current = null;
  });

  function handleKeydown(chunkIndex, event) {
    // cross-area deletion
    if (
      event.key === "Backspace" &&
      chunkIndex > 0 &&
      getTextareaByIndex(chunkIndex)?.selectionStart === 0
    ) {
      event.preventDefault();

      setLines(prev => {
        const lines = [...prev];
        const impactedLineIndex = chunkIndex * MAX_LINES;
        // join impacted line with previous line
        lines[impactedLineIndex - 1] += lines[impactedLineIndex];
        lines.splice(impactedLineIndex, 1);

        // handle caret
        getTextareaByIndex(chunkIndex - 1)?.focus();
        const newCaretPosition = getTextareaByIndex(chunkIndex - 1)?.value.length;

        caretRef.current = {
          caretPosition: newCaretPosition,
          targetChunk: chunkIndex - 1
        }

        return lines;
      });
    }

    // cross-area new line
    if (
      event.key === "Enter" &&
      getTextareaByIndex(chunkIndex)?.selectionStart === getTextareaByIndex(chunkIndex)?.value.length &&
      getTextareaByIndex(chunkIndex)?.value.split("\n").length === MAX_LINES
    ) {
      event.preventDefault();

      setLines(prev => {
        const lines = [...prev];
        const impactedLineIndex = (chunkIndex + 1) * MAX_LINES;
        // insert empty line
        lines.splice(impactedLineIndex, 0, "");

        // handle caret
        getTextareaByIndex(chunkIndex + 1)?.focus();

        caretRef.current = {
          caretPosition: 0,
          targetChunk: chunkIndex + 1
        };

        return lines;
      });
    }

    // arrows navigation
  }

  return (
    <div className="relative">
      <div className="shadow-inner-left-top absolute top-0 bottom-0 left-o right-0 pointer-events-none w-full h-full z-10" />
      <div className="w-full overflow-x-auto">
        <div className="grid grid-flow-col gap-1">
          {chunks.map((chunk, i) => (
            <Chunk
              key={i}
              index={i}
              size={MAX_LINES}
              chunk={chunk}
              onChange={(e) => handleChange(i, e.target)}
              onKeyDown={(e) => handleKeydown(i, e)}
              className={"w-96 border-x-1 border-base-200"}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
