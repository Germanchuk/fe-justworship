import "./App.css";
import { Route, Routes as RouterRoutes, useLocation } from "react-router-dom";
import Lists from "./views/Lists/Lists";
import CreateSong from "./views/CreateSong/CreateSong";
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
import { useEffect, useState } from "react";

function App() {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransistionStage] = useState("fadeIn");

  useEffect(() => {
    if (location !== displayLocation) setTransistionStage("fadeOut");
  }, [location, displayLocation]);

  return (
    <div
      className={transitionStage}
      onAnimationEnd={() => {
        if (transitionStage === "fadeOut") {
          setDisplayLocation(location);
          setTransistionStage("fadeIn");
        }
      }}
    >
      <RouterRoutes location={displayLocation}>
        <Route path="/" element={<ProtectedRoute />}>
          <Route path={Routes.Root} element={<BandShedule />} />
          <Route path={Routes.PublicSongs} element={<SongsList />} />
          <Route path={Routes.SinglePublicSong} element={<SingleSong />} />
          <Route path={Routes.CreateSong} element={<CreateSong />} />
          <Route path={Routes.AddSongTextToSong} element={<TextToSong />} />
          <Route path={Routes.AddSongFromScratch} element={<FromScratch />} />
          <Route path={Routes.Preferences} element={<Preferences />} />
          <Route path={Routes.JoinChurch} element={<JoinChurch />} />
          <Route path={Routes.CreateChurch} element={<CreateChurch />} />
          <Route path={Routes.SingleChurch} element={<SingleChurch />} />
          <Route path={Routes.JoinBand} element={<JoinBand />} />
          <Route path={Routes.SingleBand} element={<SingleBand />} />
          <Route path={Routes.CreateBand} element={<CreateBand />} />
          <Route path={Routes.ChurchSongs} element={<ChurchSongs />} />
          <Route path={Routes.ChurchShedule} element={<ChurchShedule />} />
          <Route path={Routes.BandSongs} element={<BandSongs />} />
          <Route path={Routes.BandShedule} element={<BandShedule />} />
          <Route path={Routes.CreateBandShedule} element={<CreateShedule />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
      </RouterRoutes>
    </div>
  );
}

export default App;
