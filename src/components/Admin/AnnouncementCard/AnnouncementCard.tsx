import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BsCalendarEventFill } from "react-icons/bs";
import { deleteAnnouncement } from "@/utils/api";
import AdminCard from "@/components/Admin/AdminCard/AdminCard";
import moment from "moment";
import TinyReader from "@/components/Admin/TinyReader/TinyReader";
import { NewAnnouncementModal } from "@/components/Admin/NewAnnouncementModal/NewAnnouncementModal";

interface AnnouncementProps {
  announcementID: number;
  title: string;
  announcementDate: string;
  announcementDescription: string;
  isImportant: boolean;
  updatedAt?: string;
}

export default function AnnouncementCard({
  announcementID,
  title,
  announcementDate,
  announcementDescription,
  isImportant,
  updatedAt,
}: AnnouncementProps) {
  const date = announcementDate === null ? moment() : moment(announcementDate);
  const formatedDate = date
    .add({ days: 1 })
    .format("DD/MMMM/YYYY")
    .toUpperCase();
  const updatedTime = moment(updatedAt).fromNow(true);

  const [formToUpdate, setFormToUpdate] = useState({
    announcementID,
    title,
    announcementDate: date.format("yyyy-MM-DD"),
    announcementDescription,
    isImportant,
  });

  const queryClient = useQueryClient();

  const mutationForDelete = useMutation({
    mutationFn: deleteAnnouncement,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
    },
  });

  const handleDelete = (announcementID: number) => {
    const res = confirm("¿Desea eliminar el aviso?");

    if (res) {
      mutationForDelete.mutate(announcementID);
    }
  };

  useEffect(() => {
    setFormToUpdate({
      announcementID,
      title,
      announcementDate: date.format("yyyy-MM-DD"),
      announcementDescription,
      isImportant,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [announcementID]);

  return (
    <>
      <AdminCard
        title={title}
        updatedTime={updatedTime}
        elementID={announcementID}
        handleDelete={handleDelete}
        modalID={`announcement-${announcementID}`}
      >
        <div className="indicator w-full">
          {isImportant && (
            <div className="indicator-item translate-x-1/3 badge badge-error">
              Importante
            </div>
          )}
          <div className="w-full">
            <p className="mt-2 flex gap-2 items-center justify-center text-base font-bold">
              <BsCalendarEventFill /> {formatedDate}
            </p>
            <TinyReader content={announcementDescription} />
          </div>
        </div>
      </AdminCard>
      <NewAnnouncementModal
        modalId={`announcement-${announcementID}`}
        formRecord={formToUpdate}
      />
    </>
  );
}
