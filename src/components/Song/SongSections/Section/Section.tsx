import "./Section.css";
import {
  ArrowTrendingUpIcon,
  PlusIcon,
  XCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import classNames from "classnames";
import MagicInput from "../../MagicInput/MagicInput";

export default function Section({
  value = "",
  setValue,
  deleteBlock = null,
  addBlockBelow = null,
  editMode = false,
  transposition = 0,
}: any) {
  //
  return (
    <div
      className={classNames("Section", {
        "ring-1 rounded ring-base-300": editMode,
      })}
    >
      {editMode && (
        <div className={classNames("Section__controls")}>
          <div>
            <button
              className="btn btn-sm btn-square rounded"
              onClick={deleteBlock}
            >
              <ArrowTrendingUpIcon className="w-4 h-4" />
            </button>
          </div>
          <div>
            <button
              className="btn btn-sm btn-square bg-error rounded"
              onClick={deleteBlock}
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
      <MagicInput
        value={value}
        setValue={setValue}
        editMode={editMode}
        transposition={transposition}
      />
      {editMode && (
        <div className={classNames("Section__controls")}>
          <div></div>
          <div>
            <button
              className="btn btn-sm btn-square rounded"
              onClick={addBlockBelow}
            >
              <PlusIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
