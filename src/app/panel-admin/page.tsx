import { AdminEventCard } from "@/components/Admin/Event/AdminEventCard";
import AdminSection from "@/components/Admin/Section/AdminSection";
import { getData } from "../../../utilities/fetching";
import { Suspense } from "react";

export default async function PanelAdminPage() {
  const { data, status } = await getData({
    url: "http://localhost:3000/api/events",
  });

  let nextEvent: { title: string; date: string; description: string } = {
    title: "",
    date: "",
    description: "",
  };

  if (status === 200) {
    nextEvent = data.nextEvent;
  }

  return (
    <main className="p-4">
      <AdminSection title="Evento cercano">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {status !== 200 ? (
            <p className="text-xl text-center">No hay eventos cercanos</p>
          ) : (
            <Suspense fallback={<div>Loading...</div>}>
              <AdminEventCard
                title={nextEvent.title}
                date={nextEvent.date}
                description={nextEvent.description}
              />
            </Suspense>
          )}
        </div>
      </AdminSection>
    </main>
  );
}
