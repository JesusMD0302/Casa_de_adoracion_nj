import {
  BsCalendarEventFill,
  BsCardImage,
  BsFillCaretDownFill,
  BsPersonFill,
  BsPlus,
} from "react-icons/bs";
import "moment/locale/es";
import moment from "moment";
import ImageUploadField from "@/components/ImageUploadField/ImageUploadField";
moment.locale("es");

function MenuCreate() {
  return (
    <>
      <details className="dropdown dropdown-end">
        <summary className="btn rounded-sm btn-outline btn-sm md:btn-xs active:bg-logo-800 md:active:bg-none md:hover:bg-logo-800 border-none text-xs border-white grid place-items-center">
          <p className="flex flex-row items-center text-white">
            <BsPlus className="text-2xl md:text-xl stroke-1 stroke-white" />
            <BsFillCaretDownFill className="text-[0.5rem] text-gray-300" />
          </p>
        </summary>
        <ul className="p-2 mt-1 shadow menu dropdown-content bg-gray-600 rounded-md min-w-[14rem] [&_li>*]:rounded-md">
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
        </ul>
      </details>
      <NewEventModal />
      <UploadImageModal />
      <NewUserModal />
    </>
  );
}

export default MenuCreate;

export function AdminModal({
  modalId,
  children,
  ...props
}: {
  modalId: string;
  children?: React.ReactNode;
}) {
  return (
    <>
      <input type="checkbox" id={modalId} className="modal-toggle" />
      <div className="modal text-gray-700">
        <div className="modal-box">{children}</div>
        <label className="modal-backdrop" htmlFor={modalId}>
          Close
        </label>
      </div>
    </>
  );
}

export function NewEventModal() {
  return (
    <>
      {/* New Event Modal */}
      <AdminModal modalId="event_modal">
        <h3 className="text-center text-gray-800 font-bold text-lg">
          Crear un nuevo evento
        </h3>
        <form className="w-2/3 mt-2 mx-auto flex flex-col gap-2">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-700 font-bold">
                Titulo del evento
              </span>
            </label>
            <input
              type="text"
              placeholder="Titulo"
              className="input input-bordered"
            />
          </div>
          <div className="form-contor">
            <label className="label">
              <span className="label-text text-gray-700 font-bold">
                Fecha del evento
              </span>
            </label>
            <input
              type="date"
              placeholder="Fecha"
              className="input input-bordered w-full"
              min={moment().format("YYYY-MM-DD")}
            />
            <label className="label">
              <span className="label-text font-bold-alt text-gray-400">
                Fecha actual o posteriores
              </span>
            </label>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-700 font-bold">
                Hora del evento
              </span>
            </label>
            <input
              type="time"
              placeholder="Hora"
              className="input input-bordered"
              min={moment().format("HH:mm")}
            />
            <label className="label">
              <span className="label-text font-bold-alt text-gray-400">
                Horas actual o posteriores
              </span>
            </label>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-700 font-bold">
                Descripción del evento
              </span>
            </label>
            <textarea
              name=""
              id=""
              cols={30}
              rows={4}
              placeholder="Descripción"
              className="textarea textarea-bordered resize-none"
            ></textarea>
          </div>
          <div className="form-control">
            <input
              type="submit"
              value="Submit"
              className="btn bg-logo text-white hover:bg-logo-900"
            />
          </div>
        </form>
      </AdminModal>
    </>
  );
}

export function UploadImageModal() {
  return (
    <>
      {/* New Image Modal */}
      <AdminModal modalId="image_modal">
        <h3 className="text-center text-gray-800 font-bold text-lg">
          Subir una nueva imagen
        </h3>
        <form className="w-2/3 mt-2 mx-auto flex flex-col gap-2">
          <div className="form-control">
            <label htmlFor="" className="label">
              <span className="label-text text-gray-700 font-bold">
                Galerías
              </span>
            </label>
            <select className="select select-bordered w-full max-w-xs">
              <option selected>Seleccione una galería</option>
              <option>Niños</option>
              <option>Mujeres</option>
              <option>Hombres</option>
              <option>Especiales</option>
            </select>
          </div>
          <div className="w-full flex flex-col">
            <label htmlFor="galeries" className="label">
              <span className="label-text text-gray-700 font-bold">
                Galerías
              </span>
            </label>
            <div className="grid min-h-16 grid-rows-[repeat(auto-fill,_minmax(4rem,_1fr))] md:grid-cols-2 lg:grid-cols-4 gap-2">
              <label className="border rounded-md w-full h-full grid place-items-center">
                <input type="radio" name="galery_id" />
              </label>
              <label className="border rounded-md w-full h-full grid place-items-center">
                <input type="radio" name="galery_id" />
              </label>
              <label className="border rounded-md w-full h-full grid place-items-center">
                <input type="radio" name="galery_id" />
              </label>
              <label className="border rounded-md w-full h-full grid place-items-center">
                <input type="radio" name="galery_id" />
              </label>
            </div>
          </div>

          <div className="form-control">
            <ImageUploadField />
          </div>
        </form>
      </AdminModal>
    </>
  );
}

export function NewUserModal() {
  return (
    <>
      {/* New User Modal */}
      <AdminModal modalId="user_modal">
        <h3>User modal</h3>f
      </AdminModal>
    </>
  );
}
