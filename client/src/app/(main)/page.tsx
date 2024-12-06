import AboutLinks from "@/components/public/about";
import Action from "@/components/public/action";
import Footer from "@/components/public/footer";
import Hero from "@/components/public/hero";
import QRCode from "@/components/public/qr-generator";
import { Testimonials } from "@/components/public/testimonial";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <Action />
      <AboutLinks />
      <QRCode />
      <Testimonials />
      <Footer />
    </div>
  );
}
