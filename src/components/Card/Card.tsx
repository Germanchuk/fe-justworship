import { Link } from "react-router-dom";
import { formatDate } from "../../utils/utils";

export default function Card({ list }) {
  return (
    <div className="rounded-lg p-3 bg-card-orange shadow-sm w-full ring-1 ring-card-orange-border">
      <h3 className="text-xl font-semibold">
        {formatDate(list?.attributes?.date)}
      </h3>
      <p className="text-neutral-content mb-2">
        {list?.attributes?.band?.data?.attributes?.name}
      </p>
      <ul className="list-inside space-y-2">
        {list.attributes.songs.data.map((song) => (
          <Link className="block bg-base-100 p-2 rounded" to={`/mySongs/${song.id}`}>
            <li className="flex justify-between">
              <span>{song.attributes.name}</span>
              <span>{song.attributes.key?.replace(/sharp/g, "#") ?? "-"} / {song.attributes.bpm ?? "-"}</span>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
