import { AdminEventCard } from "@/components/Admin/Event/AdminEventCard";
import AdminSection from "@/components/Admin/Section/AdminSection";
import { getData } from "../../../utils/fetching";

export default async function AdminEventsPage() {
  const { data, status } = await getData({
    url: "http://localhost:3000/api/events",
    isSSR: true,
  });

  const { data: allEventsData, status: allEventsStatus } = await getData({
    url: "http://localhost:3000/api/events/all",
  });

  return (
    <>
      <main className="p-4">
        <AdminSection title="Proximo evento">
          {/* Mapping the next event */}
          {status !== 200 ? (
            <p className="text-xl text-center">No hay un evento proximo</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <AdminEventCard
                title={data.nextEvent.title}
                date={data.nextEvent.startDate}
                description={data.nextEvent.description}
              />
            </div>
          )}
        </AdminSection>

        <hr className="w-1/2 mx-auto my-2 h-1 border-t-2 border-gray-200" />

        <AdminSection title="Eventos cercanos">
          {/* Mapping events */}
          {status !== 200 || data.events.length === 0 ? (
            <p className="text-xl text-center">No hay eventos cercanos</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {data.events.map((event: any, index: any) => (
                <AdminEventCard
                  key={index}
                  title={event.title}
                  date={event.startDate}
                  description={event.description}
                />
              ))}
            </div>
          )}
        </AdminSection>

        <hr className="w-1/2 mx-auto my-2 h-1 border-t-2 border-gray-200" />

        <AdminSection title="Todos los eventos">
          {/* Mapping events */}
          {allEventsStatus !== 200 || allEventsData.events.length === 0 ? (
            <p className="text-xl text-center">No hay eventos registrados</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {allEventsData.events.map((event: any, index: any) => (
                <AdminEventCard
                  key={index}
                  title={event.title}
                  date={event.startDate}
                  description={event.description}
                />
              ))}
            </div>
          )}
        </AdminSection>
      </main>
    </>
  );
}
