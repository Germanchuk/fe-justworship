import { CheckCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import React from "react";
import CircleIcon from "../../../icons/CircleIcon";
import { useDispatch } from "react-redux";
import { fetchAPI } from "../../../utils/fetch-api";

export default function BandSelector({ bands, currentBand }) {
  const dispatch = useDispatch();
  const handleBandChange = (bandId) => () => {
    if (bandId === currentBand?.id) {
      return;
    }

    fetchAPI("/users-permissions/users/me", null, {
      method: "PUT",
      body: JSON.stringify({
        currentBand: bandId,
      }),
    })
      .then(() => {
        window.location.reload();
      })
      .catch(() => {
        dispatch(
          // @ts-ignore
          addNotificationWithTimeout({
            message: "Щось не так",
            type: "error",
          })
        );
      });
  };

  return (
    <div className="mb-6">
      <div className="mb-2 flex items-center justify-between gap-3">
        <h2 className="text-xl font-semibold">
          {bands?.length > 1 ? "Гурти:" : "Гурт:"}
        </h2>
        <button className="btn btn-sm btn-outline btn-base-200">
          <PlusCircleIcon className="w-5 h-5" />
          {!bands?.length && "Приєднатись до гурту"}
        </button>
      </div>
      <ul className="join join-vertical w-full mb-4">
        {!!bands?.length &&
          bands?.map((band) => (
            <li
              className={classNames(
                "flex justify-start btn btn-base-200 join-item",
                {
                  "bg-base-700 text-base-100": band?.id === currentBand?.id,
                }
              )}
              onClick={handleBandChange(band?.id)}
            >
              {band?.id === currentBand?.id ? (
                <CheckCircleIcon className="w-5 h-5" />
              ) : (
                <CircleIcon className="w-5 h-5" />
              )}
              {band?.name}
            </li>
          ))}
      </ul>
    </div>
  );
}
