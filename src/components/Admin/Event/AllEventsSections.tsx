"use client";

import React, { useEffect, useState } from "react";
import AdminSection from "../Section/AdminSection";
import { getData } from "@/utils/fetching";
import { AdminEventCard } from "./AdminEventCard";

export default function AllEventsSections() {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [status, setStatus] = useState<number>();
  const [events, setEvents] = useState<[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, status } = await getData({
        url: "http://localhost:3000/api/events/all",
      });

      setStatus(status);

      if (status === 200) {
        setEvents(data.events);
      }

      setLoading(false);
    };

    fetchEvents();
  }, []);

  return (
    <AdminSection title="Todos los eventos">
      {isLoading && (
        <div className="flex flex-col items-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}

      {/* Mapping events */}
      {!isLoading && (status !== 200 || events.length === 0) ? (
        <p className="text-xl text-center">No hay eventos registrados</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {events.map((event: any, index: any) => (
            <AdminEventCard
              key={index}
              title={event.title}
              date={event.startDate}
              description={event.description}
              updatedAt={event.updatedAt}
            />
          ))}
        </div>
      )}
    </AdminSection>
  );
}
