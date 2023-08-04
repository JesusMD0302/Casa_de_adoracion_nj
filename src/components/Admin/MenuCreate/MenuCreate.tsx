import {
  BsCalendarEventFill,
  BsCardImage,
  BsFillCaretDownFill,
  BsPersonFill,
  BsPlus,
} from "react-icons/bs";
import { IoNewspaperOutline } from "react-icons/io5";
import { UploadImageModal } from "../UploadImageModal/UploadImageModal";
import { NewEventModal } from "../Event/NewEventModal";
import { NewUserModal } from "../NewUserModal/NewUserModal";
import { NewAnnouncementModal } from "../NewAnnouncementModal/NewAnnouncementModal";

function MenuCreate() {
  return (
    <>
      <div className="dropdown dropdown-end">
        <label
          tabIndex={0}
          className="btn rounded-sm btn-outline btn-sm md:btn-xs
         active:bg-logo-800 md:active:bg-none 
         md:hover:bg-logo-800 border-none text-xs
          border-white grid place-items-center"
        >
          <p className="flex flex-row items-center text-white">
            <BsPlus className="text-2xl md:text-xl stroke-1 stroke-white" />
            <BsFillCaretDownFill className="text-[0.5rem] text-gray-300" />
          </p>
        </label>
        <ul
          tabIndex={0}
          className="p-2 mt-1 shadow menu dropdown-content bg-gray-600 rounded-md min-w-[14rem] [&_li>*]:rounded-md"
        >
          <li>
            <label htmlFor="event_modal">
              <BsCalendarEventFill /> Crear un nuevo evento
            </label>
          </li>
          <li>
            <label htmlFor="image_modal">
              <BsCardImage /> Subir imagen a gallería
            </label>
          </li>
          <li>
            <label htmlFor="user_modal">
              <BsPersonFill />
              Crear nuevo usuario
            </label>
          </li>
          <li>
            <label htmlFor="announcement_modal">
              <IoNewspaperOutline />
              Crear nuevo aviso
            </label>
          </li>
        </ul>
      </div>
      <NewEventModal modalId="event_modal" />
      <UploadImageModal modalId="image_modal" />
      <NewUserModal modalId="user_modal" />
      <NewAnnouncementModal modalId="announcement_modal" />
    </>
  );
}

export default MenuCreate;
