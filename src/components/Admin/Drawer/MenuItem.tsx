"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function MenuItem({
  title,
  icon,
  href = "/",
  ...props
}: {
  title: string;
  href?: string;
  icon?: React.ReactNode;
}) {
  const path = usePathname();
  const [active, setActive] = useState<boolean>(path === href);

  useEffect(() => {
    setActive(path === href);
  }, [path, href]);

  return (
    <li>
      <Link
        href={href}
        className={`px-3 py-2 flex gap-2 rounded items-center text-xl transition-all duration-200 
        ${active ? "bg-white text-logo" : ""}
        hover:bg-[#B0123E] focus:bg-white focus:text-logo outline-none`}
      >
        {icon}
        {title}
      </Link>
    </li>
  );
}

export default MenuItem;
