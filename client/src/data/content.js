// Single source of truth for the homepage grid AND the project detail pages.
// `cover` is the homepage card + page hero. `gallery` are the extra images on
// the detail page + auto-slider. These currently reuse the real images already
// in the repo so every page is fully populated; drop project-specific photos
// later and update these paths (see assets/IMAGE-ARRANGEMENT.md).

const c = (f) => `/assets/images/projects/${f}.jpg`;
const g = (f) => `/assets/images/gallery/${f}.jpg`;
// per-project gallery image: pg("courtyard-pool", 3) -> .../courtyard-pool/03.jpg
const pg = (id, n) => `/assets/images/projects/${id}/${String(n).padStart(2, "0")}.jpg`;
const galleryOf = (id, count = 5) => Array.from({ length: count }, (_, i) => pg(id, i + 1));

export const projects = [
  {
    id: "azure-villa",
    title: "Azure Villa",
    category: "Residential",
    location: "Gurgaon",
    year: "2025",
    cover: c("azure-villa"),
    services: ["Interior Design", "Architecture", "Styling"],
    excerpt:
      "A contemporary villa where clean white volumes meet warm timber screens — a study in light, shadow and restraint.",
    intro:
      "Azure Villa began with a simple brief: a home that feels calm the moment you step in. We answered with crisp white volumes, warm timber screens and a palette that lets the changing light do the decorating.",
    body: "Every room is planned around a view and a source of daylight. Bespoke joinery hides the clutter of everyday life, while a restrained material story — oak, stone and brushed brass — keeps the whole house feeling serene and considered.",
    gallery: [c("azure-villa"), c("skyline-apartments"), g("living"), g("stairs"), g("balcony")],
  },
  {
    id: "the-grand-living",
    title: "The Grand Living",
    category: "Residential",
    location: "New Delhi",
    year: "2025",
    cover: c("grand-living"),
    services: ["Interior Design", "Turnkey Execution", "Art Curation"],
    excerpt:
      "A double-height living space layered in ivory, onyx and brushed metal, anchored by a floating staircase.",
    intro:
      "The Grand Living is built around a double-height volume and a sculptural floating staircase that becomes the heart of the home.",
    body: "Layers of ivory, onyx and brushed metal give the space its quiet drama. Curved seating and a bespoke stone table soften the geometry, while curated art and a cove-lit ceiling complete a room made for both grand evenings and quiet mornings.",
    gallery: [c("grand-living"), g("living"), g("stairs"), g("dining"), c("sunset-penthouse")],
  },
  {
    id: "sunset-penthouse",
    title: "Sunset Penthouse",
    category: "Residential",
    location: "Mumbai",
    year: "2024",
    cover: c("sunset-penthouse"),
    services: ["Interior Design", "Lighting", "Styling"],
    excerpt:
      "Floor-to-ceiling glass frames the skyline while cove lighting warms a sculptural open plan.",
    intro:
      "Perched above the city, Sunset Penthouse frames the skyline through floor-to-ceiling glass and a warm, sculptural open plan.",
    body: "Soft cove lighting, deep textured rugs and a low horizon of furniture keep the eye on the view. The palette warms as the sun drops — a home designed for golden hour.",
    gallery: [c("sunset-penthouse"), g("living"), g("balcony"), g("dining"), c("grand-living")],
  },
  {
    id: "stone-kitchen",
    title: "The Signature Kitchen",
    category: "Kitchen",
    location: "Gurgaon",
    year: "2024",
    cover: c("atelier-kitchen"),
    services: ["Interior Design", "Bespoke Joinery"],
    excerpt:
      "Walnut, stone and steel converge in an island built for both ceremony and the everyday.",
    intro:
      "A kitchen built for both ceremony and the everyday, where walnut, stone and steel converge around a generous island.",
    body: "Concealed appliances and full-height storage keep the surfaces clear. Warm under-cabinet light and a book-matched stone splash turn a working kitchen into the social centre of the home.",
    gallery: [c("atelier-kitchen"), g("kitchen"), g("dining"), g("living"), g("stairs")],
  },
  {
    id: "spa-bath",
    title: "Spa Sanctuary",
    category: "Bath",
    location: "Bengaluru",
    year: "2024",
    cover: c("spa-bath"),
    services: ["Interior Design", "Lighting"],
    excerpt:
      "A marble retreat dissolved in amber light — wellness reimagined as architecture.",
    intro:
      "Spa Sanctuary reimagines the bathroom as a wellness retreat — a marble room dissolved in soft amber light.",
    body: "A freestanding tub, a rain shower behind fluted glass and warm stone underfoot create a daily ritual of calm. Every fixture is chosen for touch as much as for looks.",
    gallery: [c("spa-bath"), g("bath"), g("stairs"), g("living"), g("balcony")],
  },
  {
    id: "courtyard-pool",
    title: "Courtyard Pool House",
    category: "Outdoor",
    location: "Goa",
    year: "2023",
    cover: c("courtyard-pool"),
    services: ["Architecture", "Landscape", "Styling"],
    excerpt:
      "An intimate water court framed by a pergola, fire and lush planting for the golden hour.",
    intro:
      "An intimate water court framed by a pergola, an open fire and lush planting — built for the golden hour.",
    body: "Natural stone, teak loungers and layered greenery blur the line between house and garden. By night, fire and water do the talking.",
    gallery: galleryOf("courtyard-pool"),
  },
  {
    id: "onyx-residences",
    title: "ONYX Residences",
    category: "Construction",
    location: "Gurgaon",
    year: "2025",
    cover: c("onyx-residences"),
    services: ["Building Construction", "Architecture", "Turnkey Execution"],
    excerpt:
      "A ground-up residential build — structure to finishing — delivered turnkey for a private client.",
    intro:
      "ONYX Residences is a ground-up build delivered entirely in-house — from the first column to the final coat of paint.",
    body: "Our construction team managed structure, civil works, MEP and finishing under one accountable roof. The before-and-after tells the story: a raw concrete frame transformed into a crisp, light-filled modern home, on time and on budget.",
    gallery: [c("onyx-residences"), c("onyx-heights"), c("skyline-apartments"), c("azure-villa"), g("stairs")],
  },
  {
    id: "skyline-apartments",
    title: "Skyline Apartments",
    category: "Architecture",
    location: "Noida",
    year: "2024",
    cover: c("skyline-apartments"),
    services: ["Architecture", "Building Construction"],
    excerpt:
      "A multi-unit apartment block planned for light, cross-ventilation and a striking street presence.",
    intro:
      "Skyline Apartments balances efficient multi-unit planning with a striking, contemporary street presence.",
    body: "Every unit is planned for cross-ventilation and daylight, with generous balconies and a façade of clean lines and warm timber accents. The result is a building that feels generous from the street and from within.",
    gallery: [c("skyline-apartments"), c("onyx-heights"), c("onyx-residences"), c("azure-villa"), g("balcony")],
  },
  {
    id: "hillside-lounge",
    title: "Hillside Lounge",
    category: "Living",
    location: "Shimla",
    year: "2024",
    cover: g("living"),
    services: ["Interior Design", "Styling"],
    excerpt: "A warm, layered lounge that opens to the valley.",
    intro: "A warm, layered lounge designed to open completely to the valley beyond.",
    body: "Soft modular seating, sculptural lighting and a tactile material palette make this a room you sink into. Curved forms and a neutral base keep the focus on the view and the people in it.",
    gallery: [g("living"), c("grand-living"), c("sunset-penthouse"), g("dining"), g("stairs")],
  },
  {
    id: "culinary-studio",
    title: "Culinary Studio",
    category: "Kitchen",
    location: "Pune",
    year: "2024",
    cover: g("kitchen"),
    services: ["Interior Design", "Bespoke Joinery"],
    excerpt: "A chef's kitchen in stone, timber and steel.",
    intro: "A true chef's kitchen in stone, timber and steel, planned around how this family really cooks.",
    body: "A long island anchors the room, with professional appliances integrated into warm cabinetry. Considered task lighting and clever storage make it as practical as it is beautiful.",
    gallery: [g("kitchen"), c("atelier-kitchen"), g("dining"), g("living"), g("balcony")],
  },
  {
    id: "floating-stair",
    title: "Floating Stair",
    category: "Staircase",
    location: "Hyderabad",
    year: "2023",
    cover: g("stairs"),
    services: ["Architecture", "Bespoke Joinery", "Lighting"],
    excerpt: "A cantilevered stair that reads as sculpture.",
    intro: "A cantilevered timber stair that reads as sculpture at the centre of the home.",
    body: "Each tread appears to float against a stone feature wall, lit from within. Glass balustrades keep the gesture light and the sightlines open.",
    gallery: [g("stairs"), g("living"), c("grand-living"), c("sunset-penthouse"), g("bath")],
  },
  {
    id: "stone-bath",
    title: "Stone Bath",
    category: "Bath",
    location: "Chandigarh",
    year: "2024",
    cover: g("bath"),
    services: ["Interior Design", "Lighting"],
    excerpt: "A spa-grade bath wrapped in book-matched stone.",
    intro: "A spa-grade bathroom wrapped in dramatic book-matched stone.",
    body: "A sculptural tub, blackened fixtures and a backlit mirror create a quiet, hotel-like calm. Underfloor warmth and layered light make it a year-round retreat.",
    gallery: [g("bath"), c("spa-bath"), g("stairs"), g("living"), g("balcony")],
  },
  {
    id: "dining-pavilion",
    title: "Dining Pavilion",
    category: "Dining",
    location: "Jaipur",
    year: "2023",
    cover: g("dining"),
    services: ["Interior Design", "Styling"],
    excerpt: "A light-filled dining room for long gatherings.",
    intro: "A light-filled dining pavilion designed for long, slow gatherings.",
    body: "Sheer drapes diffuse the daylight while a fluted timber feature wall adds warmth. A solid timber table and sculptural chairs set the tone for memorable meals.",
    gallery: [g("dining"), g("kitchen"), g("living"), c("atelier-kitchen"), g("balcony")],
  },
  {
    id: "sky-terrace",
    title: "Sky Terrace",
    category: "Outdoor",
    location: "Dubai",
    year: "2025",
    cover: g("balcony"),
    services: ["Styling", "Landscape"],
    excerpt: "A skyline terrace built for golden-hour evenings.",
    intro: "A skyline terrace built for golden-hour evenings above the city.",
    body: "Low timber seating, warm pools of light and a green frame of planting make the skyline the hero. A calm, intimate outdoor room in the middle of the city.",
    gallery: [g("balcony"), c("sunset-penthouse"), c("courtyard-pool"), g("living"), g("dining")],
  },
  {
    id: "onyx-heights",
    title: "ONYX Heights",
    category: "Construction",
    location: "Gurgaon",
    year: "2025",
    cover: c("onyx-heights"),
    services: ["Building Construction", "Architecture"],
    excerpt: "A multi-storey building delivered ground-up by our construction team.",
    intro: "A multi-storey building delivered ground-up by our in-house construction team.",
    body: "From foundation to façade, ONYX Heights showcases our turnkey construction capability — robust structure, clean detailing and a confident, contemporary exterior.",
    gallery: [c("onyx-heights"), c("onyx-residences"), c("skyline-apartments"), c("azure-villa"), g("stairs")],
  },
];

