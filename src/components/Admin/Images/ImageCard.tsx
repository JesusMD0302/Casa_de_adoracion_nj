import { BsTrash, BsTrashFill } from "react-icons/bs";

export default function ImageCard({
  children,
  className,
  handleDelete,
  elementID,
  ...props
}: {
  className?: string;
  handleDelete: (id: number) => void;
  elementID: number;
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Card */}
      <div
        className={`card w-full min-h-[12rem] rounded-md overflow-hidden ${className}`}
      >
        <div className="card-body relative">
          <div className="card-actions absolute top-0 right-0 z-[1] justify-end p-2">
            <button
              className="btn btn-circle transition-colors text-white bg-neutral hover:bg-logo btn-sm"
              onClick={() => handleDelete(elementID)}
            >
              <BsTrashFill size={15} />
            </button>
          </div>
          <figure className="overflow-hidden">{children}</figure>
        </div>
      </div>
    </>
  );
}
