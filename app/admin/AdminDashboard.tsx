"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutGrid, Film, Users, Layers, MessageSquare, HelpCircle,
  Search, Settings, Eye, Smartphone, Pencil, Sparkles,
  CheckCircle, XCircle, Loader2, Trash2, Plus, Save, BookOpen, Play, Link,
  Inbox, Mail, MailOpen, Phone, Calendar,
} from "lucide-react";
import {
  getPosts, createPost, updatePost, deletePost, generateSlug, BlogPost,
} from "@/lib/blogStorage";

type Section =
  | "overview" | "hero" | "portfolio" | "team"
  | "services" | "testimonials" | "faq" | "blog" | "seo" | "settings" | "contacts";

const navItems: { id: Section; label: string; icon: React.ElementType }[] = [
  { id: "overview", label: "Overview", icon: LayoutGrid },
  { id: "hero", label: "Hero Content", icon: Sparkles },
  { id: "portfolio", label: "Portfolio", icon: Film },
  { id: "team", label: "Team", icon: Users },
  { id: "services", label: "Services", icon: Layers },
  { id: "testimonials", label: "Testimonials", icon: MessageSquare },
  { id: "faq", label: "FAQ", icon: HelpCircle },
  { id: "blog", label: "Blog Posts", icon: BookOpen },
  { id: "contacts", label: "Contact Leads", icon: Inbox },
  { id: "seo", label: "SEO & Meta", icon: Search },
  { id: "settings", label: "Settings", icon: Settings },
];

/* ─── Toast notification ─────────────────────────────────────────────────────── */
function Toast({ msg, type, onDone }: { msg: string; type: "success" | "error"; onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3000);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <motion.div
      className="fixed bottom-6 right-6 z-[200] flex items-center gap-3 px-5 py-3 rounded-2xl text-sm font-medium shadow-2xl"
      style={{
        background: type === "success" ? "rgba(34,197,94,0.15)" : "rgba(239,68,68,0.15)",
        border: `1px solid ${type === "success" ? "rgba(34,197,94,0.4)" : "rgba(239,68,68,0.4)"}`,
        backdropFilter: "blur(20px)",
        color: type === "success" ? "#4ade80" : "#f87171",
      }}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
    >
      {type === "success" ? <CheckCircle size={16} /> : <XCircle size={16} />}
      {msg}
    </motion.div>
  );
}

/* ─── Shared UI primitives ───────────────────────────────────────────────────── */
const inputStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(123,47,255,0.3)",
  color: "rgba(255,255,255,0.85)",
};

function Field({
  label, value, onChange, type = "text", placeholder,
}: {
  label: string; value: string; onChange: (v: string) => void;
  type?: "text" | "textarea"; placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-[10px] font-semibold text-white/40 mb-1.5 tracking-widest uppercase">{label}</label>
      {type === "textarea" ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={3}
          className="w-full rounded-xl px-4 py-3 text-sm outline-none resize-none focus:border-[#7b2fff] transition-colors"
          style={inputStyle} />
      ) : (
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
          className="w-full rounded-xl px-4 py-3 text-sm outline-none focus:border-[#7b2fff] transition-colors"
          style={inputStyle} />
      )}
    </div>
  );
}

