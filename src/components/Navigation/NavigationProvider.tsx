import React, { useEffect, useRef } from "react";
import Sidebar from "./Sidebar/Sidebar";
import { useLocation } from "react-router-dom";

export default function NavigationProvider({ children }) {
    const ref = useRef();
    const location = useLocation();
    useEffect(() => {
        // @ts-ignore
        if (ref?.current?.checked) {
          // @ts-ignore
          ref.current.checked = false;
        }
    }, [location]);
  return (
    <div className="drawer drawer-end">
      <input ref={ref} id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">{children}</div>
      <Sidebar />
    </div>
  );
}
