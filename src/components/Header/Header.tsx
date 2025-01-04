import { Link } from "react-router-dom";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { Routes } from "../../constants/routes";
import { useSelector } from "react-redux";

export default function Header() {
  return (
    <div className="navbar bg-base-300 mb-4 rounded-xl shadow-md relative">
      <div className="flex-1">
        <Link to={Routes.Root} className="btn btn-ghost text-2xl">
          Пісні спасенних
        </Link>
      </div>
      <div className="flex-none">
        <div className="flex gap-2">
          <label
            htmlFor="my-drawer-4"
            className="block drawer-button btn btn-square p-1"
          >
            <Bars3Icon />
          </label>
        </div>
      </div>
      <GlobalLoader />
    </div>
  );
}

function GlobalLoader() {
  const isLoading = useSelector((state: any) => state.viewConfig.globalLoader);

  if (!isLoading) {
    return null;
  }

  return (
    <div className="absolute bottom-0 left-2 right-2">
      <progress className="progress progress-neutral-content h-1 w-full" />
    </div>
  );
}
