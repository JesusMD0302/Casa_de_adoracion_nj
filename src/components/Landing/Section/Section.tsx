import Image from "next/image";
import React from "react";

interface SectionProps {
  id?: string;
  className?: string;
  containerClassName?: string;
  imgBackground?: boolean;
  children?: React.ReactNode;
}

interface SectionImgBgProps {
  id?: string;
  className?: string;
  containerClassName?: string;
  imgBgURL?: string;
  imgBackground: boolean;
  children?: React.ReactNode;
}

type Props = SectionProps | SectionImgBgProps;

function Section({
  id,
  className,
  containerClassName,
  imgBackground,
  children,
  ...props
}: Props) {
  if (imgBackground && "imgBgURL" in props) {
    return (
      <section
        id={id}
        className={`relative h-72 flex flex-col justify-center items-center text-white ${className}`}
      >
        <div
          className={`max-w-container m-auto relative z-10 ${containerClassName}`}
        >
          {children}
        </div>
        <Image
          src={props.imgBgURL ?? ""}
          alt=""
          fill
          className="relative object-cover grayscale-30 brightness-[0.30]"
        />
      </section>
    );
  }

  return (
    <section
      className={`relative h-72 flex flex-col justify-center items-center text-white ${className}`}
    >
      <div className={`max-w-container m-auto ${containerClassName}`}>
        {children}
      </div>
    </section>
  );
}

export default Section;
