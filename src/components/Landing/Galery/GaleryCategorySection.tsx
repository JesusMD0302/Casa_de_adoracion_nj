"use client";

import Image from "next/image";
import Button from "../Button/Button";
import Title from "../Title/Title";
import Modal from "../Modal/Modal";
import useActive from "@/hooks/useActive";
import GaleryContainer from "./GaleryContainer";
import Section from "../Section/Section";

function GaleryCategorySection({
  urlImage,
  title,
  textContent,
  galleryURL,
  ...props
}: {
  title: string;
  urlImage: string;
  textContent: string;
  galleryURL: string;
}) {
  const { active, handleFalse, handleTrue } = useActive();

  return (
    <>
      <Section
        className="bg-black flex flex-col justify-center items-center"
        containerClassName="flex flex-col items-center gap-5"
        imgBackground
        imgBgURL={urlImage}
      >
        <Title title={title} />
        <p className="max-w-[75ch] text-center normal-case md:text-lg">{textContent}</p>
        <Button text={"Ver imagenes"} onClick={handleTrue} />
      </Section>
      {/*
        ----------- 
        Modal
        ----------- 
      */}
      {active ? (
        <Modal expanded handleModalFalse={handleFalse}>
          <GaleryContainer url={galleryURL} category={title} />
        </Modal>
      ) : null}
    </>
  );
}

export default GaleryCategorySection;
