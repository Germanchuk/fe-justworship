import { useState, useEffect } from "react";

export const useAuth = () => {
  const token = localStorage.getItem("authToken");
  if (token) {
    return true;
  } else {
    return false;
  }
};
