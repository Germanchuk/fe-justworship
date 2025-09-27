import React, { useEffect } from "react";
import { fetchAPI } from "../../utils/fetch-api";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/slices/userSlice";
import {ErrorBoundary} from "react-error-boundary";
import ErrorBoundaryFallback from "../ErrorBoundaryFallback/ErrorBoundaryFallback.tsx";
import { useLocation } from "react-router-dom";
import BottomBar from "../BottomBar/BottomBar.tsx";

export default function AuthenticatedLayout({ children }) {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const location = useLocation();

  useEffect(() => {
    fetchAPI("/users/me", {
      populate: ["bands", "currentBand", "church"],
    })
    .then((data) => {
      dispatch(setUser(data));
    });
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ErrorBoundary FallbackComponent={ErrorBoundaryFallback} resetKeys={[location.pathname]}>
        {children}
      </ErrorBoundary>
      <BottomBar />
    </>
  );
}
