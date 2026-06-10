// Static fallback for the Flats page. The page fetches live flats from the API
// (managed in the admin panel); if the API is empty or asleep, these show so
// the page always looks complete. Drop images at /assets/images/flats/NN.jpg.
export const flatsFallback = [
  {
    id: "f1",
    title: "3 BHK — The Living Hall",
    type: "3 BHK",
    location: "Gaya, Bihar",
    status: "Available",
    description:
      "An open, light-filled living and dining hall with bespoke TV panelling, cove lighting and a warm material palette.",
    image: "/assets/images/flats/01.jpg",
  },
  {
    id: "f2",
    title: "Master Bedroom Suite",
    type: "3 BHK",
    location: "Gaya, Bihar",
    status: "Available",
    description:
      "A calm master retreat with a full-height wardrobe wall, upholstered headboard and layered bedside lighting.",
    image: "/assets/images/flats/02.jpg",
  },
  {
    id: "f3",
    title: "Modular Kitchen",
    type: "3 BHK",
    location: "Gaya, Bihar",
    status: "Available",
    description:
      "A practical modular kitchen — handleless shutters, stone counters, tall storage and integrated appliances.",
    image: "/assets/images/flats/03.jpg",
  },
  {
    id: "f4",
    title: "4 BHK — Family Lounge",
    type: "4 BHK",
    location: "Gaya, Bihar",
    status: "Available",
    description:
      "A generous family lounge for a 4 BHK home, zoned for relaxing and entertaining with a sculptural ceiling.",
    image: "/assets/images/flats/04.jpg",
  },
  {
    id: "f5",
    title: "Children's Room",
    type: "4 BHK",
    location: "Gaya, Bihar",
    status: "Available",
    description:
      "A playful yet tidy kids' room with a study nook, smart storage and a soft, durable finish palette.",
    image: "/assets/images/flats/05.jpg",
  },
  {
    id: "f6",
    title: "Guest Bath",
    type: "3 BHK",
    location: "Gaya, Bihar",
    status: "Available",
    description:
      "A compact guest bath in stone and brushed metal, with a backlit mirror and concealed storage.",
    image: "/assets/images/flats/06.jpg",
  },
];
