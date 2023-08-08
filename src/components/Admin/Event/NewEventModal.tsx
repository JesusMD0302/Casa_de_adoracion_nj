"use client";

import "moment/locale/es";
import moment from "moment";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import useActive from "@/hooks/useActive";
import Input from "../Input/Input";
import TextArea from "../TextArea/TextArea";
import { useForm, Controller } from "react-hook-form";
import AdminModal from "../AdminModal/AdminModal";
import { postEvent, updateEvent } from "@/utils/api";
import { useEffect } from "react";

moment.locale("es");

export function NewEventModal({ modalId, formRecord }: AdminModalCreateProps) {
  const {
    active: showMessage,
    handleTrue: handleShowMessageTrue,
    handleFalse: handleShowMessageFalse,
  } = useActive(false);

  const { active, handleToggle, handleTrue } = useActive();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted },
  } = useForm({ defaultValues: formRecord as any });

  useEffect(() => {
    if (formRecord) {
      reset({ ...formRecord });
    }
  }, [formRecord, reset]);

  const queryClient = useQueryClient();

  const mutationForCreate = useMutation({
    mutationFn: postEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events", "allEvents"] });
    },
  });

  const mutationForUpdate = useMutation({
    mutationFn: updateEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events", "allEvents"] });
    },
  });

  const handleShowMessage = () => {
    handleShowMessageTrue();

    setTimeout(() => handleShowMessageFalse(), 1500);
  };

  const onSubmit = handleSubmit(async (data) => {
    if (formRecord) {
      mutationForUpdate.mutate({
        eventID: (formRecord as any).eventID,
        eventData: data,
      });

      if (mutationForUpdate.data?.event) {
        reset({ ...mutationForUpdate.data!.event });
      }
    } else {
      mutationForCreate.mutate(data);

      reset({
        title: "",
        ubication: "",
        description: "",
        startDate: "",
        endDate: "",
      });
    }

    handleShowMessage();
  });

  useEffect(() => {
    if ((formRecord as any)?.endDate) {
      handleTrue();
    }
  }, [formRecord, handleTrue]);

  return (
    <>
      {/* New Event Modal */}
      <AdminModal modalId={modalId}>
        <h3 className="text-center text-gray-800 font-bold text-lg">
          Crear un nuevo evento
        </h3>
        <form
          className="w-full mt-2 mx-auto flex flex-col gap-2"
          onSubmit={onSubmit}
        >
          {/* Event Title */}
          <Controller
            name="title"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                label="Título del evento"
                type="text"
                placeholder="Título"
                errors={errors.title}
                {...field}
              />
            )}
          />
          {/* Ubication */}
          <Controller
            name="ubication"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                label="Ubicación"
                type="text"
                placeholder="Ubicación"
                errors={errors.ubication}
                {...field}
              />
            )}
          />
          {/* Start Date */}
          <Controller
            name="startDate"
            control={control}
            rules={{ required: true, min: moment.utc().format("YYYY-MM-DDTHH:mm") }}
            render={({ field }) => (
              <Input
                label="Fecha del evento"
                alterLabel="Fecha actual o posteriores"
                type="datetime-local"
                placeholder="Fecha"
                min={moment.utc().format("YYYY-MM-DDTHH:mm")}
                errors={errors.startDate}
                {...field}
              />
            )}
          />

          {/* Checkbox for add end date to event */}
          <div className="form-control">
            <label className="label cursor-pointer justify-start gap-2">
              <input
                type="checkbox"
                className="checkbox checkbox-sm"
                onChange={handleToggle}
                checked={active}
              />
              <span className="label-text">Agregar fecha de finalización</span>
            </label>
          </div>

          {active && (
            <>
              {/* End Date */}
              <Controller
                name="endDate"
                control={control}
                rules={{ min: moment.utc().format("YYYY-MM-DDTHH:mm") }}
                render={({ field }) => (
                  <Input
                    label="Fecha de finalización del evento"
                    alterLabel="Fecha actual o posteriores"
                    type="datetime-local"
                    placeholder="Fecha"
                    min={moment.utc().format("YYYY-MM-DDTHH:mm")}
                    errors={errors.endDate}
                    {...field}
                  />
                )}
              />
            </>
          )}

          {/* Event Description */}
          <Controller
            name="description"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextArea
                label="Descripción del evento"
                cols={30}
                rows={4}
                placeholder="Descripción"
                errors={errors.description}
                {...field}
              />
            )}
          />

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
                ? "Datos actualizado"
                : mutationForCreate.isError ||
                  (formRecord && mutationForUpdate.isError)
                ? "Hubo un problema"
                : "Evento creado"}
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
