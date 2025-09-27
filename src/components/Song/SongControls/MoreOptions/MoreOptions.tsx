import {EllipsisVerticalIcon} from "@heroicons/react/24/solid";
import Dropdown from "../../../Dropdown/Dropdown.tsx";
import classNames from "classnames";
import React from "react";
import {createDocument} from "../../../../services";
import {DocumentArrowDownIcon, EyeIcon, EyeSlashIcon} from "@heroicons/react/24/outline";
import {useDispatch} from "react-redux";
import {useChordsVisibility} from "../../../../hooks/song/selectors.ts";
import {toggleChordsVisibility} from "../../../../redux/slices/songSlice.ts";

export const MoreOptions = () => {
  const dispatch = useDispatch();
  const chordsHidden = useChordsVisibility();

  return (
    <Dropdown
      trigger={() => (
        <button className="btn btn-circle btn-ghost">
          <EllipsisVerticalIcon className="w-6 h-6"  />
        </button>
      )}
      position="top"
      className="w-45"
    >
      {/* any options zone */}
      <ul className="rounded-box bg-white w-full shadow-md m-0 p-2">
        <li
          className="btn btn-block btn-sm mb-1"
          onClick={() => createDocument()}
        >
          <DocumentArrowDownIcon className="w-5"/>
          .docx
        </li>
        <li
          className="btn btn-block btn-sm mb-1"
          onClick={() => dispatch(toggleChordsVisibility())}
        >
          {chordsHidden ? <EyeIcon className="w-4"/>
            : <EyeSlashIcon className="w-4"/>}
          {chordsHidden ? "Показати" : "Сховати"} акорди
        </li>
      </ul>
    </Dropdown>
  );
}
