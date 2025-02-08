import { PlusIcon } from "@heroicons/react/24/outline";
import Section from "./Section/Section";

export default function SongSections({ song, setSong, editMode = false, transposition = 0 }) {

  const getBlockChanger = (blockIndex) => (newValue) => {
    setSong((song) => {
      const updatedSections = [...song.sections];

      updatedSections[blockIndex].content = newValue;

      return { ...song, sections: updatedSections };
    });
  };

  const getBlockRemover = (sectionIndex) => () => {
    setSong((song) => {
      const updatedSections = [...song.sections];
      updatedSections.splice(sectionIndex, 1);
      return { ...song, sections: updatedSections };
    });
  };

  const addFirstBlock = () => {
    setSong((song) => {
      return { ...song, sections: [{ content: "" }] };
    });
  };

  const addBlockBelow = (sectionIndex) => () => {
    setSong((song) => {
      const updatedSections = [...song.sections];
      updatedSections.splice(sectionIndex + 1, 0, { content: "" });
      return { ...song, sections: updatedSections };
    });
  };

  if (!song || !song.sections || Object.keys(song.sections).length === 0) {
    return (
      <button onClick={addFirstBlock} className="btn btn-block btn-outline">
        Додати першу секцію <PlusIcon className="h-6" />
      </button>
    );
  }

  return (
    <div className="threeCols">
      {song.sections.map((section, index) => {
        return (
          <Section
            id={section.id}
            value={section.content}
            setValue={getBlockChanger(index)}
            deleteBlock={getBlockRemover(index)}
            addBlockBelow={addBlockBelow(index)}
            key={index}
            className="text-lg py-6"
            editMode={editMode}
            transposition={transposition}
          />
        );
      })}
    </div>
  );
}