export const getProject = (id) => projects.find((p) => p.id === id);

export const getNextProject = (id) => {
  const i = projects.findIndex((p) => p.id === id);
  return projects[(i + 1) % projects.length];
};

// Homepage services — each links to a representative project detail page.
export const services = [
  { no: "01", title: "Interior Design", body: "End-to-end interiors — concept, spatial planning, material palettes and bespoke detailing tailored to how you live.", link: "the-grand-living" },
  { no: "02", title: "Architecture", body: "From massing to façade, we shape buildings that hold light beautifully and age with grace.", link: "skyline-apartments" },
  { no: "03", title: "Building Construction", body: "Ground-up construction of villas and commercial buildings — structure, civil works and finishing built to last, on time and on budget.", link: "onyx-residences" },
  { no: "04", title: "Apartment & Residential Architecture", body: "Multi-unit apartments and residences designed for efficient layouts, natural light and a sense of arrival on every floor.", link: "skyline-apartments" },
  { no: "05", title: "Turnkey Execution", body: "A single accountable team from drawing to handover — civil, joinery, lighting and styling.", link: "azure-villa" },
  { no: "06", title: "Styling & Art Curation", body: "The final layer — furniture, objects, textiles and art chosen to give a space its soul.", link: "sunset-penthouse" },
];
