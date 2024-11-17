import React from "react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import {
  transpose,
  deriveTranspositionFromKey,
  keys,
} from "../../../utils/keyUtils";
import classNames from "classnames";

const transpositions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

export default function KeySelector({
  basicKey,
  transposition,
  setBasicKey,
  setTransposition,
}) {
  const [derivedKey, setDerivedKey] = React.useState(
    transpose(basicKey, transposition)
  );
  const handleBasicKey = (key) => {
    setBasicKey(key);
    setTransposition(0);
    setDerivedKey(key);
  };
  const handleDerivedKey = (key) => {
    setDerivedKey(key);
    setTransposition(deriveTranspositionFromKey(basicKey, key));
  };

  const handleTransposition = (transposition) => {
    setTransposition(transposition);
    setDerivedKey(transpose(basicKey, transposition));
  };
  return (
    <div className="flex gap-2 items-center">
      <div className="text font-semibold">Тональність:</div>
      <KeyPicker
        value={basicKey}
        setValue={handleBasicKey}
        tooltipMessage="Це реальна тональність пісні."
        disabled
      />
      =
      <KeyPicker
        value={derivedKey}
        setValue={handleDerivedKey}
        tooltipMessage="Це тональність в якій показуються акорди. Вона інша тому, що враховує транспозицію (каподастр). Зазвичай це робиться, щоб зручніше було грати."
      />
      +
      <TranspositionPicker
        value={transposition}
        setValue={handleTransposition}
      />
    </div>
  );
}

function KeyPicker({ value, setValue, tooltipMessage, disabled = false }) {
  return (
    <span>
      <select
        className={classNames("pl-2.5 border rounded", {
          "opacity-40": disabled,
        })}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={disabled}
      >
        {keys.map((key) => (
          <option key={key} value={key}>
            {key.replace(/sharp/g, "#")}
          </option>
        ))}
      </select>
      <div className="tooltip align-middle" data-tip={tooltipMessage}>
        <InformationCircleIcon className="w-5 h-5 ml-1" />
        {/* створити допитливий режим - приклад пісні де багато тултіпів з поясненнями */}
      </div>
    </span>
  );
}

function TranspositionPicker({ value, setValue }) {
  return (
    <select
      className="px-4 border rounded"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    >
      {transpositions.map((trans) => (
        <option key={trans} value={trans}>
          {trans}
        </option>
      ))}
    </select>
  );
}
