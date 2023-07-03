import { AdminEventCard } from "@/components/Admin/Event/AdminEventCard";
import AdminSection from "@/components/Admin/Section/AdminSection";
import { getData } from "../../utils/fetching";
import { Suspense } from "react";

export default async function PanelAdminPage() {
  const { data, status } = await getData({
    url: "http://localhost:3000/api/events",
    isSSR: true,
  });

  let nextEvent: { title: string; startDate: string; description: string } = {
    title: "",
    startDate: "",
    description: "",
  };

  if (status === 200) {
    nextEvent = data.nextEvent;
    console.log(nextEvent);
  }

  return (
    <main className="p-4">
      <AdminSection title="Proximo evento">
        {status !== 200 ? (
          <p className="text-xl text-center">No hay un evento proximo</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Suspense fallback={<div>Loading...</div>}>
              <AdminEventCard
                title={nextEvent.title}
                date={nextEvent.startDate}
                description={nextEvent.description}
              />
            </Suspense>
          </div>
        )}
      </AdminSection>
    </main>
  );
}
