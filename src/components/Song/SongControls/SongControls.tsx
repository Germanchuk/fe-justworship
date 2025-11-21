import {CopyButton} from "./CopyButton/CopyButton.tsx";
import {SwitchEdit} from "./SwitchEdit/SwitchEdit.tsx";
import {
  CheckCircleIcon,
  ClockIcon,
  ExclamationCircleIcon,
  PauseIcon,
  PlayIcon,
  StopIcon,
} from "@heroicons/react/24/outline";
import {useStatus} from "../../../hooks/song/selectors.ts";
import {MoreOptions} from "./MoreOptions/MoreOptions.tsx";
import React, {useCallback, useEffect, useMemo, useState} from "react";
import ChordsProgressionPlayer from "../services/ChordsProgressionPlayer/ChordsProgressionPlayer.ts";

export const SongControls = ({
  isReadonly,
  songId
}) => {
  const status = useStatus();
  const player = useMemo(() => ChordsProgressionPlayer.getInstance(), []);
  const [playbackState, setPlaybackState] = useState(player.getState());

  useEffect(() => player.onStateChange(setPlaybackState), [player]);

  const handlePrimaryAction = useCallback(() => {
    if (playbackState === "paused") {
      player.resume();
      return;
    }
    player.play().catch((error) => {
      console.error("Failed to start chord progression playback", error);
    });
  }, [player, playbackState]);

  const handlePause = useCallback(() => {
    player.pause();
  }, [player]);

  const handleStop = useCallback(() => {
    player.stop();
  }, [player]);

  const isLoading = playbackState === "loading";
  const isPlaying = playbackState === "playing";
  const isPaused = playbackState === "paused";

  return (
    <div className="w-full flex justify-between">
      <div>
        <div className="h-10 w-10 flex justify-center items-center">
          <Status status={status} />
        </div>
      </div>
      <div className="flex gap-1 items-center">
        <div className="flex gap-1">
          <button
            className="btn btn-circle btn-dash"
            onClick={isPlaying ? handlePause : handlePrimaryAction}
            disabled={isLoading}
            aria-label={isPlaying ? "Pause progression" : isPaused ? "Resume progression" : "Play progression"}
          >
            {isLoading ? (
              <span className="loading loading-spinner" />
            ) : isPlaying ? (
              <PauseIcon className="w-6 h-6" />
            ) : (
              <PlayIcon className="w-6 h-6" />
            )}
          </button>
          {(isPlaying || isPaused) && (
            <button
              className="btn btn-circle btn-dash"
              onClick={handleStop}
              disabled={isLoading}
              aria-label="Stop progression"
            >
              <StopIcon className="w-6 h-6" />
            </button>
          )}
        </div>
        {
          isReadonly
            ? <CopyButton songId={songId} />
            : <SwitchEdit />
        }
        <MoreOptions />
      </div>
    </div>
  )
}

function Status({status}) {
  switch (status) {
    case "error":
      return <ExclamationCircleIcon className="w-8 h-8 text-error-content animate__bounceIn" />
    case "saved":
      return <CheckCircleIcon className="w-8 h-8 text-success-content animate__bounceIn" />
    case "saving":
      return <span className="loading loading-ring animate__bounceIn" />
    case "pending":
      return <ClockIcon className="w-8 h-8 text-neutral animate__bounceIn" />
  }
}
