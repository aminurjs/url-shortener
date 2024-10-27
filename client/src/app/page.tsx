import AboutLinks from "@/components/about";
import Action from "@/components/action";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import QRCode from "@/components/qr-generator";
import { Testimonials } from "@/components/testimonial";

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
