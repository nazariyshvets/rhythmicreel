import { useState } from "react";
import Carousel from "./Carousel";
import AudioPlayer from "./AudioPlayer";
import Song from "../interfaces/Song";

function Library() {
  const [songs, setSongs] = useState<Song[]>(
    JSON.parse(localStorage.getItem("songs") || "[]"),
  );
  const [currentSongIndex, setCurrentSongIndex] = useState(
    Math.floor(songs.length / 2),
  );

  function getPrevSongIndex() {
    return (currentSongIndex - 1 + songs.length) % songs.length || 0;
  }

  function getNextSongIndex() {
    return (currentSongIndex + 1) % songs.length || 0;
  }

  function handlePrev() {
    setCurrentSongIndex(getPrevSongIndex());
  }

  function handleNext() {
    setCurrentSongIndex(getNextSongIndex());
  }

  const currentSong = songs[currentSongIndex];

  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-4">
      <Carousel
        songs={songs}
        currentSongIndex={currentSongIndex}
        onPrev={handlePrev}
        onNext={handleNext}
      />
      {currentSong && (
        <AudioPlayer
          song={currentSong}
          onPrev={handlePrev}
          onNext={handleNext}
          className="md:w-1/2"
        />
      )}
    </div>
  );
}

export default Library;
