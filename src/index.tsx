import ReactDOM from "react-dom/client";

import "./index.css";
import "./views/TextToSong/HighlightedOutput/Block/block.css";
import "./components/Song/MagicInput/MagicInput.css";

import "react-datepicker/dist/react-datepicker.css";

import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import NotificationsCenter from "./components/NotificationsCenter/NotificationsCenter";
import NavigationProvider from "./components/Navigation/NavigationProvider";
import { fetchAPI } from "./utils/fetch-api";

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
