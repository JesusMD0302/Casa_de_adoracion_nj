import Image from "next/image";
import {
  BsCalendarEventFill,
  BsCardImage,
  BsHouseFill,
  BsPersonFill,
} from "react-icons/bs";
import { IoNewspaperOutline } from "react-icons/io5";
import MenuItem from "./MenuItem";

function Drawer({
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
      <div className="drawer-content max-h-screen overflow-y-auto lg:z-40">
        {children}
      </div>
      <div className="drawer-side z-10">
        <label htmlFor={id} className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 h-full bg-[#730C2A] text-white">
          <div className="w-full h-20 lg:h-24 mb-2 bg-[#B0123E] rounded-md py-2">
            <Image
              src={"/logo-horizontal-blanco.png"}
              alt=""
              height={500}
              width={500}
              className="h-full object-contain grayscale"
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
          <MenuItem
            href="/panel-admin/announcements"
            title="Avisos"
            icon={<IoNewspaperOutline />}
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

export default Drawer;
