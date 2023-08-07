"use client";

import { BsWhatsapp } from "react-icons/bs";
import Button from "../Button/Button";

interface WhatsappButtonProps {
  isMinimal?: boolean;
}

export default function WhatsappButton({ isMinimal }: WhatsappButtonProps) {
  const onClick = () => {
    window.open(`https://wa.me/1${process.env.NUMBER}`);
  };

  if (isMinimal) {
    return (
      <Button text="Contactar" onClick={onClick} /> 
    );
  }

  return (
    <div
      className="transition-all px-4 py-4 md:py-2 bg-green-700 text-white rounded-full fixed bottom-5 left-5 cursor-pointer"
      onClick={onClick}
    >
      <div className="text-3xl md:flex md:gap-4 md:items-center md:text-xl">
        <BsWhatsapp />
        <p className="hidden md:block">Contactanos por Whatsapp</p>
      </div>
    </div>
  );
}
