import { useGlobalAudioPlayer } from "react-use-audio-player";
import { FaBackwardStep, FaPlay, FaStop, FaForwardStep } from "react-icons/fa6";

interface AudioPlaybackPanelProps {
  onPrev: () => void;
  onPlayPause: () => void;
  onNext: () => void;
  className?: string;
}

function AudioPlaybackPanel({
  onPrev,
  onNext,
  onPlayPause,
  className = "",
}: AudioPlaybackPanelProps) {
  const { playing } = useGlobalAudioPlayer();

  return (
    <div className="flex items-center justify-center gap-x-1">
      <button className={`rounded-full p-3 ${className}`} onClick={onPrev}>
        <FaBackwardStep />
      </button>
      <button className={`rounded-full p-5 ${className}`} onClick={onPlayPause}>
        {playing ? <FaStop /> : <FaPlay />}
      </button>
      <button className={`rounded-full p-3 ${className}`} onClick={onNext}>
        <FaForwardStep />
      </button>
    </div>
  );
}

export default AudioPlaybackPanel;
