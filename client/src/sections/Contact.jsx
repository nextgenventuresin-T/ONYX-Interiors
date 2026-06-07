import { useState } from "react";
import { useReveal } from "../lib/useReveal";
import { apiUrl } from "../lib/api";

export default function Contact() {
  const scope = useReveal();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setStatus({ type: "loading", msg: "Sending…" });
    try {
      const res = await fetch(apiUrl("/api/contact"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setStatus({ type: "ok", msg: data.message });
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus({ type: "err", msg: err.message });
    }
  };

  return (
    <section className="contact" id="contact" ref={scope}>
      <div className="contact__left" data-reveal>
        <span className="eyebrow">Let's begin</span>
        <h2>
          Tell us about <em>your</em> space.
        </h2>
        <p className="contact__lead">
          Whether it's a single room or a ground-up build, we'd love to hear
          what you're dreaming of.
        </p>
        <div className="contact__details">
          <a href="mailto:hello@atelier.design">hello@atelier.design</a>
          <a href="tel:+910000000000">+91 00000 00000</a>
          <span>Sector 44, Gurgaon, India</span>
        </div>
      </div>

      <form className="contact__form" onSubmit={submit} data-reveal>
        <label>
          <span>Name</span>
          <input name="name" value={form.name} onChange={update} required placeholder="Your name" />
        </label>
        <label>
          <span>Email</span>
          <input name="email" type="email" value={form.email} onChange={update} required placeholder="you@email.com" />
        </label>
        <label>
          <span>Project</span>
          <textarea name="message" rows="4" value={form.message} onChange={update} required placeholder="Tell us a little about it…" />
        </label>
        <button type="submit" disabled={status?.type === "loading"}>
          {status?.type === "loading" ? "Sending…" : "Send enquiry"}
        </button>
        {status && status.type !== "loading" && (
          <p className={`form-status form-status--${status.type}`}>{status.msg}</p>
        )}
      </form>
    </section>
  );
}
