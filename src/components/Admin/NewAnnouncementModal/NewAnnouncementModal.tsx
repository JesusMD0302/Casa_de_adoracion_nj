"use client";

import moment from "moment";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TinyEditor from "@/components/Admin/TinyEditor/TinyEditor";
import Input from "../Input/Input";
import AdminModal from "../AdminModal/AdminModal";
import { announcementSchema } from "@/schemas/schemas";
import useActive from "@/hooks/useActive";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postAnnouncement, updateAnnouncement } from "@/utils/api";
import { useEffect } from "react";

moment.locale("es");

export function NewAnnouncementModal({
  modalId,
  formRecord,
}: AdminModalCreateProps) {
  const {
    active: showMessage,
    handleTrue: handleShowMessageTrue,
    handleFalse: handleShowMessageFalse,
  } = useActive(false);

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted },
  } = useForm({
    resolver: zodResolver(announcementSchema),
    defaultValues: formRecord as any,
  });

  useEffect(() => {
    if (formRecord) {
      reset({ ...formRecord });
    }
  }, [formRecord, reset]);

  const queryClient = useQueryClient();

  const mutationForCreate = useMutation({
    mutationFn: postAnnouncement,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
    },
  });

  const mutationForUpdate = useMutation({
    mutationFn: updateAnnouncement,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
    },
  });

  const handleShowMessage = () => {
    handleShowMessageTrue();

    setTimeout(() => handleShowMessageFalse(), 1500);
  };

  const onSubmit = handleSubmit((data) => {
    if (formRecord) {
      mutationForUpdate.mutate({
        announcementID: (formRecord as any).announcementID,
        announcementData: data,
      });

      if (mutationForUpdate.data?.announcement) {
        reset({ ...mutationForUpdate.data.announcement });
      }
    } else {
      mutationForCreate.mutate(data);
      reset({
        title: "",
        announcementDate: "",
        announcementDescription: "",
        isImportan: false,
      });
    }

    handleShowMessage();
  });

  return (
    <>
      {/* New Announcement Modal */}
      <AdminModal modalId={modalId}>
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
            render={({ field }) => (
              <Input
                label="Titulo"
                type="text"
                placeholder="Titulo"
                {...field}
                errors={errors.title}
                errorMessage={errors.title?.message as string}
              />
            )}
          />
          {/* Announcement Date */}
          <Controller
            name="announcementDate"
            control={control}
            rules={{ required: true, min: moment().format("YYYY-MM-DD") }}
            render={({ field }) => (
              <Input
                label="Fecha"
                alterLabel="Fecha actual o posteriores"
                type="date"
                min={moment().format("YYYY-MM-DD")}
                {...field}
                errors={errors.announcementDate}
                errorMessage={errors.announcementDate?.message as string}
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
          {errors.isImportant && (
            <span className="w-full px-3 py-2 bg-red-300 text-red-950 rounded-md">
              {errors.isImportant?.message as string}
            </span>
          )}

          {/* Announcement Description */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-700 font-bold">Aviso</span>
            </label>
            <Controller
              name="announcementDescription"
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
                  {errors.announcementDescription && (
                    <span className="w-full px-3 py-2 bg-red-300 text-red-950 rounded-md">
                      {errors.announcementDescription?.message as string}
                    </span>
                  )}
                </>
              )}
            />
          </div>

          {isSubmitted && showMessage && (
            <p
              className={`w-fulll px-3 py-2 rounded-md ${
                mutationForCreate.isError ||
                (formRecord && mutationForUpdate.isError)
                  ? "bg-red-500"
                  : "bg-green-600"
              } text-white font-bold`}
            >
              {formRecord
                ? "Datos actualizados"
                : mutationForCreate.isError ||
                  (formRecord && mutationForUpdate.isError)
                ? "Hubo un problema"
                : "Aviso creado"}
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
