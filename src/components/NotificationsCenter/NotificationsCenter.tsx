import { XMarkIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { removeNotification } from "../../redux/slices/notificationsSlice";

export default function NotificationsCenter() {
  const notifications = useSelector((state: any) => state.notifications);
  const dispatch = useDispatch();
  return (
    <div className="toast min-w-0 max-w-screen">
      {notifications.map((notification: any) => {
        return (
          <div
            role="alert"
            key={notification.id}
            className={`block w-full alert alert-${
              notification?.type ?? "info"
            }`}
          >
            <div className="w-full flex items-center justify-between gap-3">
              <span className="whitespace-break-spaces text-left">
                {notification.message}
              </span>
              <button
                className="btn btn-outline btn-xs btn-square"
                onClick={() => dispatch(removeNotification(notification.id))}
              >
                <XMarkIcon />
              </button>
            </div>
          </div>
        );
      })}
      <div className="alert-error alert-info alert-success alert-warning" />
    </div>
  );
}
