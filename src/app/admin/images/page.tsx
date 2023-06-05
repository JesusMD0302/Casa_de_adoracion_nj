import Image from "next/image";

export default function ImagesPage() {
  return (
    <main className="main max-w-container m-auto p-4">
      <h1 className="text-2xl font-bold uppercase underline">Galeria de imagenes</h1>
      <section className="mt-5">
        <p className="text-center text-xl font-bold">Niños</p>
        <div className="mt-2 min-h-48 grid grid-cols-2 gap-2 md:grid-cols-4">
          <div className="w-full max-h-52 rounded-md overflow-hidden">
            <Image
              src={"/ninios-banner.jpg"}
              alt=""
              height={300}
              width={300}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
      <section className="mt-5">
        <p className="text-center text-xl font-bold">Hombres</p>
        <div className="mt-2 min-h-48 grid grid-cols-2 gap-2 md:grid-cols-4">
          <div className="w-full max-h-52 rounded-md overflow-hidden">
            <Image
              src={"/hombres-banner.jpg"}
              alt=""
              height={300}
              width={300}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
      <section className="mt-5">
        <p className="text-center text-xl font-bold">Mujeres</p>
        <div className="mt-2 min-h-48 grid grid-cols-2 gap-2 md:grid-cols-4">
          <div className="w-full max-h-52 rounded-md overflow-hidden">
            <Image
              src={"/mujeres-banner.jpg"}
              alt=""
              height={300}
              width={300}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
      <section className="mt-5">
        <p className="text-center text-xl font-bold">Especiales</p>
        <div className="mt-2 min-h-48 grid grid-cols-2 gap-2 md:grid-cols-4">
          <div className="w-full max-h-52 rounded-md overflow-hidden">
            <Image
              src={"/especiales-banner.jpg"}
              alt=""
              height={300}
              width={300}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
