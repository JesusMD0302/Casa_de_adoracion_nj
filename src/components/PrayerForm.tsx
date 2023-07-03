function PrayerForm() {
  return (
    <div className="w-full h-full m-auto grid grid-rows-[auto_1fr] gap-2 md:w-[400px]">
      <h4 className="text-xl font-bold">Solicitar oración</h4>
      <form
        action="#"
        className="w-full h-full grid grid-rows-[repeat(2,_auto)_1fr] gap-2"
      >
        <div className="flex flex-col">
          <label className="text-sm md:text-base" htmlFor="full-name">
            Nombre
          </label>
          <input
            type="text"
            name="full-name"
            id="full-name"
            className="border border-gray-300 rounded text-xs md:text-base py-2 px-2 outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm md:text-base" htmlFor="email">
            Correo Electronico
          </label>
          <input
            type="text"
            name="email"
            id="email"
            autoComplete="off"
            className="border border-gray-300 rounded text-xs md:text-base py-2 px-2 outline-none"
          />
        </div>
        <div className="grid grid-rows-[auto_1fr]">
          <label className="text-sm md:text-base" htmlFor="message">
            Mensaje
          </label>
          <textarea
            name="message"
            id="message"
            cols={30}
            rows={6}
            className="border border-gray-300 rounded text-xs md:text-base py-2 px-2 outline-none resize-none"
          ></textarea>
        </div>
        <button type="button" className="px-4 py-2 bg-logo text-white rounded md:text-lg">Solicitar</button>
      </form>
    </div>
  );
}

export default PrayerForm;
