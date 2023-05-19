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
import PopUp from "@/components/PopUp";
import useActive from "@/hooks/useActive";
import PrayerForm from "@/components/PrayerForm";
import Footer from "@/components/Footer";
import Link from "next/link";
import EventsContainer from "@/components/EventsContainer";

moment.locale("es");

export default function Home() {
  const [day, setDay] = useState<Moment>(
    moment().add(10, "minutes").seconds(0)
  );
  const [formatedDate, setFormatedDay] = useState<string>("");
  const {
    active: eventsActive,
    handleTrue: handleTrueEvents,
    handleFalse: handleFalseEvents,
  } = useActive();
  const {
    active: prayerActive,
    handleTrue: handleTruePrayer,
    handleFalse: handleFalsePrayer,
  } = useActive();

  useEffect(() => {
    setFormatedDay(
      day.format("dddd, D [de] MMMM [de] YYYY, h:mm a").toUpperCase()
    );
  }, [day]);

  return (
    <>
      <Navbar />
      <Header />
      <main className="">
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
            <div className="w-full flex flex-col gap-2 md:gap-0 md:flex-row justify-between items-center">
              <Button text={"Solicitar oración"} onClick={handleTruePrayer} />
              <button
                className="font-bold underline text-base md:text-xs"
                onClick={handleTrueEvents}
              >
                Ver próximos eventos
              </button>
            </div>
          </div>
          {/* 
                Solictar oración modal
               */}
          {prayerActive ? (
            <PopUp handlePopUpFalse={handleFalsePrayer}>
              <PrayerForm />
            </PopUp>
          ) : null}
          {/* ----------- */}
          {/* 
              Proximos eventos modal
             */}
          {eventsActive ? (
            <PopUp handlePopUpFalse={handleFalseEvents}>
              <EventsContainer />
            </PopUp>
          ) : null}
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
            <Button>
              <Link href={"/start-here"}>Empieza aquí</Link>
            </Button>
          </div>
        </section>
        <section id="galery">
          <GalerySection title="Niños" urlImage="/ninios-banner.jpg" />
          <GalerySection title="Mujeres" urlImage="/mujeres-banner.jpg" />
          <GalerySection title="Hombres" urlImage="/hombres-banner.jpg" />
          <GalerySection title="Especiales" urlImage="/Especiales-banner.jpg" />
        </section>
      </main>
      <Footer />
    </>
  );
}
