"use client";

import { getData } from "@/utils/fetching";
import AdminSection from "../Section/AdminSection";
import { AdminEventCard } from "./AdminEventCard";
import { useEffect, useState } from "react";

type Event = {
  title: string;
  startDate: string;
  description: string;
  updatedAt: string;
};

export default function NearEventsSection() {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [status, setStatus] = useState<number>();
  const [nextEvent, setNextEvent] = useState<Event>();
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, status } = await getData({
        url: "http://localhost:3000/api/events",
      });

      setStatus(status);

      if (status === 200) {
        setNextEvent(data.nextEvent);
        setEvents(data.events);
      }

      setLoading(false);
    };

    fetchEvents();
  }, []);

  return (
    <>
      {/* Mapping the next event */}
      <AdminSection title="Proximo evento">
        {isLoading ? (
          <div className="flex flex-col items-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : status !== 200 || nextEvent === undefined ? (
          <p className="text-xl text-center">No hay un evento proximo</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <AdminEventCard
              title={nextEvent!.title}
              date={nextEvent!.startDate}
              description={nextEvent!.description}
              updatedAt={nextEvent!.updatedAt}
            />
          </div>
        )}
      </AdminSection>

      <hr className="w-1/2 mx-auto my-2 h-1 border-t-2 border-gray-200" />

      <AdminSection title="Eventos cercanos">
        {isLoading && (
          <div className="flex flex-col items-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}
        {/* Mapping events */}
        {!isLoading && (status !== 200 || events.length === 0) ? (
          <p className="text-xl text-center">No hay eventos cercanos</p>
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
    </>
  );
}
