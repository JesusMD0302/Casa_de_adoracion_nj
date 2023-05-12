"use client";

import Header from "@/components/Header";
import Image from "next/image";
import moment, { Moment } from "moment";
import { useEffect, useState } from "react";
import TimeContainer from "@/components/TimeContainer";
import Button from "@/components/Button";
import GalerySection from "@/components/GalerySection";
import Navbar from "@/components/Navbar";
import Countdown from "react-countdown";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  completed: boolean;
}

// const calcTimeDiference = (futureDay: moment.MomentInput): TimeLeft => {
//   let day = moment(futureDay);
//   let diff = day.diff(moment(), "minutes");

//   if (diff <= 0) {
//     return { days: 0, hours: 0, minutes: 0 };
//   }

//   let minutes = diff % 60;
//   diff = Math.floor(diff / 60);
//   let hours = diff % 24;
//   diff = Math.floor(diff / 24);
//   let days = diff;

//   return { days, hours, minutes };
// };
const renderer = ({
  total,
  days,
  hours,
  minutes,
  seconds,
  milliseconds,
  completed,
}) => {
  if (completed) {
    // Render a completed state
    return <p>Hola mundito</p>;
  } else {
    // Render a countdown
    return (
      <>
        <TimeContainer time={days} title="Días" />
        <TimeContainer time={hours} title="Horas" />
        <TimeContainer time={minutes} title="Minutos" />
      </>
    );
  }
};

export default function Home() {
  const [day, setDay] = useState<Moment>(moment().add(2, "minutes"));

  // const [timeLeft, setTimeLeft] = useState<TimeLeft>(calcTimeDiference(day));

  // useEffect(() => {
  //   setInterval(() => {
  //     setTimeLeft(calcTimeDiference(day));
  //   }, 1000 * 60);
  // }, []);

  return (
    <>
      <Navbar />
      <Header />
      <main className="">
        <section className="relative h-72 flex bg-transparent flex-col justify-center items-center text-white">
          <div className="max-w-container w-auto h-full py-10 relative z-10 flex flex-col justify-between">
            <div className="flex flex-col items-center">
              <p className="text-lg font-bold">
                DOMINGO, 16 DE JUNIO DE 2023, DE 10:30 A 1:30
              </p>
              <p className="font-semibold">Servicio Dominical</p>
              <div className="flex gap-2 mt-2">
                {/*  */}
                <p>
                  {day.format()} {day.milliseconds()}
                </p>{" "}
                <br />
                <Countdown date={day.toDate()} renderer={renderer} />
              </div>
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
        <GalerySection title="Niños" urlImage="/ninios-banner.jpg" />
        <GalerySection title="Mujeres" urlImage="/mujeres-banner-2.jpg" />
        <GalerySection title="Hombres" urlImage="/hombres-banner.jpg" />
        <GalerySection title="Especiales" urlImage="/Especiales-banner.jpg" />
      </main>
    </>
  );
}
