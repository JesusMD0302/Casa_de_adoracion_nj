import { ValidateFormDataError } from "@/utils/errors";

export function ValidateFormData(data: FormData) {
  let messages: object[] = [];

  const id = data.get("gallery_id");
  const files = data.getAll("images") as Blob[];

  const galleryId = Number(id);

  if (isNaN(galleryId) || id === null) {
    messages = [
      ...messages,
      {
        message: "El id no es valido",
      },
    ];
  }

  if (files.length <= 0 || (files[0] instanceof Blob && files[0].name === "")) {
    messages = [
      ...messages,
      {
        message: "Es necesario ingresar al menos una imagen",
      },
    ];
  }

  files.forEach((file) => {
    if (!(file instanceof Blob)) {
      messages = [
        ...messages,
        {
          message: "La imagen no es valida",
        },
      ];
    }

    if (
      file instanceof Blob &&
      file.type !== "image/png" &&
      file.type !== "image/jpg" &&
      file.type !== "image/jpeg"
    ) {
      messages = [
        ...messages,
        {
          message: "El tipo de archivo, no es valido",
        },
      ];
    }
  });

  if (messages.length > 0) {
    throw new ValidateFormDataError("Error de en los datos", messages);
  }

  return { files, galleryId };
}
