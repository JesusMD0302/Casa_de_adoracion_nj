import "moment/locale/es";
import moment from "moment";
import Image from "next/image";
import {
  BsPencilSquare,
  BsThreeDotsVertical,
  BsTrash3Fill,
} from "react-icons/bs";
moment.locale("es");

export function AdminEventCard({
  title = "Titulo",
  date = null,
  description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id adipisci voluptatem debitis aliquam repudiandae, ipsum deserunt explicaboquis quae dolore odio et error.",
  ...props
}: {
  title?: string;
  date?: string | null;
  description?: string;
}) {
  const today = date == null ? moment() : moment(date);
  const formatedDate = today.format("DD/MMMM/YYYY - h:mm a").toUpperCase();

  return (
    <div className="card compact bg-neutral text-base-100 w-full">
      <div className="card-body">
        {/* header */}
        <div className="card-title justify-between">
          <div className="btn md:btn-sm btn-circle">
            <Image
              src={"/logo-condensed.png"}
              alt=""
              width={300}
              height={300}
              className="w-full h-full"
            />
          </div>
          <h2 className="text-center">{title}</h2>
          <details className="dropdown dropdown-end">
            <summary className="btn md:btn-sm text-xl btn-circle btn-ghost border">
              <BsThreeDotsVertical />
            </summary>
            <ul className="p-2 shadow menu dropdown-content bg-white text-gray-600 rounded-box">
              <li>
                <button className="flex gap-2 items-center">
                  <BsPencilSquare />
                  Editar
                </button>
              </li>
              <li>
                <button className="flex gap-2 items-center">
                  <BsTrash3Fill />
                  Eliminar
                </button>
              </li>
            </ul>
          </details>
        </div>
        {/* content */}
        <div>
          <p className="mt-2 text-lg md:text-xs font-bold">{formatedDate}</p>
          <p className="mt-2 overflow-hidden line-clamp-6 md:line-clamp-4 text-ellipsis text-base md:text-xs">
            {description}
          </p>
        </div>
        <div className="mt-2">
          <p className="text-sm md:text-xs text-gray-400">Modificado hace 5s</p>
        </div>
      </div>
    </div>
  );
}
