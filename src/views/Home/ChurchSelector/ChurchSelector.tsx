import { CheckCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import React from "react";

export default function ChurchSelector({ church }) {
  return (
    <div className="mb-6 flex items-center gap-3 justify-between">
      <h2 className="text-xl font-semibold">Церква:</h2>
      {church ? (
        <div className="btn btn-sm"><CheckCircleIcon className="w-5 h-5" />{church?.name}</div>
      ) : (
        <div className="flex justify-center">
          <button className="btn btn-sm btn-outline btn-base-200">
            <PlusCircleIcon className="w-5 h-5" />
            Приєднатись до церкви
          </button>
        </div>
      )}
    </div>
  );
}
