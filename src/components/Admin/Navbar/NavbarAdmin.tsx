import Image from "next/image";
import MenuItem from "./MenuItem";
import {
  BsCalendarEventFill,
  BsCardImage,
  BsHouseFill,
  BsPersonFill,
} from "react-icons/bs";

function NavbarAdmin({
  children,
  id,
  ...props
}: {
  id: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="drawer lg:drawer-open">
      <input id={id} type="checkbox" className="drawer-toggle" />
      <div className="drawer-content max-h-screen overflow-y-scroll">
        {children}
      </div>
      <div className="drawer-side z-10">
        <label htmlFor={id} className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 lg:w-56 h-full bg-[#730C2A] text-white">
          <div className="w-full h-20 mb-2 bg-[#B0123E] rounded-md py-2">
            <Image
              src={"/logo-horizontal-blanco.png"}
              alt=""
              height={500}
              width={500}
              className="h-full object-contain grayscale "
            />
          </div>
          <MenuItem href="/panel-admin/" title="Home" icon={<BsHouseFill />} />
          <MenuItem
            href="/panel-admin/events"
            title="Eventos"
            icon={<BsCalendarEventFill />}
          />
          <MenuItem
            href="/panel-admin/images"
            title="Imagenes"
            icon={<BsCardImage />}
          />
          <div className="divider before:bg-[#56051c] after:bg-[#56051c] my-0"></div>
          <MenuItem
            href="/panel-admin/users"
            title="Usuarios"
            icon={<BsPersonFill />}
          />
        </ul>
      </div>
    </div>
  );
}

export default NavbarAdmin;
