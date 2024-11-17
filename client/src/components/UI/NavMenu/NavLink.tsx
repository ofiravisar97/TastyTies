import Link from "next/link";
import React from "react";

type Props = {
    icon: React.ReactNode;
    to: string
}


const NavLink = ({icon,to} : Props) => {
    return (
        <li>
            <Link href={to}>
                {icon}
            </Link>
        </li>
    );
}

export default NavLink;