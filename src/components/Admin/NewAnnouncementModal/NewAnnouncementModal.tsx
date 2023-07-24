"use client";

import TinyEditor from "@/components/TinyEditor/TinyEditor";
import { AdminModal } from "../MenuCreate/MenuCreate";
import moment from "moment";
import Input from "../Input/Input";
import { Controller, useForm } from "react-hook-form";

moment.locale("es");

export function NewAnnouncementModal() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <>
      {/* New Announcement Modal */}
      <AdminModal modalId="announcement_modal">
        <h3 className="text-center text-gray-800 font-bold text-lg">
          Crear nuevo aviso
        </h3>
        <form
          className="w-full mt-2 mx-auto flex flex-col gap-2"
          onSubmit={onSubmit}
        >
          {/* Announcement title */}
          <Controller
            name="title"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange } }) => (
              <Input
                label="Titulo"
                type="text"
                placeholder="Titulo"
                onChange={(e) => onChange(e)}
                errors={errors.title}
                errorMessage="El campo es requerido"
              />
            )}
          />
          {/* Announcement Date */}
          <Controller
            name="date"
            control={control}
            rules={{ required: true, min: moment().format("YYYY-MM-DD") }}
            render={({ field: { onChange } }) => (
              <Input
                label="Fecha"
                alterLabel="Fecha actual o posteriores"
                type="date"
                min={moment().format("YYYY-MM-DD")}
                onChange={(e) => onChange(e)}
                errors={errors.date}
              />
            )}
          />

          {/* Announcement is importan */}
          <div className="form-control">
            <label className="label cursor-pointer justify-start gap-2">
              <input
                type="checkbox"
                className="checkbox checkbox-sm"
                {...register("isImportant")}
              />
              <span className="label-text">Aviso importante</span>
            </label>
          </div>

          {/* Announcement Description */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-700 font-bold">Aviso</span>
            </label>
            <Controller
              name="editor"
              control={control}
              defaultValue="Contenido del aviso"
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <>
                  <div>
                    <TinyEditor
                      height={300}
                      onEditorChange={(editor) => {
                        onChange(editor);
                      }}
                      value={value}
                    />
                  </div>
                  {errors.editor && (
                    <span className="w-full px-3 py-2 bg-red-300 text-red-950 rounded-md">
                      El campo es requerido
                    </span>
                  )}
                </>
              )}
            />
          </div>
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
