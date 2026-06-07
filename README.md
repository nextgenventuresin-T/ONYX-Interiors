# Atelier — Luxury Interior Design Studio

A cinematic, single-page interior-design studio site inspired by high-end
studio portfolios. **React + Vite** frontend with **GSAP** + **ScrollTrigger**
animations and **Lenis** smooth scroll; **Node/Express** backend serving
project/service data and handling enquiries.

## Stack
- **Frontend:** React 18, Vite, GSAP (ScrollTrigger), Lenis
- **Backend:** Node, Express
- **Fonts:** Fraunces (serif display) + Jost (sans)

## Structure
```
client/   React app
  src/
    components/   Navbar, Preloader, SmartImage
    sections/     Hero, Intro, Marquee, Services, Projects,
                  Showcase, Process, Stats, Testimonials, Contact, Footer
    lib/          useSmoothScroll (Lenis+GSAP), useReveal
    styles/       index.css  (full design system)
  public/assets/  ← drop your images & video here (see assets/README.md)
server/   Express API (projects, services, contact)
```

## Run it
```bash
# from the project root
npm install            # root tooling (concurrently)
npm run install:all    # installs client + server deps too
npm run dev            # runs client (5173) + server (5000) together
```
Then open http://localhost:5173

Run separately if you prefer:
```bash
npm run dev:client
npm run dev:server
```

## Add your media
See [`client/public/assets/README.md`](client/public/assets/README.md) for the
exact filenames each slot expects. Until a file exists, a labelled gradient
placeholder shows in its place, so nothing ever looks broken.

## Build for production
```bash
npm run build          # outputs client/dist
```

## Animations included
- Smooth inertia scrolling (Lenis) synced to GSAP ScrollTrigger
- Counting preloader with masked text reveal
- Hero masked line-reveal + media parallax
- Velocity-skewed infinite marquee
- Scroll-reveal on every section (`[data-reveal]`)
- Pinned horizontal showcase strip (desktop)
- Animated counting stats
