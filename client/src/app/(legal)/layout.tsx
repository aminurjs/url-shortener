import Footer from "@/components/public/footer";
import Navbar from "@/components/public/navbar";

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <div className="py-24">{children}</div>
      <Footer />
    </>
  );
}
