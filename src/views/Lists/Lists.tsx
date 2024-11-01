import React, { useEffect } from "react";
import { fetchAPI } from "../../utils/fetch-api";
import Card from "../../components/Card/Card";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/utils";

export default function Lists() {
  const [lists, setLists] = React.useState([]);
  const user = useSelector((state: any) => state.user);
  useEffect(() => {
    fetchAPI("/currentBandLists", { populate: ["songs", "band"] }).then((data) => {
      setLists(data.data);
    });
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight pb-4">
        Списки пісень гурту "{user?.currentBand?.name}"
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {lists.length && lists?.map((list) => <Card list={list} />)}
      </div>
    </>
  );
}
