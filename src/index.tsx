import ReactDOM from "react-dom/client";

import "./index.css";
import "./views/TextToSong/HighlightedOutput/Block/block.css";
import "./components/Song/MagicInput/MagicInput.css";

import App from "./App";
import { BrowserRouter } from "react-router-dom";
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
