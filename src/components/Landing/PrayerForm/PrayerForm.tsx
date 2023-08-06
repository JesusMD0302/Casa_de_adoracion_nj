"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { emailSchema } from "@/schemas/schemas";
import useActive from "@/hooks/useActive";

function PrayerForm() {
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
      subject: "Solicitud de oración",
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
    <div className="w-full h-full m-auto grid grid-rows-[auto_1fr] gap-2 md:w-[400px]">
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

      <h4 className="text-xl font-bold">Solicitar oración</h4>
      <form
        onSubmit={onSubmit}
        className="w-full h-full grid grid-rows-[repeat(2,_auto)_1fr] gap-2"
      >
        <div className="flex flex-col">
          <label className="text-sm md:text-base" htmlFor="name">
            Nombre
          </label>
          <input
            type="text"
            id="name"
            className="border border-gray-300 rounded text-xs md:text-base py-2 px-2 outline-none"
            {...register("name")}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm md:text-base" htmlFor="email">
            Correo Electronico
          </label>
          <input
            type="text"
            id="email"
            autoComplete="off"
            className="border border-gray-300 rounded text-xs md:text-base py-2 px-2 outline-none"
            {...register("email")}
          />
        </div>
        <div className="grid grid-rows-[auto_1fr]">
          <label className="text-sm md:text-base" htmlFor="message">
            Mensaje
          </label>
          <textarea
            id="message"
            cols={30}
            rows={6}
            className="border border-gray-300 rounded text-xs md:text-base py-2 px-2 outline-none resize-none"
            {...register("message")}
          ></textarea>
        </div>
        <input
          type="submit"
          value="Solicitar"
          className="px-4 py-2 bg-logo active:bg-logo hover:bg-logo-900 hover:cursor-pointer text-white rounded md:text-lg"
        />
      </form>
    </div>
  );
}

export default PrayerForm;
