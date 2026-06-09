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
      // Parse defensively: a sleeping/cold-starting server can return an
      // empty or non-JSON body, which would otherwise crash res.json().
      const text = await res.text();
      let data = {};
      try { data = text ? JSON.parse(text) : {}; } catch { data = {}; }
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Something went wrong.");
      }
      setStatus({ type: "ok", msg: data.message || "Thank you — we'll be in touch shortly." });
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus({
        type: "err",
        msg: "Couldn't send just now — the server may be waking up. Please try again in a moment.",
      });
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
          <a href="mailto:sudhirkumargaya198@gmail.com">sudhirkumargaya198@gmail.com</a>
          <a href="https://wa.me/918207538009" target="_blank" rel="noreferrer">+91 82075 38009</a>
          <a href="tel:+918092407475">+91 80924 07475</a>
          <span>Domuhan, Cherki Rd, Parariya, Bihar 824231, India</span>
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
