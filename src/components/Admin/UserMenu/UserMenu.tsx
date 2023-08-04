"use client";

import { BsPersonCircle } from "react-icons/bs";
import { MdPassword } from "react-icons/md";
import ChangePasswordModal from "../ChangePasswordModal/ChangePasswordModal";
import SignOutButton from "../SignOutButton/SignOutButton";
import { useSession } from "next-auth/react";

export function UserMenu() {
  const { data } = useSession();

  return (
    <>
      <div className="dropdown dropdown-end">
        <label
          tabIndex={1}
          className="btn btn-outline btn-circle btn-sm text-2xl p-0 text-white 
      active:bg-logo-800 md:active:bg-none 
      md:hover:bg-logo-800 border-none
       border-white grid place-items-center"
        >
          <BsPersonCircle />
        </label>
        <ul
          tabIndex={1}
          className="p-2 mt-1 shadow menu dropdown-content bg-gray-600 rounded-md min-w-[14rem] [&_li>*]:rounded-md"
        >
          <li>
            <label className="text-lg font-bold">{data?.user.userName}</label>
          </li>
          <div className="divider my-0"></div>
          <li>
            <label htmlFor="change-password">
              <MdPassword />
              Cambiar contraseña
            </label>
          </li>
          <li>
            <SignOutButton />
          </li>
        </ul>
      </div>
      <ChangePasswordModal modalId="change-password" />
    </>
  );
}
