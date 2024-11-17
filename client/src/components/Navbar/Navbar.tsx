"use client";

import Logo from "@/components/UI/Logo";
import Input from "@/components/UI/Input";
import { Bookmark, Search, PlusSquare, Home, Heart } from "lucide-react";
import NavMenu from "@/components/UI/NavMenu/NavMenu";
import NavLink from "@/components/UI/NavMenu/NavLink";
import useWindowSize from "@/hooks/useWindowSize";
import Avatar from "../UI/Avatar";

const MEDIUM_SIZE_ICON: number = 24;

const Navbar = () => {
  const { windowSize } = useWindowSize();

  return (
    <header className="bg-white flex items-center shadow-md justify-around border-b-[1px] border-borderColor py-2">
      {windowSize.width > 1000 && <Logo size="xxl" className="my-2" />}
      <span>
        <Input placeholder="Search" icon={<Search size={MEDIUM_SIZE_ICON} />} />
      </span>
      <NavMenu>
        <NavLink icon={<Home size={MEDIUM_SIZE_ICON} />} to="/" />
        <NavLink icon={<PlusSquare size={MEDIUM_SIZE_ICON} />} to="/add" />
        <NavLink icon={<Bookmark size={MEDIUM_SIZE_ICON} />} to="/bookmarks" />
        <NavLink icon={<Heart size={MEDIUM_SIZE_ICON} />} to="/notifications" />
        <Avatar size={40} />
      </NavMenu>
    </header>
  );
};

export default Navbar;
