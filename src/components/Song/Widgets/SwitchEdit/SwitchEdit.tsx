import {useEditMode, useSetEditMode} from "../../../../hooks/song/selectors.ts";
import ReactDOM from "react-dom";
import ReactSwitch from "react-switch";
import React from "react";

export function SwitchEdit() {
  const setEditMode = useSetEditMode();
  const editMode = useEditMode();
  return ReactDOM.createPortal(
    <div className="fixed bottom-3 right-3 p-2 glass rounded-3xl flex items-center">
      <ReactSwitch
        checked={editMode}
        onChange={(checked) => setEditMode(checked)}
      />
    </div>, document.body
  );
}