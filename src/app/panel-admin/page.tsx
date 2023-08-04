import WeekPsalm from "@/components/Admin/WeekPsalm/WeekPsalm";
import MainEvent from "@/components/Admin/MainEvent/MainEvent";

export default async function PanelAdminPage() {

  return (
    <main className="p-4 grid grid-cols-1 md:grid-cols-[2fr_1fr]">
      <WeekPsalm />
      <MainEvent />
    </main>
  );
}
