import React from "react";
import {transpose} from "chord-transposer";
import { useEditMode } from '../../../hooks/song';

const transpositions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

export default function CapoSelector({ value, setValue, basicKey }) {
  const editMode = useEditMode();
  return (
    <div className="flex gap-2 items-center">
      <div className="text font-semibold">Каподастр:</div>
      <select
        className="px-4 border rounded block"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      >
        {transpositions.map((trans) => (
          <option key={trans} value={trans}>
            {trans}
          </option>
        ))}
      </select>
      {!!Number(value) && !editMode && <div className="opacity-50">
        тому тональність акордів <span className="font-semibold">{transpose(basicKey.replace("sharp", "#")).down(value).toString()}</span>
      </div>}
    </div>
  );
}