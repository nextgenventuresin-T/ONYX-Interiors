import { useCallback, useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSmoothScroll } from "./lib/useSmoothScroll";
import Preloader from "./components/Preloader";
import Navbar from "./components/Navbar";
import Footer from "./sections/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail";
import Flats from "./pages/Flats";
import Admin from "./pages/Admin";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [lenis, setLenis] = useState(null);
  const location = useLocation();

  const handleLenis = useCallback((instance) => setLenis(instance), []);
  useSmoothScroll(handleLenis);

  // On route change: jump to top, then once the new page has painted,
  // recalc Lenis dimensions + ScrollTrigger so the page renders immediately
  // (without this, stale measurements from the previous page leave it blank
  // until a manual refresh).
  useEffect(() => {
    window.scrollTo(0, 0);
    if (lenis) lenis.scrollTo(0, { immediate: true });

    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        if (lenis) lenis.resize();
        ScrollTrigger.refresh();
      });
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [location.pathname, lenis]);

  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <>
      {!loaded && !isAdmin && <Preloader onDone={() => setLoaded(true)} />}
      {!isAdmin && <Navbar lenis={lenis} />}
      <main className={loaded ? "is-loaded" : ""}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="/flats" element={<Flats />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      {!isAdmin && <Footer />}
      {!isAdmin && <WhatsAppButton />}
    </>
  );
}
