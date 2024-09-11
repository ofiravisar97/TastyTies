import Menu from "./Menu/Menu";
import SearchBar from "./Search/SearchBar";

const Navbar = () => {
  return (
    <div className="sticky w-full h-[4rem] p-2 shadow-md flex items-center justify-around">
      <h1 className="font-semibold text-3xl text-primary">TastyTies</h1>
      <SearchBar />
      <Menu />
    </div>
  );
};

export default Navbar;
