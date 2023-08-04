"use client";

import { useQuery } from "@tanstack/react-query";
import AdminSection from "@/components/Admin/Section/AdminSection";
import { getAnnouncements } from "@/utils/api";
import AnnouncementCard from "@/components/Admin/AnnouncementCard/AnnouncementCard";

export default function AdminAnnouncementsPage() {
  const { data, isLoading, status } = useQuery({
    queryKey: ["announcements"],
    queryFn: getAnnouncements,
  });

  return (
    <main className="p-4">
      <AdminSection title="Avisos">
        {isLoading && (
          <div className="my-auto flex flex-col items-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}

        {!isLoading && status === "error" && (
          <p className="my-auto text-xl text-center">
            No se encontraron avisos
          </p>
        )}

        {!isLoading && status === "success" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data!.announcements.map((announcement: any, index: number) => (
              <AnnouncementCard {...announcement} key={index} />
            ))}
          </div>
        )}
      </AdminSection>
    </main>
  );
}