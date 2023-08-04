import Providers from "./Providers";
import AdminHeader from "@/components/Admin/Header/AdminHeader";
import Drawer from "@/components/Admin/Drawer/Drawer";

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
  const drawerId = "nav-drawer";

  return (
    <Providers>
        <Drawer id={drawerId}>
          <div className="relative min-h-screen bg-gray-100">
            <AdminHeader
              drawerID={drawerId}
              className="relative z-10 bg-[#B0123E] text-white"
            />
            {children}
          </div>
        </Drawer>
    </Providers>
  );
}
