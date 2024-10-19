import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import "./views/TextToSong/HighlightedOutput/Block/block.css";
import "./components/Song/MagicInput/MagicInput.css";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import QuickNavbar from "./components/Header/Header";
import { Provider } from "react-redux";
import store from "./redux/store";
import NotificationsCenter from "./components/NotificationsCenter/NotificationsCenter";
import NavigationProvider from "./components/Navigation/NavigationProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
    <Provider store={store}>
      <BrowserRouter>
        <NavigationProvider>
          <div className="container mx-auto p-4">
            <App />
            <NotificationsCenter />
          </div>
        </NavigationProvider>
      </BrowserRouter>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
