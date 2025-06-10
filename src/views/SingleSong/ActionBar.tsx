import React from "react";
import {
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
  EyeIcon,
  EyeSlashIcon,
  LightBulbIcon,
  LockClosedIcon,
  LockOpenIcon,
  PencilIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";

export default function ActionBar({
  editMode,
  toggleEdit,
  hideLyrics,
  toggleHideLyrics,
  showTips,
  toggleShowTips,
  lockEditing,
  toggleLock,
  undo,
  redo,
}: any) {
  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-2">
      <button className="btn btn-square" onClick={undo}>
        <ArrowUturnLeftIcon className="w-5 h-5" />
      </button>
      <button className="btn btn-square" onClick={redo}>
        <ArrowUturnRightIcon className="w-5 h-5" />
      </button>
      <button className="btn btn-square" onClick={toggleHideLyrics}>
        {hideLyrics ? (
          <EyeIcon className="w-5 h-5" />
        ) : (
          <EyeSlashIcon className="w-5 h-5" />
        )}
      </button>
      <button className="btn btn-square" onClick={toggleShowTips}>
        <LightBulbIcon className={`w-5 h-5 ${showTips ? "" : "opacity-30"}`} />
      </button>
      <button className="btn btn-square" onClick={toggleLock}>
        {lockEditing ? (
          <LockClosedIcon className="w-5 h-5" />
        ) : (
          <LockOpenIcon className="w-5 h-5" />
        )}
      </button>
      <button className="btn btn-square" onClick={toggleEdit}>
        {editMode ? (
          <ArrowLeftIcon className="w-5 h-5" />
        ) : (
          <PencilIcon className="w-5 h-5" />
        )}
      </button>
    </div>
  );
}
