import { useWindowSize } from "@uidotdev/usehooks";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import Placeholder from "./Placeholder";
import Card from "./Card";
import {
  TABLET_WIDTH_THRESHOLD,
  MOBILE_WIDTH_THRESHOLD,
  DEFAULT_SONG,
} from "../constants/constants";
import Song from "../interfaces/Song";

interface CarouselProps {
  songs: Song[];
  currentSongIndex: number;
  onPrev: () => void;
  onNext: () => void;
}

const PLACEHOLDER_STYLES = "shadow-inner-white";
const MAIN_PLACEHOLDER_STYLES = "h-96 shadow-inner-aqua";

function Carousel({ songs, currentSongIndex, onPrev, onNext }: CarouselProps) {
  const { width: windowWidth } = useWindowSize();

  function getPlaceholdersNum() {
    return (windowWidth || 0) > TABLET_WIDTH_THRESHOLD
      ? 5
      : (windowWidth || 0) > MOBILE_WIDTH_THRESHOLD
      ? 3
      : 1;
  }

  function getDefaultSongs(num: number) {
    return Array.from({ length: num }, () => DEFAULT_SONG);
  }

  function getDisplaySongs(placeholdersNum: number) {
    let songsCopy = [...songs];
    const result = [];

    if (songsCopy.length < placeholdersNum) {
      const defaultSongs = getDefaultSongs(placeholdersNum - songsCopy.length);
      songsCopy = songsCopy.concat(defaultSongs);
    }

    for (
      let i = currentSongIndex - Math.floor(placeholdersNum / 2);
      i < currentSongIndex + Math.ceil(placeholdersNum / 2);
      i++
    ) {
      const index = (i + songsCopy.length) % songsCopy.length;
      result.push(songsCopy[index]);
    }

    return result;
  }

  const placeholdersNum = getPlaceholdersNum();
  const displaySongs = getDisplaySongs(placeholdersNum);
  const cards = displaySongs.map(({ image, name, artist_name }, i) => (
    <Placeholder
      key={i}
      className={
        i === Math.floor(placeholdersNum / 2)
          ? MAIN_PLACEHOLDER_STYLES
          : PLACEHOLDER_STYLES
      }
    >
      <Card image={image} name={name} artistName={artist_name} />
    </Placeholder>
  ));

  return (
    <div
      className="relative flex w-full items-center justify-center"
      translate="no"
    >
      <button
        className="absolute left-0 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-midnightblue p-4 text-lg text-white hover:border-aqua hover:text-aqua"
        onClick={onPrev}
      >
        <FaChevronLeft />
      </button>

      <div className="flex w-full items-center justify-center gap-x-2 before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-1/5 before:bg-gradient-to-r before:from-black-700 before:content-[''] after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-1/5 after:bg-gradient-to-l after:from-black-700 after:content-['']">
        {cards}
      </div>

      <button
        className="absolute right-0 top-1/2 z-20 -translate-y-1/2 translate-x-1/2 rounded-full border-2 border-white bg-midnightblue p-4 text-lg text-white hover:border-aqua hover:text-aqua"
        onClick={onNext}
      >
        <FaChevronRight />
      </button>
    </div>
  );
}

export default Carousel;
