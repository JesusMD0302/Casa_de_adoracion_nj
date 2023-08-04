"use client";

import axios from "@/lib/axios";
import { AxiosError } from "axios";
import { createContext, useState, useContext } from "react";
import { object } from "zod";

export const Context = createContext({});

export function EventsContext({ children }: { children: React.ReactNode }) {
  const [events, setEvents] = useState<AppEvent[]>();
  const [nextEvent, setNextEvent] = useState<AppEvent>();

  const getEvents = async () => {
    try {
      const res = await axios.get("/events/200");
      console.log(res.data.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response);
      }
    }
  };

  const createEvent = (data: AppEvent) => {
    axios
      .post("/events", data)
      .then((res) => res.status)
      .catch((error) => console.log(error));
  };

  return (
    <Context.Provider value={{ events, nextEvent, getEvents }}>
      {children}
    </Context.Provider>
  );
}

export function useEvents() {
  return useContext(Context) as EventContext;
}
