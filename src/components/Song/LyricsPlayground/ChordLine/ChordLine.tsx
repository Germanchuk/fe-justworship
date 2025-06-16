import React from "react";
import ChordTooltip from "./ChordTooltip/ChordTooltip.tsx";

export default function ChordLine({ children }) {
  const parts = children.split(/(\s+)/);
  return (
    <div className="text-primary chords whitespace-pre">
      {parts.map((part, index) =>
        part.trim() && part.trim() !== "." && part.trim() !== "|" ? (
          <ChordTooltip key={index}>{part}</ChordTooltip>
        ) : (
          part // Keeps the spaces and . | as they are
        )
      )}
    </div>
  );
}
