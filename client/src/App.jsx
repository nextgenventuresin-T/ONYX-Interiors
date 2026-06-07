import { useCallback, useState } from "react";
import { useSmoothScroll } from "./lib/useSmoothScroll";
import Preloader from "./components/Preloader";
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import Intro from "./sections/Intro";
import Marquee from "./sections/Marquee";
import Services from "./sections/Services";
import Projects from "./sections/Projects";
import Showcase from "./sections/Showcase";
import Process from "./sections/Process";
import Stats from "./sections/Stats";
import Sponsors from "./sections/Sponsors";
import Testimonials from "./sections/Testimonials";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [lenis, setLenis] = useState(null);

  const handleLenis = useCallback((instance) => setLenis(instance), []);
  useSmoothScroll(handleLenis);

  return (
    <>
      {!loaded && <Preloader onDone={() => setLoaded(true)} />}
      <Navbar lenis={lenis} />
      <main className={loaded ? "is-loaded" : ""}>
        <Hero />
        <Intro />
        <Marquee />
        <Services />
        <Projects />
        <Showcase />
        <Process />
        <Stats />
        <Sponsors />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
