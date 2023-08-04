import { BsTrash, BsTrashFill } from "react-icons/bs";

export default function ImageCard({
  children,
  className,
  ...props
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Card */}
      <div
        className={`card w-full min-h-[12rem] rounded-md overflow-hidden ${className}`}
      >
        <div className="card-body relative">
          <figure className="overflow-hidden">{children}</figure>
        </div>
      </div>
    </>
  );
}
