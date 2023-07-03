import useActive from "@/hooks/useActive";
import { Roboto_Condensed } from "next/font/google";
import { BsChevronDown } from "react-icons/bs";

const robotoCondensed = Roboto_Condensed({
  weight: "700",
  subsets: ["latin"],
});

function Event() {
  const { active: showAllInfo, handleToggle: handleToggleInfo } = useActive();

  return (
    <div className="w-full grid grid-cols-[2fr_8fr_auto]">
      <p
        className={`flex flex-col border-r-2 ${robotoCondensed.className} text-2xl font-bold border-logo justify-center items-center sm:text-xl`}
      >
        4<span>Mayo</span>
      </p>
      <div className="px-2 max-h-32 w-full overflow-hidden">
        <p className="text-lg font-bold sm:text-base md:text-xl">Titulo de muestra</p>
        <p className="text-base font-bold text-gray-500 sm:text-sm md:text-lg">
          Horario - Ubicación
        </p>
        <p className={`w-full text-sm overflow-hidden text-ellipsis transition-all duration-200 ease-in-out ${ !showAllInfo ? "line-clamp-2 max-h-[3em]" : "max-h-[10em]"} sm:text-xs md:text-base`}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
          porro accusantium ex? Lorem, ipsum dolor sit amet consectetur
          adipisicing elit. Consequuntur earum laborum similique doloribus
          doloremque expedita?
        </p>
      </div>
      <div className="grid place-content-center">
        <button className="py-2 px-2 border-2 border-logo text-logo rounded-full" onClick={handleToggleInfo}>
          <BsChevronDown />
        </button>
      </div>
    </div>
  );
}

export default Event;
