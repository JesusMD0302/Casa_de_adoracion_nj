import AdminEventCard from "@/components/Admin/Event/AdminEventCard";

export default function AdminPage() {
  return (
    <main className="w-full max-w-container m-auto p-4">
      <section>
        <p className="text-center text-xl font-bold">Evento cercano</p>
        <div className="h-48 grid grid-cols-2 gap-2 md:grid-cols-4">
          <AdminEventCard />
        </div>
      </section>
    </main>
  );
}
