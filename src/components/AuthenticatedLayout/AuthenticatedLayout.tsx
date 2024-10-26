import React, { useEffect } from "react";
import QuickNavbar from "../Header/Header";
import { fetchAPI } from "../../utils/fetch-api";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/slices/userSlice";

export default function AuthenticatedLayout({ children }) {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  useEffect(() => {
    fetchAPI("/users/me", {
      populate: ["bands", "currentBand"],
    }).then((data) => {
      dispatch(setUser(data));
    });
  }, []);

  if (!user) {
    return null;
  }
  
  return (
    <>
      <QuickNavbar />
      {children}
    </>
  );
}
