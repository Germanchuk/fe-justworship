import classNames from "classnames";
import {useEffect, useRef, useState} from "react";
import InlineSection from "./InlineSection/InlineSection.tsx";
import diffSections from "../../utils/diffSections.ts";

const SECTION_SEPARATOR = "\n\n";
const SECTION_SEPARATOR_REGEX = /\n{2,}/g;

export default function LyricsPlayground({song, setSong}: any) {

  const [textareaValue, setTextareaValue] = useState("");
  const textareaRef = useRef(null);


  useEffect(() => {
    if (song?.sections) {
      const combined = song.sections.map((s) => s.content).join(SECTION_SEPARATOR);
      setTextareaValue(combined);
    }
  }, [song?.sections]);

  // Обробка зміни у textarea з врахуванням id від бекенду
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const rawText = e.target.value;
    setTextareaValue(rawText);

    const newContents = rawText.split(SECTION_SEPARATOR_REGEX);

    setSong((prevSong: any) => {
      const oldSections = prevSong.sections || [];
      const updatedSections = diffSections(oldSections, newContents);

      return { ...prevSong, sections: updatedSections };
    });
  };

  return (
    <div className={classNames("LyricsPlayground", "min-h-96")}>
      <div className={classNames("LyricsPlayground__output p-2")}>
        {song?.sections.map((section, index) => {
          return (
            <>
              <InlineSection key={section.id ?? index} section={section} />
              {song?.sections?.length !== index && <br />}
            </>
          )
        })}
      </div>
      <textarea
        ref={textareaRef}
        className={classNames(
          "LyricsPlayground__textarea border border-solid border-base-300 p-2",
        )}
        value={textareaValue}
        onChange={handleChange}
        autoComplete="off"
        autoCorrect="off"
      />
    </div>
  );
}
