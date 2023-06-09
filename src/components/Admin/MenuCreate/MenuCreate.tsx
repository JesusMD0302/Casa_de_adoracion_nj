import {
  BsCalendarEventFill,
  BsCardImage,
  BsFillCaretDownFill,
  BsPersonFill,
  BsPlus,
} from "react-icons/bs";
import "moment/locale/es";
import moment from "moment";
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

          <div className="form-control">
            <label htmlFor="dropzone-file" className="label">
              <span className="label-text text-gray-700 font-bold">
                Imagen(es)
              </span>
            </label>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    aria-hidden="true"
                    className="w-10 h-10 mb-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 text-center">
                    <span className="font-semibold">
                      Click para seleccionar
                    </span>{" "}
                    o arrastra y suelta la(s) imagen(es)
                  </p>
                  <p className="text-xs text-gray-500">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" />
              </label>
            </div>
          </div>
        </form>
      </AdminModal>

      {/* New User Modal */}
      <AdminModal modalId="user_modal">
        <h3>User modal</h3>
      </AdminModal>
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
