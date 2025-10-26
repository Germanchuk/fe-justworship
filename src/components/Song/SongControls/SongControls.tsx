import {CopyButton} from "./CopyButton/CopyButton.tsx";
import {SwitchEdit} from "./SwitchEdit/SwitchEdit.tsx";
import {CheckCircleIcon, ClockIcon, ExclamationCircleIcon, LockClosedIcon, PlayIcon} from "@heroicons/react/24/outline";
import {useStatus} from "../../../hooks/song/selectors.ts";
import {MoreOptions} from "./MoreOptions/MoreOptions.tsx";
import React from "react";
import {playSound} from "../../../services";

export const SongControls = ({
  isReadonly,
  songId
}) => {
  const status = useStatus();
  return (
    <div className="w-full flex justify-between">
      <div>
        <div className="h-10 w-10 flex justify-center items-center">
          <Status status={status} />
        </div>
      </div>
      <div className="flex gap-1">
        {/* any options zone */}
        <button
          className="btn btn-circle btn-dash"
          onClick={playSound}
        >
          <PlayIcon className="w-6 h-6" />
        </button>
        {
          isReadonly
            ? <CopyButton songId={songId} />
            : <SwitchEdit />
        }
        <MoreOptions />
      </div>
    </div>
  )
}

function Status({status}) {
  switch (status) {
    case "error":
      return <ExclamationCircleIcon className="w-8 h-8 text-error-content animate__bounceIn" />
    case "saved":
      return <CheckCircleIcon className="w-8 h-8 text-success-content animate__bounceIn" />
    case "saving":
      return <span className="loading loading-ring animate__bounceIn" />
    case "pending":
      return <ClockIcon className="w-8 h-8 text-neutral animate__bounceIn" />
  }
}
