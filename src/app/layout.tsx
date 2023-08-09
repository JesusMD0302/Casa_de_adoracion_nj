import { initialize } from "@/utils/init";
import "./globals.css";

export const metadata = {
  title: "Casa de adoración NJ",
  description:
    "Armonia Unidad Restauraccion que las familias sean felices y disfruten de las promesas del señor",
};

initialize();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" data-theme="light">
      <body className="scroll-smooth min-h-screen w-full">
        {children}
      </body>
    </html>
  );
}
