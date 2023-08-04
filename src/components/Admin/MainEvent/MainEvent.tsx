"use client";

import { useQuery } from "@tanstack/react-query";
import { AdminEventCard } from "../Event/AdminEventCard";
import AdminSection from "../Section/AdminSection";
import { getEvents } from "@/utils/api";

interface event {
  nextEvent: AppEvent;
}

export default function MainEvent() {
  const { data, isLoading, status } = useQuery<event>({
    queryKey: ["events"],
    queryFn: getEvents,
  });

  return (
    <AdminSection title="Proximo evento">
      {isLoading && (
        <div className="my-auto flex flex-col items-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}

      {!isLoading && status === "error" && (
        <p className="my-auto text-xl text-center">No hay un evento proximo</p>
      )}

      {!isLoading && status === "success" && (
        <div>
          <AdminEventCard {...data.nextEvent} />
        </div>
      )}
    </AdminSection>
  );
}
