import Footer from "@/components/Landing/Footer/Footer";
import { Header } from "@/components/Landing/Header/Header";

export default function StartHere() {
  return (
    <>
      <Header
        imgURL="/start-here-banner.jpg"
        altImg="Banner de la página start here"
        className="sm:h-[300px] lg:h-[560px]"
      />
      <main className="max-w-container w-full m-auto px-4 py-3 mb-12">
        <section className="mb-3">
          <h1 className="text-3xl font-bold text-center">
            ¿Quién es el espíritu santo?
          </h1>
          <p className="mt-3 text-justify">
            Descendió en forma de paloma, pero no es un ave; Apareció en forma
            de llama ardiente sobre la cabeza de los discipulos, pero no es
            fuego Se siente como un fuerte soplo, pero no es viento. Embriaga
            como el licor, pero no es un bebida. Nos sacia y refresca, pero no
            es agua. Él sana, liberta y hace milagros, pero no es un simple
            poder. Él ríe, él llora, él te abraza, te guía y te transforma.
            Espíritu santo no es &quot;algo&ldquo;, es Alguien.
          </p>
          <p className="mt-3 text-justify">
            Espíritu es DIOS. Es su mismo espíritu relansionandose con nosotros.{" "}
            <br />
            <strong>Juan 16:13</strong>
          </p>
          <p className="mt-3 text-justify">
            ¡Siga leyendo para obtener información útil y algunos consejos para
            planificar su primera visita a FCC, y háganos saber cómo podemos
            ayudarlo!
          </p>
          <p className="mt-3 text-justify">
            Porque el Espíritu de Dios no nos hace cobardes. Al contrario, nos
            da poder para amar a los demás, y nos fortalece para que podamos
            vivir una buena vida cristiana.
          </p>
          <p className="mt-3 text-justify">
            Sabemos que Dios obra en toda situación para el bien de los que lo
            aman, los que han sido llamados por dios de acuerdo a su propósito.{" "}
            <br />
            <strong>Romanos 8:28</strong>
          </p>
          <p className="mt-3 text-justify">
            <strong>En casa de Adoración NJ </strong>
            tenemos la visión de ser un lugar donde las personas de todos los
            ámbitos de la vida se reúnan para encontrar esperanza, experimenten
            el amor de una comunidad y vivan con propósito.
          </p>
          <p className="mt-3 text-justify">
            Así que, si creciste en la iglesia o nunca has estado en ella, te
            invitamos a venir con nosotros para que experimentes la
            &quot;Iglesia&ldquo; de una manera nueva y diferente.
          </p>
          <p className="mt-3 text-justify">
            Si esto suena bien para ti, entonces ¡Nos encantaría conocerte!
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
