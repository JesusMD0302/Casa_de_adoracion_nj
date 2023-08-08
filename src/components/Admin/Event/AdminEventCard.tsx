import "moment/locale/es";
import moment from "moment";
import AdminCard from "../AdminCard/AdminCard";
import { NewEventModal } from "./NewEventModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteEvent } from "@/utils/api";
moment.locale("es");

export function AdminEventCard({
  eventID,
  title = "Titulo",
  ubication,
  startDate: startDateEvent = null,
  endDate: endDateEvent = null,
  description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id adipisci voluptatem debitis aliquam repudiandae, ipsum deserunt explicaboquis quae dolore odio et error.",
  updatedAt = null,
  ...props
}: {
  eventID?: number | string;
  title?: string;
  ubication?: string;
  startDate?: string | null;
  endDate?: string | null;
  description?: string;
  updatedAt?: string | null;
}) {
  const date = startDateEvent == null ? moment() : moment.utc(startDateEvent);
  const endDateMoment = endDateEvent === null ? moment() : moment.utc(endDateEvent);
  const formatedDate = date.format("DD/MMMM/YYYY - h:mm a").toUpperCase();
  const formatedEndDate = endDateMoment
    .format("DD/MMMM/YYYY - h:mm a")
    .toUpperCase();
  const updatedTime = moment.utc(updatedAt).fromNow(true);

  let formToUpdate = {
    eventID,
    title,
    description,
    ubication,
    startDate: date.format("yyyy-MM-DDTHH:mm"),
  };

  if (endDateEvent) {
    formToUpdate = {
      ...formToUpdate,
      endDate: endDateMoment.format("yyyy-MM-DDTHH:mm"),
    } as any;
  }

  const queryClient = useQueryClient();

  const mutationForDelete = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events", "allEvents"] });
    },
  });

  const handleDelete = (eventID: number) => {
    const res = confirm("¿Desea eliminar el evento?");

    if (res) {
      mutationForDelete.mutate(eventID);
    }
  };

  return (
    <>
      <AdminCard
        modalID={`Event-${eventID}`}
        title={title}
        updatedTime={updatedTime}
        handleDelete={handleDelete}
        elementID={eventID as number}
      >
        <div>
          <p className="mt-2 text-lg md:text-base font-bold">
            <span className="block font-normal text-xs">Inicia</span>
            {formatedDate}
          </p>
          {endDateEvent && (
            <p className="mt-2 text-lg md:text-base font-bold">
              <span className="block font-normal text-xs">Finaliza</span>
              {formatedEndDate}
            </p>
          )}
          <p className="mt-2 overflow-hidden line-clamp-6 md:line-clamp-4 text-ellipsis text-base md:text-base">
            {description}
          </p>
        </div>
      </AdminCard>
      <NewEventModal modalId={`Event-${eventID}`} formRecord={formToUpdate} />
    </>
  );
}
