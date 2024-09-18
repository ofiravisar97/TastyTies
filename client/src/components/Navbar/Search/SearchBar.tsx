import { Search01Icon } from "hugeicons-react";
import { useState } from "react";
import SearchBox from "./SearchBox";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchBoxOpen, setSearchBoxOpen] = useState(false);

  return (
    <div className="relative flex gap-2 w-[20rem] mr-2">
      <input
        onBlur={() => setSearchBoxOpen(false)}
        onFocus={() => setSearchBoxOpen(true)}
        className="w-full border border-solid border-borderColor p-2 shadow-sm rounded-md outline-primary"
        placeholder="Search"
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Search01Icon className="absolute top-1/2 -translate-y-1/2 right-4" />
      {isSearchBoxOpen && <SearchBox searchQuery={searchQuery} />}
    </div>
  );
};

export default SearchBar;
