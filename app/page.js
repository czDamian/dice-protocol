import About from "../components/landing/About";
import Hero from "../components/landing/Hero";
import Steps from "../components/landing/Steps";
import Faq from "../components/landing/Faq";
import Footer from "../components/landing/Footer";

export default function Home() {
  return (
    <div className="bg-[#14121D]">
      <Hero />
      <About />
      <Steps />
      <Faq />
      <Footer />
    </div>
  );
}
