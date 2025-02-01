import React from "react";

const ErrorBoundaryFallback = ({error}) => {
  return <div className="rounded p-3 ring-error ring">Помилка: {error.message}</div>;
}

export default ErrorBoundaryFallback;