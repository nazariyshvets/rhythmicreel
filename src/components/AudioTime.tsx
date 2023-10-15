import { useGlobalAudioPlayer } from "react-use-audio-player";
import useAudioTime from "../hooks/useAudioTime";
import numberToMinutesString from "../utils/numberToMinutesString";

interface AudioTimeProps {
  className?: string;
}

function AudioTime({ className }: AudioTimeProps) {
  const { duration } = useGlobalAudioPlayer();
  const pos = useAudioTime();
  const posStr = numberToMinutesString(pos);
  const durationStr = numberToMinutesString(duration);

  return (
    <div className={`whitespace-nowrap text-base  ${className}`}>
      {`${posStr} / ${durationStr}`}
    </div>
  );
}

export default AudioTime;
