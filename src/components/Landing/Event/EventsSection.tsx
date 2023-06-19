"use client";

import Countdown from "react-countdown";
import moment, { Moment } from "moment";
import "moment/locale/es";
import { useState, useEffect } from "react";
import CountdownTimer from "@/components/Landing/Timer/CountdownTimer";
import Modal from "@/components/Landing/Modal/Modal";
import useActive from "@/hooks/useActive";
import PrayerForm from "@/components/PrayerForm";
import EventsContainer from "@/components/Landing/Event/EventsContainer";
import Button from "@/components/Landing/Button/Button";
import Section from "../Section/Section";
import DateInfo from "../DateInfo/DateInfo";
import { getData } from "../../../utils/fetching";
import { formatDate } from "../../../utils/formatingDates";

function EventsSection() {
  const {
    active: eventsActive,
    handleTrue: handleTrueEvents,
    handleFalse: handleFalseEvents,
  } = useActive();
  const {
    active: prayerActive,
    handleTrue: handleTruePrayer,
    handleFalse: handleFalsePrayer,
  } = useActive();

  const [isLoading, setLoading] = useState<boolean>(true);
  const [status, setStatus] = useState<number>();
  const [nextEvent, setNextEvent] = useState<{
    title: string;
    date: string;
    description: string;
  }>();
  const [events, setEvents] = useState<[]>([]);

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
      <Section
        id="events"
        containerClassName="h-full py-10 flex flex-col justify-between"
        imgBackground
        imgBgURL="/eventos-banner.jpg"
      >
        <div className="flex flex-col items-center">
          {isLoading && (
            <span className="loading loading-spinner loading-lg"></span>
          )}

          {!isLoading && status !== 200 && (
            <p className="text-center text-xl p-20">No hay eventos cercanos</p>
          )}

          {!isLoading && status === 200 && (
            <>
              <DateInfo
                date={formatDate({ date: nextEvent?.date ?? "" })}
                title={nextEvent?.title ?? ""}
              />
              <Countdown
                date={moment(nextEvent?.date ?? "").toDate()}
                renderer={CountdownTimer}
              />
            </>
          )}
        </div>
        <div className="w-full flex flex-col gap-2 md:gap-5 md:flex-row justify-between items-center">
          <Button text={"Solicitar oración"} onClick={handleTruePrayer} />

          <Button
            text={"Ver próximos eventos"}
            underline
            onClick={handleTrueEvents}
          />
        </div>
      </Section>

      {/* 
        ----------- 
        Solictar oración modal
        ----------- 
      */}
      {prayerActive ? (
        <Modal handleModalFalse={handleFalsePrayer}>
          <PrayerForm />
        </Modal>
      ) : null}

      {/* 
        ----------- 
        Proximos eventos modal
        ----------- 
       */}
      {eventsActive ? (
        <Modal handleModalFalse={handleFalseEvents}>
          <EventsContainer events={events} isLoading={isLoading} />
        </Modal>
      ) : null}
    </>
  );
}

export default EventsSection;
