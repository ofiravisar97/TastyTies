import { PropsWithChildren } from "react";

const NavMenu = ({ children }: PropsWithChildren) => {
  return (
    <nav>
      <ul className="flex gap-8 w-full h-full items-center">{children}</ul>
    </nav>
  );
};

export default NavMenu;
