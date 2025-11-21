import MagicInput from '../../../MagicInput/MagicInput.tsx';
import { useBpm } from '../../../../hooks/song/selectors.ts';
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
