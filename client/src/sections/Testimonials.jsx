import { useReveal } from "../lib/useReveal";

const quotes = [
  {
    text: "They translated a vague feeling into a home that finally feels like ours. The detailing is impeccable.",
    name: "Ananya & Rohan",
    role: "Private Residence, Gurgaon",
  },
  {
    text: "Calm, accountable and obsessive about craft. The handover was genuinely move-in ready.",
    name: "Vikram Mehta",
    role: "Penthouse, Mumbai",
  },
  {
    text: "Our café footfall doubled after the redesign. They understand how space shapes behaviour.",
    name: "Sara Kapoor",
    role: "Commercial, Bengaluru",
  },
];

export default function Testimonials() {
  const scope = useReveal();
  return (
    <section className="testimonials" ref={scope}>
      <span className="eyebrow" data-reveal>Kind words</span>
      <div className="testimonials__grid">
        {quotes.map((q, i) => (
          <blockquote className="quote" key={i} data-reveal>
            <p>“{q.text}”</p>
            <footer>
              <strong>{q.name}</strong>
              <span>{q.role}</span>
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
