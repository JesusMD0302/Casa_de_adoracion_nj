import { InputHTMLAttributes, ClassAttributes } from "react";
import Image from "next/image";

interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "className">,
    ClassAttributes<HTMLInputElement> {
  imageURL: string;
  optionName: string;
}

export function GaleryOption({ optionName, imageURL, ...props }: RadioProps) {
  return (
    <label className="relative border rounded-md w-full h-16 flex justify-center items-center p-2 overflow-hidden transition-all duration-150 hover:scale-110 hover:cursor-pointer [&:has(input:checked)]:outline [&:has(input:checked)]:outline-2 [&:has(input:checked)]:outline-logo-700">
      <input {...props} type="radio" className="hidden" />
      <p className="max-w-full text-white break-all">{optionName}</p>
      <Image
        src={imageURL}
        alt={`galería ${optionName}`}
        fill
        className="object-cover absolute -z-10 grayscale-30 brightness-[0.30]"
      />
    </label>
  );
}
