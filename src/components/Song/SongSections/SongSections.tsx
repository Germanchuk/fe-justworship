import { PlusIcon } from "@heroicons/react/24/outline";
import { v4 as uuidv4 } from "uuid";
import Section from "./Section/Section";

export default function SongSections({ song, setSong, editMode = false }) {

  const getBlockChanger = (blockIndex) => (newValue) => {
    setSong((song) => {
      const updatedBlocks = [...song.content];

      updatedBlocks[blockIndex].content = newValue;

      return { ...song, content: updatedBlocks };
    });
  };

  const getBlockRemover = (blockIndex) => () => {
    setSong((song) => {
      const updatedBlocks = [...song.content];
      updatedBlocks.splice(blockIndex, 1);
      return { ...song, content: updatedBlocks };
    });
  };

  const addFirstBlock = () => {
    setSong((song) => {
      return { ...song, content: [{ id: uuidv4(), content: "" }] };
    });
  };

  const addBlockBelow = (blockIndex) => () => {
    setSong((song) => {
      const updatedBlocks = [...song.content];
      updatedBlocks.splice(blockIndex + 1, 0, { id: uuidv4(), content: "" });
      return { ...song, content: updatedBlocks };
    });
  };

  if (!song || !song.content || Object.keys(song.content).length === 0) {
    return (
      <button onClick={addFirstBlock} className="btn btn-block btn-outline">
        Додати першу секцію <PlusIcon className="h-6" />
      </button>
    );
  }

  return (
    <div className="threeCols">
      {song.content.map((section, index) => {
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
            transposition={song.transposition}
          />
        );
      })}
    </div>
  );
}
