"use client";

import { useForm, Controller } from "react-hook-form";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import ImageUploadField from "@/components/Admin/ImageUploadField/ImageUploadField";
import { GaleryOption } from "../GaleryOption/GaleryOption";
import AdminModal from "../AdminModal/AdminModal";
import { postImage } from "@/utils/api";
import useActive from "@/hooks/useActive";

export function UploadImageModal({
  modalId,
  formRecord,
}: AdminModalCreateProps) {
  const {
    active: showMessage,
    handleTrue: handleShowMessageTrue,
    handleFalse: handleShowMessageFalse,
  } = useActive(false);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: postImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["images"] });
    },
  });

  const {
    control,
    setValue,
    reset,
    handleSubmit: handleSubmitUseForm,
    formState: { errors, isSubmitted },
  } = useForm();

  const handleShowMessage = () => {
    handleShowMessageTrue();

    setTimeout(() => handleShowMessageFalse(), 1500);
  };

  const onSubmit = handleSubmitUseForm((data) => {
    const formData = new FormData();

    formData.append("gallery_id", data.gallery_id);
    
    (data.images as any[]).forEach((image) => {
      formData.append("images", image)
    }) ;


    mutation.mutate(formData);

    handleShowMessage();

    reset({
      gallery_id: "",
      images: "",
    });
  });

  return (
    <>
      {/* New Image Modal */}
      <AdminModal modalId={modalId}>
        <h3 className="text-center text-gray-800 font-bold text-xl">
          Subir una nueva imagen
        </h3>
        <form
          id="form-images"
          className="w-full mt-2 mx-auto flex flex-col gap-2"
          onSubmit={onSubmit}
        >
          <div className="w-full flex flex-col">
            <label htmlFor="galeries" className="label">
              <span className="label-text text-gray-700 font-bold">
                Galerías
              </span>
            </label>
            <div className="grid min-h-16 md:grid-cols-2 lg:grid-cols-4 gap-2">
              <Controller
                name="gallery_id"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <GaleryOption
                    imageURL="/ninios-banner.jpg"
                    optionName="Niños"
                    {...field}
                    value={1}
                  />
                )}
              />
              <Controller
                name="gallery_id"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <GaleryOption
                    imageURL="/hombres-banner.jpg"
                    optionName="Hombres"
                    {...field}
                    value={2}
                  />
                )}
              />
              <Controller
                name="gallery_id"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <GaleryOption
                    imageURL="/mujeres-banner.jpg"
                    optionName="Mujeres"
                    {...field}
                    value={3}
                  />
                )}
              />
              <Controller
                name="gallery_id"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <GaleryOption
                    imageURL="/especiales-banner.jpg"
                    optionName="Especiales"
                    {...field}
                    value={4}
                  />
                )}
              />
            </div>
          </div>
          {errors.gallery_id && (
            <span className="w-full px-3 py-2 bg-red-300 text-red-950 rounded-md">
              El campo es requerido
            </span>
          )}

          <Controller
            name="images"
            control={control}
            rules={{ required: true }}
            render={({ field: { name, ...field } }) => (
              <div className="form-control">
                {/* React hook form doesn't work yet with react dropzon */}
                <ImageUploadField setValue={setValue} name={name} />
              </div>
            )}
          />
          {errors.images && (
            <span className="w-full px-3 py-2 bg-red-300 text-red-950 rounded-md">
              El necesario seleccionar almenos una imagen
            </span>
          )}

          {isSubmitted && showMessage && (
            <p className={`w-fulll px-3 py-2 rounded-md ${mutation.isError ? "bg-red-600" : "bg-green-600"} text-white font-bold`}>
              {formRecord ? "Datos actualizado" : mutation.isError ? "Hubo un problema" : "Imagen(es) subidas"}
            </p>
          )}

          <div className="form-control">
            <input
              type="submit"
              value="Enviar"
              className="btn bg-logo text-white hover:bg-logo-900"
            />
          </div>
        </form>
      </AdminModal>
    </>
  );
}
