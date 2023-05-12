import Image from "next/image";
import { BsWhatsapp } from "react-icons/bs";
import ContactCard from "./ContactCard";
import Button from "./Button";
import { useState, useEffect } from "react";

function Navbar() {
  const logoWidth: number = 70;

  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = (event: any) => {
      setScrollTop(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const contactMenuStyle = `transition-all ease-linear duration-500 flex justify-between ${
    scrollTop > 0 ? "hidden" : "block "
  }`;
  return (
    <nav className="w-full fixed z-50 top-0 left-0 bg-black/50 backdrop-blur-sm text-white py-2">
      <div className="max-w-container flex justify-between items-center m-auto">
        <div>
          <div className="bg-white w-60 h-[70px] absolute -left-10 -z-10 -skew-x-[30deg]"></div>
          <button className="flex items-center gap-2 text-black text-xs font-sans font-bold text-left">
            <Image
              src={"/logo.png"}
              alt="logo Casa de adoración NJ"
              width={logoWidth}
              height={logoWidth}
            />
            Casa de <br /> Adoración <br /> NJ
          </button>
        </div>
        <div className="flex flex-col gap-1 transition-all">
          <div className={contactMenuStyle}>
            <ContactCard icon={<BsWhatsapp />} contactInfo={"9999999999"} />
            <Button text={"Contactar"} />
          </div>
          <ul className="flex gap-2">
            <li>¿Quienes somos?</li>
            <li>Eventos</li>
            <li>Galería</li>
            <li>Transmisiones</li>
            <li>Catalogo</li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
