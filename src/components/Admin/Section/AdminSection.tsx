function AdminSection({
  title,
  children,
  ...props
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="mb-2 min-h-[8rem] grid grid-rows-[min-content_auto]">
      <p className="mb-2 text-center text-lg font-bold">{title}</p>
      <div className="w-full h-full grid place-items-center">{children}</div>
    </section>
  );
}
export default AdminSection;
