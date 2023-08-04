"use client";

import { useQuery } from "@tanstack/react-query";
import ImagesSection from "@/components/Admin/Images/ImagesSection";
import { getImages } from "@/utils/api";

export default function AdminImagesPage() {
  const { data, isLoading, status } = useQuery({
    queryKey: ["images"],
    queryFn: getImages,
  });

  return (
    <main className="p-4">
      <ImagesSection
        categoryID="1"
        category="Niños"
        isLoading={isLoading}
        status={status}
        data={data}
      />
      
      <ImagesSection
        categoryID="2"
        category="Hombres"
        isLoading={isLoading}
        status={status}
        data={data}
      />

      <ImagesSection
        categoryID="3"
        category="Mujeres"
        isLoading={isLoading}
        status={status}
        data={data}
      />

      <ImagesSection
        categoryID="4"
        category="Especiales"
        isLoading={isLoading}
        status={status}
        data={data}
      />
    </main>
  );
}
