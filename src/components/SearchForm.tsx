import { FormEvent, Dispatch, SetStateAction } from "react";
import { SingleValue } from "react-select";
import { FaMagnifyingGlass } from "react-icons/fa6";
import GenreSelect from "./GenreSelect";
import SelectOption from "../interfaces/SelectOption";

interface SearchFormProps {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  setGenre: Dispatch<SetStateAction<string>>;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

function SearchForm({ query, setQuery, setGenre, onSubmit }: SearchFormProps) {
  function handleSelectChange(selectedOption: SingleValue<SelectOption>) {
    const value = selectedOption?.value;

    if (value) {
      setGenre(value);
    }
  }

  return (
    <form
      className="flex flex-col gap-y-6 sm:flex-row sm:justify-center sm:gap-x-5"
      onSubmit={onSubmit}
    >
      <div className="relative flex-1">
        <input
          type="text"
          className="w-full border-b-2 border-solid border-b-black bg-transparent py-1 pl-2 pr-9 text-base outline-none placeholder:text-black"
          name="search"
          value={query}
          placeholder="Search..."
          autoComplete="off"
          onChange={(event) => setQuery(event.target.value)}
        />
        <button
          type="submit"
          className="absolute bottom-0 right-3 top-0 text-base"
        >
          <FaMagnifyingGlass />
        </button>
      </div>

      <GenreSelect onChange={handleSelectChange} />
    </form>
  );
}

export default SearchForm;
