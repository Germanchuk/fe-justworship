import LyricsPlayground from "../../components/LyricsPlayground/LyricsPlayground.tsx";
import React, {useState} from "react";
import {fetchAPI} from "../../utils/fetch-api.tsx";

export default function Sandbox() {
  const [song, setSong] = useState();

  React.useEffect(() => {
    fetchAPI(`/currentBandSongs/94`, {
      populate: ["sections"],
    })
      .then((data) => {
        setSong(data.data);
      })
  }, []);

  return <div className="m-auto">
    <LyricsPlayground className="text-3xl font-bold min-h-96 min-w-96" song={song} setSong={setSong} editMode />
  </div>
}