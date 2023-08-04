import Image from "next/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BsFillEnvelopeAtFill, BsPersonCircle } from "react-icons/bs";
import { deleteUser } from "@/utils/api";

export function UserCard({ email, userID, userName }: User) {
  const queryClient = useQueryClient();

  const mutationForDelete = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const handleDelete = (userID: number) => {
    const res = confirm("¿Desea eliminar el usario?");

    if (res) {
      mutationForDelete.mutate(userID);
    }
  };

  return (
    <div className="card card-compact bg-neutral text-base-100 w-full">
      <figure className="bg-white relative h-24">
        <Image
          src="/logo-horizontal.png"
          alt="Shoes"
          fill
          className="object-contain h-full"
        />
      </figure>
      <div className="card-body p-4">
        <p className="text-lg">
          <span className="flex gap-2 items-center font-bold">
            <BsPersonCircle /> Usuario:
          </span>
          <span className="block text-sm">{userName}</span>
        </p>
        <p className="text-lg">
          <span className="flex gap-2 items-center font-bold">
            <BsFillEnvelopeAtFill /> Correo:
          </span>
          <span className="block text-sm">{email}</span>
        </p>
        <div className="card-actions">
          <button
            className="btn btn-block border-none bg-logo-600 hover:bg-logo text-white btn-sm"
            onClick={() => handleDelete(userID as number)}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
