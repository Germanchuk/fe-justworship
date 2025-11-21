import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import {toggleChordsVisibility} from "../../../../redux/slices/songSlice.ts";
import {useDispatch} from "react-redux";
import {useChordsVisibility} from "../../../../hooks/song/selectors.ts";

export const HideChords =  () => {
  const dispatch = useDispatch();
  const chordsHidden = useChordsVisibility();

  return(
    <button
      className="btn btn-sm"
      onClick={() => dispatch(toggleChordsVisibility())}
    >
      {chordsHidden ? <EyeIcon className="w-4"/>
        : <EyeSlashIcon className="w-4"/>}
      {chordsHidden ? "Показати" : "Сховати"} акорди
    </button>
  )
}