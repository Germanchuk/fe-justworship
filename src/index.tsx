import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import "./views/SingleSong/Block/block.css";
import "./components/MagicInput/MagicInput.css";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import QuickNavbar from "./components/QuickNavbar/QuickNavbar";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <div className="container mx-auto p-4">
        <QuickNavbar />
        <App />
      </div>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
