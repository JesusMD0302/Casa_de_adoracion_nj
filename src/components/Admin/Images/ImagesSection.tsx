"use client";

import Image from "next/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import AdminSection from "../Section/AdminSection";
import ImageCard from "./ImageCard";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import useActive from "@/hooks/useActive";
import { useEffect, useState } from "react";
import { deleteImage } from "@/utils/api";

export default function ImagesSection({
  categoryID,
  category,
  isLoading,
  status,
  data,
  ...props
}: {
  categoryID: string;
  category: string;
  isLoading: boolean;
  status: boolean | string;
  data: any;
}) {
  const { active, handleToggle } = useActive();
  const [images, setImages] = useState([]);

  const queryClient = useQueryClient();

  const mutationForDelete = useMutation({
    mutationFn: deleteImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["images"] });
    },
  });

  const handleDelete = (imageID: number) => {
    const res = confirm("¿Desea eliminar la imagen?");

    if (res) {
      mutationForDelete.mutate(imageID);
    }
  };

  useEffect(() => {
    if (!isLoading && status === "success") {
      setImages(
        data.images!.filter((image: any) => image.galleryID.toString() === categoryID)
      );
    }
  }, [isLoading, categoryID, data, status]);

  return (
    <>
      <AdminSection title={`Categoría - ${category}`}>
        {isLoading && (
          <div className="my-auto flex flex-col items-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}

        {!isLoading && images!.length <= 0 && (
          <p className="my-auto text-xl text-center">
            No hay imagenes en esta galería
          </p>
        )}

        {/* Mapping images */}
        {!isLoading && images!.length > 0 && (
          <>
            <div
              className={`
              ${active ? "" : "max-h-[25rem]"} min-h-[12rem] overflow-hidden`}
            >
              <div className="w-full min-h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {images.map((image: any, index: any) => (
                  <ImageCard className="image-card" handleDelete={handleDelete} elementID={image.imageID} key={image.imageID}>
                    <Image
                      alt={`imagen ${category}`}
                      src={`${image.imageURL}`}
                      fill
                      className="object-cover"
                    />
                  </ImageCard>
                ))}
              </div>
            </div>
            <button
              className={`flex gap-2 bg-logo py-2 px-3 mx-auto mt-4 items-center rounded-md text-white transition-all duration-300
              ${images.length <= 2 ? "hidden" : ""}
              ${images.length <= 6 ? "md:hidden" : ""}`}
              onClick={handleToggle}
            >
              {active ? (
                <>
                  Ver menos <BsChevronUp />
                </>
              ) : (
                <>
                  Ver más <BsChevronDown />
                </>
              )}
            </button>
          </>
        )}
      </AdminSection>

      <hr className="w-1/2 mx-auto my-2 h-1 border-t-2 border-gray-200" />
    </>
  );
}
