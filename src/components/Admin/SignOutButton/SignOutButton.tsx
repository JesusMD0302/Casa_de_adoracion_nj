"use client";

import { signOut } from "next-auth/react";
import { BsBoxArrowInRight } from "react-icons/bs";

export default function SignOutButton() {
  const confirmSignOut = () => {
    const res = confirm("¿Desea cerrar su sesión?");

    if (res) {
      signOut();
    }
  };

  return (
    <button onClick={confirmSignOut}>
      <BsBoxArrowInRight />
      Cerrar sesión
    </button>
  );
}
