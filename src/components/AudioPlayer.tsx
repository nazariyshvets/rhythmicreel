import { useRef, useEffect } from "react";
import { useGlobalAudioPlayer } from "react-use-audio-player";
import AudioSeekBar from "./AudioSeekBar";
import AudioTime from "./AudioTime";
import AudioPlaybackPanel from "./AudioPlaybackPanel";
import AudioVolume from "./AudioVolume";
import Song from "../interfaces/Song";

interface AudioPlayerProps {
  song: Song;
  onPrev: () => void;
  onNext: () => void;
  theme?: "white" | "dark";
  className?: string;
}

function AudioPlayer({
  song,
  onPrev,
  onNext,
  theme = "white",
  className = "",
}: AudioPlayerProps) {
  const isInitialRender = useRef(true);
  const { isReady, load, togglePlayPause } = useGlobalAudioPlayer();

  function handlePlayPause() {
    if (isReady) {
      togglePlayPause();
    } else {
      load(song.audio, { autoplay: true, html5: true, format: "mp3" });
    }
  }

  useEffect(() => {
    if (!isInitialRender.current) {
      load(song.audio, { autoplay: true, html5: true, format: "mp3" });
    } else {
      isInitialRender.current = false;
    }
  }, [load, song]);

  return (
    <div
      className={`flex w-full flex-col items-center justify-center gap-y-4 rounded-lg p-4 text-base md:text-xl ${
        theme === "white" ? "bg-white" : "bg-black"
      } ${className}`}
    >
      <div className="flex w-full items-center justify-center gap-x-4">
        <AudioSeekBar
          className={`${theme === "white" ? "bg-black" : "bg-white"}`}
        />
        <AudioTime
          className={`${theme === "white" ? "text-black" : "text-white"}`}
        />
      </div>

      <div className="relative flex w-full items-center justify-start sm:justify-center">
        <AudioPlaybackPanel
          onPrev={onPrev}
          onPlayPause={handlePlayPause}
          onNext={onNext}
          className={`${
            theme === "white" ? "bg-black text-white" : "bg-white text-black"
          }`}
        />
        <AudioVolume
          className={`absolute right-0 ${
            theme === "white" ? "bg-black text-white" : "bg-white text-black"
          }`}
        />
      </div>
    </div>
  );
}

export default AudioPlayer;
