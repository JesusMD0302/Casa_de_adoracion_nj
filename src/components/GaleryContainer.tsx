import Image from "next/image";
import Title from "./Title";

function GaleryContainer() {
  return (
    <div className="h-full grid grid-rows-[auto_1fr] overflow-hidden">
      <div className="w-1/5 m-auto text-center text-logo">
        <Title title="Galería" />
      </div>
      {/* <h4 className="text-2xl font-bold text-center">Galería</h4> */}
      <div className="mt-3 grid grid-cols-1 gap-3 overflow-y-scroll sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        <Image
          alt="lorem image"
          className="w-full h-full"
          src="https://picsum.photos/600/600"
          height={300}
          width={300}
        />
        <Image
          alt="lorem image"
          className="w-full h-full"
          src="https://picsum.photos/600/600"
          height={300}
          width={300}
        />
        <Image
          alt="lorem image"
          className="w-full h-full"
          src="https://picsum.photos/600/600"
          height={300}
          width={300}
        />
        <Image
          alt="lorem image"
          className="w-full h-full"
          src="https://picsum.photos/600/600"
          height={300}
          width={300}
        />
        <Image
          alt="lorem image"
          className="w-full h-full"
          src="https://picsum.photos/600/600"
          height={300}
          width={300}
        />
        <Image
          alt="lorem image"
          className="w-full h-full"
          src="https://picsum.photos/600/600"
          height={300}
          width={300}
        />
        <Image
          alt="lorem image"
          className="w-full h-full"
          src="https://picsum.photos/600/600"
          height={300}
          width={300}
        />
        <Image
          alt="lorem image"
          className="w-full h-full"
          src="https://picsum.photos/600/600"
          height={300}
          width={300}
        />
        <Image
          alt="lorem image"
          className="w-full h-full"
          src="https://picsum.photos/600/600"
          height={300}
          width={300}
        />
        <Image
          alt="lorem image"
          className="w-full h-full"
          src="https://picsum.photos/600/600"
          height={300}
          width={300}
        />
        <Image
          alt="lorem image"
          className="w-full h-full"
          src="https://picsum.photos/600/600"
          height={300}
          width={300}
        />
        <Image
          alt="lorem image"
          className="w-full h-full"
          src="https://picsum.photos/600/600"
          height={300}
          width={300}
        />
        <Image
          alt="lorem image"
          className="w-full h-full"
          src="https://picsum.photos/600/600"
          height={300}
          width={300}
        />
        <Image
          alt="lorem image"
          className="w-full h-full"
          src="https://picsum.photos/600/600"
          height={300}
          width={300}
        />
        <Image
          alt="lorem image"
          className="w-full h-full"
          src="https://picsum.photos/600/600"
          height={300}
          width={300}
        />
        <Image
          alt="lorem image"
          className="w-full h-full"
          src="https://picsum.photos/600/600"
          height={300}
          width={300}
        />
        <Image
          alt="lorem image"
          className="w-full h-full"
          src="https://picsum.photos/600/600"
          height={300}
          width={300}
        />
        <Image
          alt="lorem image"
          className="w-full h-full"
          src="https://picsum.photos/600/600"
          height={300}
          width={300}
        />
        <Image
          alt="lorem image"
          className="w-full h-full"
          src="https://picsum.photos/600/600"
          height={300}
          width={300}
        />
      </div>
    </div>
  );
}

export default GaleryContainer;
