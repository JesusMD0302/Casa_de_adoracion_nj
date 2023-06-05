import Footer from "@/components/Landing/Footer/Footer";
import EventsSection from "@/components/Landing/Event/EventsSection";
import StartHereSection from "@/components/Landing/StartHere/StartHereSection";
import GalerySection from "@/components/Landing/Galery/GalerySection";
import MainHeader from "@/components/Landing/Header/MainHeader";

export default function Home() {
  return (
    <>
      <MainHeader />
      <main className="">
        <EventsSection />
        <StartHereSection />
        <GalerySection />
      </main>
      <Footer />
    </>
  );
}
