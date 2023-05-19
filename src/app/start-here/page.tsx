"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function StartHere() {
  return (
    <>
      <Navbar />
      <header
        className="relative top-0 left-0 w-full h-[400px] text-white
      sm:h-[300px]
      lg:h-[560px] md:bg-[#082a45]"
      >
        <Image
          src={"/start-here-banner.jpg"}
          alt="Banner de la página"
          fill
          className="relative object-cover object-top md:object-none"
        />
      </header>
      <main className="max-w-container w-full m-auto px-4 py-3 mb-12">
        <section className="mb-3">
          <h1 className="text-3xl font-bold text-center">
            Creemos que Jesús es para todas las personas
          </h1>
          <p className="mt-3 text-justify">
            Eso significa que Él es para ti. Tu pasado no te descalifica. Sus
            circunstancias actuales no limitan el deseo de Dios de obrar en y a
            través de su vida. Y su futuro no está dictado por su historial, su
            reputación o sus reservas. Dondequiera que estés hoy, le importas a
            Dios y hay un lugar para ti en Su familia.
          </p>
          <p className="mt-3 text-justify">
            FCC es un lugar donde personas de todos los ámbitos de la vida se
            reúnen para encontrar esperanza, experimentar la comunidad y vivir
            con un propósito. Entonces, ya sea que hayas crecido en la iglesia o
            nunca lo hayas hecho, te invitamos a venir tal como eres para
            experimentar la “iglesia” de una manera nueva. Si te parece bien,
            ¡nos encantaría conocerte pronto!
          </p>
          <p className="mt-3 text-justify">
            ¡Siga leyendo para obtener información útil y algunos consejos para
            planificar su primera visita a FCC, y háganos saber cómo podemos
            ayudarlo!
          </p>
        </section>
        <section className="mb-3">
          <p className="font-bold text-2xl">What to Expect</p>
          <ul className="mt-2 list-disc pl-3 md:w-[70ch]">
            <li>Siéntase libre de vestirse casualmente. Hacemos.</li>
            <li>
              Gente amable en todas partes le dará la bienvenida, responderá a
              sus preguntas y ayudarlo a encontrar cosas como nuestro auditorio,
              cafetería, lugares para sus hijos, etc.
            </li>
            <li>
              Por cierto, ¡tenemos una enseñanza divertida y llena de energía
              para sus hijos!
            </li>
            <li>
              Cada servicio dura aproximadamente una hora. Puede esperar buena
              música y un mensaje inspirador, basado en la Biblia y lleno de
              esperanza acerca de Jesús. Las letras de las canciones se
              proyectan en la pantalla para ayudarte a seguirlas.
            </li>
            <li>
              Tomamos la comunión cada semana durante nuestros servicios como
              una forma de recordando y honrando el sacrificio de Jesús. Si tu
              quisieras participar, simplemente tome el pan y el jugo de la
              bandeja a medida que están pasados y tómalos cuando estés listo.
              si prefieres no participar, ¡eso también está bien!
            </li>
            <li>
              También hay una oportunidad para dar. Este es un momento en que la
              gente que llaman hogar a FCC o que han sido bendecidos por el
              ministerio de la la iglesia puede adorar a través de dar. Como
              nuestro invitado, por favor no se sienta ¡Obligado a dar a menos
              que quieras!
            </li>
            <li>
              Al final de nuestros servicios, todos nuestros huéspedes están
              invitados a conocer parte de nuestro personal en una reunión
              rápida en &quot;The Hub&quot;, un lugar designado justo al lado
              de nuestro Centro de Bienvenida dentro del edificio principal
              puertas Tiene una duración de unos cinco minutos, y es simplemente
              una oportunidad para para conocerte y darte las gracias por ser
              nuestro invitado! también tendremos personas disponibles para
              responder cualquier pregunta que pueda tener.
            </li>
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
