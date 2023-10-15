import { useState, useEffect, FormEvent } from "react";
import Loading from "react-loading";
import { useAlert } from "react-alert";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import SongRow from "./SongRow";
import AudioPlayer from "./AudioPlayer";
import SearchForm from "./SearchForm";
import { getSongs } from "../apis/jamendoApi";
import Song from "../interfaces/Song";

const PAGE_LIMIT = 5;

function Search() {
  const [userSongs, setUserSongs] = useState<Song[]>(
    JSON.parse(localStorage.getItem("songs") || "[]"),
  );
  const [songs, setSongs] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("");
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [page, setPage] = useState(1);
  const alert = useAlert();

  function handlePrevPage() {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  }

  function handleNextPage() {
    const nextPage = page + 1;
    setPage(nextPage);

    if (nextPage > songs.length / PAGE_LIMIT) {
      setIsLoading(true);
      getSongs(`${query} ${genre}`, songs.length)
        .then((data) => setSongs((prevSongs) => [...prevSongs, ...data]))
        .catch(() => setSongs([]))
        .finally(() => setIsLoading(false));
    }
  }

  function getDisplaySongs() {
    return songs.slice((page - 1) * PAGE_LIMIT, page * PAGE_LIMIT);
  }

  function getPrevSongIndex() {
    const displaySongsLength = getDisplaySongs().length;
    return (
      (currentSongIndex - 1 + displaySongsLength) % displaySongsLength || 0
    );
  }

  function getNextSongIndex() {
    const displaySongsLength = getDisplaySongs().length;
    return (currentSongIndex + 1) % displaySongsLength || 0;
  }

  function handlePrevSong() {
    setCurrentSongIndex(getPrevSongIndex());
  }

  function handleNextSong() {
    setCurrentSongIndex(getNextSongIndex());
  }

  function addToLibrary(song: Song, isInLibrary: boolean) {
    if (isInLibrary) {
      alert.info("The song is already in the library.");
    } else {
      const updatedSong = {
        ...song,
        image: song.image.replace(/width=\d+/g, "width=400"),
      };
      const updatedUserSongs = [...userSongs, updatedSong];
      localStorage.setItem("songs", JSON.stringify(updatedUserSongs));
      setUserSongs(updatedUserSongs);
      alert.success("The song has been successfully added to the library.");
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPage(1);
    setIsLoading(true);
    getSongs(`${query} ${genre}`)
      .then((data) => setSongs(data))
      .catch(() => setSongs([]))
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    setIsLoading(true);
    getSongs()
      .then((data) => setSongs(data))
      .catch(() => setSongs([]))
      .finally(() => setIsLoading(false));
  }, []);

  const displaySongs = getDisplaySongs();
  const songRows = displaySongs.map((song, i) => {
    const isInLibrary = userSongs.some((uSong) => uSong.id === song.id);
    const isSelected = song.id === displaySongs[currentSongIndex].id;

    return (
      <SongRow
        key={song.id}
        song={song}
        isInLibrary={isInLibrary}
        isSelected={isSelected}
        onPlay={() => setCurrentSongIndex(i)}
        onAddToLibrary={() => addToLibrary(song, isInLibrary)}
      />
    );
  });
  const currentSong = displaySongs[currentSongIndex];

  return (
    <div className="flex w-full flex-col gap-y-6 rounded-2xl bg-white px-4 py-8 sm:p-8 md:w-1/2">
      <SearchForm
        query={query}
        setQuery={setQuery}
        setGenre={setGenre}
        onSubmit={handleSubmit}
      />

      {isLoading ? (
        <div className="flex items-center justify-center">
          <Loading type="spinningBubbles" color="#0b0c10" />
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-y-3" translate="no">
            {songRows}
          </div>

          {currentSong && (
            <AudioPlayer
              song={currentSong}
              onPrev={handlePrevSong}
              onNext={handleNextSong}
              theme="dark"
            />
          )}

          <div className="flex select-none items-center justify-center gap-x-2">
            <button
              className="flex items-center justify-center rounded-full bg-black p-2 text-xl text-white"
              onClick={() => {
                handlePrevPage();
                setCurrentSongIndex(0);
              }}
            >
              <FaChevronLeft />
            </button>
            <div className="text-3xl font-medium text-black">{page}</div>
            <button
              className="flex items-center justify-center rounded-full bg-black p-2 text-xl text-white"
              onClick={() => {
                handleNextPage();
                setCurrentSongIndex(0);
              }}
            >
              <FaChevronRight />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Search;
