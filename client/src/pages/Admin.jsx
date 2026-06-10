import { useCallback, useEffect, useState } from "react";
import { apiUrl } from "../lib/api";

const TOKEN_KEY = "onyx_admin_token";
const emptyFlat = { title: "", type: "3 BHK", location: "Gaya, Bihar", status: "Available", image: "", description: "", sort_order: 0 };

export default function Admin() {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || "");
  const [creds, setCreds] = useState({ username: "", password: "" });
  const [loginErr, setLoginErr] = useState("");

  const login = async (e) => {
    e.preventDefault();
    setLoginErr("");
    try {
      const res = await fetch(apiUrl("/api/admin/login"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(creds),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.token) throw new Error(data.error || "Login failed.");
      localStorage.setItem(TOKEN_KEY, data.token);
      setToken(data.token);
    } catch (err) {
      setLoginErr(err.message || "Login failed.");
    }
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken("");
  };

  if (!token) {
    return (
      <div className="admin admin--login">
        <form className="admin-login" onSubmit={login}>
          <span className="eyebrow">ONYX Interior</span>
          <h1>Admin</h1>
          <label><span>Username</span>
            <input value={creds.username} onChange={(e) => setCreds({ ...creds, username: e.target.value })} autoFocus />
          </label>
          <label><span>Password</span>
            <input type="password" value={creds.password} onChange={(e) => setCreds({ ...creds, password: e.target.value })} />
          </label>
          <button type="submit">Sign in</button>
          {loginErr && <p className="admin-login__err">{loginErr}</p>}
        </form>
      </div>
    );
  }

  return <Dashboard token={token} onLogout={logout} />;
}

function Dashboard({ token, onLogout }) {
  const authFetch = useCallback(
    (path, opts = {}) =>
      fetch(apiUrl(path), {
        ...opts,
        headers: { "Content-Type": "application/json", "x-admin-token": token, ...(opts.headers || {}) },
      }),
    [token]
  );

  const [enquiries, setEnquiries] = useState([]);
  const [flats, setFlats] = useState([]);
  const [editing, setEditing] = useState(null); // flat being edited/added
  const [msg, setMsg] = useState("");

  const loadEnquiries = useCallback(async () => {
    const res = await authFetch("/api/contacts");
    if (res.status === 401) return onLogout();
    const data = await res.json().catch(() => ({}));
    if (data.ok) setEnquiries(data.contacts || []);
  }, [authFetch, onLogout]);

  const loadFlats = useCallback(async () => {
    const res = await fetch(apiUrl("/api/flats"));
    const data = await res.json().catch(() => []);
    setFlats(Array.isArray(data) ? data : []);
  }, []);

  useEffect(() => { loadEnquiries(); loadFlats(); }, [loadEnquiries, loadFlats]);

  const saveFlat = async (e) => {
    e.preventDefault();
    setMsg("");
    const isEdit = Boolean(editing.id);
    const res = await authFetch(isEdit ? `/api/flats/${editing.id}` : "/api/flats", {
      method: isEdit ? "PUT" : "POST",
      body: JSON.stringify(editing),
    });
    if (res.status === 401) return onLogout();
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.ok) { setMsg(data.error || "Save failed."); return; }
    setEditing(null);
    setMsg(isEdit ? "Flat updated." : "Flat added.");
    loadFlats();
  };

  const deleteFlat = async (id) => {
    if (!confirm("Delete this flat?")) return;
    const res = await authFetch(`/api/flats/${id}`, { method: "DELETE" });
    if (res.status === 401) return onLogout();
    loadFlats();
  };

  return (
    <div className="admin">
      <header className="admin-bar">
        <span className="admin-bar__brand">ONYX <em>Admin</em></span>
        <button className="admin-bar__out" onClick={onLogout}>Log out</button>
      </header>

      {msg && <p className="admin-msg">{msg}</p>}

      {/* Flats manager */}
      <section className="admin-section">
        <div className="admin-section__head">
          <h2>Flats ({flats.length})</h2>
          <button onClick={() => setEditing({ ...emptyFlat })}>+ Add flat</button>
        </div>

        {editing && (
          <form className="admin-form" onSubmit={saveFlat}>
            <div className="admin-form__grid">
              <label><span>Title</span><input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} required /></label>
              <label><span>Type</span><input value={editing.type} onChange={(e) => setEditing({ ...editing, type: e.target.value })} placeholder="3 BHK" /></label>
              <label><span>Location</span><input value={editing.location} onChange={(e) => setEditing({ ...editing, location: e.target.value })} /></label>
              <label><span>Status</span>
                <select value={editing.status} onChange={(e) => setEditing({ ...editing, status: e.target.value })}>
                  <option>Available</option><option>Sold</option><option>Coming soon</option>
                </select>
              </label>
              <label><span>Image path</span><input value={editing.image} onChange={(e) => setEditing({ ...editing, image: e.target.value })} placeholder="/assets/images/flats/01.jpg" /></label>
              <label><span>Sort order</span><input type="number" value={editing.sort_order} onChange={(e) => setEditing({ ...editing, sort_order: Number(e.target.value) })} /></label>
            </div>
            <label><span>Description</span><textarea rows="3" value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} /></label>
            <div className="admin-form__actions">
              <button type="submit">{editing.id ? "Update" : "Add"} flat</button>
              <button type="button" className="ghost" onClick={() => setEditing(null)}>Cancel</button>
            </div>
          </form>
        )}

        <div className="admin-list">
          {flats.map((f) => (
            <div className="admin-row" key={f.id}>
              <div className="admin-row__main">
                <strong>{f.title}</strong>
                <span>{f.type} · {f.location} · <em>{f.status}</em></span>
              </div>
              <div className="admin-row__actions">
                <button onClick={() => setEditing({ ...emptyFlat, ...f })}>Edit</button>
                <button className="danger" onClick={() => deleteFlat(f.id)}>Delete</button>
              </div>
            </div>
          ))}
          {!flats.length && <p className="admin-empty">No flats yet — add one above.</p>}
        </div>
      </section>

      {/* Enquiries */}
      <section className="admin-section">
        <div className="admin-section__head">
          <h2>Enquiries ({enquiries.length})</h2>
          <button onClick={loadEnquiries}>Refresh</button>
        </div>
        <div className="admin-list">
          {enquiries.map((c) => (
            <div className="admin-row" key={c.id}>
              <div className="admin-row__main">
                <strong>{c.name} · <a href={`mailto:${c.email}`}>{c.email}</a></strong>
                <span>{c.message}</span>
                <em className="admin-row__date">{new Date(c.created_at).toLocaleString()}</em>
              </div>
            </div>
          ))}
          {!enquiries.length && <p className="admin-empty">No enquiries yet.</p>}
        </div>
      </section>
    </div>
  );
}
