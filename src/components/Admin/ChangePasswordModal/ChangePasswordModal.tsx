"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changePasswordSchema } from "@/schemas/schemas";
import Input from "../Input/Input";
import AdminModal from "../AdminModal/AdminModal";
import useActive from "@/hooks/useActive";
import { changePassword } from "@/utils/api";

export default function ChangePasswordModal({
  modalId,
  ...props
}: {
  modalId: string;
}) {
  const { data: session } = useSession();

  const {
    active: showMessage,
    handleTrue: handleShowMessageTrue,
    handleFalse: handleShowMessageFalse,
  } = useActive(false);

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm({ resolver: zodResolver(changePasswordSchema) });

  const queryClient = useQueryClient();

  const mutation = useMutation({ mutationFn: changePassword });

  const handleShowMessage = () => {
    handleShowMessageTrue();

    setTimeout(() => handleShowMessageFalse(), 1500);
  };

  const onSubmit = handleSubmit((data) => {
    mutation.mutate({ userID: session!.user.userID, changePasswordData: data });

    handleShowMessage();

    reset({
      newPassword: "",
      confirmPassword: "",
    });
  });

  return (
    <AdminModal modalId={modalId}>
      <h3 className="text-center text-gray-800 font-bold text-lg">
        Cambiar contraseña
      </h3>
      <form
        className="w-full mt-2 mx-auto flex flex-col gap-2"
        onSubmit={onSubmit}
      >
        {/* New password */}
        <Controller
          name="newPassword"
          control={control}
          render={({ field }) => (
            <Input
              label="Nueva contraseña"
              type="password"
              placeholder="*********"
              {...field}
              errors={errors.newPassword}
              errorMessage={errors.newPassword?.message as string}
              // errorMessage="El campo es requerido"
            />
          )}
        />

        {/* Confirm Password */}
        <Controller
          name="confirmPassword"
          control={control}
          rules={{
            validate: (value, formValues) => value === formValues.newPassword,
          }}
          render={({ field }) => (
            <Input
              label="Confirmar contraseña"
              type="password"
              placeholder="*********"
              {...field}
              errors={errors.confirmPassword}
              errorMessage={errors.confirmPassword?.message as string}
            />
          )}
        />

        {isSubmitted && showMessage && (
          <p className="w-fulll px-3 py-2 rounded-md bg-green-600 text-white font-bold">
            Datos actualizados
          </p>
        )}

        <div className="form-control">
          <input
            type="submit"
            value="Actualizar"
            className="btn bg-logo text-white hover:bg-logo-900 outline-none"
          />
        </div>
      </form>
    </AdminModal>
  );
}
