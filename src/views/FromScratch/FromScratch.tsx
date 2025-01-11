import React from "react";
import Song from "../../components/Song/Song";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { fetchAPI } from "../../utils/fetch-api";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../constants/routes";
import ReactDOM from "react-dom";

export default function FromScratch() {
  // add intermediate auto saving into localStorage
  const [song, setSong] = React.useState<any>({});
  const navigate = useNavigate();

  const createEntry = async () => {
    try {
      const data = await fetchAPI(
        "/songs",
        {},
        {
          method: "POST",
          body: JSON.stringify({
            data: song,
          }),
        }
      );

      if (data) {
        navigate(`${Routes.PublicSongs}/${data.data.id}`);
      }
    } catch {
      // ignore error
    }
  };

  return (
    <>
      <Song song={song} setSong={setSong} editMode={true} />
      <SavingButton createEntry={createEntry} />
    </>
  );
}

function SavingButton({ createEntry }) {
  return ReactDOM.createPortal(
    <div className="fixed bottom-4 right-4">
      <button
        className="btn btn-success btn-square ring-neutral ring-1"
        onClick={createEntry}
      >
        <CheckCircleIcon className="w-6 h-6" />
      </button>
    </div>, document.body
  );
}
