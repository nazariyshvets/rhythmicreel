import { useState } from "react";
import { FaMagnifyingGlass, FaMusic } from "react-icons/fa6";
import Background from "../components/Background";
import Library from "../components/Library";
import Search from "../components/Search";

interface LibrarySearchIconProps {
  type: "library" | "search";
  onClick: () => void;
  className?: string;
}

function LibrarySearchIcon({
  type,
  onClick,
  className = "",
}: LibrarySearchIconProps) {
  return (
    <button
      className={`text-3xl text-white hover:text-aqua ${className}`}
      onClick={onClick}
    >
      {type === "library" ? <FaMusic /> : <FaMagnifyingGlass />}
    </button>
  );
}

function HomePage() {
  const [isLibrary, setIsLibrary] = useState(true);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-y-8 p-8">
      <Background />

      {isLibrary ? (
        <>
          <LibrarySearchIcon
            type="search"
            className="self-end"
            onClick={() => setIsLibrary(false)}
          />
          <Library />
        </>
      ) : (
        <>
          <LibrarySearchIcon
            type="library"
            className="self-end"
            onClick={() => setIsLibrary(true)}
          />
          <Search />
        </>
      )}
    </div>
  );
}

export default HomePage;
