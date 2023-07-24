"use client";

import { useForm, Controller } from "react-hook-form";
import Input from "../Input/Input";
import { AdminModal } from "../MenuCreate/MenuCreate";

export function NewUserModal() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <>
      {/* New User Modal */}
      <AdminModal modalId="user_modal">
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
            render={({ field: { onChange } }) => (
              <Input
                label="Nombre del usuario"
                type="text"
                placeholder="Nombre"
                onChange={(e) => onChange(e)}
                errors={errors.userName}
                errorMessage="El campo es requerido"
              />
            )}
          />
          {/* Email */}
          <Controller
            name="email"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange } }) => (
              <Input
                label="Correo Electronico"
                type="text"
                placeholder="ejemplo@correo.com"
                onChange={(e) => onChange(e)}
                errors={errors.email}
                errorMessage="El campo es requerido"
              />
            )}
          />
          {/* Password */}
          <Controller
            name="password"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange } }) => (
              <Input
                label="Contraseña"
                type="password"
                placeholder="********"
                onChange={(e) => onChange(e)}
                errors={errors.password}
                errorMessage="El campo es requerido"
              />
            )}
          />
          <div className="form-control">
            <input
              type="submit"
              value="Submit"
              className="btn bg-logo text-white hover:bg-logo-900 outline-none"
            />
          </div>
        </form>
      </AdminModal>
    </>
  );
}
