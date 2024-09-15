import React, { useEffect } from "react";
import { fetchAPI } from "../../utils/fetch-api";
import Card from "../../components/Card/Card";

export default function Lists() {
  const [lists, setLists] = React.useState([]);
  useEffect(() => {
    fetchAPI("/lists", { populate: "songs" }).then((data) => {
    //   console.log(data.data);
      setLists(data.data);
    });
  }, []);
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight pb-4">
        Списки пісень
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {lists.length &&
          lists.map((list) => (
            <Card>
              <h3 className="card-title">{list.attributes.date}</h3>
              <ul className="list-inside space-y-2">
                {list.attributes.songs.data.map((song) => (
                  <li className="bg-base-100 p-3 rounded">
                    {song.attributes.name}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
      </div>
    </>
  );
}
