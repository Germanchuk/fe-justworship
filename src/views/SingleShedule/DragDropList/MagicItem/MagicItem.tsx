import { PlusSmallIcon, SparklesIcon } from "@heroicons/react/24/outline";

export default function MagicItem() {
  return (
    <li className="flex gap-4 items-center py-1 border-b border-base-300">
      <div className="w-10 h-8" />
      <form className="flex grow gap-2">
        <input
          type="text"
          placeholder="Новий пункт"
          className="outline-0 grow"
        />
        <button className="btn btn-sm btn-square">
          <PlusSmallIcon className="w-5 h-5" />
        </button>
        <button className="btn btn-sm btn-square">
          <SparklesIcon className="w-5 h-5" />
        </button>
      </form>
    </li>
  );
}
