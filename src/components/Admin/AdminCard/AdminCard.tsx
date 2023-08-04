import Image from "next/image";
import {
  BsPencilSquare,
  BsThreeDotsVertical,
  BsTrash3Fill,
} from "react-icons/bs";

interface CardProps {
  title: string;
  updatedTime: string;
  modalID: string;
  handleDelete: (id: number) => void;
  elementID: number;
  children: React.ReactNode;
}

export default function AdminCard({
  title,
  updatedTime,
  modalID,
  handleDelete,
  elementID,
  children,
}: CardProps) {
  return (
    <div className="card compact bg-neutral text-base-100 w-full">
      <div className="card-body">
        {/* header */}
        <div className="card-title justify-between">
          <div className="btn btn-circle">
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
            <summary className="btn text-xl md:text-2xl btn-circle btn-ghost border">
              <BsThreeDotsVertical />
            </summary>
            <ul className="p-2 shadow menu dropdown-content z-10 bg-white text-gray-600 rounded-box">
              <li>
                <label htmlFor={modalID} className="flex gap-2 items-center">
                  <BsPencilSquare />
                  Editar
                </label>
              </li>
              <li>
                <button
                  className="flex gap-2 items-center"
                  onClick={() => handleDelete(elementID)}
                >
                  <BsTrash3Fill />
                  Eliminar
                </button>
              </li>
            </ul>
          </details>
        </div>
        {/* content */}
        {children}
        <div className="mt-auto">
          <p className="text-sm md:text-base text-gray-400">
            Modificado hace {updatedTime}
          </p>
        </div>
      </div>
    </div>
  );
}
