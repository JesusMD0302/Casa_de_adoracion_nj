import { CgMenuLeft } from "react-icons/cg";
import MenuCreate from "../MenuCreate/MenuCreate";
import { UserMenu } from "../UserMenu/UserMenu";

function AdminHeader({
  drawerID,
  className,
  ...props
}: {
  drawerID: string;
  className?: string;
}) {
  return (
    <header className={`px-4 py-2 shadow-md sticky top-0 w-full ${className}`}>
      <ul className="grid grid-cols-[1fr_6fr_2fr] md:grid-cols-[1fr_6fr_1fr] place-items-center">
        <li>
          <label
            htmlFor={drawerID}
            className="btn bg-transparent btn-circle lg:hidden text-xl text-white hover:bg-[#730C2A]"
          >
            <CgMenuLeft />
          </label>
        </li>
        <li></li>
        <li className="w-full grid grid-cols-2 md:grid-cols-[3fr_1fr] gap-2 md:gap-0 place-items-center">
          <MenuCreate />
          <UserMenu />
        </li>
      </ul>
    </header>
  );
}

export default AdminHeader;