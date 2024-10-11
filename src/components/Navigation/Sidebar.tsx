import {
  ArrowLeftEndOnRectangleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="drawer-side">
      <label
        htmlFor="my-drawer-4"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <div className="bg-base-200 text-base-content min-h-full w-80 p-4 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <p className="btn btn-ghost text-xl">Just Worship</p>
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
