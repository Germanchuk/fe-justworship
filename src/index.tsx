import ReactDOM from "react-dom/client";

import "./index.css";
import "./views/TextToSong/HighlightedOutput/Block/block.css";
import "./components/MagicInput/MagicInput.css";
import "./components/Song/LyricsPlayground/LyricsPlayground.css";

import "react-datepicker/dist/react-datepicker.css";

import App from "./App";
import {BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import NotificationsCenter from "./components/NotificationsCenter/NotificationsCenter";
import NavigationProvider from "./components/Navigation/NavigationProvider";
import {ControlsProvider} from "./context/controls.tsx";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
    <Provider store={store}>
      <BrowserRouter>
        <NavigationProvider>
          <ControlsProvider>
            <div className="container mx-auto p-2">
              <App />
              <NotificationsCenter />
            </div>
          </ControlsProvider>
        </NavigationProvider>
      </BrowserRouter>
    </Provider>
);
