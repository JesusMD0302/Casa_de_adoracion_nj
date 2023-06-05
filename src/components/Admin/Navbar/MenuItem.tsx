import Link from "next/link";

function MenuItem({
  title,
  icon,
  href = "/panel",
  ...props
}: {
  title: string;
  href?: string;
  icon?: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="px-3 py-2 flex gap-2 rounded items-center text-xl transition-all duration-200 hover:bg-[#B0123E] md:text-base outline-none"
      >
        {icon}
        {title}
      </Link>
    </li>
  );
}

export default MenuItem;
