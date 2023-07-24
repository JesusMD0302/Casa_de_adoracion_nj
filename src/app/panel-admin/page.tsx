import { AdminEventCard } from "@/components/Admin/Event/AdminEventCard";
import AdminSection from "@/components/Admin/Section/AdminSection";
import { getData } from "../../utils/fetching";
import { Suspense } from "react";
import WeekPsalm from "@/components/Admin/WeekPsalm/WeekPsalm";

export default async function PanelAdminPage() {
  const { data, status } = await getData({
    url: "http://localhost:3000/api/events",
    isSSR: true,
  });

  let nextEvent: {
    title: string;
    startDate: string;
    description: string;
    updatedAt: string;
  } = {
    title: "",
    startDate: "",
    description: "",
    updatedAt: "",
  };

  if (status === 200) {
    nextEvent = data.nextEvent;
  }

  return (
    <main className="p-4 grid grid-cols-1 md:grid-cols-2">
      <WeekPsalm />
      <AdminSection title="Proximo evento">
        {status !== 200 ? (
          <p className="text-xl text-center">No hay un evento proximo</p>
        ) : (
          <div className="">
            <Suspense fallback={<div>Loading...</div>}>
              <AdminEventCard
                title={nextEvent.title}
                date={nextEvent.startDate}
                description={nextEvent.description}
                updatedAt={nextEvent.updatedAt}
              />
            </Suspense>
          </div>
        )}
      </AdminSection>
    </main>
  );
}
