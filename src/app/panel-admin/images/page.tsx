import AdminSection from "@/components/Admin/Section/AdminSection";
import Image from "next/image";

export default function AdminImagesPage() {
  return (
    <main className="p-4">
      <AdminSection title="Categoria - Niños">
        <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ImageCard>
            <Image
              alt="imagen niños"
              src={"/ninios-banner.jpg"}
              fill
              className="object-cover"
            />
          </ImageCard>
        </div>
      </AdminSection>

      <hr className="w-1/2 mx-auto my-2 h-1 border-t-2 border-gray-200" />

      <AdminSection title="Categoria - Hombres">
        <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ImageCard>
            <Image
              alt="imagen niños"
              src={"/hombres-banner.jpg"}
              fill
              className="object-cover"
            />
          </ImageCard>
        </div>
      </AdminSection>

      <hr className="w-1/2 mx-auto my-2 h-1 border-t-2 border-gray-200" />

      <AdminSection title="Categoria - Mujeres">
        <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ImageCard>
            <Image
              alt="imagen niños"
              src={"/mujeres-banner.jpg"}
              fill
              className="object-cover"
            />
          </ImageCard>
        </div>
      </AdminSection>

      <hr className="w-1/2 mx-auto my-2 h-1 border-t-2 border-gray-200" />

      <AdminSection title="Categoria - Especiales">
        <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ImageCard>
            <Image
              alt="imagen niños"
              src={"/especiales-banner.jpg"}
              fill
              className="object-cover"
            />
          </ImageCard>
        </div>
      </AdminSection>
    </main>
  );
}

function ImageCard({ children, ...props }: { children: React.ReactNode }) {
  return (
    <>
      {/* Card */}
      <div className="card w-full min-h-[12rem] rounded-md overflow-hidden">
        <div className="card-body">
          <figure className="overflow-hidden">{children}</figure>
        </div>
      </div>
    </>
  );
}
