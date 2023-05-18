function PrayerForm() {
  return (
    <div className="max-w-md w-full m-auto">
      <h4 className="text-xl font-bold">Solicitar oración</h4>
      <form action="#" className="w-full h-full flex flex-col">
        <div className="flex flex-col">
          <label htmlFor="full-name">Nombre</label>
          <input
            type="text"
            name="full-name"
            id="full-name"
            className="border rounded text-xs py-2 px-2 outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email">Correo Electronico</label>
          <input
            type="text"
            name="email"
            id="email"
            className="border rounded text-xs py-2 px-2 outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="message">Mensaje</label>
          <textarea
            name="message"
            id="message"
            cols={30}
            rows={6}
            className="border rounded text-xs py-2 px-2 outline-none resize-none"
          ></textarea>
        </div>
      </form>
    </div>
  );
}

export default PrayerForm;
