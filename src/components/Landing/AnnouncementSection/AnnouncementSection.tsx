"use client";

import Section from "@/components/Landing/Section/Section";
import Title from "@/components/Landing/Title/Title";
import AnnouncementCard from "@/components/Landing/AnnouncementCard/AnnouncementCard";
import { useEffect, useState } from "react";
import { getData } from "@/utils/fetching";

interface Announcement {
  title: string;
  announcementDate: string;
  announcementDescription: string;
  isImportant: boolean;
}

export default function AnnouncementSection() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [status, setStatus] = useState<number>();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, status } = await getData({
        url: `${process.env.URL}/api/announcements`,
      });

      setStatus(status);

      if (status === 200) {
        setAnnouncements(data.announcements);
      }

      setIsLoading(false);
    };

    fetchEvents();
  }, []);

  return (
    <Section className="h-auto bg-gray-800" containerClassName="min-h-full">
      <div className="flex flex-col items-center gap-5 py-5">
        <Title title="Avisos" color="white" />
        {isLoading && (
          <div className="h-[15rem] w-full flex justify-center items-center">
            <span className="my-auto loading loading-spinner loading-lg"></span>
          </div>
        )}

        {!isLoading && status !== 200 && (
          <div className="h-[15rem] w-full flex justify-center items-center">
            <p className="text-center text-xl p-20">No hay eventos cercanos</p>
          </div>
        )}

        {!isLoading && status === 200 && (
          <div className="h-[calc(20rem_+_2rem)] p-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-rows-[1fr] gap-3 overflow-y-auto">
            {announcements.map((announcement, index) => (
              <AnnouncementCard {...announcement} key={index} />
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
