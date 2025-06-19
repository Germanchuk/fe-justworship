import {ArrowLeftIcon} from "@heroicons/react/24/outline";
import ReactDOM from "react-dom";

export function BackButton() {
  return ReactDOM.createPortal(
    <button
      className="glass fixed top-2 right-2 p-3 bg-base-300 rounded-2xl flex items-center"
      onClick={() => window.history.back()}
    >
      <ArrowLeftIcon className="w-6 h-6" />
    </button>,
    document.body
  )
}