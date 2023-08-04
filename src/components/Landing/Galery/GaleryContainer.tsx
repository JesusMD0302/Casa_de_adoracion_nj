"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Title from "../Title/Title";
import { getData } from "@/utils/fetching";
import ImageCard from "./ImageCard";

function GaleryContainer({
  url,
  category,
  ...props
}: {
  url: string;
  category: string;
}) {
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
    <div className="h-full grid grid-rows-[auto_1fr] overflow-hidden">
      <div className="w-1/5 m-auto text-center text-logo">
        <Title title={category} />
      </div>
      {isLoading && (
        <div className="my-auto flex flex-col items-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}

      {!isLoading && images.length === 0 && (
        <p className="my-auto text-xl text-center">No hay imagenes en esta galería</p>
      )}

      {!isLoading && images.length > 0 && (
        <div className="mt-3 grid grid-cols-1 gap-3 overflow-y-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {images.map((image: any, index: any) => (
            <ImageCard className="image-card max-h-56" key={image.imageID}>
              <Image
                alt={`imagen ${category}`}
                src={`/galleries/${image.imageURL}`}
                fill
                className="object-cover"
              />
            </ImageCard>
          ))}
        </div>
      )}
    </div>
  );
}

export default GaleryContainer;
