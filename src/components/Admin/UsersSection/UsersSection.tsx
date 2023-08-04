"use client";

import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/utils/api";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import AdminSection from "@/components/Admin/Section/AdminSection";
import { UserCard } from "@/components/Admin/UserCard/UserCard";

interface UsersResponse {
  users: User[];
}
export default function UsersSection() {
  const { data, isLoading, status } = useQuery<UsersResponse>({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const { data: session } = useSession();

  useEffect(() => {
    if (data?.users) {
      data!.users = data!.users.filter(
        (user) => user.userID !== session!.user.userID
      );
    }
  }, [data, session]);

  return (
    <AdminSection title="Usuarios">
      {isLoading && (
        <div className="my-auto flex flex-col items-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}

      {!isLoading && status === "error" && (
        <p className="my-auto text-xl text-center">
          No se encontraron usuarios
        </p>
      )}

      {!isLoading && status === "success" && data.users.length <= 0 && (
        <p className="my-auto text-xl text-center">
          No se encontraron usuarios no utilizados en este momento
        </p>
      )}

      {!isLoading && status === "success" && (
        <div className="max-w-full grid grid-cols-3 gap-4 p-4">
          {data.users.map((user, index) => {
            if (user.userID === session!.user.userID) {
              return;
            }
            return <UserCard {...user} key={index} />;
          })}
        </div>
      )}
    </AdminSection>
  );
}
