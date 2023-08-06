"use client";

import { BsFacebook, BsFillGeoAltFill } from "react-icons/bs";
import Title from "../Title/Title";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { emailSchema } from "@/schemas/schemas";
import useActive from "@/hooks/useActive";

function Footer() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm({ resolver: zodResolver(emailSchema) });

  const { active, handleTrue, handleFalse } = useActive();
  const {
    active: showAnimation,
    handleTrue: handleTrueAnimation,
    handleFalse: handleFalseAnimation,
  } = useActive();

  const onSubmit = handleSubmit(async (data) => {
    data = {
      ...data,
      subject: "Contacto",
    };

    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/contact`, {
      method: "POST",
      body: JSON.stringify(data),
    });

    const resData = await res.json();

    if (res.ok) {
      handleTrue();
      handleTrueAnimation();

      setTimeout(() => {
        handleFalseAnimation();
      }, 1500);

      setTimeout(() => {
        handleFalse();
      }, 2000);

      reset({
        name: "",
        email: "",
        message: "",
      });
    }
  });

  return (
    <footer id="contact" className="bg-gray-800 text-white">
      <div className="max-w-container m-auto py-2 px-2 flex flex-col items-center md:px-0">
        <Title title="Contacto" />
        <div className="md:w-4/5 max-w-full pt-3 flex flex-col gap-3 md:flex-row md:justify-between">
          {/* Seccion de contacto */}
          <div className="flex flex-col gap-3 justify-between items-center text-center">
            <div>
              <h4 className="text-xl md:text-2xl font-semibold">
                Redes Sociales
              </h4>
              <div className="flex gap-3 items-center mt-2 text-lg md:text-xl">
                <BsFacebook className="text-xl md:text-2xl" />
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
              <div className="flex flex-col gap-2 md:flex-row justify-center items-center">
                <div className="w-10 h-10 border-2 border-white rounded-full grid place-content-center">
                  <BsFillGeoAltFill size={20} />
                </div>

                <p className="text-sm md:text-lg text-center w-[40ch]">
                  Avenida 69 #251 entre 44 y 46 Colonia Cordemex. Frente a Gran
                  Plaza, Mérida, México
                </p>
              </div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d465.49934619289843!2d-89.62460755423984!3d21.03289528480732!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f56769d4ff8bdbf%3A0xb81b05c4ce563d15!2sMision%20Nueva%20Jerusalen!5e0!3m2!1ses-419!2smx!4v1683919765841!5m2!1ses-419!2smx"
                style={{ border: 0 }}
                loading="lazy"
                className="w-full md:w-[30rem] md:h-48 rounded-md mt-3 md:mt-5"
              ></iframe>
            </section>
          </div>
          {/* Formulario de contacto */}
          <form
            onSubmit={onSubmit}
            className="md:w-2/5 flex flex-col gap-2 relative"
          >
            {active && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div
                  className={`alert alert-success ${
                    showAnimation ? "animate-zoomIn" : "animate-zoomOut"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Correo enviado!</span>
                </div>
              </div>
            )}

            <input
              autoComplete="off"
              className="w-full outline-none border-2 rounded border-gray-400 bg-gray-600 py-2 px-2"
              type="text"
              placeholder="Introduzca su nombre"
              {...register("name")}
            />
            {errors.name && (
              <span className="w-full px-3 py-2 bg-red-300 text-red-950 rounded-md">
                {errors.name?.message as string}
              </span>
            )}
            <input
              autoComplete="off"
              className="w-full outline-none border-2 rounded border-gray-400 bg-gray-600 py-2 px-2 md:text-lg"
              type="email"
              placeholder="Introduzaca su correo electrónico"
              {...register("email")}
            />
            {errors.email && (
              <span className="w-full px-3 py-2 bg-red-300 text-red-950 rounded-md">
                {errors.email?.message as string}
              </span>
            )}

            <textarea
              autoComplete="off"
              className="w-full outline-none border-2 rounded border-gray-400 bg-gray-600  py-2 px-2 md:text-lg"
              cols={30}
              rows={7}
              placeholder="Esciba su mensaje"
              {...register("message")}
            ></textarea>
            {errors.message && (
              <span className="w-full px-3 py-2 bg-red-300 text-red-950 rounded-md">
                {errors.message?.message as string}
              </span>
            )}

            <input
              type="submit"
              className="bg-gray-900 active:bg-gray-900 hover:bg-gray-600 hover:cursor-pointer py-2 outline-none rounded-md"
              value="Enviar"
            />
          </form>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
