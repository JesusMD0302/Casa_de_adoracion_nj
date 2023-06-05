import AdminHeader from "@/components/Admin/Header/AdminHeader";
import NavbarAdmin from "@/components/Admin/Navbar/NavbarAdmin";

export const metadata = {
  title: "Casa de adoración NJ | Administrador",
  description:
    "Armonia Unidad Restauraccion que las familias sean felices y disfruten de las promesas del señor",
};

export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navDrawerId = "nav-drawer";

  return (
    <NavbarAdmin id={navDrawerId}>
      <div className="relative min-h-screen bg-gray-100">
        <AdminHeader
          drawerID={navDrawerId}
          className="relative z-10 bg-[#B0123E] text-white"
        />
        {children}
      </div>
    </NavbarAdmin>
  );
}
