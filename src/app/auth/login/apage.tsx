"use client";

import Image from "next/image";
import { FormEvent } from "react";
import { BsFillPersonFill, BsKeyFill } from "react-icons/bs";
import styles from "./Login.module.css";

export default function LoginAdmin() {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
  };

  return (
    <main
      className={`h-screen w-screen overflow-hidden ${styles.pattern} md:grid md:place-content-center`}
    >
      <div
        className="w-full h-full
      md:border md:rounded-md 
      md:flex md:w-4/6 md:h-3/4 md:m-auto md:bg-white
      "
      >
        <div className="relative hidden md:block">
          <Image src={"/eventos-banner.jpg"} width={300} height={300} alt="" />

        </div>
        <div className={`w-full h-full py-8 px-6 ${styles.glass}`}>
          <div
            className="relative w-1/2 m-auto mb-2 bg-white rounded-full shadow-lg"
            //   className="relative w-1/2 m-auto mb-2 }
            // after:absolute after:top-0 after:-left-full after:w-[300%] after:h-full after:-z-10 after:-rotate-[4deg] after:bg-white"
          >
            <Image
              src={"/logo-horizontal.png"}
              alt="Logo Casa NJ"
              width={700}
              height={700}
              className="w-full h-full"
            />
          </div>
          <h1 className="text-xl font-bold uppercase text-logo-800 text-center">
            Panel administrador
          </h1>
          <p className="text-center text-logo-800/40 font-extrabold">
            Inicio de sesión
          </p>
          <form onSubmit={handleSubmit} className="mt-3 flex flex-col gap-3">
            <div className="w-full text-sm">
              <label htmlFor="email" className="font-semibold text-gray-600">
                Correo electronico
              </label>
              <div
                className={`flex items-center border-2 rounded pl-3 py-2 mt-2 ${styles.glass}`}
              >
                <BsFillPersonFill className="text-gray-500 text-xl" />
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="w-full px-3 py-2 outline-none bg-transparent"
                  placeholder="correo@ejemplo.com"
                />
              </div>
            </div>
            <div className="w-full text-sm">
              <label htmlFor="password" className="font-semibold text-gray-600">
                Contraseña
              </label>
              <div
                className={`flex items-center border-2 rounded pl-3 py-2 mt-2 ${styles.glass}`}
              >
                <BsKeyFill className="text-gray-500 text-xl" />
                <input
                  type="text"
                  name="password"
                  id="password"
                  className="w-full px-3 py-2 outline-none bg-transparent"
                  placeholder="Ingrese 8 caracteres o más"
                />
              </div>
            </div>
            <div className="w-full text-base mt-3">
              <input
                type="submit"
                value="Iniciar sesión"
                className="block w-full bg-logo-700 text-white px-3 py-3 rounded uppercase font-extrabold"
              />
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
