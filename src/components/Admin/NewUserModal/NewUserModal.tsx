"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import Input from "../Input/Input";
import AdminModal from "../AdminModal/AdminModal";
import useActive from "@/hooks/useActive";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postUser } from "@/utils/api";
import { userSchema } from "@/schemas/schemas";

export function NewUserModal({ modalId, formRecord }: AdminModalCreateProps) {
  const {
    active: showMessage,
    handleTrue: handleShowMessageTrue,
    handleFalse: handleShowMessageFalse,
  } = useActive(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted },
  } = useForm({
    resolver: zodResolver(userSchema)
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: postUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const handleShowMessage = () => {
    handleShowMessageTrue();

    setTimeout(() => handleShowMessageFalse(), 1500);
  };

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);

    handleShowMessage();

    reset({
      userName: "",
      email: "",
      password: "",
    });
  });

  return (
    <>
      {/* New User Modal */}
      <AdminModal modalId={modalId}>
        <h3 className="text-center text-gray-800 font-bold text-lg">
          Crear un nuevo usuario
        </h3>
        <form
          className="w-full mt-2 mx-auto flex flex-col gap-2"
          onSubmit={onSubmit}
        >
          {/* User name */}
          <Controller
            name="userName"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                label="Nombre del usuario"
                type="text"
                placeholder="Nombre"
                {...field}
                errors={errors.userName}
                errorMessage={errors.userName?.message as string}
              />
            )}
          />
          {/* Email */}
          <Controller
            name="email"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                label="Correo Electronico"
                type="text"
                placeholder="ejemplo@correo.com"
                {...field}
                errors={errors.email}
                errorMessage={errors.email?.message as string}
              />
            )}
          />
          {/* Password */}
          <Controller
            name="password"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                label="Contraseña"
                type="password"
                placeholder="********"
                {...field}
                errors={errors.password}
                errorMessage={errors.password?.message as string}
              />
            )}
          />

          {isSubmitted && showMessage && (
            <p className="w-fulll px-3 py-2 rounded-md bg-green-600 text-white font-bold">
              {formRecord ? "Datos actualizados" : "Usuario creado"}
            </p>
          )}

          <div className="form-control">
            <input
              type="submit"
              value="Enviar"
              className="btn bg-logo text-white hover:bg-logo-900 outline-none"
            />
          </div>
        </form>
      </AdminModal>
    </>
  );
}
