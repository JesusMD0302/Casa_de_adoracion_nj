import AdminEventCard from "@/components/Admin/Event/AdminEventCard";

export default function EventsPage() {
  return (
    <main className="main max-w-container m-auto p-4">
      <section className="mt-5">
        <p className="text-center text-xl font-bold">Evento cercano</p>
        <div className="mt-2 min-h-48 grid grid-cols-2 gap-2 md:grid-cols-4">
          <AdminEventCard />
        </div>
      </section>
      <section className="mt-5">
        <p className="text-center text-xl font-bold">Eventos cercanos</p>
        <div className="mt-2 min-h-48 grid grid-cols-2 gap-3 md:grid-cols-4">
          <AdminEventCard />
          <AdminEventCard />
          <AdminEventCard />
          <AdminEventCard />
          <AdminEventCard />
          <AdminEventCard />
        </div>
      </section>
      <section className="mt-5">
        <p className="text-center text-xl font-bold">Eventos pasados</p>
        <div className="mt-2 min-h-48 grid grid-cols-2 gap-3 md:grid-cols-4">
          <AdminEventCard />
          <AdminEventCard />
          <AdminEventCard />
          <AdminEventCard />
          <AdminEventCard />
          <AdminEventCard />
        </div>
      </section>
    </main>
  );
}
