"use client";

import Image from "next/image";
import { BsList, BsThreeDotsVertical, BsWhatsapp } from "react-icons/bs";
import ContactCard from "../../ContactCard";
import Button from "../Button/Button";
import { useState, useEffect } from "react";
import Link from "next/link";
import useActive from "@/hooks/useActive";

function Navbar() {
  const logoWidth: number = 70;

  const [scrollTop, setScrollTop] = useState(0);
  const { active: showMenu, handleToggle: handleToggleMenu } = useActive();

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    // first prevent the default behavior
    const pathname = window.location.pathname;
    if (pathname === "/") {
      e.preventDefault();
    }
    // get the href and remove everything before the hash (#)
    const href = e.currentTarget.href;
    const targetId = href.replace(/.*\#/, "");
    // get the element by id and use scrollIntoView
    const elem = document.getElementById(targetId);
    elem?.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = (event: any) => {
      setScrollTop(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className="w-full sticky sm:fixed z-20 top-0 left-0 bg-black/50 backdrop-blur-sm text-white px-4 py-1
                  sm:py-2 sm:px-0"
    >
      <div className="max-w-container flex justify-between items-center m-auto md:px-3 lg:px-0">
        <div
          className="bg-white w-full h-full absolute left-0 -z-10 
                  sm:rounded-e-full sm:w-72 sm:h-[85px]"
        ></div>
        <Link
          href={"/"}
          className="text-black font-sans font-bold text-left max-h-[85px] w-24 
                    sm:flex sm:items-center sm:gap-2 sm:h-auto sm:w-auto"
        >
          <Image
            src={"/logo.png"}
            alt="logo Casa de adoración NJ"
            width={logoWidth}
            height={logoWidth}
            className="w-full 
                      sm:h-[90px] sm:w-[90px] object-cover"
          />
          <p
            className="hidden 
                        sm:block"
          >
            Casa de <br /> Adoración <br /> NJ
          </p>
        </Link>
        <div
          className={`text-black flex flex-col gap-1 group ${
            scrollTop > 0 && "isOneLine"
          }
          sm:text-white`}
        >
          <button
            type="button"
            className="border border-gray-300 rounded p-4 text-3xl
                        sm:hidden"
            onClick={handleToggleMenu}
          >
            <BsList />
          </button>
          <div
            className="hidden overflow-hidden transition-all duration-75 ease-in-out 
                        sm:flex sm:justify-between 
                        sm:group-[.isOneLine]:invisible sm:group-[.isOneLine]:-mt-24
                        md:text-lg"
          >
            <ContactCard icon={<BsWhatsapp />} contactInfo={"9999999999"} />
            <Button text={"Contactar"} />
          </div>
          <ul
            className={`
          transition-all duration-200 ease-out 
          w-full bg-gray-200 text-center md:text-lg
          absolute -z-40 left-0 ${showMenu ? "top-full" : "-top-[110%]"} 
          flex flex-col
          sm:relative sm:bg-transparent sm:flex-row sm:gap-3 sm:z-0
          sm:pt-1 sm:group-[.isOneLine]:pt-10`}
          >
            <li className="w-full h-full py-3 transition-all hover:bg-slate-300 sm:py-0 sm:w-auto sm:hover:bg-transparent sm:hover:text-red-500">
              <Link className="block w-full h-full" href={"/about-us"}>
                ¿Quienes somos?
              </Link>
            </li>
            <li className="w-full h-full py-3 transition-all hover:bg-slate-300 sm:py-0 sm:w-auto sm:hover:bg-transparent sm:hover:text-red-500">
              <Link
                className="block w-full h-full"
                href={"/#events"}
                scroll={false}
                onClick={handleScroll}
              >
                Eventos
              </Link>
            </li>
            <li className="w-full h-full py-3 transition-all hover:bg-slate-300 sm:py-0 sm:w-auto sm:hover:bg-transparent sm:hover:text-red-500">
              <Link
                className="block w-full h-full"
                href={"/#galery"}
                scroll={false}
                onClick={handleScroll}
              >
                Galería
              </Link>
            </li>
            <li className="w-full h-full py-3 transition-all hover:bg-slate-300 sm:py-0 sm:w-auto sm:hover:bg-transparent sm:hover:text-red-500">
              <Link
                className="block w-full h-full"
                href={"/#contact"}
                scroll={false}
                onClick={handleScroll}
              >
                Contacto
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
