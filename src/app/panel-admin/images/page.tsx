import ImageCard from "@/components/Admin/Images/ImageCard";
import ImagesSection from "@/components/Admin/Images/ImagesSection";
import AdminSection from "@/components/Admin/Section/AdminSection";
import Image from "next/image";

export default function AdminImagesPage() {
  return (
    <main className="p-4">
      
      <ImagesSection url="http://localhost:3000/api/galleries/1" category="Categoria - Niños" />

      <ImagesSection url="http://localhost:3000/api/galleries/2" category="Categoria - Hombres" />

      <ImagesSection url="http://localhost:3000/api/galleries/3" category="Categoria - Mujeres" />
      
      <ImagesSection url="http://localhost:3000/api/galleries/4" category="Categoria - Especiales" />
    </main>
  );
}