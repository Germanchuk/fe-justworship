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
import Preferences from "./views/Preferences/Preferences";
import JoinChurch from "./views/JoinChurch/JoinChurch";
import { Routes } from "./constants/routes";
import CreateChurch from "./views/CreateChurch/CreateChurch";
import SingleChurch from "./views/SingleChurch/SingleChurch";
import JoinBand from "./views/JoinBand/JoinBand";
import SingleBand from "./views/SingleBand/SingleBand";
import CreateBand from "./views/CreateBand/CreateBand";
import ChurchSongs from "./views/ChurchSongs/ChurchSongs";
import ChurchShedule from "./views/ChurchShedule/ChurchShedule";
import BandSongs from "./views/BandSongs/BandSongs";
import BandShedule from "./views/BandShedule/BandShedule";
import CreateShedule from "./views/CreateShedule/CreateShedule";

function App() {
  const routes = useRoutes([
    {
      path: "/",
      // @ts-ignore-next-line
      element: <ProtectedRoute />,
      children: [
        {
          path: Routes.Root,
          element: <Home />,
        },
        {
          path: Routes.PublicSongs,
          element: <SongsList />,
        },
        {
          path: Routes.SongById,
          element: <SingleSong />,
        },
        {
          path: Routes.AddSong,
          element: <AddSong />,
        },
        {
          path: Routes.AddSongTextToSong,
          element: <TextToSong />,
        },
        {
          path: Routes.AddSongFromScratch,
          element: <FromScratch />,
        },
        {
          path: Routes.Preferences,
          element: <Preferences />,
        },
        {
          path: Routes.JoinChurch,
          element: <JoinChurch />,
        },
        {
          path: Routes.CreateChurch,
          element: <CreateChurch />,
        },
        {
          path: Routes.SingleChurch,
          element: <SingleChurch />,
        },
        {
          path: Routes.JoinBand,
          element: <JoinBand />,
        },
        {
          path: Routes.SingleBand,
          element: <SingleBand />,
        },
        {
          path: Routes.CreateBand,
          element: <CreateBand />,
        },
        {
          path: Routes.ChurchSongs,
          element: <ChurchSongs />,
        },
        {
          path: Routes.ChurchShedule,
          element: <ChurchShedule />,
        },
        {
          path: Routes.BandSongs,
          element: <BandSongs />,
        },
        {
          path: Routes.BandShedule,
          element: <BandShedule />,
        },
        {
          path: Routes.CreateBandShedule,
          element: <CreateShedule />
        }
      ],
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
