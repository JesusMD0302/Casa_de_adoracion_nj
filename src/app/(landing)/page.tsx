import EventsSection from "@/components/Landing/Event/EventsSection";
import StartHereSection from "@/components/Landing/StartHere/StartHereSection";
import GalerySection from "@/components/Landing/Galery/GalerySection";
import MainHeader from "@/components/Landing/Header/MainHeader";
import AnnouncementSection from "@/components/Landing/AnnouncementSection/AnnouncementSection";


export default function Home() {
  return (
    <>
      <MainHeader />
      <main className="">
        <AnnouncementSection />
        <EventsSection />
        <StartHereSection />
        <GalerySection />
      </main>
    </>
  );
}
