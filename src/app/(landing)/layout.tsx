import Footer from "@/components/Landing/Footer/Footer";
import Navbar from "@/components/Landing/Navbar/Navbar";
import WhatsappButton from "@/components/Landing/WhatsappButton/WhatsappButton";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
      <WhatsappButton />
      <Footer />
    </>
  );
}
