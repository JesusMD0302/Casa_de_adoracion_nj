"use client";

import TinyReader from "@/components/Admin/TinyReader/TinyReader";
import moment from "moment";
import { BsExclamationCircleFill } from "react-icons/bs";
import { RiCalendar2Line } from "react-icons/ri";

interface AnnouncementProps {
  title: string;
  announcementDate: string;
  announcementDescription: string;
  isImportant: boolean;
}

export default function AnnouncementCard({
  title,
  announcementDate,
  announcementDescription,
  isImportant,
}: AnnouncementProps) {
  const date = moment.utc(announcementDate);
  const formatedDate = date
    .add({ days: 1 })
    .format("DD MMMM, YYYY")
    .toUpperCase();

  if (isImportant) {
    return (
      <div className="max-h-[20rem] flex flex-col gap-[0.625rem] justify-between p-5 bg-logo-500 text-white rounded-[0.625rem] border-white shadow-[0_3px_10px_rgb(0,0,0,0.3)]">
        <div>
          <h2 className="text-white text-[1.15rem] font-semibold flex items-center gap-2 ">
            <BsExclamationCircleFill />
            {title}
          </h2>
          <div className="flex items-center justify-center">
            <RiCalendar2Line />
            <span className="px-2 tracking-[0.09rem]">{formatedDate}</span>
          </div>
          <TinyReader content={announcementDescription} />
        </div>
      </div>
    );
  }

  return (
    <div className="max-h-[20rem] flex flex-col gap-[0.625rem] justify-between p-5 bg-white text-[#747474] rounded-[0.625rem] border-white shadow-[0_3px_10px_rgb(0,0,0,0.3)]">
      <div>
        <h2 className="text-[#195A94] text-[1.25rem] font-semibold">{title}</h2>
        <div className="flex items-center justify-center">
          <RiCalendar2Line />
          <span className="px-2 tracking-[0.09rem]">{formatedDate}</span>
        </div>
        <TinyReader content={announcementDescription} />
      </div>
    </div>
  );
}
