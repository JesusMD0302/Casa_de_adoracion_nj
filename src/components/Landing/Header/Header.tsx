import Image from "next/image";
import React from "react";

export const Header = ({
  className = "",
  imgURL = "",
  altImg = "",
  imgClassName = "",
  children,
  ...props
}: {
  className?: string;
  imgURL: string;
  altImg: string;
  imgClassName?: string;
  children?: React.ReactNode;
}) => {
  return (
    <header
      className={`relative top-0 left-0 w-full h-[550px] text-white ${className}`}
    >
      {children}
      <Image
        src={imgURL}
        alt={altImg}
        fill
        className={`relative object-cover object-top ${imgClassName}`}
      />
    </header>
  );
};


export default Header;
