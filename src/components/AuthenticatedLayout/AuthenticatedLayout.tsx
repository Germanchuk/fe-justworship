import React from "react";
import QuickNavbar from "../Header/Header";

export default function AuthenticatedLayout({ children }) {
  return (
    <>
      <QuickNavbar />
      {children}
    </>
  );
}
