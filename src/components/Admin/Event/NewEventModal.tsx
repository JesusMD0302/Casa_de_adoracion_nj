"use client";

import "moment/locale/es";
import moment from "moment";
import { AdminModal } from "../MenuCreate/MenuCreate";
import useActive from "@/hooks/useActive";
import Input from "../Input/Input";
import TextArea from "../TextArea/TextArea";
import { useForm, Controller } from "react-hook-form";
import { error } from "console";

moment.locale("es");

export function NewEventModal() {
  const { active, handleToggle } = useActive();
  const {
    control,
    handleSubmit: useFormHandleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = useFormHandleSubmit((data) => {
    console.warn(data);
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget as HTMLFormElement);

    const startDate = formData.get("startDate");
    const startDateHour = formData.get("startDateHour");

    formData.delete("startDate");
    formData.delete("startDateHour");

    formData.set("startDate", `${startDate}T${startDateHour}`);

    if (formData.get("endDate") && formData.get("endDateHour")) {
      const endDate = formData.get("endDate");
      const endDateHour = formData.get("endDateHour");

      formData.delete("endDate");
      formData.delete("endDateHour");

      formData.set("endDate", `${endDate}T${endDateHour}`);
    }

    const data: any = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });

    fetch("http://localhost:3000/api/events", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        location.reload();
      }
    });
  };

  return (
    <>
      {/* New Event Modal */}
      <AdminModal modalId="event_modal">
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
            render={({ field: { onChange } }) => (
              <Input
                label="Título del evento"
                type="text"
                placeholder="Título"
                onChange={(e) => onChange(e)}
                errors={errors.title}
              />
            )}
          />
          {/* Ubication */}
          <Controller
            name="ubication"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange } }) => (
              <Input
                label="Ubicación"
                type="text"
                placeholder="Ubicación"
                onChange={(e) => onChange(e)}
                errors={errors.ubication}
              />
            )}
          />
          {/* Start Date */}
          <Controller
            name="startDate"
            control={control}
            rules={{ required: true, min: moment().format("YYYY-MM-DD") }}
            render={({ field: { onChange } }) => (
              <Input
                label="Fecha del evento"
                alterLabel="Fecha actual o posteriores"
                type="date"
                placeholder="Fecha"
                onChange={(e) => onChange(e)}
                // min={moment().format("YYYY-MM-DD")}
                errors={errors.startDate}
              />
            )}
          />

          {/* Start Date Hour */}
          <Controller
            name="startDateHour"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange } }) => (
              <Input
                label="Hora del evento"
                alterLabel="Horas actual o posteriores"
                type="time"
                placeholder="Hora"
                min={moment().format("HH:mm")}
                onChange={(e) => onChange(e)}
                errors={errors.startDateHour}
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
                rules={{ min: moment().format("YYYY-MM-DD") }}
                render={({ field: { onChange } }) => (
                  <Input
                    label="Fecha de finalización del evento"
                    alterLabel="Fecha actual o posteriores"
                    type="date"
                    placeholder="Fecha"
                    min={moment().format("YYYY-MM-DD")}
                    onChange={(e) => onChange(e)}
                    errors={errors.endDate}
                  />
                )}
              />
              {/* End Date Hour */}
              <Controller
                name="endDateHour"
                control={control}
                rules={{ min: moment().format("HH:mm") }}
                render={({ field: { onChange } }) => (
                  <Input
                    label="Hora de finalización del evento"
                    type="time"
                    placeholder="Hora"
                    min={moment().format("HH:mm")}
                    onChange={(e) => onChange(e)}
                    errors={errors.endDateHour}
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
            render={({ field: { onChange } }) => (
              <TextArea
                label="Descripción del evento"
                cols={30}
                rows={4}
                placeholder="Descripción"
                onChange={(e) => onChange(e)}
                errors={errors.description}
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
