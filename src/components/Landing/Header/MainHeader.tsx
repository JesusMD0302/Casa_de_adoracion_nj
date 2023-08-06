"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Button from "../Button/Button";
import { Header } from "./Header";
import { getData } from "@/utils/fetching";
import TinyReader from "@/components/Admin/TinyReader/TinyReader";

function MainHeader() {
  const [psalm, setPsalm] = useState<string>("");
  const [status, setStatus] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWeelPsalm = async () => {
      try {
        const { data, status } = await getData({
          url: `${process.env.NEXTAUTH_URL}/api/week-psalms`,
        });

        setStatus(status);

        if (status === 200) {
          setPsalm(data.weekPsalm.content as string);
        }
      } catch (error) {
        setStatus(500);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeelPsalm();
  }, []);

  return (
    <Header imgURL="/baner.jpg" altImg="Banner de la página principal">
      <div className="max-w-container h-full m-auto">
        <div className="relative z-10 md:w-80 h-full bg-logo/80 text-white flex flex-col gap-3 justify-center items-center px-4">
          {isLoading && (
            <span className="loading loading-spinner loading-lg"></span>
          )}

          {!isLoading && status !== 200 && (
            <p className="text-justify text-xl">
              No se encontro el salmo semanal
            </p>
          )}

          {!isLoading && status === 200 && (
            <TinyReader content={psalm} />
          )}

          <Button>
            <Link href={"/start-here"}>Leer Más</Link>
          </Button>
        </div>
      </div>
    </Header>
  );
}

export default MainHeader;
