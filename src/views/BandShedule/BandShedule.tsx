import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchAPI } from "../../utils/fetch-api";
import SongsList from "../../components/SongsList/SongsList";
import {PaperAirplaneIcon, PlusCircleIcon} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../constants/routes";

export default function BandShedule() {
  const navigate = useNavigate();
  const [lists, setLists] = React.useState([]);
  const user = useSelector((state: any) => state.user);
  useEffect(() => {
    fetchAPI("/currentBandLists", {
      populate: ["songs", "band"],
      sort: { date: "desc" },
    }).then((data) => {
      setLists(data.data);
    });
  }, []);

  return (
    <>
      <div className="flex justify-between items-center gap-2 mb-3">
        <h1 className="tracking-tight">
          <span className="text-2xl font-bold">Дати служінь</span>
        </h1>
        <button
          className="btn btb-ghost bg-create"
          onClick={() => navigate(Routes.CreateBandShedule)}
        >
          <PlusCircleIcon className="w-5 h-5"/>
          Додати
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {lists?.length && lists?.map((list) => <SongsList list={list}/>)}
      </div>
    </>
  );
}
