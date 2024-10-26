import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { fetchAPI } from "../../utils/fetch-api";
import { useDispatch } from "react-redux";
import { addNotificationWithTimeout } from "../../redux/slices/notificationsSlice";
import classNames from "classnames";

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
    <details className="dropdown">
      <summary className="btn btn-outline btn-wide w-full btn-sm">
        {currentBand ? currentBand.name : "Виберіть групу"}{" "}
        <ChevronDownIcon className="w-4" />
      </summary>
      <ul className="menu dropdown-content bg-base-100 rounded-md z-[1] w-52 px-0 shadow">
        {bands?.map((band) => (
          <li
            onClick={handleBandChange(band.id)}
            className={classNames("btn btn-ghost rounded-none btn-sm", {
              disabled: band.id === currentBand?.id,
            })}
            key={band.id}
          >
            {band.name}
          </li>
        ))}
      </ul>
    </details>
  );
}
