import About from "./landing/About";
import Hero from "./landing/Hero";
import Steps from "./landing/Steps";
import Faq from './landing/Faq'
import Footer from "./landing/Footer";

export default function Home() {
  return (
    <div className="bg-[#14121D]">
      <Hero />
      <About />
      <Steps />
      <Faq/>
      <Footer/>
    </div>
  );
}
