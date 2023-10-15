import { useCallback, useRef, MouseEvent } from "react";
import { useGlobalAudioPlayer } from "react-use-audio-player";
import useAudioTime from "../hooks/useAudioTime";

interface AudioSeekBarProps {
  className?: string;
}

function AudioSeekBar({ className = "" }: AudioSeekBarProps) {
  const { duration, seek } = useGlobalAudioPlayer();
  const seekBarElem = useRef<HTMLDivElement>(null);
  const pos = useAudioTime();

  const rewind = useCallback(
    (event: MouseEvent) => {
      const { pageX: eventOffsetX } = event;
      const seekBar = seekBarElem.current;

      if (seekBar) {
        const elementOffsetX = seekBar.offsetLeft;
        const elementWidth = seekBar.clientWidth;
        const percent = (eventOffsetX - elementOffsetX) / elementWidth;
        seek(percent * duration);
      }
    },
    [duration, seek],
  );

  if (duration === Infinity) return null;

  return (
    <div
      className={`h-3 w-full cursor-pointer overflow-hidden bg-black ${className}`}
      ref={seekBarElem}
      onClick={rewind}
    >
      <div
        className="h-full bg-aqua"
        style={{ width: `${(pos / duration) * 100}%` }}
      />
    </div>
  );
}

export default AudioSeekBar;
