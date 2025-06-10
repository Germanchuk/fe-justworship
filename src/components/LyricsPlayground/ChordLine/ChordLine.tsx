import React from "react";
import ChordTooltip from "./ChordTooltip/ChordTooltip.tsx";

export default function ChordLine({ children, chordsTooltipEnabled = false }) {
  const parts = children.split(/(\s+)/);
  return (
    <div className="text-primary chords whitespace-pre">
      {parts.map((part, index) =>
        part.trim() && part.trim() !== "." && part.trim() !== "|" ? (
          chordsTooltipEnabled ? (
            <ChordTooltip key={index}>{part}</ChordTooltip>
          ) : (
            <span key={index}>{part}</span>
          )
        ) : (
          part // Keeps the spaces and . | as they are
        )
      )}
    </div>
  );
}
