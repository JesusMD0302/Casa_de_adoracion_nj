"use client";

import { signIn } from "next-auth/react";
import { Controller, useForm } from "react-hook-form";
import { FormEvent, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Input from "@/components/Admin/Input/Input";
import { loginSchema } from "@/schemas/schemas";

export default function LoginPage() {
  const [error, setError] = useState<string>();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const onSubmit = handleSubmit(async (data) => {
    const res = await signIn("credentials", {
      ...data,
      redirect: false,
    });

    if (res?.error) {
      let message = "";
      const errorParse = JSON.parse(res.error);

      errorParse.forEach((newError: any) => {
        message = `${message} \n ${newError.message}`;
      });

      return setError(message);
    }

    if (res?.ok) {
      setError("");
      return router.push("/panel-admin");
    }
  });

  return (
    <main>
      {isSubmitting && (
        <div className="fixed top-0 left-0 w-full h-screen bg-gray-500/70 flex justify-center items-center">
          <span className="loading loading-dots loading-lg text-logo"></span>
        </div>
      )}
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
                <div className="bg-red-500 text-white p-2 mb-2 rounded-md">
                  {error}
                </div>
              )}
              <form className="flex flex-col gap-3" onSubmit={onSubmit}>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <div className="flex flex-col gap-2">
                      <Input
                        label="Correo electronico"
                        placeholder="correo@ejemplo.com"
                        errors={errors.email}
                        errorMessage={errors.email?.message as string}
                        {...field}
                      />
                    </div>
                  )}
                />
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <div className="flex flex-col gap-2">
                      <Input
                        label="Contraseña"
                        type="password"
                        placeholder="*********"
                        errors={errors.password}
                        errorMessage={errors.password?.message as string}
                        {...field}
                      />
                    </div>
                  )}
                />
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
