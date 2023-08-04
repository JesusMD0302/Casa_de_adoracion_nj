"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import AdminSection from "../Section/AdminSection";
import { AdminEventCard } from "./AdminEventCard";
import { getAllEvents } from "@/utils/api";

interface AllEvents {
  events: AppEvent[];
}

export default function AllEventsSections() {
  const { data, isLoading, status} = useQuery<AllEvents>({
    queryKey: ["allEvents"],
    queryFn: getAllEvents,
  });

  return (
    <AdminSection title="Todos los eventos">
      {isLoading && (
        <div className="flex flex-col items-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}

      {/* Mapping events */}
      {!isLoading && status === "error" && (
        <p className="my-auto text-xl text-center">No hay eventos cercanos</p>
      )}

      {!isLoading && status === "success" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {data.events.map((event, index: any) => (
            <AdminEventCard
              key={index}
              {...event}
            />
          ))}
        </div>
      )}
    </AdminSection>
  );
}
