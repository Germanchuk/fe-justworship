import {useEditMode, useSetEditMode} from "../../../../hooks/song/selectors.ts";
import React from "react";
import {LockClosedIcon, LockOpenIcon} from "@heroicons/react/24/outline";

export function SwitchEdit() {
  const setEditMode = useSetEditMode();
  const editMode = useEditMode();
  return (
    <div className="animate__bounceIn">
      {!editMode ?
      (
        <button
          className="btn btn-circle btn-dash"
          onClick={() => setEditMode(true)}
        >
          <LockClosedIcon className="w-6 h-6" />
        </button>
      ) : (
        <button
          className="btn btn-circle btn-dash"
          onClick={() => setEditMode(false)}
        >
          <LockOpenIcon className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}