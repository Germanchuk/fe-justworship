import MagicInput from "../../MagicInput/MagicInput.tsx";
import { useSongName } from "../../../hooks/song/selectors.ts";
import { handleSongName } from "./actions.ts";

export const SongName = () => {
  const songName = useSongName();
  return (
    <MagicInput
      className="text-3xl font-bold"
      value={songName}
      setValue={handleSongName}
    />
  )
}