import classNames from "classnames";
import {isChordsLine, isChordsLine2} from "../../../utils/keyUtils.ts";
import ChordLine from "../ChordLine/ChordLine.tsx";
import {isSongStructureLine} from "../../../utils/structureCaptionDetector.ts";

export default function InlineSection({section}) {
  return section?.content?.split("\n").map((line, index) => {
    const modifier =
      modifiers.find((m) => m.detector(line, index));
    return (<div>{modifier ? (
      modifier.Component(line, index)
    ) : (
      <NormalText key={index}>{line}</NormalText>
    )}</div>);
  });
}

function NormalText({children}) {
  return <div style={{whiteSpace: "pre-wrap"}}>{children}</div>;
}

const modifiers = [
  {
    internalName: "emptyLine",
    detector: (line) => !line,
    Component: (_, index, caretPos = false) => (
      <div className={classNames({"bg-base-200": index !== caretPos})}
           key={index}>
        <br/>
      </div>
    ),
  },
  {
    internalName: "chordsLine",
    detector: (line) => isChordsLine(line) && isChordsLine2(line),
    Component: (line, index) => (
      <ChordLine key={index} chordsTooltipEnabled={true}>
        {line}
      </ChordLine>
    ),
  },
  {
    internalName: "blockTitle",
    detector: (line, index) => index === 0 && isSongStructureLine(line),
    Component: (line, index) => (
      <div
        className="LyricsPlayground__blockTitle inline-block bg-accent rounded whitespace-pre"
        key={index}
      >
        {line}
      </div>
    ),
  },
];