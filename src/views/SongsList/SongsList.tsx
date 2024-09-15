import React, { useEffect } from "react";
import { fetchAPI } from "../../utils/fetch-api";
import Card from "../../components/Card/Card";
import { Link } from "react-router-dom";

export default function SongsList() {
  const [songs, setSongs] = React.useState([]);
  useEffect(() => {
    fetchAPI("/songs").then((data) => {
      console.log(data.data);
      setSongs(data.data);
    });
  }, []);

  if (songs.length === 0) {
    return null;
  }

  return (
    <>
      <div className="flex justify-between items-center pb-4">
        <h1 className="text-3xl font-bold tracking-tight">Всі пісні</h1>
        <Link className="btn btn-square" to="/mySongs/add">
          <AddIcon />
        </Link>
      </div>
      <Card>
        {songs.map((song) => {
          return (
            <Link to={`/mySongs/${song.id}`} className="bg-base-100 p-3 rounded">
              {song.attributes.name}
            </Link>
          );
        })}
      </Card>
    </>
  );
}

function AddIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  );
}
