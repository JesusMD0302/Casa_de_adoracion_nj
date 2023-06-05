import { BsPersonCircle } from "react-icons/bs";
import { CgMenuLeft } from "react-icons/cg";

function AdminHeader({
  drawerID,
  className,
  ...props
}: {
  drawerID: string;
  className?: string;
}) {
  return (
    <header className={`px-4 py-3 shadow-md sticky top-0 w-full ${className}`}>
      <ul className="grid grid-cols-[1fr_6fr_1fr] place-items-center">
        <li>
          <label
            htmlFor={drawerID}
            className="btn bg-transparent btn-circle lg:hidden text-xl text-white hover:bg-[#730C2A]"
          >
            <CgMenuLeft />
          </label>
        </li>
        <li className="text-center text-xl font-semibold">Panel</li>
        <li className="w-full text-3xl">
          <BsPersonCircle className="w-full" />
        </li>
      </ul>
    </header>
  );
}

export default AdminHeader;
