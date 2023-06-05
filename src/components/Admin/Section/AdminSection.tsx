function AdminSection({
  title,
  children,
  ...props
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="mb-2">
      <p className="mb-2 text-center text-lg font-bold">{title}</p>
      {children}
    </section>
  );
}
export default AdminSection;
