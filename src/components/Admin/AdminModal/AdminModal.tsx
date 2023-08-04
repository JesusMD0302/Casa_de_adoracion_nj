export default function AdminModal({
  modalId,
  children,
  ...props
}: {
  modalId: string;
  children?: React.ReactNode;
}) {
  return (
    <>
      <input type="checkbox" id={modalId} className="modal-toggle" />
      <div className="modal text-gray-700 z-50">
        <div className="modal-box max-w-2xl">{children}</div>
        <label className="modal-backdrop" htmlFor={modalId}>
          Close
        </label>
      </div>
    </>
  );
}
