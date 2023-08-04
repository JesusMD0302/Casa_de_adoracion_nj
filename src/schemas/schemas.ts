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
  startDate: z
    .date({
      invalid_type_error: "Fecha de inicio invalida",
      required_error: "Es necesaria una fecha de inicio",
    })
    .min(new Date(), {
      message: "La fecha de inicio no puede ser anterior al día de hoy",
    }),
  endDate: z
    .date({
      required_error: "La fecha de termino es invalida",
      invalid_type_error: "La fecha de termino es invalida",
    })
    .min(new Date(), {
      message: "La fecha de termino no puede ser anterior al día de hoy",
    })
    .optional(),
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

export const announcementSchema = z.object({
  title: z
    .string({
      invalid_type_error: "Titulo invalido",
      required_error: "Es necesario un título",
    })
    .nonempty("Es necesario un título")
    .min(5, "El titulo es muy corto"),
  announcementDate: z.coerce
    .date({
      required_error: "La fecha es necesaria",
      invalid_type_error: "La fecha del aviso es invalida",
    })
    .min(new Date(Date.now() - 1000 * 60 * 60 * 24), {
      message: "La fecha no puede ser anterior al día de hoy",
    }),
  announcementDescription: z
    .string({
      invalid_type_error: "Aviso invalido",
      required_error: "Es necesario un aviso",
    })
    .nonempty("Es necesario un aviso")
    .min(5, "El aviso es muy corto"),
  isImportant: z.boolean({
    required_error: "El campo es necesario",
    invalid_type_error: "El valor ingresado no es valido",
  }),
});

export const loginSchema = z.object({
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

export const changePasswordSchema = z
  .object({
    newPassword: z
      .string({
        invalid_type_error: "Contraseña invalida",
        required_error: "Es necesaria una contraseña",
      })
      .nonempty("Es necesaria una contraseña")
      .min(10, "La contraseña tiene que ser minimo 8 caracteres")
      .regex(
        /[A-Z]/,
        "La contraseña debe contener al menos una letra mayúscula"
      )
      .regex(
        /[a-z]/,
        "La contraseña debe contener al menos una letra minúscula"
      )
      .regex(/[0-9]/, "La contraseña debe contener al menos un número"),
    confirmPassword: z
      .string({
        invalid_type_error: "Contraseña invalida",
        required_error: "Es necesaria una contraseña",
      })
      .nonempty("Es necesaria una contraseña")
      .min(10, "La contraseña tiene que ser minimo 8 caracteres")
      .regex(
        /[A-Z]/,
        "La contraseña debe contener al menos una letra mayúscula"
      )
      .regex(
        /[a-z]/,
        "La contraseña debe contener al menos una letra minúscula"
      )
      .regex(/[0-9]/, "La contraseña debe contener al menos un número"),
  })
  .refine((data) => data.confirmPassword === data.newPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export const emailSchema = z.object({
  name: z
    .string({
      invalid_type_error: "Nombre invalido",
      required_error: "Es necesario un nombre",
    })
    .nonempty("Es necesario un nombre")
    .min(5, "El nombre es muy corto"),
  email: z
    .string({
      invalid_type_error: "Email invalido",
      required_error: "Es necesario un email",
    })
    .nonempty("Es necesario un email")
    .toLowerCase()
    .email("Email invalido"),

  subject: z
    .string({
      invalid_type_error: "El asunto invalido",
      required_error: "Es necesario un asunto",
    })
    .nonempty("Es necesario un asunto")
    .min(5, "El asunto es muy corto")
    .optional(),
  message: z
    .string({
      invalid_type_error: "Mensaje invalido",
      required_error: "Es necesario un mensaje",
    })
    .nonempty("Es necesario un mensaje")
    .min(5, "El mensaje es muy corto"),
});
