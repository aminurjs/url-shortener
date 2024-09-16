import AboutLinks from "@/components/about";
import Action from "@/components/action";
import Hero from "@/components/hero";
import { Testimonials } from "@/components/testimonial";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <Action />
      <AboutLinks />
      <Testimonials />
    </div>
  );
}
