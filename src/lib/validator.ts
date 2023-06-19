import { ValidateFormDataError } from "@/utils/errors";

export function ValidateFormData(data: FormData) {
  let messages: object[] = [];

  const id = data.get("galleryId");
  const file = data.get("file") as Blob;

  const galleryId = Number(id);

  if (isNaN(galleryId) || id === null) {
    messages = [
      ...messages,
      {
        message: "El id no es valido",
      },
    ];
  }

  if (!(file instanceof Blob)) {
    messages = [
      ...messages,
      {
        messag: "La imagen no es valida",
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

  if (messages.length > 0) {
    throw new ValidateFormDataError("Error de en los datos", messages);
  }

  return { file, galleryId };
}
