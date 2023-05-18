import Image from "next/image";
import { BsWhatsapp } from "react-icons/bs";
import ContactCard from "./ContactCard";
import Button from "./Button";
import { useState, useEffect } from "react";
import Link from "next/link";

function Navbar() {
  const logoWidth: number = 70;

  const [scrollTop, setScrollTop] = useState(0);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    // first prevent the default behavior
    e.preventDefault();
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
    <nav className="w-full fixed z-20 top-0 left-0 bg-black/50 backdrop-blur-sm text-white py-2">
      <div className="max-w-container flex justify-between items-center m-auto">
        <div className="bg-white w-60 h-[70px] absolute -left-10 -z-10 rounded-full"></div>
        <Link
          href={"/"}
          className="flex items-center gap-2 text-black text-xs font-sans font-bold text-left"
        >
          <Image
            src={"/logo.png"}
            alt="logo Casa de adoración NJ"
            width={logoWidth}
            height={logoWidth}
          />
          Casa de <br /> Adoración <br /> NJ
        </Link>
        <div className={`flex flex-col gap-1 group ${scrollTop > 0 && "isOneLine"}`}>
          <div
            className="overflow-hidden transition-all duration-75 ease-in-out flex justify-between group-[.isOneLine]:invisible group-[.isOneLine]:-mt-16"
          >
            <ContactCard icon={<BsWhatsapp />} contactInfo={"9999999999"} />
            <Button text={"Contactar"} />
          </div>
          <ul className="flex gap-2 pt-0 group-[.isOneLine]:pt-8">
            <li>
              <Link href={"/"}>¿Quienes somos?</Link>
            </li>
            <li>
              <Link href={"/#events"} scroll={false} onClick={handleScroll}>
                Eventos
              </Link>
            </li>
            <li>
              <Link href={"/#galery"} scroll={false} onClick={handleScroll}>
                Galería
              </Link>
            </li>
            {/* <li>
              <Link href={"/#transmitions"} scroll={false} onClick={handleScroll}>
                Transmisiones
              </Link>
            </li> */}
            <li>
              <Link href={"/#contact"} scroll={false} onClick={handleScroll}>
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
