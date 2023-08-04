import Footer from "@/components/Landing/Footer/Footer";
import Navbar from "@/components/Landing/Navbar/Navbar";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
