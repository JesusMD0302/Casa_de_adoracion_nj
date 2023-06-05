import { AdminEventCard } from "@/components/Admin/Event/AdminEventCard";
import AdminSection from "@/components/Admin/Section/AdminSection";
import { getData } from "../../../../utilities/fetching";
import { BsPlus } from "react-icons/bs";

export default async function AdminEventPage() {
  const { data, status } = await getData({
    url: "http://localhost:3000/api/events",
  });

  return (
    <>
      <main className="p-4 bg-gray-100">
        <AdminSection title="Evento cercano">
          {/* Mapping the next event */}
          {status !== 200 ? (
            <p className="text-xl text-center">No hay eventos cercanos</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <AdminEventCard
                title={data.nextEvent.title}
                date={data.nextEvent.date}
                description={data.nextEvent.description}
              />
            </div>
          )}
        </AdminSection>
        <AdminSection title="Eventos">
          {/* Mapping events */}
          {status !== 200 || data.events.length === 0 ? (
            <p className="text-xl text-center">No hay eventos cercanos</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.events.map((event: any, index: any) => (
                <AdminEventCard
                  key={index}
                  title={event.title}
                  date={event.date}
                  description={event.description}
                />
              ))}
            </div>
          )}
        </AdminSection>
      </main>
      <button className="fixed bottom-3 right-3 md:bottom-5 md:right-10 btn btn-lg md:btn-md btn-circle btn-success text-white">
        <BsPlus className="text-3xl" />
      </button>
    </>
  );
}
