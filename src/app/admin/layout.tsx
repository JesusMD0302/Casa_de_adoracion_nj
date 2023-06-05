import NavbarAdmin from "@/components/Admin/Navbar/NavbarAdmin";
import "../globals.css";
export const metadata = {
  title: "Casa de adoración NJ | Administración",
  description:
    "Armonia Unidad Restauraccion que las familias sean felices y disfruten de las promesas del señor",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="relative">
        <NavbarAdmin />
        {children}
      </body>
    </html>
  );
}
