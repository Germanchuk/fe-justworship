import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {songApi} from "../../../../api";
import {Routes} from "../../../../constants/routes.ts";
import {addNotificationWithTimeout} from "../../../../redux/slices/notificationsSlice.ts";
import ReactDOM from "react-dom";
import {DocumentDuplicateIcon} from "@heroicons/react/24/outline";
import React from "react";

export function CopyButton({ songId}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const copySong = () => {
    songApi.copySong(songId as string).then((data) => {
      navigate(`${Routes.PublicSongs}/${data.data.id}`);
    })
      .catch(() => {
        dispatch(addNotificationWithTimeout({
          type: "error",
          message: "Помилка серверу, не вдалось скопіювати пісню",
        }));
      });
  }
  return ReactDOM.createPortal(
    <div className="fixed bottom-4 right-4">
      <button
        className="btn btn-square bg-base-300 ring-neutral ring-1 rounded-3xl"
        onClick={copySong}
      >
        <DocumentDuplicateIcon className="w-6 h-6" />
      </button>
    </div>, document.body
  );
}