import Select, { SingleValue } from "react-select";
import SelectOption from "../interfaces/SelectOption";

interface GenreSelectProps {
  onChange: (selectedOption: SingleValue<SelectOption>) => void;
}

const options = [
  { value: "", label: "All Genres" },
  { value: "pop", label: "Pop" },
  { value: "rock", label: "Rock" },
  { value: "electronic", label: "Electronic" },
  { value: "hiphop", label: "Hip Hop" },
  { value: "jazz", label: "Jazz" },
  { value: "indie", label: "Indie" },
  { value: "filmscore", label: "Film Score" },
  { value: "classical", label: "Classical" },
  { value: "chillout", label: "Chillout" },
  { value: "ambient", label: "Ambient" },
  { value: "folk", label: "Folk" },
  { value: "metal", label: "Metal" },
  { value: "latin", label: "Latin" },
  { value: "rnb", label: "RnB" },
  { value: "reggae", label: "Reggae" },
  { value: "punk", label: "Punk" },
  { value: "country", label: "Country" },
  { value: "house", label: "House" },
  { value: "blues", label: "Blues" },
];

function GenreSelect({ onChange }: GenreSelectProps) {
  return (
    <Select
      options={options}
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary25: "#c5c6c7",
          primary: "#0b0c10",
        },
      })}
      onChange={onChange}
    />
  );
}

export default GenreSelect;
