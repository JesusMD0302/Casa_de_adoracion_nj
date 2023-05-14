import Image from "next/image";
import Button from "./Button";
import Title from "./Title";

function GalerySection(props: { title: string; urlImage: string }) {
  return (
    <section className="relative h-72 bg-black flex flex-col justify-center items-center text-white">
      <div className="max-w-container m-auto flex flex-col items-center gap-5 relative z-10">
        <Title title={props.title} />
        <p className="max-w-[75ch] text-center">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt
          optio consectetur aperiam obcaecati debitis neque, necessitatibus eius
          esse tempore corrupti?
        </p>
        <Button text={"Ver imagenes"} />
      </div>
      <Image
        src={props.urlImage}
        alt="Banner de los eventos"
        fill
        className="relative object-cover grayscale-30 brightness-[0.30]"
      />
    </section>
  );
}

export default GalerySection;
