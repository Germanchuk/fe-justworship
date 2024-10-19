import MagicInput from "./MagicInput/MagicInput";
import SongSections from "./SongSections/SongSections";

export default function Song({ song, setSong, editMode }) {
  const handleSongName = (value) => {
    setSong((song) => {
      return { ...song, name: value };
    });
  };
  return (
    <div className="flex flex-col gap-4">
      <MagicInput className="text-2xl" value={song.name} setValue={handleSongName} editMode={editMode} />
      <SongSections song={song} setSong={setSong} editMode={editMode} />
    </div>
  );
}
