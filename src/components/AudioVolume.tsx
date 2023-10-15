import { useGlobalAudioPlayer } from "react-use-audio-player";
import { FaVolumeHigh, FaVolumeXmark } from "react-icons/fa6";

interface AudioVolumeProps {
  className?: string;
}

function AudioVolume({ className = "" }: AudioVolumeProps) {
  const { volume, setVolume } = useGlobalAudioPlayer();
  const isMuted = volume < 0.01;

  return (
    <button
      className={`rounded-full p-3 ${className}`}
      onClick={() => setVolume(isMuted ? 1.0 : 0.0)}
    >
      {isMuted ? <FaVolumeXmark /> : <FaVolumeHigh />}
    </button>
  );
}

export default AudioVolume;
