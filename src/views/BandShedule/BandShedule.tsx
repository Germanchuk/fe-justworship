import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchAPI } from "../../utils/fetch-api";
import Card from "../../components/Card/Card";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../constants/routes";

export default function BandShedule() {
  const navigate = useNavigate();
  const [lists, setLists] = React.useState([]);
  const user = useSelector((state: any) => state.user);
  useEffect(() => {
    fetchAPI("/currentBandLists", { populate: ["songs", "band"] }).then(
      (data) => {
        setLists(data.data);
      }
    );
  }, []);

  return (
    <>
      <div className="flex justify-between items-center gap-2">
        <h1 className="text-2xl font-bold mb-2 tracking-tight">
          Списки пісень гурту <br /> "{user?.currentBand?.name}"
        </h1>
        <button
          className="btn btb-ghost bg-create"
          onClick={() => navigate(Routes.CreateBandShedule)}
        >
          <PlusCircleIcon className="w-5 h-5" />
          Додати список
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {lists.length && lists?.map((list) => <Card list={list} />)}
      </div>
    </>
  );
}
