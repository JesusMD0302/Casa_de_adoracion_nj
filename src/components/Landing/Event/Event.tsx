import "moment/locale/es";
import moment from "moment";
import useActive from "@/hooks/useActive";
import { Roboto_Condensed } from "next/font/google";
import { BsChevronDown } from "react-icons/bs";

moment.locale("es");

const robotoCondensed = Roboto_Condensed({
  weight: "700",
  subsets: ["latin"],
});

function Event({
  title = "Titulo",
  startDate = null,
  ubication = "Ubicación",
  description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id adipisci voluptatem debitis aliquam repudiandae, ipsum deserunt explicaboquis quae dolore odio et error.",
  ...pros
}: {
  title?: string;
  startDate?: string | null;
  description?: string;
  ubication?: string;
}) {
  const today = startDate == null ? moment() : moment(startDate);

  const { active: showAllInfo, handleToggle: handleToggleInfo } = useActive();

  return (
    <div className="w-full grid grid-cols-[2fr_8fr_auto]">
      <p
        className={`flex flex-col border-r-2 ${robotoCondensed.className} text-2xl font-bold border-logo justify-center items-center sm:text-xl`}
      >
        {today.day()}
        <span>{today.format("MMM").toUpperCase()}</span>
      </p>
      <div className="px-2 max-h-32 w-full overflow-hidden">
        <p className="text-lg font-bold sm:text-base md:text-xl">{title}</p>
        <p className="text-base font-bold text-gray-500 sm:text-sm md:text-lg">
          {today.format("h:mm a")} - {ubication}
        </p>
        <p
          className={`w-full text-sm overflow-hidden text-ellipsis transition-all duration-200 ease-in-out ${
            !showAllInfo ? "line-clamp-2 max-h-[3em]" : "max-h-[10em]"
          } sm:text-xs md:text-base`}
        >
          {description}
        </p>
      </div>
      {description.length > 36 && (
        <div className="grid place-content-center">
          <button
            className="py-2 px-2 border-2 border-logo text-logo rounded-full"
            onClick={handleToggleInfo}
          >
            <BsChevronDown />
          </button>
        </div>
      )}
    </div>
  );
}

export default Event;
