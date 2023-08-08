"use client";

import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import TinyEditor from "@/components/Admin/TinyEditor/TinyEditor";
import AdminSection from "../Section/AdminSection";
import useActive from "@/hooks/useActive";
import { getWeekPsalm, updateWeekPsalm } from "@/utils/api";

export default function WeekPsalm() {
  const { active, handleTrue } = useActive(false);
  const {
    active: showMessage,
    handleTrue: handleShowMessageTrue,
    handleFalse: handleShowMessageFalse,
  } = useActive(false);

  const handleShowMessage = () => {
    handleShowMessageTrue();

    setTimeout(() => handleShowMessageFalse(), 1500);
  };

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm();

  const { data, isLoading, status } = useQuery({
    queryKey: ["weekPsalm"],
    queryFn: getWeekPsalm,
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateWeekPsalm,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["weekPsalm"] });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);

    handleShowMessage();
  });

  const handleChangeEditor = (
    editor: string,
    onChange: (editor: string) => void
  ) => {
    handleTrue();
    onChange(editor);
  };

  useEffect(() => {
    if (!isLoading && status === "success") {
      reset({
        content: data.content,
      });
    }
  }, [reset, data, isLoading, status]);

  return (
    <AdminSection title="Salmo semanal">
      {isLoading && (
        <div className="my-auto flex flex-col items-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}

      {!isLoading && status === "error" && (
        <p className="my-auto text-xl text-center">
          No se encotro el salmo semanal
        </p>
      )}

      {isSubmitted && showMessage && (
        <div className="px-8 mb-2">
          <p
            className={`w-fulll px-3 py-2 rounded-md ${
              mutation.isError ? "bg-red-500" : "bg-blue-800"
            } text-white font-bold`}
          >
            {mutation.isError ? "Hubo un problema" : "Salmo actualizado"}
          </p>
        </div>
      )}

      {!isLoading && status === "success" && (
        <form className="flex flex-col gap-4 px-8" onSubmit={onSubmit}>
          <div className="shadow-md shadow-slate-900/50 rounded-md">
            <Controller
              name="content"
              control={control}
              defaultValue="Contenido del aviso"
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <>
                  <div>
                    <TinyEditor
                      height={300}
                      onEditorChange={(editor) => {
                        handleChangeEditor(editor, onChange);
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
              value="Actualizar"
              className="btn bg-logo text-white hover:bg-logo-900 outline-none"
              disabled={!active}
            />
          </div>
        </form>
      )}
    </AdminSection>
  );
}
