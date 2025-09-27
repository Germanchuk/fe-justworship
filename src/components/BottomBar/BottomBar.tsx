import { Link } from "react-router-dom";
import {Bars3Icon, HomeIcon } from "@heroicons/react/24/outline";
import { Routes } from "../../constants/routes";
import { useSelector } from "react-redux";
import ReactDOM from "react-dom";
import {useControls} from "../../context/controls.tsx";
import classNames from "classnames";

export default function BottomBar() {
  const { controls } = useControls();
  const isLoading = useSelector((state: any) => state.viewConfig.globalLoader);

  return ReactDOM.createPortal(
    <div className="fixed inset-x-0 bottom-0 z-50 animate__zoomIn">
      <div className="container mx-auto p-2">
        <div className={`flex gap-2`}>
          <div className="glass rounded-full p-1">
            <Link to={Routes.Root} className={"btn btn-circle btn-ghost"}>
                {isLoading ? <GlobalLoader /> : <HomeIcon className="animate__bounceIn h-6 w-6" />}
            </Link>
          </div>

              <div
                className={
                  classNames(
                    "flex-1 flex gap-2 glass rounded-full p-1", {
                      "justify-end": controls,
                      "justify-center items-center": !controls
                    })
                }
              >
                {controls ? controls : <h2 className={"font-semibold"}>Just Worship</h2>}
              </div>

          <div className="glass rounded-full p-1">
              <label
                htmlFor="my-drawer-4"
                className="drawer-button btn btn-circle btn-ghost"
              >
                <Bars3Icon className={"h-6 w-6"} />
              </label>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

function GlobalLoader() {

  return (
      <span className="animate__bounceIn loading loading-spinner loading-xl" />
  );
}
