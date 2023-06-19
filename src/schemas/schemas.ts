import { File } from "buffer";
import { z } from "zod";

export const eventSchema = z.object({
  title: z
    .string({
      invalid_type_error: "Titulo invalido",
      required_error: "Es necesario un titulo",
    })
    .nonempty("Es necesario un titulo")
    .min(5, "El titulo es muy corto"),
  description: z
    .string({
      invalid_type_error: "Descripción invalida",
      required_error: "Es necesario una descripción",
    })
    .nonempty("Es necesario una descripción")
    .min(5, "La descripción es muy corta"),
  ubication: z
    .string({
      invalid_type_error: "Ubicación invalida",
      required_error: "Es necesario una ubicación",
    })
    .nonempty("Es necesario una ubicación")
    .min(5, "Ubicación invalida"),
});

export const gallerySchema = z.object({
  name: z
    .string({
      invalid_type_error: "Nombre de galería invalido",
      required_error: "Es necesario un nombre de galeria",
    })
    .nonempty("Es necesario un nombre de galeria")
    .min(5, "El nombre de la galeria es muy corto"),
});

export const userSchema = z.object({
  userName: z
    .string({
      invalid_type_error: "Nombre de usuario invalido",
      required_error: "Es necesario un nombre de usuario",
    })
    .nonempty("Es necesario un nombre de usuario")
    .min(5, "El nombre de usario es muy corto"),
  email: z
    .string({
      invalid_type_error: "Email invalido",
      required_error: "Es necesario un email",
    })
    .nonempty("Es necesario un email")
    .toLowerCase()
    .email("Email invalido"),
  password: z
    .string({
      invalid_type_error: "Contraseña invalida",
      required_error: "Es necesaria una contraseña",
    })
    .nonempty("Es necesaria una contraseña")
    .min(10, "La contraseña tiene que ser minimo 8 caracteres")
    .regex(/[A-Z]/, "La contraseña debe contener al menos una letra mayúscula")
    .regex(/[a-z]/, "La contraseña debe contener al menos una letra minúscula")
    .regex(/[0-9]/, "La contraseña debe contener al menos un número"),
});
