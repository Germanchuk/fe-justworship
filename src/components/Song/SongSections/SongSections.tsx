import React from "react";
import { useParams } from "react-router-dom";
import { fetchAPI } from "../../../utils/fetch-api";
import MagicInput from "../MagicInput/MagicInput";
import { PlusIcon } from "@heroicons/react/24/outline";
import { v4 as uuidv4 } from "uuid";
import Section from "./Section/Section";
import Masonry from "react-masonry-css";

export default function SongSections({ song, setSong, editMode = false }) {
  const breakpointColumnsObj = {
    default: 3, // 3 columns by default (you can adjust this as needed)
    1100: 2, // 2 columns when the screen width is <= 1100px
    700: 1, // 1 column when the screen width is <= 700px
  };

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
    <div className="max-h-96">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {song.content.map((section, index) => {
          return (
            <>
              <Section
                id={section.id}
                value={section.content}
                setValue={getBlockChanger(index)}
                deleteBlock={getBlockRemover(index)}
                addBlockBelow={addBlockBelow(index)}
                key={section.id}
                // wrapperClassName="py-2"
                className="text-lg py-6"
                editMode={editMode}
              />
            </>
          );
        })}
      </Masonry>
    </div>
  );
}
