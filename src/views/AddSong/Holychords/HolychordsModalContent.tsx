import React from "react";
import { getStrapiURL } from "../../../utils/fetch-api";
import { useNavigate } from "react-router-dom";

const token =
  "2617389405e4ccfa460cd79db4f210344f2c239f3d9e09b59768608684b0d9bfaa2175fd721c5f143160a08fce023878c03c9535a634ead226dede7befa1f1c1465174faf2b3eef21957bfbc23aab484c6c98a2e0af2c137cea767bb218a1039b984ae23ae607f38c56de5671da792dc3e06a54b769a148737073076f0cd7b93";

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
          console.log(data.id);
        navigate(`/mySongs/${data.id}`);
      })
      .catch((e) => {
        console.error(e);
      });
  }
  return (
    <div className="flex gap-4 justify-between">
      <input
        className="block flex-1 border-0 bg-base-content rounded-md py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
        type="text"
        value={url}
        onChange={(e) => {
          setUrl(e.target.value as any);
        }}
      />
      <button className="btn btn-primary" onClick={() => handleClick(url)}>
        Submit
      </button>
    </div>
  );
}
