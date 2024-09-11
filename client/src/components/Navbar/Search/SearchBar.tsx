import { Search01Icon } from "hugeicons-react";

const SearchBar = () => {
  return (
    <div className="relative flex p-2 gap-2">
      <input
        className="w-full border border-solid border-borderColor p-2 shadow-sm rounded-md outline-primary"
        placeholder="Search"
      />
      <Search01Icon className="absolute top-1/2 -translate-y-1/2 right-4" />
    </div>
  );
};

export default SearchBar;
