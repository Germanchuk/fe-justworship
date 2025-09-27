import classNames from "classnames";
import {isChordsLine, isChordsLine2} from "../../../../utils/keyUtils.ts";
import ChordLine from "./ChordLine/ChordLine.tsx";
import {isSongStructureLine} from "../../../../utils/structureCaptionDetector.ts";
import {transpose} from "chord-transposer";
import {useEditMode, useTransposition} from '../../../../hooks/song/selectors.ts';

export default function InlineSection({ section }) {
  const editMode = useEditMode();
  const transposition = useTransposition();
  const actualTransposition = editMode ? 0 : transposition;
  return section?.content?.split("\n").map((line, index) => {
    const modifier = modifiers.find((m) => m.detector(line, false));
    return (
      <div className={"Line"}>
        {modifier
          ? modifier.Component(line, index, actualTransposition)
          : <NormalText key={index}>{line}</NormalText>}
      </div>
    );
  });
}

export function NormalText({children}) {
  return <div className={"pr-4 pl-1"} style={{whiteSpace: "pre-wrap"}}>{children}</div>;
}

export const modifiers = [
  {
    internalName: "emptyLine",
    detector: (line) => !line,
    Component: (_, index, caretPos = false) => (
      <div className={classNames({"pr-4 pl-1": index !== caretPos})}
           key={index}>
        <br/>
      </div>
    ),
  },
  {
    internalName: "chordsLine",
    detector: (line) => isChordsLine(line) && isChordsLine2(line),
    Component: (line, index, transposition) => (
      <ChordLine key={index}>
        {transposition ? transpose(line).down(transposition).toString() : line}
      </ChordLine>
    ),
  },
  {
    internalName: "blockTitle",
    detector: (line, firstSectionLine) => firstSectionLine && isSongStructureLine(line),
    Component: (line, index) => (
      <div
        className="LyricsPlayground__blockTitle bg-base-200 whitespace-pre pr-4 pl-1"
        key={index}
      >
        {line}
      </div>
    ),
  },
];