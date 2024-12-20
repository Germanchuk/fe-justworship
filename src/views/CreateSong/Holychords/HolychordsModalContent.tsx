import React from "react";
import { getStrapiURL } from "../../../utils/fetch-api";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../../constants/routes";

const token =
  "774099e6aefe03b082250a5dd917928a50b6aaf5d71b4959e929923a4a6fa82f957dd1fa472e1b7d032672cb23dc308be35c2d532a2d0eb512d36b213b781701ae7375a56109ab2dd00797c4a71b16c3dbc6ce3f68b255384364528cde1c1a45563505e8284fb28942c670f3292a1f522a9078f21ac8964c95837babfe7b22e2";

export default function HolychordsModalContent() {
  const [url, setUrl] = React.useState();
  const navigate = useNavigate();
  function handleClick(url) {
    fetch(`${getStrapiURL()}/api/parseHolychords`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ data: { url } }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        navigate(`${Routes.PublicSongs}/${data.id}`);
      })
      .catch((e) => {
        console.error(e);
      });
  }
  return (
    <>
      <div className="flex gap-4 justify-between">
        <input
          className="block flex-1 border-0 ring-1 rounded-md py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
          type="text"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value as any);
          }}
        />
        <button className="btn btn-primary" onClick={() => handleClick(url)}>
          Імпортувати
        </button>
      </div>
      <p className="text-xs text-gray-500 mt-2">
        Інколи на чудо треба зачекати (зачекайте )
      </p>
    </>
  );
}
