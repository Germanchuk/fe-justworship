import React from "react";
import ChordTooltip from "./ChordTooltip/ChordTooltip";

export default function ChordLine({ children, chordsTooltipEnabled = false }) {
  const parts = children.split(/(\s+)/);
  return (
    <div className="text-primary chords whitespace-pre">
      {parts.map((part, index) =>
        part.trim() ? (
          <ChordTooltip key={index}>{part}</ChordTooltip>
        ) : (
          part // Keeps the spaces as they are
        )
      )}
    </div>
  );
}
