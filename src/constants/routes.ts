export enum Routes {
    Root = "/",
    Login = "/login",
    Register = "/register",
    Preferences = "/preferences",
    //
    PublicSongs = "/publicSongs",
    ChurchSongs = "/churchSongs",
    BandSongs = "/bandSongs",
    SongById = "/songs/:songId",
    AddSong = "/songs/add",
    AddSongTextToSong = "/songs/add/textToSong",
    AddSongFromScratch = "/songs/add/fromScratch",
    MySongEditId = "/songs/edit/:songId",
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