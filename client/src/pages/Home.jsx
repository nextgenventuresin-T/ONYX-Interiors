import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../sections/Hero";
import Intro from "../sections/Intro";
import Marquee from "../sections/Marquee";
import Services from "../sections/Services";
import Projects from "../sections/Projects";
import Showcase from "../sections/Showcase";
import Process from "../sections/Process";
import Stats from "../sections/Stats";
import Sponsors from "../sections/Sponsors";
import Testimonials from "../sections/Testimonials";
import Contact from "../sections/Contact";

export default function Home() {
  const location = useLocation();

  // Scroll to a #section when arriving from another page (e.g. nav links)
  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 300);
    }
  }, [location]);

  return (
    <>
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
    </>
  );
}
