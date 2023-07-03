"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FormEvent, useState } from "react";

export default function LoginPage() {
  const [error, setError] = useState<string>();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    if (res?.error) {
      let message = "";

      const errorParse = JSON.parse(res?.error);

      // console.log(errorParse);
      // return;

      errorParse.forEach((newError: any) => {
        message = `${message} \n ${newError.message}`;
      });
      return setError(message);
    }

    if (res?.ok) {
      setError("");
      return router.push("/panel-admin");
    }
  };

  return (
    <main>
      <section className="bg-gray-50">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-4 text-2xl font-semibold text-gray-900"
          >
            <Image
              className="w-56"
              src="/logo-horizontal.png"
              alt="logo"
              width={700}
              height={700}
            />
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Inicia sesión
              </h1>
              {error && (
                <div className="bg-red-500 text-white p-2 mb-2">{error}</div>
              )}
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Correo
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-logo-700 focus:border-logo-700 focus:outline-none block w-full p-2.5"
                    placeholder="corre@ejemplo.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Contraseña
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-logo-700 focus:border-logo-700 focus:outline-none block w-full p-2.5 "
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-logo hover:bg-logo-900 focus:ring-2 focus:outline-none focus:ring-logo-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Iniciar Sesión
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
