import GaleryCategorySection from "@/components/Landing/Galery/GaleryCategorySection";

function GalerySection() {
  return (
    <section id="galery">
      <GaleryCategorySection
        title="Niños"
        urlImage="/ninios-banner.jpg"
        textContent={
          "¡Únete a la diversión y experimenta un mundo donde los niños descubren a Jesús desde su nivel!"
        }
      />
      <GaleryCategorySection
        title="Mujeres"
        urlImage="/mujeres-banner.jpg"
        textContent={
          "Muchas maravillas hay en el universo; pero la obra maestra de la creación es el corazón materno."
        }
      />
      <GaleryCategorySection
        title="Hombres"
        urlImage="/hombres-banner.jpg"
        textContent={
          "Algunas amistades se rompen fácilmente pero hay amigos más fieles que un hermano."
        }
      />
      <GaleryCategorySection
        title="Especiales"
        urlImage="/Especiales-banner.jpg"
        textContent={
          "Armonia, unidad y restauración, que las familias sean felices y disfruten de las promesas del señor."
        }
      />
    </section>
  );
}

export default GalerySection;
