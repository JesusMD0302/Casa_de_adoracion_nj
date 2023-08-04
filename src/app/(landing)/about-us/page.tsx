import { Header } from "@/components/Landing/Header/Header";

export default function AboutUsPage() {
  return (
    <>
      <Header
        imgURL="/about-us-banner.jpg"
        altImg="Banner de la página about us"
        className="h-[400px] sm:h-[300px] lg:h-[450px] md:bg-[#082a45]"
      />
      <main className="max-w-container w-full m-auto px-3 py-3 mb-12">
        <h1 className="text-3xl font-bold text-center">
          Creemos que Jesús es para todas las personas
        </h1>
        <p className="mt-3 text-justify">
          Eso significa que Él es para ti. <br />
          Tu pasado no te descalifica. Las circunstancias actuales no limitan el
          deseo de Dios de obrar en ya través de su vida. <br />
          Y su futuro no está dictado por su registro, su reputación, o sus
          reservas. Dondequiera que estés hoy, importas a Dios y hay un lugar
          para ti en su familia. <br />
          Nuestra visión es ser un lugar donde personas de todos los ámbitos de
          la vida se reúnen para encontrar esperanza, experimentar comunidad y
          vivir con propósito. <br />
          Entonces, si creciste en la iglesia o nunca lo ha estado, lo invitamos
          a venir tal como está a experimentar la “iglesia” de una manera nueva.
          <br />
          Si eso te suena bien, entonces ¡Nos encantaría conocerte pronto!
        </p>
      </main>
    </>
  );
}
