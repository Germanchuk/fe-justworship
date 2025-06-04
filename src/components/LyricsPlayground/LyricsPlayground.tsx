import classNames from "classnames";
import {useEffect, useRef, useState} from "react";
import InlineSection from "./InlineSection/InlineSection.tsx";

const SECTION_SEPARATOR = "\n\n";

export default function LyricsPlayground({song, setSong}: any) {

  const [textareaValue, setTextareaValue] = useState("");
  const textareaRef = useRef(null);

  console.log(song?.sections);

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

    const newContents = rawText.split(SECTION_SEPARATOR);

    setSong((prevSong: any) => {
      const oldSections = prevSong.sections || [];
      const newSections = [];

      for (let i = 0; i < newContents.length; i++) {
        const content = newContents[i];
        const oldSection = oldSections[i];

        if (oldSection && oldSection.content === content) {
          // Якщо зміст не змінився — залишаємо ту ж секцію
          newSections.push(oldSection);
        } else if (oldSection) {
          // Змінився текст — залишаємо id, змінюємо content
          newSections.push({ ...oldSection, content });
        } else {
          // Нова секція — без id, бекенд потім присвоїть
          newSections.push({ content });
        }
      }

      return { ...prevSong, sections: newSections };
    });
  };

  return (
    <div className={classNames("LyricsPlayground", "min-h-96")}>
      <div className={classNames("LyricsPlayground__output p-2")}>
        {song?.sections.map((section, index) => {
          return (
            <>
              <InlineSection section={section} />
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
