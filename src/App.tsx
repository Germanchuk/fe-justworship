import "./App.css";
import { useRoutes } from "react-router-dom";
import Lists from "./views/Lists/Lists";
import AddSong from "./views/AddSong/AddSong";
import Home from "./views/Home/Home";
import SongsList from "./views/SongsList/SongsList";
import Login from "./views/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Registration from "./views/Registration/Registration";
import TextToSong from "./views/TextToSong/TextToSong";
import SingleSong from "./views/SingleSong/SingleSong";
import FromScratch from "./views/FromScratch/FromScratch";

function App() {
  const routes = useRoutes([
    {
      path: "/",
      // @ts-ignore-next-line
      element: <ProtectedRoute />, 
      children: [
        {
          path: "/",
          element: <Lists />,
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
          path: "mySongs/add/textToSong",
          element: <TextToSong />,
        },
        {
          path: "mySongs/add/fromScratch",
          element: <FromScratch />,
        },
        {
          path: "mySongs/edit/:id",
          element: <Lists />,
        },
        {
          path: "myLists",
          element: <Lists />,
        }
      ]
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Registration />,
    },
  ]);

  return routes;
}

export default App;
