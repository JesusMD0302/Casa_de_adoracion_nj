import "../globals.css";
export const metadata = {
  title: "Casa de adoración NJ | Administración",
  description:
    "Armonia Unidad Restauraccion que las familias sean felices y disfruten de las promesas del señor",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
