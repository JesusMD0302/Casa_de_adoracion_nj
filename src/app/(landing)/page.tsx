import Footer from "@/components/Landing/Footer/Footer";
import EventsSection from "@/components/Landing/Event/EventsSection";
import StartHereSection from "@/components/Landing/StartHere/StartHereSection";
import GalerySection from "@/components/Landing/Galery/GalerySection";
import MainHeader from "@/components/Landing/Header/MainHeader";
import Section from "@/components/Landing/Section/Section";
import Title from "@/components/Landing/Title/Title";

import { RiCalendar2Line } from "react-icons/ri";
import { AiOutlinePlusCircle } from "react-icons/ai";

export default function Home() {
  return (
    <>
      <MainHeader />
      <main className="">
        <Section className="h-auto bg-gray-800" containerClassName="min-h-full">
          <div className="flex flex-col items-center gap-5 py-5">
            <Title title="Avisos semanales" color="white" />
            <div className="h-[calc(20rem_+_2rem)] p-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-rows-[1fr] gap-3 overflow-y-auto">
              <AnnouncementCard
                content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
        eveniet harum architecto rem vero incidunt nesciunt aperiam nostrum
        ducimus, libero nobis, nihil ad impedit iusto maiores quae sapiente
        excepturi aliquid quo quia laborum. Mollitia vitae ab maiores iure
        voluptas odit blanditiis, tempore veniam alias vel earum perspiciatis
        nesciunt, nulla quisquam!"
              />
              <AnnouncementCard
                content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
        eveniet harum architecto rem vero incidunt nesciunt aperiam nostrum
        ducimus, libero nobis, nihil ad impedit iusto maiores quae sapiente
        excepturi aliquid quo quia laborum."
              />
              <AnnouncementCard
                content="vero incidunt nesciunt aperiam nostrum
        ducimus, libero nobis, nihil ad impedit iusto maiores quae sapiente
        excepturi aliquid quo quia laborum. Mollitia vitae ab maiores iure
        voluptas odit blanditiis, tempore veniam alias vel earum perspiciatis
        nesciunt, nulla quisquam!"
              />
              <AnnouncementCard
                content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
        eveniet harum architecto rem vero incidunt nesciunt aperiam nostrum
        ducimus, libero nobis, nihil ad impedit iusto maiores quae sapiente
        excepturi aliquid quo quia"
              />
              <AnnouncementCard
                content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
        eveniet harum architecto rem vero incidunt nesciunt aperiam nostrum
        ducimus, libero nobis, nihil ad impedit iusto maiores quae sapiente
        excepturi aliquid quo quia laborum. Mollitia vitae ab maiores iure
        voluptas odit blanditiis."
              />
              <AnnouncementCard
                content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
        eveniet harum architecto rem vero incidunt nesciunt aperiam nostrum
        ducimus, libero nobis, nihil ad impedit iusto maiores quae sapiente
        excepturi aliquid quo quia laborum. Mollitia vitae ab maiores iure
        voluptas odit blanditiis."
              />
              <AnnouncementCard
                content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
        eveniet harum architecto"
              />
            </div>
          </div>
        </Section>
        <EventsSection />
        <StartHereSection />
        <GalerySection />
      </main>
      <Footer />
    </>
  );
}

export function AnnouncementCard({ content, ...props }: { content: string }) {
  return (
    <div className="h-[20rem] flex flex-col gap-[0.625rem] justify-between p-5 bg-white text-[#747474] rounded-[0.625rem] border-white shadow-[0_3px_10px_rgb(0,0,0,0.3)]">
      <div>
        <h2 className="text-[#195A94] text-[1.375rem] font-semibold">
          Nuevo aviso
        </h2>
        <div className="flex items-center justify-center">
          <RiCalendar2Line />
          <span className="px-2 tracking-[0.09rem]">24 Oct, 2021</span>
        </div>
        <p className="text-justify overflow-hidden text-ellipsis line-clamp-6">
          {content}
        </p>
      </div>
      <div className="flex flex-col gap-[0.625rem]">
        <hr className="border-t-2 justify-self-end" />
        <button
          className={`px-4 py-3 text-base md:px-2 md:py-1 rounded-sm border border-white transition-all ease-linear duration-200 md:text-lg active:scale-90 justify-self-end bg-[#195A94] text-white hover:bg-[#0f3b61] `}
        >
          <p className="flex gap-[0.625rem] items-center justify-center text-[0.8125rem]">
            Leer más
            <AiOutlinePlusCircle />
          </p>
        </button>
      </div>
    </div>
  );
}
