import React, {useEffect} from 'react'
import {fetchAPI} from "../../utils/fetch-api.tsx";

export default function ChurchSongs() {

  useEffect(() => {
    fetchAPI("/currentChurchSongs");
  });
  return (
    <div>ChurchSongs</div>
  )
}
