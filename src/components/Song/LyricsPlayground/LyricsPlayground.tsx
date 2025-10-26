import {useBreakpoint} from "../../../hooks/useBreakpoint.ts";
import {Breakpoints} from "../../../models/breakpoints.ts";
import {Chunk} from "./Chunk.tsx";
import {syncValueWithSections} from "./actions.ts";
import ChunkedTextarea from "./ChunkedTextarea.tsx";
import {useCallback} from "react";
import {sectionsToLinesStream} from "../utils/songUtils.ts";

export default function LyricsPlayground({ sections }) {
  // common format is Array<string> named linesStream;
  // 1. request sections
  // 2. prepare sections to <T> format
  // 3. map sections to text area\s
  // 4. handle change or mutations (nice to have it globally)
  // 5. gather them back to <T>
  // 6. sync with sections
  // 7. auto-save sections

  const isLessThanSM = !useBreakpoint(Breakpoints.SM);

  const linesStream = sectionsToLinesStream(sections);

  function handleSingleChunk(e) {
    syncValueWithSections(e.target.value);
  }

  const handleMultiChunk = useCallback((updater) => {
    const newLines = updater(linesStream);
    syncValueWithSections(newLines.join("\n"));
  }, [linesStream]);

  return (
    <div>
      {isLessThanSM
        ? (
          <Chunk
            chunk={linesStream}
            size={linesStream.length + 1}
            onChange={handleSingleChunk}
            className={"w-full"}
          />
        )
      : (
          <ChunkedTextarea
            linesStream={linesStream}
            setLines={handleMultiChunk}
          />
        )}
    </div>
  )
};
