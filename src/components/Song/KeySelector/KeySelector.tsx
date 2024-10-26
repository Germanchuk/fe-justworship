import React from "react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

const keys = [
  {
    title: "A",
    value: "A",
  },
  {
    title: "A#",
    value: "Asharp",
  },
  {
    title: "B",
    value: "B",
  },
  {
    title: "C",
    value: "C",
  },
  {
    title: "C#",
    value: "Csharp",
  },
  {
    title: "D",
    value: "D",
  },
  {
    title: "D#",
    value: "Dsharp",
  },
  {
    title: "E",
    value: "E",
  },
  {
    title: "F",
    value: "F",
  },
  {
    title: "F#",
    value: "Fsharp",
  },
  {
    title: "G",
    value: "G",
  },
  {
    title: "G#",
    value: "Gsharp",
  },
];

const transpositions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

function deriveKeyFromTransposition(key, transposition) {
  const index = keys.findIndex((k) => k.value === key);
  return (
    keys[index + transposition]?.value ?? {
      title: "C",
      value: "C",
    }
  );
}

function deriveTranspositionFromKey(key, derivedKey) {
  const index = keys.findIndex((k) => k.value === key);
  return index - keys.findIndex((k) => k.value === derivedKey);
}

export default function KeySelector({
  basicKey,
  transposition,
  setBasicKey,
  setTransposition,
}) {
  const [derivedKey, setDerivedKey] = React.useState(
    deriveKeyFromTransposition(basicKey, transposition)
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
    setDerivedKey(deriveKeyFromTransposition(basicKey, transposition));
  };
  return (
    <div className="flex gap-2 items-center">
      <div className="text font-semibold">Тональність:</div>
      <KeyPicker
        value={basicKey}
        setValue={handleBasicKey}
        tooltipMessage="Це реальна тональність пісні."
      />
      {/* =
      <KeyPicker
        value={derivedKey}
        setValue={handleDerivedKey}
        tooltipMessage="Це тональність в якій показуються акорди. Вона інша тому, що враховує транспозицію (каподастр). Зазвичай це робиться, щоб зручніше було грати."
      />
      +
      <TranspositionPicker
        value={transposition}
        setValue={handleTransposition}
      /> */}
    </div>
  );
}

function KeyPicker({ value, setValue, tooltipMessage }) {
  return (
    <span>
      <select
        className="pl-2.5 border rounded"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      >
        {keys.map((key) => (
          <option value={key.value}>{key.title}</option>
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
      className="pl-2.5 border rounded"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    >
      {transpositions.map((trans) => (
        <option value={trans}>{trans}</option>
      ))}
    </select>
  );
}
