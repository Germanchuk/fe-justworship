import React from "react";

export default function Card({ children }) {
  return (
    <div className="card bg-base-200 shadow-xl w-full">
      <div className="card-body">{children}</div>
    </div>
  );
}
