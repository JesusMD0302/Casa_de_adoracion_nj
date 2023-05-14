"use client";

import Button from "@/components/Button";
import Navbar from "@/components/Navbar";
import Image from "next/image";

function QuienesSomos() {
  return (
    <>
      <Navbar />

      <header>
        <Image
          src={"/quienes-somos.jpg"}
          alt="Quienes somos"
          fill
          className="relative object-contain"
        />
        <Image
          src={"/quienes-somos.jpg"}
          alt="Quienes somos"
          fill
          className="relative object-contain"
        />
      </header>
      <main>
        <p>Hola mundito</p>
      </main>
    </>
  );
}

export default QuienesSomos;
