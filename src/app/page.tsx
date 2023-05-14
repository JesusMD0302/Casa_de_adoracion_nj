"use client";

import Header from "@/components/Header";
import Image from "next/image";
import moment, { Moment } from "moment";
import "moment/locale/es";
import { useState, useEffect } from "react";
import Button from "@/components/Button";
import GalerySection from "@/components/GalerySection";
import Navbar from "@/components/Navbar";
import Countdown from "react-countdown";
import CountdownTimer from "@/components/CountdownTimer";
import {
  BsFacebook,
  BsFillGearFill,
  BsFillGeoAltFill,
  BsFillGeoFill,
  BsPinAngle,
} from "react-icons/bs";
import Title from "@/components/Title";

moment.locale("es");

export default function Home() {
  const [day, setDay] = useState<Moment>(
    moment().add(10, "minutes").seconds(0)
  );
  const [formatedDate, setFormatedDay] = useState<string>("");

  useEffect(() => {
    setFormatedDay(
      day.format("dddd, D [de] MMMM [de] YYYY, h:mm a").toUpperCase()
    );
  }, []);

  return (
    <>
      <Navbar />
      <Header />
      <main className="scroll-smooth">
        <section
          id="events"
          className="relative h-72 flex bg-transparent flex-col justify-center items-center text-white"
        >
          <div className="max-w-container w-auto h-full py-10 relative z-10 flex flex-col justify-between">
            <div className="flex flex-col items-center">
              <p className="text-lg font-bold">{formatedDate}</p>
              <p className="font-semibold">Servicio Dominical</p>
              <Countdown date={day.toDate()} renderer={CountdownTimer} />
            </div>
            <div className="w-full flex justify-between items-end">
              <Button text={"Solicitar oración"} />
              <button className="font-bold underline text-xs">
                Ver próximos eventos
              </button>
            </div>
          </div>
          <Image
            src={"/eventos-banner.jpg"}
            alt="Banner de los eventos"
            fill
            className="relative object-cover grayscale-30 brightness-[0.30]"
          />
        </section>
        <section className="relative h-72 flex bg-logo flex-col justify-center items-center text-white">
          <div className="max-w-container m-auto flex flex-col items-center gap-5">
            <p className="text-center text-2xl">
              La vida es complicada. <br />
              Quieres hacerlo bien. <br />
              Jesús tiene esperanza para ti. <br />
              Queremos ayudarte a encontrarlo.
            </p>
            <Button text={"Empieza aquí"} />
          </div>
        </section>
        <div id="galery">
          <GalerySection title="Niños" urlImage="/ninios-banner.jpg" />
          <GalerySection title="Mujeres" urlImage="/mujeres-banner-2.jpg" />
          <GalerySection title="Hombres" urlImage="/hombres-banner.jpg" />
          <GalerySection title="Especiales" urlImage="/Especiales-banner.jpg" />
        </div>
      </main>
      <footer id="contact" className="bg-gray-800 text-white">
        <div className="max-w-container m-auto py-2 flex flex-col items-center">
          <Title title="Contacto" />
          <div className="w-4/5 pt-3 flex justify-between">
            <div className="flex flex-col justify-between items-center text-center">
              <div>
                <h4 className="text-lg font-semibold">Redes Sociales</h4>
                <div className="flex gap-2 items-center mt-2 text-md">
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
              <section className="">
                <div className="flex justify-between items-center">
                  <div className="w-10 h-10 border-2 border-white rounded-full grid place-content-center">
                    <BsFillGeoAltFill size={20} />
                  </div>

                  <p className="text-sm text-center w-[40ch]">
                    Avenida 69 #251 entre 44 y 46 Colonia Cordemex. Frente a
                    Gran Plaza, Mérida, México
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
              className="w-2/5 flex flex-col gap-2"
            >
              <input
                autoComplete="off"
                className="w-full outline-none border-2 border-gray-400 bg-gray-600 text-xs py-2 px-2"
                type="email"
                name="name"
                id=""
                placeholder="Introduzca su nombre"
              />
              <input
                autoComplete="off"
                className="w-full outline-none border-2 border-gray-400 bg-gray-600 text-xs py-2 px-2"
                type="text"
                name="email"
                id=""
                placeholder="Introduzaca su correo electrónico"
              />
              <textarea
                autoComplete="off"
                className="w-full outline-none border-2 border-gray-400 bg-gray-600 text-xs  py-2 px-2"
                name="message"
                id=""
                cols={30}
                rows={10}
                placeholder="Esciba su mensaje"
              ></textarea>
            </form>
          </div>
        </div>
      </footer>
    </>
  );
}
