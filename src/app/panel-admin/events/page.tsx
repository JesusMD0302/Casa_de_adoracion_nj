import NearEventsSection from "@/components/Admin/Event/NearEventsSection";
import AllEventsSections from "@/components/Admin/Event/AllEventsSections";

export default function AdminEventsPage() {
  return (
    <main className="p-4">
      <NearEventsSection />

      <hr className="w-1/2 mx-auto my-2 h-1 border-t-2 border-gray-200" />

      <AllEventsSections />
    </main>
  );
}
