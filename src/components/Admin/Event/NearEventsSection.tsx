"use client";

import { useQuery } from "@tanstack/react-query";
import AdminSection from "../Section/AdminSection";
import { AdminEventCard } from "./AdminEventCard";
import { getEvents } from "@/utils/api";

interface events {
  events: AppEvent[];
  nextEvent: AppEvent;
}

export default function NearEventsSection() {
  const { data, isLoading, status, error } = useQuery<events>({
    queryKey: ["events"],
    queryFn: getEvents,
  });

  return (
    <>
      {/* Mapping the next event */}
      <AdminSection title="Proximo evento">
        {isLoading && (
          <div className="my-auto flex flex-col items-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}

        {!isLoading && status === "error" && (
          <p className="my-auto text-xl text-center">
            No hay un evento proximo
          </p>
        )}

        {!isLoading && status === "success" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            <AdminEventCard {...data.nextEvent} />
          </div>
        )}
      </AdminSection>

      <hr className="w-1/2 mx-auto my-2 h-1 border-t-2 border-gray-200" />

      <AdminSection title="Eventos cercanos">
        {isLoading && (
          <div className="my-auto flex flex-col items-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}
        {/* Mapping events */}
        {!isLoading && status === "error" && (
          <p className="my-auto text-xl text-center">No hay eventos cercanos</p>
        )}
        {!isLoading && status === "success" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {data!.events.map((event, index: number) => (
              <AdminEventCard key={index} {...event} />
            ))}
          </div>
        )}
      </AdminSection>
    </>
  );
}
