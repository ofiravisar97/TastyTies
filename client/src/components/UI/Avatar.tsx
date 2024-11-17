import React from "react";
import Image from "next/image";
import Placeholder from "../../../public/user.png";

type Props = {
  src?: null | string;
  size: number;
};

const Avatar = ({ src, size }: Props) => {
  return (
    <Image
      loading="lazy"
      width={size}
      height={size}
      alt="Profile Image"
      src={src || Placeholder}
    />
  );
};

export default Avatar;
