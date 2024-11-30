export enum Routes {
  Root = "/",
  Login = "/login",
  Register = "/register",
  Preferences = "/preferences",
  //
  PublicSongs = "/publicSongs",
  SinglePublicSong = "/publicSongs/:songId",
  EditPublicSong = "/publicSongs/edit/:songId",
  //
  ChurchSongs = "/churchSongs",
  SingleChurchSong = "/churchSongs/:songId",
  EditChurchSong = "/churchSongs/edit/:songId",
  //
  BandSongs = "/bandSongs",
  SingleBandSong = "/bandSongs/:songId",
  EditBandSong = "/bandSongs/edit/:songId",
  //
  CreateSong = "/songs/create",
  AddSongTextToSong = "/songs/create/textToSong",
  AddSongFromScratch = "/songs/create/fromScratch",
  //
  ChurchShedule = "/churchShedule",
  BandShedule = "/bandShedule",
  CreateBandShedule = "/bandShedule/create",
  //
  JoinChurch = "/churches",
  CreateChurch = "/churches/add",
  SingleChurch = "/churches/:churchId",
  //
  JoinBand = "/bands",
  CreateBand = "/bands/add",
  SingleBand = "/bands/:bandId",
  //
}