function SaveBtn({ onClick, loading, label = "Save Changes" }: { onClick: () => void; loading: boolean; label?: string }) {
  return (
    <button onClick={onClick} disabled={loading}
      className="btn-primary w-full justify-center py-3 mt-2 flex items-center gap-2 disabled:opacity-60">
      {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
      {loading ? "Saving…" : label}
    </button>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl p-6 space-y-5"
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(123,47,255,0.2)" }}>
      {children}
    </div>
  );
}

function Spinner() {
  return <div className="flex items-center gap-2 text-white/40 text-sm"><Loader2 size={16} className="animate-spin" /> Loading…</div>;
}

/* ─── Overview ───────────────────────────────────────────────────────────────── */
function OverviewPanel({ toast }: { toast: (m: string, t: "success" | "error") => void }) {
  const [stats, setStats] = useState<Record<string, number | string> | null>(null);

  useEffect(() => {
    fetch("/api/stats")
      .then((r) => r.json())
      .then(setStats)
      .catch(() => toast("Failed to load stats", "error"));
  }, [toast]);

  const cards = stats
    ? [
        { label: "Total Views", value: `${stats.totalViews}${stats.viewsSuffix}`, icon: Eye, color: "#7b2fff" },
        { label: "Active Projects", value: String(stats.activeProjects), icon: Film, color: "#b14aff" },
        { label: "Team Members", value: String(stats.teamCount), icon: Users, color: "#9d4edd" },
        { label: "WhatsApp Leads", value: String(stats.leadCount), icon: Smartphone, color: "#c77dff" },
      ]
    : [];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-black text-white">Dashboard Overview</h2>
      {!stats ? <Spinner /> : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((s, i) => (
            <motion.div key={s.label} className="rounded-2xl p-5"
              style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${s.color}30` }}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <s.icon size={22} strokeWidth={1.5} style={{ color: s.color }} className="mb-3" />
              <p className="text-2xl font-black text-white">{s.value}</p>
              <p className="text-white/40 text-xs mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <h3 className="font-bold text-white flex items-center gap-2"><span className="text-[#c77dff]">●</span> Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {([
              { label: "Edit Hero Text", Icon: Pencil },
              { label: "Add Project", Icon: Film },
              { label: "Add Testimonial", Icon: MessageSquare },
              { label: "Add FAQ", Icon: HelpCircle },
            ] as { label: string; Icon: React.ElementType }[]).map((action) => (
              <button key={action.label}
                className="p-3 rounded-xl text-left text-xs font-medium text-white/60 hover:text-white transition-colors"
                style={{ background: "rgba(123,47,255,0.1)", border: "1px solid rgba(123,47,255,0.2)" }}>
                <action.Icon size={16} strokeWidth={1.5} className="mb-1.5 text-[#c77dff]" />
                {action.label}
              </button>
            ))}
          </div>
        </Card>
        <Card>
          <h3 className="font-bold text-white">Database Status</h3>
          {stats ? (
            <div className="space-y-2 text-sm text-white/60">
              {[["Portfolio Projects", stats.activeProjects], ["Team Members", stats.teamCount], ["Total Leads", stats.leadCount]].map(([k, v]) => (
                <div key={String(k)} className="flex justify-between">
                  <span>{k}</span><span className="text-white font-semibold">{v}</span>
                </div>
              ))}
            </div>
          ) : <div className="text-white/30 text-sm">Loading…</div>}
        </Card>
      </div>
    </div>
  );
}

/* ─── Hero ───────────────────────────────────────────────────────────────────── */
function HeroPanel({ toast }: { toast: (m: string, t: "success" | "error") => void }) {
  const [form, setForm] = useState({
    headlineLine1: "", headlineLine2: "", headlineLine3: "",
    subheadline: "", ctaPrimary: "", ctaSecondary: "",
    founderName: "", founderTitle: "", founderImage: "", quoteText: "",
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetch("/api/hero").then((r) => r.json())
      .then((d) => setForm({
        headlineLine1: d.headlineLine1 ?? "", headlineLine2: d.headlineLine2 ?? "",
        headlineLine3: d.headlineLine3 ?? "", subheadline: d.subheadline ?? "",
        ctaPrimary: d.ctaPrimary ?? "", ctaSecondary: d.ctaSecondary ?? "",
        founderName: d.founderName ?? "", founderTitle: d.founderTitle ?? "",
        founderImage: d.founderImage ?? "", quoteText: d.quoteText ?? "",
      }))
      .catch(() => toast("Failed to load hero content", "error"))
      .finally(() => setFetching(false));
  }, [toast]);

  const set = (key: string) => (v: string) => setForm((p) => ({ ...p, [key]: v }));

  async function save() {
    setLoading(true);
    try {
      const res = await fetch("/api/hero", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (!res.ok) throw new Error();
      toast("Hero content saved!", "success");
    } catch { toast("Failed to save", "error"); }
    finally { setLoading(false); }
  }

  if (fetching) return <Spinner />;
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-black text-white">Hero Content</h2>
      <Card>
        <Field label="Headline Line 1" value={form.headlineLine1} onChange={set("headlineLine1")} />
        <Field label="Headline Line 2" value={form.headlineLine2} onChange={set("headlineLine2")} />
        <Field label="Headline Line 3 (optional)" value={form.headlineLine3} onChange={set("headlineLine3")} placeholder="Leave blank for 2 lines only" />
        <Field label="Subheadline" type="textarea" value={form.subheadline} onChange={set("subheadline")} />
        <Field label="CTA Button 1 Text" value={form.ctaPrimary} onChange={set("ctaPrimary")} />
        <Field label="CTA Button 2 Text" value={form.ctaSecondary} onChange={set("ctaSecondary")} />
        <Field label="Founder Name" value={form.founderName} onChange={set("founderName")} />
        <Field label="Founder Title" value={form.founderTitle} onChange={set("founderTitle")} />
        <Field label="Founder Image URL" value={form.founderImage} onChange={set("founderImage")} placeholder="/founder.jpeg" />
        <Field label="Quote Text" type="textarea" value={form.quoteText} onChange={set("quoteText")} />
        <SaveBtn onClick={save} loading={loading} />
      </Card>
    </div>
  );
}

/* ─── Portfolio ──────────────────────────────────────────────────────────────── */
function PortfolioPanel({ toast }: { toast: (m: string, t: "success" | "error") => void }) {
  const [projects, setProjects] = useState<Record<string, unknown>[]>([]);
  const [fetching, setFetching] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const blank = { title: "", filterKey: "Branding", tag: "", client: "", metric: "", metric2: "", description: "", accent: "#7b2fff", size: "medium", visual: "mesh" };
  const [form, setForm] = useState<Record<string, string>>(blank);
  const [projectReels, setProjectReels] = useState<string[]>([]);
  const [newReelUrl, setNewReelUrl] = useState("");

  const load = useCallback(() => {
    setFetching(true);
    fetch("/api/portfolio").then((r) => r.json())
      .then((d) => setProjects(Array.isArray(d) ? d : []))
      .catch(() => toast("Failed to load portfolio", "error"))
      .finally(() => setFetching(false));
  }, [toast]);

  useEffect(() => { load(); }, [load]);

  const set = (k: string) => (v: string) => setForm((p) => ({ ...p, [k]: v }));

  function resetForm() {
    setForm(blank); setEditId(null); setProjectReels([]); setNewReelUrl(""); setShowForm(false);
  }

  function startEdit(p: Record<string, unknown>) {
    setForm({
      title: String(p.title ?? ""), filterKey: String(p.filterKey ?? ""),
      tag: String(p.tag ?? ""), client: String(p.client ?? ""),
      metric: String(p.metric ?? ""), metric2: String(p.metric2 ?? ""),
      description: String(p.description ?? ""), accent: String(p.accent ?? "#7b2fff"),
      size: String(p.size ?? "medium"), visual: String(p.visual ?? "mesh"),
    });
    setProjectReels(Array.isArray(p.reels) ? (p.reels as string[]) : []);
    setNewReelUrl("");
    setEditId(String(p.id)); setShowForm(true);
  }

  function addReel() {
    const url = newReelUrl.trim();
    if (!url) return;
    if (!url.match(/\/reel\/[A-Za-z0-9_-]+/)) { toast("Invalid reel URL — paste a full Instagram reel link", "error"); return; }
    setProjectReels((r) => [...r, url]);
    setNewReelUrl("");
  }

  function removeReel(i: number) {
    setProjectReels((r) => r.filter((_, idx) => idx !== i));
  }

  async function save() {
    setLoading(true);
    try {
      const url = editId ? `/api/portfolio/${editId}` : "/api/portfolio";
      const res = await fetch(url, {
        method: editId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, reels: projectReels }),
      });
      if (!res.ok) throw new Error();
      toast(editId ? "Project updated!" : "Project added!", "success");
      resetForm(); load();
    } catch { toast("Failed to save project", "error"); }
    finally { setLoading(false); }
  }

  async function del(id: string) {
    if (!confirm("Delete this project?")) return;
    try { await fetch(`/api/portfolio/${id}`, { method: "DELETE" }); toast("Project deleted", "success"); load(); }
    catch { toast("Failed to delete", "error"); }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-white">Portfolio Projects</h2>
        <button onClick={() => { resetForm(); setShowForm(true); }}
          className="btn-primary text-sm py-2.5 px-5 flex items-center gap-2"><Plus size={14} /> Add Project</button>
      </div>
      {fetching ? <Spinner /> : (
        <div className="space-y-3">
          {projects.map((p) => {
            const reelCount = Array.isArray(p.reels) ? (p.reels as unknown[]).length : 0;
            return (
              <div key={String(p.id)} className="flex items-center gap-4 p-4 rounded-xl"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(123,47,255,0.2)" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(123,47,255,0.2)" }}>
                  <Film size={18} strokeWidth={1.5} className="text-[#c77dff]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white text-sm truncate">{String(p.title ?? "")}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <p className="text-white/40 text-xs">{String(p.filterKey ?? "")} · {String(p.metric ?? "")}</p>
                    {reelCount > 0 && (
                      <span className="flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full"
                        style={{ background: "rgba(123,47,255,0.15)", color: "#c77dff", border: "1px solid rgba(123,47,255,0.3)" }}>
                        <Play size={8} /> {reelCount} reel{reelCount > 1 ? "s" : ""}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => startEdit(p)} className="px-3 py-1.5 rounded-lg text-xs text-white/60 hover:text-white"
                    style={{ background: "rgba(123,47,255,0.15)", border: "1px solid rgba(123,47,255,0.3)" }}>Edit</button>
                  <button onClick={() => del(String(p.id))} className="px-3 py-1.5 rounded-lg text-xs text-red-400 hover:text-red-300"
                    style={{ background: "rgba(255,59,59,0.1)", border: "1px solid rgba(255,59,59,0.2)" }}><Trash2 size={12} /></button>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
            <Card>
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white">{editId ? "Edit Project" : "Add New Project"}</h3>
                <button onClick={resetForm} className="text-white/30 hover:text-white"><XCircle size={18} /></button>
              </div>

              <Field label="Project Title" value={form.title} onChange={set("title")} placeholder="e.g. Brand Launch Campaign" />
              <div className="grid grid-cols-2 gap-4">
                <Field label="Category" value={form.filterKey} onChange={set("filterKey")} placeholder="e.g. Branding" />
                <Field label="Tag" value={form.tag} onChange={set("tag")} placeholder="e.g. Brand Film" />
              </div>
              <Field label="Client Name" value={form.client} onChange={set("client")} placeholder="e.g. Fashion Brand XY" />
              <div className="grid grid-cols-2 gap-4">
                <Field label="Primary Metric" value={form.metric} onChange={set("metric")} placeholder="e.g. 12M Views" />
                <Field label="Secondary Metric" value={form.metric2} onChange={set("metric2")} placeholder="e.g. 340% Growth" />
              </div>
              <Field label="Description" type="textarea" value={form.description} onChange={set("description")} />
              <div className="grid grid-cols-3 gap-4">
                <Field label="Accent Color" value={form.accent} onChange={set("accent")} placeholder="#7b2fff" />
                <Field label="Card Size" value={form.size} onChange={set("size")} placeholder="large / medium / tall" />
                <Field label="Visual Style" value={form.visual} onChange={set("visual")} placeholder="mesh / dots / waves" />
              </div>

              {/* ── Instagram Reels ── */}
              <div className="pt-2">
                <div className="flex items-center gap-2 mb-3">
                  <Play size={13} className="text-[#c77dff]" />
                  <label className="text-[10px] font-semibold text-white/40 tracking-widest uppercase">Instagram Reels</label>
                  {projectReels.length > 0 && (
                    <span className="ml-auto text-[10px] font-semibold px-2 py-0.5 rounded-full"
                      style={{ background: "rgba(123,47,255,0.15)", color: "#c77dff" }}>{projectReels.length} added</span>
                  )}
                </div>

                {/* Added reels list */}
                {projectReels.length > 0 && (
                  <div className="space-y-2 mb-3">
                    {projectReels.map((url, i) => (
                      <div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
                        style={{ background: "rgba(123,47,255,0.08)", border: "1px solid rgba(123,47,255,0.2)" }}>
                        <Link size={12} className="text-[#7b2fff] flex-shrink-0" />
                        <p className="flex-1 text-xs text-white/60 truncate">{url}</p>
                        <button onClick={() => removeReel(i)} className="text-red-400/60 hover:text-red-400 flex-shrink-0 transition-colors">
                          <XCircle size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add reel input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newReelUrl}
                    onChange={(e) => setNewReelUrl(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addReel())}
                    placeholder="https://www.instagram.com/reel/DWOFtj0EtSW/"
                    className="flex-1 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-[#7b2fff] transition-colors"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(123,47,255,0.25)", color: "rgba(255,255,255,0.8)" }}
                  />
                  <button
                    onClick={addReel}
                    className="px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 flex-shrink-0 transition-all hover:opacity-90"
                    style={{ background: "rgba(123,47,255,0.2)", border: "1px solid rgba(123,47,255,0.4)", color: "#c77dff" }}
                  >
                    <Plus size={12} /> Add
                  </button>
                </div>
                <p className="text-white/20 text-[10px] mt-1.5">Paste full Instagram reel URL · Press Enter or click Add · Reels appear in the project modal</p>
              </div>

              <SaveBtn onClick={save} loading={loading} label={editId ? "Update Project" : "Add Project"} />
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Team ───────────────────────────────────────────────────────────────────── */
function TeamPanel({ toast }: { toast: (m: string, t: "success" | "error") => void }) {
  const [members, setMembers] = useState<Record<string, string>[]>([]);
  const [fetching, setFetching] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const blank = { name: "", role: "", bio: "", icon: "BrainCircuit", color: "#7b2fff", photo: "" };
  const [form, setForm] = useState<Record<string, string>>(blank);

  const load = useCallback(() => {
    setFetching(true);
    fetch("/api/team").then((r) => r.json())
      .then((d) => setMembers(Array.isArray(d) ? d : []))
      .catch(() => toast("Failed to load team", "error"))
      .finally(() => setFetching(false));
  }, [toast]);

  useEffect(() => { load(); }, [load]);

  const set = (k: string) => (v: string) => setForm((p) => ({ ...p, [k]: v }));

  async function save() {
    setLoading(true);
    try {
      const url = editId ? `/api/team/${editId}` : "/api/team";
      const res = await fetch(url, { method: editId ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (!res.ok) throw new Error();
      toast(editId ? "Member updated!" : "Member added!", "success");
      setShowForm(false); setEditId(null); setForm(blank); load();
    } catch { toast("Failed to save member", "error"); }
    finally { setLoading(false); }
  }

  async function del(id: string) {
    if (!confirm("Delete this team member?")) return;
    try { await fetch(`/api/team/${id}`, { method: "DELETE" }); toast("Member deleted", "success"); load(); }
    catch { toast("Failed to delete", "error"); }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-white">Team Members</h2>
        <button onClick={() => { setForm(blank); setEditId(null); setShowForm(true); }}
          className="btn-primary text-sm py-2.5 px-5 flex items-center gap-2"><Plus size={14} /> Add Member</button>
      </div>
      {fetching ? <Spinner /> : (
        <div className="space-y-3">
          {members.map((m) => (
            <div key={m.id} className="flex items-center gap-4 p-4 rounded-xl"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(123,47,255,0.2)" }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0"
                style={{ background: `linear-gradient(135deg, ${m.color || "#7b2fff"}, #b14aff)` }}>{m.name?.[0] ?? "?"}</div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-white text-sm">{m.name}</p>
                <p className="text-white/40 text-xs">{m.role}</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => { setForm({ name: m.name ?? "", role: m.role ?? "", bio: m.bio ?? "", icon: m.icon ?? "", color: m.color ?? "#7b2fff", photo: m.photo ?? "" }); setEditId(m.id); setShowForm(true); }}
                  className="px-3 py-1.5 rounded-lg text-xs text-white/60 hover:text-white" style={{ background: "rgba(123,47,255,0.15)", border: "1px solid rgba(123,47,255,0.3)" }}>Edit</button>
                <button onClick={() => del(m.id)} className="px-3 py-1.5 rounded-lg text-xs text-red-400 hover:text-red-300" style={{ background: "rgba(255,59,59,0.1)", border: "1px solid rgba(255,59,59,0.2)" }}><Trash2 size={12} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
            <Card>
              <div className="flex items-center justify-between"><h3 className="font-bold text-white">{editId ? "Edit Member" : "Add Member"}</h3>
                <button onClick={() => setShowForm(false)} className="text-white/30 hover:text-white"><XCircle size={18} /></button></div>
              <Field label="Full Name" value={form.name} onChange={set("name")} placeholder="e.g. Aryan Kapoor" />
              <Field label="Role / Title" value={form.role} onChange={set("role")} placeholder="e.g. Creative Director" />
              <Field label="Short Bio" type="textarea" value={form.bio} onChange={set("bio")} />
              <div className="grid grid-cols-2 gap-4">
                <Field label="Icon Name (Lucide)" value={form.icon} onChange={set("icon")} placeholder="BrainCircuit" />
                <Field label="Accent Color" value={form.color} onChange={set("color")} placeholder="#7b2fff" />
              </div>
              <Field label="Photo URL" value={form.photo} onChange={set("photo")} placeholder="/team/name.jpg" />
              <SaveBtn onClick={save} loading={loading} label={editId ? "Update Member" : "Add Member"} />
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Services ───────────────────────────────────────────────────────────────── */
function ServicesPanel({ toast }: { toast: (m: string, t: "success" | "error") => void }) {
  const [services, setServices] = useState<Record<string, string>[]>([]);
  const [fetching, setFetching] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const blank = { title: "", description: "", icon: "Film", color: "#7b2fff" };
  const [form, setForm] = useState<Record<string, string>>(blank);

  const load = useCallback(() => {
    setFetching(true);
    fetch("/api/services").then((r) => r.json())
      .then((d) => setServices(Array.isArray(d) ? d : []))
      .catch(() => toast("Failed to load services", "error"))
      .finally(() => setFetching(false));
  }, [toast]);

  useEffect(() => { load(); }, [load]);

  const set = (k: string) => (v: string) => setForm((p) => ({ ...p, [k]: v }));

  async function save() {
    setLoading(true);
    try {
      const url = editId ? `/api/services/${editId}` : "/api/services";
      const res = await fetch(url, { method: editId ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (!res.ok) throw new Error();
      toast(editId ? "Service updated!" : "Service added!", "success");
      setShowForm(false); setEditId(null); setForm(blank); load();
    } catch { toast("Failed to save service", "error"); }
    finally { setLoading(false); }
  }

  async function del(id: string) {
    if (!confirm("Delete this service?")) return;
    try { await fetch(`/api/services/${id}`, { method: "DELETE" }); toast("Service deleted", "success"); load(); }
    catch { toast("Failed to delete", "error"); }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-white">Services</h2>
        <button onClick={() => { setForm(blank); setEditId(null); setShowForm(true); }}
          className="btn-primary text-sm py-2.5 px-5 flex items-center gap-2"><Plus size={14} /> Add Service</button>
      </div>
      {fetching ? <Spinner /> : (
        <div className="space-y-3">
          {services.map((s) => (
            <div key={s.id} className="flex items-center gap-4 p-4 rounded-xl"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(123,47,255,0.2)" }}>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-white text-sm">{s.title}</p>
                <p className="text-white/40 text-xs truncate">{s.description}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { setForm({ title: s.title ?? "", description: s.description ?? "", icon: s.icon ?? "", color: s.color ?? "" }); setEditId(s.id); setShowForm(true); }}
                  className="px-3 py-1.5 rounded-lg text-xs text-white/60 hover:text-white" style={{ background: "rgba(123,47,255,0.15)", border: "1px solid rgba(123,47,255,0.3)" }}>Edit</button>
                <button onClick={() => del(s.id)} className="px-3 py-1.5 rounded-lg text-xs text-red-400 hover:text-red-300" style={{ background: "rgba(255,59,59,0.1)", border: "1px solid rgba(255,59,59,0.2)" }}><Trash2 size={12} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
            <Card>
              <div className="flex items-center justify-between"><h3 className="font-bold text-white">{editId ? "Edit Service" : "Add Service"}</h3>
                <button onClick={() => setShowForm(false)} className="text-white/30 hover:text-white"><XCircle size={18} /></button></div>
              <Field label="Service Title" value={form.title} onChange={set("title")} placeholder="e.g. Video Production" />
              <Field label="Description" type="textarea" value={form.description} onChange={set("description")} />
              <div className="grid grid-cols-2 gap-4">
                <Field label="Lucide Icon Name" value={form.icon} onChange={set("icon")} placeholder="Film, Camera, Gem…" />
                <Field label="Accent Color" value={form.color} onChange={set("color")} placeholder="#7b2fff" />
              </div>
              <SaveBtn onClick={save} loading={loading} label={editId ? "Update Service" : "Add Service"} />
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Testimonials ───────────────────────────────────────────────────────────── */
function TestimonialsPanel({ toast }: { toast: (m: string, t: "success" | "error") => void }) {
  const [items, setItems] = useState<Record<string, string>[]>([]);
  const [fetching, setFetching] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const blank = { name: "", role: "", company: "", quote: "", shortQuote: "", result: "", resultLabel: "", initials: "", color: "#7b2fff" };
  const [form, setForm] = useState<Record<string, string>>(blank);

  const load = useCallback(() => {
    setFetching(true);
    fetch("/api/testimonials").then((r) => r.json())
      .then((d) => setItems(Array.isArray(d) ? d : []))
      .catch(() => toast("Failed to load testimonials", "error"))
      .finally(() => setFetching(false));
  }, [toast]);

  useEffect(() => { load(); }, [load]);

  const set = (k: string) => (v: string) => setForm((p) => ({ ...p, [k]: v }));

  async function save() {
    setLoading(true);
    try {
      const url = editId ? `/api/testimonials/${editId}` : "/api/testimonials";
      const res = await fetch(url, { method: editId ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, rating: 5 }) });
      if (!res.ok) throw new Error();
      toast(editId ? "Testimonial updated!" : "Testimonial added!", "success");
      setShowForm(false); setEditId(null); setForm(blank); load();
    } catch { toast("Failed to save testimonial", "error"); }
    finally { setLoading(false); }
  }

  async function del(id: string) {
    if (!confirm("Delete this testimonial?")) return;
    try { await fetch(`/api/testimonials/${id}`, { method: "DELETE" }); toast("Testimonial deleted", "success"); load(); }
    catch { toast("Failed to delete", "error"); }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-white">Testimonials</h2>
        <button onClick={() => { setForm(blank); setEditId(null); setShowForm(true); }}
          className="btn-primary text-sm py-2.5 px-5 flex items-center gap-2"><Plus size={14} /> Add Testimonial</button>
      </div>
      {fetching ? <Spinner /> : (
        <div className="space-y-3">
          {items.map((t) => (
            <div key={t.id} className="flex items-center gap-4 p-4 rounded-xl"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(123,47,255,0.2)" }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-xs flex-shrink-0"
                style={{ background: `linear-gradient(135deg, ${t.color || "#7b2fff"}, #b14aff)` }}>{t.initials || t.name?.[0] || "?"}</div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-white text-sm">{t.name} · {t.company}</p>
                <p className="text-white/40 text-xs">{t.result} {t.resultLabel}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { setForm({ name: t.name ?? "", role: t.role ?? "", company: t.company ?? "", quote: t.quote ?? "", shortQuote: t.shortQuote ?? "", result: t.result ?? "", resultLabel: t.resultLabel ?? "", initials: t.initials ?? "", color: t.color ?? "#7b2fff" }); setEditId(t.id); setShowForm(true); }}
                  className="px-3 py-1.5 rounded-lg text-xs text-white/60 hover:text-white" style={{ background: "rgba(123,47,255,0.15)", border: "1px solid rgba(123,47,255,0.3)" }}>Edit</button>
                <button onClick={() => del(t.id)} className="px-3 py-1.5 rounded-lg text-xs text-red-400 hover:text-red-300" style={{ background: "rgba(255,59,59,0.1)", border: "1px solid rgba(255,59,59,0.2)" }}><Trash2 size={12} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
            <Card>
              <div className="flex items-center justify-between"><h3 className="font-bold text-white">{editId ? "Edit Testimonial" : "Add Testimonial"}</h3>
                <button onClick={() => setShowForm(false)} className="text-white/30 hover:text-white"><XCircle size={18} /></button></div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Client Name" value={form.name} onChange={set("name")} placeholder="e.g. Rohit Sharma" />
                <Field label="Initials" value={form.initials} onChange={set("initials")} placeholder="RS" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Role" value={form.role} onChange={set("role")} placeholder="e.g. Founder" />
                <Field label="Company" value={form.company} onChange={set("company")} placeholder="e.g. StyleCo" />
              </div>
              <Field label="Full Quote" type="textarea" value={form.quote} onChange={set("quote")} />
              <Field label="Short Quote (headline)" value={form.shortQuote} onChange={set("shortQuote")} />
              <div className="grid grid-cols-3 gap-4">
                <Field label="Result" value={form.result} onChange={set("result")} placeholder="5M Views" />
                <Field label="Result Label" value={form.resultLabel} onChange={set("resultLabel")} placeholder="48 hrs" />
                <Field label="Accent Color" value={form.color} onChange={set("color")} placeholder="#7b2fff" />
              </div>
              <SaveBtn onClick={save} loading={loading} label={editId ? "Update Testimonial" : "Add Testimonial"} />
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── FAQ ────────────────────────────────────────────────────────────────────── */
function FAQPanel({ toast }: { toast: (m: string, t: "success" | "error") => void }) {
  const [faqs, setFaqs] = useState<Record<string, string>[]>([]);
  const [fetching, setFetching] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const blank = { question: "", answer: "" };
  const [form, setForm] = useState<Record<string, string>>(blank);

  const load = useCallback(() => {
    setFetching(true);
    fetch("/api/faq").then((r) => r.json())
      .then((d) => setFaqs(Array.isArray(d) ? d : []))
      .catch(() => toast("Failed to load FAQ", "error"))
      .finally(() => setFetching(false));
  }, [toast]);

  useEffect(() => { load(); }, [load]);

  const set = (k: string) => (v: string) => setForm((p) => ({ ...p, [k]: v }));

  async function save() {
    setLoading(true);
    try {
      const url = editId ? `/api/faq/${editId}` : "/api/faq";
      const res = await fetch(url, { method: editId ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (!res.ok) throw new Error();
      toast(editId ? "FAQ updated!" : "FAQ added!", "success");
      setShowForm(false); setEditId(null); setForm(blank); load();
    } catch { toast("Failed to save FAQ", "error"); }
    finally { setLoading(false); }
  }

  async function del(id: string) {
    if (!confirm("Delete this FAQ?")) return;
    try { await fetch(`/api/faq/${id}`, { method: "DELETE" }); toast("FAQ deleted", "success"); load(); }
    catch { toast("Failed to delete", "error"); }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-white">FAQ</h2>
        <button onClick={() => { setForm(blank); setEditId(null); setShowForm(true); }}
          className="btn-primary text-sm py-2.5 px-5 flex items-center gap-2"><Plus size={14} /> Add Question</button>
      </div>
      {fetching ? <Spinner /> : (
        <div className="space-y-3">
          {faqs.map((f) => (
            <div key={f.id} className="flex items-start gap-4 p-4 rounded-xl"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(123,47,255,0.2)" }}>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-white text-sm">{f.question}</p>
                <p className="text-white/40 text-xs mt-1 line-clamp-2">{f.answer}</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => { setForm({ question: f.question ?? "", answer: f.answer ?? "" }); setEditId(f.id); setShowForm(true); }}
                  className="px-3 py-1.5 rounded-lg text-xs text-white/60 hover:text-white" style={{ background: "rgba(123,47,255,0.15)", border: "1px solid rgba(123,47,255,0.3)" }}>Edit</button>
                <button onClick={() => del(f.id)} className="px-3 py-1.5 rounded-lg text-xs text-red-400 hover:text-red-300" style={{ background: "rgba(255,59,59,0.1)", border: "1px solid rgba(255,59,59,0.2)" }}><Trash2 size={12} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
            <Card>
              <div className="flex items-center justify-between"><h3 className="font-bold text-white">{editId ? "Edit FAQ" : "Add Question"}</h3>
                <button onClick={() => setShowForm(false)} className="text-white/30 hover:text-white"><XCircle size={18} /></button></div>
              <Field label="Question" value={form.question} onChange={set("question")} placeholder="e.g. What services do you offer?" />
              <Field label="Answer" type="textarea" value={form.answer} onChange={set("answer")} />
              <SaveBtn onClick={save} loading={loading} label={editId ? "Update FAQ" : "Add FAQ"} />
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── SEO ────────────────────────────────────────────────────────────────────── */
function SEOPanel({ toast }: { toast: (m: string, t: "success" | "error") => void }) {
  const [form, setForm] = useState({ siteTitle: "", description: "", keywords: "", ogImage: "", canonical: "", gaId: "" });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetch("/api/seo").then((r) => r.json())
      .then((d) => setForm({ siteTitle: d.siteTitle ?? "", description: d.description ?? "", keywords: d.keywords ?? "", ogImage: d.ogImage ?? "", canonical: d.canonical ?? "", gaId: d.gaId ?? "" }))
      .catch(() => toast("Failed to load SEO settings", "error"))
      .finally(() => setFetching(false));
  }, [toast]);

  const set = (k: string) => (v: string) => setForm((p) => ({ ...p, [k]: v }));

  async function save() {
    setLoading(true);
    try {
      const res = await fetch("/api/seo", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (!res.ok) throw new Error();
      toast("SEO settings saved!", "success");
    } catch { toast("Failed to save SEO settings", "error"); }
    finally { setLoading(false); }
  }

  if (fetching) return <Spinner />;
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-black text-white">SEO & Metadata</h2>
      <Card>
        <Field label="Site Title" value={form.siteTitle} onChange={set("siteTitle")} />
        <Field label="Meta Description" type="textarea" value={form.description} onChange={set("description")} />
        <Field label="Focus Keywords (comma-separated)" value={form.keywords} onChange={set("keywords")} />
        <Field label="OG Image URL" value={form.ogImage} onChange={set("ogImage")} placeholder="/og-image.jpg" />
        <Field label="Canonical URL" value={form.canonical} onChange={set("canonical")} />
        <Field label="Google Analytics ID" value={form.gaId} onChange={set("gaId")} placeholder="G-XXXXXXXXXX" />
        <SaveBtn onClick={save} loading={loading} label="Save SEO Settings" />
      </Card>
    </div>
  );
}

/* ─── Settings ───────────────────────────────────────────────────────────────── */
function SettingsPanel({ toast }: { toast: (m: string, t: "success" | "error") => void }) {
  const [form, setForm] = useState({ whatsappNumber: "", whatsappMessage: "", email: "", instagram: "", youtube: "", location: "" });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetch("/api/settings").then((r) => r.json())
      .then((d) => setForm({ whatsappNumber: d.whatsappNumber ?? "", whatsappMessage: d.whatsappMessage ?? "", email: d.email ?? "", instagram: d.instagram ?? "", youtube: d.youtube ?? "", location: d.location ?? "" }))
      .catch(() => toast("Failed to load settings", "error"))
      .finally(() => setFetching(false));
  }, [toast]);

  const set = (k: string) => (v: string) => setForm((p) => ({ ...p, [k]: v }));

  async function save() {
    setLoading(true);
    try {
      const res = await fetch("/api/settings", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (!res.ok) throw new Error();
      toast("Settings saved!", "success");
    } catch { toast("Failed to save settings", "error"); }
    finally { setLoading(false); }
  }

  if (fetching) return <Spinner />;
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-black text-white">Global Settings</h2>
      <Card>
        <Field label="WhatsApp Number (with country code)" value={form.whatsappNumber} onChange={set("whatsappNumber")} placeholder="919876543210" />
        <Field label="WhatsApp Prefill Message" type="textarea" value={form.whatsappMessage} onChange={set("whatsappMessage")} />
        <Field label="Email Address" value={form.email} onChange={set("email")} />
        <Field label="Instagram Handle" value={form.instagram} onChange={set("instagram")} />
        <Field label="YouTube Channel URL" value={form.youtube} onChange={set("youtube")} />
        <Field label="Studio Location" value={form.location} onChange={set("location")} />
        <SaveBtn onClick={save} loading={loading} label="Save Settings" />
      </Card>
    </div>
  );
}

/* ─── Blog ───────────────────────────────────────────────────────────────────── */
const BLOG_CATEGORIES = ["Insights", "Strategy", "Behind the Scenes", "Industry News", "Case Studies", "Tips & Tricks"];
type BlogForm = { title: string; slug: string; excerpt: string; content: string; category: string; tags: string; published: boolean; readTime: number; author: string; };
const BLANK_POST: BlogForm = { title: "", slug: "", excerpt: "", content: "", category: "Insights", tags: "", published: false, readTime: 5, author: "Kyron Productions" };

function BlogPanel({ toast }: { toast: (m: string, t: "success" | "error") => void }) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [view, setView] = useState<"list" | "editor">("list");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState<BlogForm>(BLANK_POST);

  useEffect(() => { setPosts(getPosts()); }, []);

  useEffect(() => {
    if (!editingId) setForm((f) => ({ ...f, slug: generateSlug(f.title) }));
  }, [form.title, editingId]);

  function startNew() { setEditingId(null); setForm(BLANK_POST); setView("editor"); }

  function startEdit(p: BlogPost) {
    setEditingId(p.id);
    setForm({ title: p.title, slug: p.slug, excerpt: p.excerpt, content: p.content, category: p.category, tags: p.tags, published: p.published, readTime: p.readTime, author: p.author });
    setView("editor");
  }

  function handleSave() {
    if (editingId) { updatePost(editingId, form); toast("Post updated!", "success"); }
    else { createPost({ ...form, coverImage: "" }); toast("Post published!", "success"); }
    setPosts(getPosts()); setView("list");
  }

  function handleDelete(id: string) { deletePost(id); setPosts(getPosts()); setDeleteId(null); toast("Post deleted", "success"); }

  function insertFormat(type: string) {
    const el = document.getElementById("blog-editor") as HTMLTextAreaElement;
    if (!el) return;
    const s = el.selectionStart, e = el.selectionEnd, sel = form.content.substring(s, e);
    const map: Record<string, string> = { h2: `\n## ${sel || "Heading"}\n`, h3: `\n### ${sel || "Sub-heading"}\n`, bold: `**${sel || "bold"}**`, italic: `*${sel || "italic"}*`, bullet: `\n- ${sel || "item"}`, quote: `\n> ${sel || "quote"}`, code: `\`${sel || "code"}\``, hr: "\n\n---\n\n" };
    const ins = map[type] ?? sel;
    setForm((f) => ({ ...f, content: f.content.substring(0, s) + ins + f.content.substring(e) }));
    setTimeout(() => { el.focus(); el.setSelectionRange(s + ins.length, s + ins.length); }, 0);
  }

  if (view === "editor") return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-black text-white">{editingId ? "Edit Post" : "New Post"}</h2>
          <p className="text-white/40 text-sm mt-1">Write in markdown — ## heading, **bold**, *italic*, - list</p>
        </div>
        <button onClick={() => setView("list")} className="text-white/40 hover:text-white transition-colors text-sm">← Back</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <input type="text" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} placeholder="Post title…"
            className="w-full text-xl font-bold bg-transparent text-white placeholder-white/20 outline-none pb-3"
            style={{ borderBottom: "1px solid rgba(123,47,255,0.4)" }} />

          <div className="flex flex-wrap gap-1.5 p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(123,47,255,0.2)" }}>
            {[["H2","h2"],["H3","h3"],["B","bold"],["I","italic"],["•","bullet"],["❝","quote"],["<>","code"],["—","hr"]].map(([l,t]) => (
              <button key={t} onClick={() => insertFormat(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium text-white/60 hover:text-white hover:bg-[rgba(123,47,255,0.2)] transition-all ${l==="B"?"font-bold":l==="I"?"italic":""}`}
                style={{ border: "1px solid rgba(123,47,255,0.2)" }}>{l}</button>
            ))}
            <span className="ml-auto text-[10px] text-white/20 self-center">Markdown</span>
          </div>

          <textarea id="blog-editor" value={form.content} onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
            placeholder={"Start writing…\n\nUse ## for headings, **bold**, *italic*, - for bullet lists"}
            rows={22} className="w-full rounded-xl px-5 py-4 text-sm text-white/80 outline-none resize-none font-mono leading-relaxed"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(123,47,255,0.3)" }} />

          <p className="text-right text-xs text-white/20">{form.content.length} chars · ~{Math.max(1, Math.ceil(form.content.split(/\s+/).filter(Boolean).length / 200))} min read</p>
        </div>

        <div className="space-y-4">
          <Card>
            <h3 className="font-bold text-white text-sm">Publish</h3>
            <div className="flex items-center justify-between">
              <span className="text-xs text-white/50">Status</span>
              <button onClick={() => setForm((f) => ({ ...f, published: !f.published }))}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
                style={{ background: form.published ? "rgba(74,222,128,0.1)" : "rgba(255,255,255,0.05)", color: form.published ? "#4ade80" : "rgba(255,255,255,0.4)", border: `1px solid ${form.published ? "rgba(74,222,128,0.3)" : "rgba(255,255,255,0.1)"}` }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: form.published ? "#4ade80" : "rgba(255,255,255,0.3)" }} />
                {form.published ? "Published" : "Draft"}
              </button>
            </div>
            <Field label="URL Slug" value={form.slug} onChange={(v) => setForm((f) => ({ ...f, slug: v }))} />
            <p className="text-white/20 text-[10px] -mt-3">/blog/{form.slug || "your-slug"}</p>
            <div>
              <label className="block text-[10px] font-semibold text-white/40 mb-1.5 tracking-widest uppercase">Read Time (min)</label>
              <input type="number" value={form.readTime} min={1} onChange={(e) => setForm((f) => ({ ...f, readTime: Number(e.target.value) }))}
                className="w-full rounded-xl px-4 py-3 text-sm outline-none" style={inputStyle} />
            </div>
            <SaveBtn onClick={handleSave} loading={false} label={editingId ? "Update Post" : "Publish Post"} />
          </Card>

          <Card>
            <h3 className="font-bold text-white text-sm">Details</h3>
            <div>
              <label className="block text-[10px] font-semibold text-white/40 mb-1.5 tracking-widest uppercase">Category</label>
              <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                className="w-full rounded-xl px-4 py-3 text-sm outline-none" style={inputStyle}>
                {BLOG_CATEGORIES.map((c) => <option key={c} value={c} style={{ background: "#110020" }}>{c}</option>)}
              </select>
            </div>
            <Field label="Tags (comma-separated)" value={form.tags} onChange={(v) => setForm((f) => ({ ...f, tags: v }))} placeholder="filmmaking, storytelling" />
            <Field label="Author" value={form.author} onChange={(v) => setForm((f) => ({ ...f, author: v }))} />
            <Field label="Excerpt" value={form.excerpt} onChange={(v) => setForm((f) => ({ ...f, excerpt: v }))} type="textarea" placeholder="Brief summary for cards and SEO…" />
          </Card>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-black text-white">Blog Posts</h2>
          <p className="text-white/40 text-sm mt-1">{posts.filter((p) => p.published).length} published · {posts.filter((p) => !p.published).length} drafts</p>
        </div>
        <div className="flex gap-3">
          <a href="/blog" target="_blank" rel="noopener noreferrer"
            className="text-sm text-white/40 hover:text-white transition-colors flex items-center gap-1.5 px-4 py-2 rounded-xl"
            style={{ border: "1px solid rgba(123,47,255,0.2)" }}>View Blog ↗</a>
          <button onClick={startNew} className="btn-primary text-sm py-2.5 px-5 flex items-center gap-2"><Plus size={14} /> New Post</button>
        </div>
      </div>

      {posts.length === 0 ? (
        <Card>
          <div className="text-center py-8">
            <BookOpen size={32} strokeWidth={1.2} className="text-[#7b2fff] mx-auto mb-4" />
            <p className="text-white/30 mb-4">No blog posts yet.</p>
            <button onClick={startNew} className="btn-primary text-sm py-2.5 px-5">Write First Post</button>
          </div>
        </Card>
      ) : (
        <div className="space-y-2.5">
          {[...posts].reverse().map((post) => (
            <div key={post.id} className="flex items-center gap-4 p-4 rounded-xl"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(123,47,255,0.2)" }}>
              <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: post.published ? "#4ade80" : "rgba(255,255,255,0.2)" }} />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-white text-sm truncate">{post.title || "(untitled)"}</p>
                <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                  <span className="text-xs text-[#c77dff]">{post.category}</span>
                  <span className="text-white/20 text-xs">·</span>
                  <span className="text-white/40 text-xs">{new Date(post.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                  <span className="text-white/20 text-xs">·</span>
                  <span className="text-white/40 text-xs">{post.readTime} min</span>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full hidden sm:inline"
                  style={{ background: post.published ? "rgba(74,222,128,0.1)" : "rgba(255,255,255,0.05)", color: post.published ? "#4ade80" : "rgba(255,255,255,0.3)" }}>
                  {post.published ? "Live" : "Draft"}</span>
                <button onClick={() => startEdit(post)} className="px-3 py-1.5 rounded-lg text-xs text-white/60 hover:text-white"
                  style={{ background: "rgba(123,47,255,0.15)", border: "1px solid rgba(123,47,255,0.3)" }}>Edit</button>
                {deleteId === post.id ? (
                  <div className="flex gap-1">
                    <button onClick={() => handleDelete(post.id)} className="px-3 py-1.5 rounded-lg text-xs text-red-400"
                      style={{ background: "rgba(255,59,59,0.15)", border: "1px solid rgba(255,59,59,0.3)" }}>Confirm</button>
                    <button onClick={() => setDeleteId(null)} className="px-2 py-1.5 rounded-lg text-xs text-white/40"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>✕</button>
                  </div>
                ) : (
                  <button onClick={() => setDeleteId(post.id)} className="px-3 py-1.5 rounded-lg text-xs text-red-400/60 hover:text-red-400"
                    style={{ background: "rgba(255,59,59,0.08)", border: "1px solid rgba(255,59,59,0.15)" }}><Trash2 size={12} /></button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Contacts ───────────────────────────────────────────────────────────────── */
interface Lead {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  budget?: string;
  message: string;
  source: string;
  read: boolean;
  createdAt: string;
}

function ContactsPanel({ toast }: { toast: (m: string, t: "success" | "error") => void }) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [fetching, setFetching] = useState(true);
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
  const [expanded, setExpanded] = useState<string | null>(null);

  const load = useCallback(() => {
    setFetching(true);
    fetch("/api/leads").then((r) => r.json())
      .then((d) => setLeads(Array.isArray(d) ? d : []))
      .catch(() => toast("Failed to load leads", "error"))
      .finally(() => setFetching(false));
  }, [toast]);

  useEffect(() => { load(); }, [load]);

  async function markRead(id: string) {
    try {
      await fetch(`/api/leads/${id}`, { method: "PATCH" });
      setLeads((prev) => prev.map((l) => l.id === id ? { ...l, read: true } : l));
    } catch { toast("Failed to mark as read", "error"); }
  }

  async function del(id: string) {
    if (!confirm("Delete this lead?")) return;
    try {
      await fetch(`/api/leads/${id}`, { method: "DELETE" });
      setLeads((prev) => prev.filter((l) => l.id !== id));
      if (expanded === id) setExpanded(null);
      toast("Lead deleted", "success");
    } catch { toast("Failed to delete", "error"); }
  }

  const filtered = leads.filter((l) =>
    filter === "all" ? true : filter === "unread" ? !l.read : l.read
  );
  const unreadCount = leads.filter((l) => !l.read).length;

  function formatDate(d: string) {
    return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-black text-white">Contact Leads</h2>
            {unreadCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold"
                style={{ background: "rgba(123,47,255,0.25)", color: "#c77dff", border: "1px solid rgba(123,47,255,0.4)" }}>
                {unreadCount} new
              </span>
            )}
          </div>
          <p className="text-white/40 text-sm mt-1">{leads.length} total enquiries from the contact form</p>
        </div>
        <button onClick={load} className="text-sm text-white/40 hover:text-white transition-colors flex items-center gap-1.5">
          <Loader2 size={13} /> Refresh
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2">
        {(["all", "unread", "read"] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className="px-4 py-1.5 rounded-full text-xs font-semibold capitalize transition-all"
            style={{
              background: filter === f ? "rgba(123,47,255,0.25)" : "rgba(255,255,255,0.04)",
              border: `1px solid ${filter === f ? "rgba(123,47,255,0.5)" : "rgba(255,255,255,0.08)"}`,
              color: filter === f ? "white" : "rgba(255,255,255,0.4)",
            }}>{f}</button>
        ))}
      </div>

      {fetching ? <Spinner /> : filtered.length === 0 ? (
        <Card>
          <div className="text-center py-10">
            <Inbox size={32} strokeWidth={1.2} className="text-[#7b2fff] mx-auto mb-3" />
            <p className="text-white/30 text-sm">{filter === "unread" ? "No unread leads." : "No leads yet."}</p>
            {filter === "unread" && <p className="text-white/20 text-xs mt-1">All caught up!</p>}
          </div>
        </Card>
      ) : (
        <div className="space-y-3">
          {filtered.map((lead) => (
            <motion.div
              key={lead.id}
              layout
              className="rounded-xl overflow-hidden"
              style={{
                background: lead.read ? "rgba(255,255,255,0.03)" : "rgba(123,47,255,0.07)",
                border: `1px solid ${lead.read ? "rgba(123,47,255,0.15)" : "rgba(123,47,255,0.35)"}`,
              }}
            >
              {/* Header row */}
              <div
                className="flex items-center gap-4 p-4 cursor-pointer"
                onClick={() => { setExpanded(expanded === lead.id ? null : lead.id); if (!lead.read) markRead(lead.id); }}
              >
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-black text-sm"
                  style={{ background: lead.read ? "rgba(255,255,255,0.06)" : "linear-gradient(135deg, #7b2fff, #b14aff)", color: "white" }}>
                  {lead.name?.[0]?.toUpperCase() ?? "?"}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-semibold text-white text-sm">{lead.name || "Anonymous"}</p>
                    {!lead.read && (
                      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: "#7b2fff", boxShadow: "0 0 8px #7b2fff" }} />
                    )}
                    {lead.service && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                        style={{ background: "rgba(123,47,255,0.15)", color: "#c77dff", border: "1px solid rgba(123,47,255,0.25)" }}>
                        {lead.service}
                      </span>
                    )}
                  </div>
                  <p className="text-white/40 text-xs mt-0.5 truncate">{lead.email ?? "No email"} {lead.budget ? `· ${lead.budget}` : ""}</p>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  <p className="text-white/25 text-[10px] hidden sm:block">{formatDate(lead.createdAt)}</p>
                  {lead.read
                    ? <MailOpen size={14} className="text-white/20" />
                    : <Mail size={14} className="text-[#c77dff]" />}
                  <button onClick={(e) => { e.stopPropagation(); del(lead.id); }}
                    className="text-red-400/50 hover:text-red-400 transition-colors">
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>

              {/* Expanded detail */}
              <AnimatePresence>
                {expanded === lead.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-5 pt-0 space-y-4" style={{ borderTop: "1px solid rgba(123,47,255,0.15)" }}>
                      {/* Contact details */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
                        {[
                          { icon: Mail, label: "Email", value: lead.email },
                          { icon: Phone, label: "Phone", value: lead.phone },
                          { icon: Layers, label: "Service", value: lead.service },
                          { icon: Calendar, label: "Budget", value: lead.budget },
                        ].map(({ icon: Icon, label, value }) => value ? (
                          <div key={label} className="rounded-xl p-3"
                            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(123,47,255,0.15)" }}>
                            <div className="flex items-center gap-1.5 mb-1">
                              <Icon size={11} className="text-[#7b2fff]" />
                              <span className="text-[9px] font-bold tracking-widest uppercase text-white/30">{label}</span>
                            </div>
                            <p className="text-white text-xs font-semibold truncate">{value}</p>
                          </div>
                        ) : null)}
                      </div>

                      {/* Message */}
                      <div className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(123,47,255,0.15)" }}>
                        <p className="text-[9px] font-bold tracking-widest uppercase text-white/30 mb-2">Message</p>
                        <p className="text-white/70 text-sm leading-relaxed whitespace-pre-wrap">{lead.message}</p>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap gap-3">
                        {lead.email && (
                          <a href={`mailto:${lead.email}?subject=Re: Your project enquiry&body=Hi ${lead.name ?? "there"},`}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all hover:opacity-90"
                            style={{ background: "rgba(123,47,255,0.2)", border: "1px solid rgba(123,47,255,0.4)", color: "#c77dff" }}>
                            <Mail size={12} /> Reply via Email
                          </a>
                        )}
                        {lead.phone && (
                          <a href={`https://wa.me/${lead.phone.replace(/\D/g, "")}?text=Hi ${lead.name ?? "there"}, thank you for reaching out to Kyron Productions!`}
                            target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all hover:opacity-90"
                            style={{ background: "rgba(37,211,102,0.1)", border: "1px solid rgba(37,211,102,0.25)", color: "#25d366" }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="#25d366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                            WhatsApp Reply
                          </a>
                        )}
                        {!lead.read && (
                          <button onClick={() => markRead(lead.id)}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white/50 hover:text-white transition-colors"
                            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                            <MailOpen size={12} /> Mark as Read
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Root Dashboard ─────────────────────────────────────────────────────────── */
export default function AdminDashboard() {
  const [active, setActive] = useState<Section>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toastData, setToastData] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const showToast = useCallback((msg: string, type: "success" | "error") => setToastData({ msg, type }), []);

  const panels: Record<Section, React.ReactNode> = {
    overview: <OverviewPanel toast={showToast} />,
    hero: <HeroPanel toast={showToast} />,
    portfolio: <PortfolioPanel toast={showToast} />,
    team: <TeamPanel toast={showToast} />,
    services: <ServicesPanel toast={showToast} />,
    testimonials: <TestimonialsPanel toast={showToast} />,
    faq: <FAQPanel toast={showToast} />,
    blog: <BlogPanel toast={showToast} />,
    contacts: <ContactsPanel toast={showToast} />,
    seo: <SEOPanel toast={showToast} />,
    settings: <SettingsPanel toast={showToast} />,
  };

  return (
    <div className="min-h-screen flex" style={{ background: "#07000f", color: "white" }}>
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-64 flex flex-col transition-transform duration-300 md:relative md:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        style={{ background: "rgba(17,0,32,0.98)", borderRight: "1px solid rgba(123,47,255,0.2)", backdropFilter: "blur(40px)" }}>
        <div className="p-6 border-b border-[rgba(123,47,255,0.15)]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-black text-sm"
              style={{ background: "linear-gradient(135deg, #7b2fff, #b14aff)" }}>K</div>
            <span className="font-bold text-sm text-white">Kyron Admin<span className="text-[#c77dff]">.</span></span>
          </div>
        </div>
        <nav className="flex-1 p-4 overflow-y-auto">
          <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-white/25 mb-3 px-2">Content</p>
          <div className="space-y-1">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => { setActive(item.id); setSidebarOpen(false); }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 text-sm"
                style={{ background: active === item.id ? "rgba(123,47,255,0.2)" : "transparent", color: active === item.id ? "white" : "rgba(255,255,255,0.5)", borderLeft: active === item.id ? "2px solid #7b2fff" : "2px solid transparent" }}>
                <item.icon size={16} strokeWidth={1.5} />
                {item.label}
              </button>
            ))}
          </div>
        </nav>
        <div className="p-4 border-t border-[rgba(123,47,255,0.15)]">
          <a href="/" className="flex items-center gap-2 text-xs text-white/40 hover:text-white transition-colors">← Back to Website</a>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 bg-black/60 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="flex items-center gap-4 px-6 py-4 border-b"
          style={{ borderColor: "rgba(123,47,255,0.15)", background: "rgba(10,0,21,0.8)", backdropFilter: "blur(20px)" }}>
          <button className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5" onClick={() => setSidebarOpen(true)}>
            <span className="w-5 h-px bg-white/60" /><span className="w-5 h-px bg-white/60" /><span className="w-5 h-px bg-white/60" />
          </button>
          <h1 className="text-sm font-semibold text-white/60 hidden md:block">Admin Panel</h1>
          <div className="ml-auto flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-green-400" style={{ boxShadow: "0 0 8px rgba(74,222,128,0.8)" }} />
            <span className="text-xs text-white/40">Live Site Active</span>
          </div>
        </header>
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}>
              {panels[active]}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <AnimatePresence>
        {toastData && <Toast msg={toastData.msg} type={toastData.type} onDone={() => setToastData(null)} />}
      </AnimatePresence>
    </div>
  );
}
