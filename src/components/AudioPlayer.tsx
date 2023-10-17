import { useRef, useEffect, useCallback } from "react";
import { useGlobalAudioPlayer } from "react-use-audio-player";
import AudioSeekBar from "./AudioSeekBar";
import AudioTime from "./AudioTime";
import AudioPlaybackPanel from "./AudioPlaybackPanel";
import AudioVolume from "./AudioVolume";
import AudioVisualizer from "./AudioVisualizer";
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
  const { isReady, load, togglePlayPause, stop } = useGlobalAudioPlayer();

  const loadAudio = useCallback(
    (autoplay: boolean = false) => {
      if (song.audio) {
        load(song.audio, {
          autoplay: autoplay,
          html5: true,
          format: "mp3",
          onend: onNext,
        });
      }
    },
    [load, song.audio, onNext],
  );

  function handlePlayPause() {
    if (isReady) {
      togglePlayPause();
    } else {
      loadAudio(true);
    }
  }

  useEffect(() => {
    return () => stop();
  }, [stop]);

  useEffect(() => {
    if (!isInitialRender.current) {
      loadAudio(true);
    } else {
      isInitialRender.current = false;
      loadAudio();
    }
  }, [loadAudio]);

  const peaks = JSON.parse(song?.waveform || "{peaks:[]}").peaks;

  return (
    <div
      className={`relative flex w-full flex-col items-center justify-center gap-y-4 overflow-hidden rounded-lg p-4 text-base md:text-xl ${
        theme === "white" ? "bg-white" : "bg-black"
      } ${className}`}
    >
      <div
        className={`absolute left-0 top-0 flex h-full w-full items-end justify-center `}
      >
        <AudioVisualizer peaks={peaks} className="h-1/2 w-2/3" />
      </div>

      <div className="relative flex w-full items-center justify-center gap-x-4">
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
