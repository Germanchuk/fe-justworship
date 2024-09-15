import "./App.css";
import { useRoutes } from "react-router-dom";
import Lists from "./views/Lists/Lists";
import AddSong from "./views/AddSong/AddSong";
import Home from "./views/Home/Home";
import SongsList from "./views/SongsList/SongsList";
import SingleSong from "./views/SingleSong/SingleSong";

function App() {
  const routes = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "mySongs",
      element: <SongsList />,
    },
    {
      path: "mySongs/:songId",
      element: <SingleSong />,
    },
    {
      path: "mySongs/add",
      element: <AddSong />,
    },
    {
      path: "mySongs/edit/:id",
      element: <Lists />,
    },
    {
      path: "myLists",
      element: <Lists />,
    }
  ]);

  return routes;
}

export default App;
