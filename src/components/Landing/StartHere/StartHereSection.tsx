import Link from "next/link";
import Button from "@/components/Landing/Button/Button";
import Section from "../Section/Section";

function StartHereSection() {
  return (
    <Section
      className="bg-logo"
      containerClassName="flex flex-col items-center gap-5 px-4"
    >
      <p className="text-center text-2xl font-semibold">
        ¿Siente como si pareciera que nada funciona?
      </p>
      <p className="text-center md:text-lg whitespace-pre-line">
        Jesús tiene esperanza para ti <br />
        Queremos ayudarte a encontrarlo
      </p>
      <Button>
        <Link href={"/start-here"}>Empieza aquí</Link>
      </Button>
    </Section>
  );
}

export default StartHereSection;
