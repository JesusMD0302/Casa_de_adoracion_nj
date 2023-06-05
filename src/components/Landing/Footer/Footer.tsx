import { BsFacebook, BsFillGeoAltFill } from "react-icons/bs";
import Title from "../Title/Title";

function Footer() {
  return (
    <footer id="contact" className="bg-gray-800 text-white">
      <div className="max-w-container m-auto py-2 px-2 flex flex-col items-center md:px-0">
        <Title title="Contacto" />
        <div className="md:w-4/5 max-w-full pt-3 flex flex-col gap-3 md:flex-row md:justify-between">
          <div className="flex flex-col gap-3 justify-between items-center text-center">
            <div>
              <h4 className="text-lg font-semibold">Redes Sociales</h4>
              <div className="flex gap-2 items-center mt-2 text-lg md:text-base">
                <BsFacebook />
                <a
                  href="https://www.facebook.com/CCCasaDeAdoracionNJ"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Casa de Adoración NJ
                </a>
              </div>
            </div>
            <section className="w-full">
              <div className="flex justify-between items-center">
                <div className="w-10 h-10 border-2 border-white rounded-full grid place-content-center">
                  <BsFillGeoAltFill size={20} />
                </div>

                <p className="text-sm text-center w-[40ch]">
                  Avenida 69 #251 entre 44 y 46 Colonia Cordemex. Frente a Gran
                  Plaza, Mérida, México
                </p>
              </div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d465.49934619289843!2d-89.62460755423984!3d21.03289528480732!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f56769d4ff8bdbf%3A0xb81b05c4ce563d15!2sMision%20Nueva%20Jerusalen!5e0!3m2!1ses-419!2smx!4v1683919765841!5m2!1ses-419!2smx"
                style={{ border: 0 }}
                loading="lazy"
                className="w-full rounded-md mt-3"
              ></iframe>
            </section>
          </div>
          <form
            action="#"
            method="post"
            className="md:w-2/5 flex flex-col gap-2"
          >
            <input
              autoComplete="off"
              className="w-full outline-none border-2 rounded border-gray-400 bg-gray-600 text-xs py-2 px-2"
              type="email"
              name="name"
              id=""
              placeholder="Introduzca su nombre"
            />
            <input
              autoComplete="off"
              className="w-full outline-none border-2 rounded border-gray-400 bg-gray-600 text-xs py-2 px-2"
              type="text"
              name="email"
              id=""
              placeholder="Introduzaca su correo electrónico"
            />
            <textarea
              autoComplete="off"
              className="w-full outline-none border-2 rounded border-gray-400 bg-gray-600 text-xs  py-2 px-2"
              name="message"
              id=""
              cols={30}
              rows={10}
              placeholder="Esciba su mensaje"
            ></textarea>
            <button type="button" className="border-2 border-gray-400 bg-gray-600">Enviar</button>
          </form>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
