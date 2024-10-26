import {
  ArrowLeftEndOnRectangleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import BandSelector from "./BandSelector";

export default function Sidebar() {
  const user = useSelector((state: any) => state.user);

  return (
    <div className="drawer-side">
      <label
        htmlFor="my-drawer-4"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <div className="bg-base-200 text-base-content min-h-full w-80 p-4 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-4">
            <div className="avatar online">
              <div className="w-12 rounded-full">
                <img src="/avatar.avif" style={{ transform: "scale(1.7)" }} />
              </div>
            </div>
            <div className="flex flex-col align-center gap-1">
              <div className="text-xl font-bold">@{user.username}</div>
              <BandSelector
                bands={user?.bands}
                currentBand={user?.currentBand}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="my-drawer-4"
              className="block drawer-button btn btn-square p-1"
            >
              <XMarkIcon />
            </label>
          </div>
        </div>
        <div className="flex flex-col grow justify-between">
          <ul className="menu">
            <li>
              <Link to="/mySongs">Всі пісні</Link>
            </li>
            <li>
              <Link to="/myLists">Списки пісень</Link>
            </li>
          </ul>

          <Link to="/login">
            <button className="btn w-full">
              <ArrowLeftEndOnRectangleIcon className="h-6 w-6" />
              Вийти
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
