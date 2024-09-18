import Menu from "./Menu/Menu";
import SearchBar from "./Search/SearchBar";

const Navbar = () => {
  return (
    <div className="sticky w-screen h-[4rem] px-2 shadow-md flex items-center justify-around z-10">
      <h1 className="hidden font-semibold text-3xl text-primary lg:block">
        TastyTies
      </h1>
      <SearchBar />
      <Menu />
    </div>
  );
};

export default Navbar;
