"use client";

import Image from "next/image";
import AdminSection from "../Section/AdminSection";
import ImageCard from "./ImageCard";
import { useEffect, useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { getData } from "@/utils/fetching";
import useActive from "@/hooks/useActive";

export default function ImagesSection({
  url,
  category,
  ...props
}: {
  url: string;
  category: string;
}) {
  const { active, handleToggle } = useActive();

  const [isLoading, setLoading] = useState<boolean>(true);
  const [status, setStatus] = useState<number>(0);
  const [images, setImages] = useState<[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      const { data, status } = await getData({
        url: url,
      });

      setStatus(status);

      if (status === 200) {
        setImages(data.gallery.Images);
      }

      setLoading(false);
    };

    fetchImages();
  }, [url]);

  return (
    <>
      <AdminSection title={category}>
        {isLoading && (
          <div className="flex flex-col items-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}

        {!isLoading && images.length === 0 && (
          <p className="text-xl text-center">No hay imagenes en esta galería</p>
        )}

        {/* Mapping images */}
        {!isLoading && images.length > 0 && (
          <>
            <div
              className={`
              ${active ? "" : "max-h-[25rem]"} min-h-[12rem] overflow-hidden`}
            >
              <div className="w-full min-h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {images.map((image: any, index: any) => (
                  <ImageCard className="image-card" key={image.imageID}>
                    <Image
                      alt={`imagen ${category}`}
                      src={`/galleries/${image.imageURL}`}
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
