import MagicInput from '../MagicInput/MagicInput';
import { useBpm } from '../../../hooks/song';
import { handleBpmChange } from "./actions.ts";

export default function BpmSelector() {
  const bpm = useBpm();
  return (
    <div className="flex gap-2 items-center">
      <div className="text font-semibold">Темп:</div>
      <MagicInput
        className="px-2 text-xl rounded w-20"
        value={String(bpm ?? '')}
        setValue={handleBpmChange}
      />
    </div>
  );
}
