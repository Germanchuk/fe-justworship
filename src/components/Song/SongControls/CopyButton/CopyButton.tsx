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
  return (
    <button
      className="btn btn-circle btn-dash"
      onClick={copySong}
    >
      <DocumentDuplicateIcon className="w-6 h-6" />
    </button>
  );
}