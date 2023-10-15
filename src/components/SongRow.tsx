import { FaPlay, FaSquarePlus, FaSquareCheck } from "react-icons/fa6";
import Song from "../interfaces/Song";

interface SongRowProps {
  song: Song;
  isInLibrary: boolean;
  onPlay: () => void;
  onAddToLibrary: () => void;
  isSelected?: boolean;
}

function SongRow({
  song,
  isInLibrary,
  onPlay,
  onAddToLibrary,
  isSelected = false,
}: SongRowProps) {
  return (
    <div className="flex items-center justify-between gap-x-3 overflow-hidden bg-black p-2 sm:px-4">
      <div className="flex h-12 items-center justify-center gap-x-3 overflow-hidden">
        <img
          src={song.image}
          alt={song.name.replace(/&amp;/g, "&")}
          className={`h-9 w-9 object-cover ${isSelected ? "rounded-full" : ""}`}
          draggable={false}
        />
        <div
          className="flex flex-col justify-center overflow-hidden"
          translate="no"
        >
          <div
            className={`overflow-hidden text-ellipsis whitespace-nowrap text-base font-semibold ${
              isSelected ? "text-aqua" : "text-white"
            }`}
          >
            {song.name.replace(/&amp;/g, "&")}
          </div>
          <div
            className={`overflow-hidden text-ellipsis whitespace-nowrap text-sm ${
              isSelected ? "text-aqua" : "text-white"
            }`}
          >
            {song.artist_name.replace(/&amp;/g, "&")}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-y-3 sm:flex-row sm:gap-x-4">
        <button className="text-lg text-white" onClick={onPlay}>
          <FaPlay />
        </button>
        <button className="text-lg text-white" onClick={onAddToLibrary}>
          {isInLibrary ? <FaSquareCheck /> : <FaSquarePlus />}
        </button>
      </div>
    </div>
  );
}

export default SongRow;
