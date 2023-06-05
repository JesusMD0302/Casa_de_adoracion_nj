import Link from "next/link";
import Button from "../Button/Button";
import { Header } from "./Header";

function MainHeader() {
  return (
    <Header imgURL="/baner.jpg" altImg="Banner de la página principal">
      <div className="max-w-container h-full m-auto">
        <div className="relative z-10 md:w-72 h-full bg-logo/80 flex flex-col gap-3 justify-center items-center px-4">
          <p className="text-lg md:text-sm text-justify">
            A veces parece que nada funciona. Podemos hacer todo lo correcto y
            marcar todas las casillas, pero la vida parece seguir igual. ¿Cómo
            podemos encontrar la vida que anhelamos? Jesús vino para que
            pudiéramos descubrir Un Camino Mejor.
          </p>
          <Button>
            <Link href={"/start-here"}>Leer Más</Link>
          </Button>
        </div>
      </div>
    </Header>
  );
}

export default MainHeader;
