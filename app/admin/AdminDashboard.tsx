"use client";

import { useMemo, useState } from "react";
import { BarChart3, Building2, FileText, Image as ImageIcon, LogOut, Menu, Newspaper, Phone, Users, X } from "lucide-react";
import { newsData, type NewsItem } from "@/data/news";
import { leadershipData, type TeamMember } from "@/data/team";
import { clientsData, type Client } from "@/data/clients";
import { ImageUploadField } from "./ImageUploadField";
import { ClientManager, NewsManager, TeamManager } from "./VisualContentEditors";

 type ContactSettings = {
  city: string;
  email: string;
  primaryPhone: string;
  secondaryPhone: string;
  address: string;
  footerDescription: string;
};

type Section = "overview" | "top-contact" | "news" | "leadership" | "clients" | "footer";
type ContentKey = "top-contact" | "news" | "leadership" | "clients" | "footer";

const initialContact: ContactSettings = {
  city: "Kathmandu, Nepal",
  email: "info.mgcbusiness@gmail.com",
  primaryPhone: "+977-9815239074",
  secondaryPhone: "014-977786",
  address: "Kathmandu Metropolitan Ward No. 15, Bagmati Province, Nepal",
  footerDescription: "A Group of Specialized Corporate Professionals for Complete Business Solutions.",
};

function readStored<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const saved = window.localStorage.getItem("mgc-admin-content");
    if (!saved) return fallback;
    return JSON.parse(saved)[key] ?? fallback;
  } catch {
    return fallback;
  }
}

const navItems: { id: Section; label: string; icon: typeof BarChart3 }[] = [
  { id: "overview", label: "Overview", icon: BarChart3 },
  { id: "top-contact", label: "Contact details", icon: Phone },
  { id: "news", label: "News & updates", icon: Newspaper },
  { id: "leadership", label: "Team members", icon: Users },
  { id: "clients", label: "Our clients", icon: Building2 },
  { id: "footer", label: "Footer details", icon: FileText },
];

function Field({ label, value, onChange, multiline = false }: { label: string; value: string; onChange: (value: string) => void; multiline?: boolean }) {
  const className = "mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10";
  return (
    <label className="block text-sm font-medium text-slate-700">
      {label}
      {multiline ? <textarea className={`${className} min-h-28 resize-y`} value={value} onChange={(event) => onChange(event.target.value)} /> : <input className={className} value={value} onChange={(event) => onChange(event.target.value)} />}
    </label>
  );
}

export function AdminDashboard() {
  const [section, setSection] = useState<Section>("overview");
  const [mobileNav, setMobileNav] = useState(false);
  const [contact, setContact] = useState<ContactSettings>(() => readStored("contact", initialContact));
  const [news, setNews] = useState<NewsItem[]>(() => readStored("news", newsData));
  const [leadership, setLeadership] = useState<TeamMember[]>(() => readStored("leadership", leadershipData));
  const [clients, setClients] = useState<Client[]>(() => readStored("clients", clientsData));
  const [selectedNews, setSelectedNews] = useState(0);
  const [selectedLeader, setSelectedLeader] = useState(0);
  const [selectedClient, setSelectedClient] = useState(0);
  const [notice, setNotice] = useState("");


  const selectedNewsItem = news[selectedNews];
  const selectedLeaderItem = leadership[selectedLeader];
  const selectedClientItem = clients[selectedClient];
  const currentTitle = navItems.find((item) => item.id === section)?.label ?? "Overview";
  const publishedNews = useMemo(() => news.filter((item) => item.isImportantNotice).length, [news]);

  function showNotice(message: string) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2600);
  }

  async function saveContent(key: ContentKey, data: unknown) {
    const next = { contact, news, leadership, clients, [key === "top-contact" || key === "footer" ? "contact" : key]: data };
    window.localStorage.setItem("mgc-admin-content", JSON.stringify(next));
    try {
      const response = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, data }),
      });
      showNotice(response.ok ? "Saved to MongoDB and local preview" : "Saved to local preview. Configure MongoDB to sync online.");
    } catch {
      showNotice("Saved to local preview. Configure MongoDB to sync online.");
    }
  }

  function addNews() {
    const item: NewsItem = { id: `new-${Date.now()}`, slug: "new-update", category: "Business Insights", date: new Date().toISOString().slice(0, 10), headline: "New update", shortDescription: "Write a short description for this update.", isImportantNotice: true, imageUrl: "" };
    setNews((current) => [...current, item]);
    setSelectedNews(news.length);
  }

  function addLeader() {
    const item: TeamMember = { id: `new-${Date.now()}`, name: "New member", position: "Consultant", qualification: "Qualification", experience: "Add a short biography or experience.", imageUrl: "" };
    setLeadership((current) => [...current, item]);
    setSelectedLeader(leadership.length);
  }

  function addClient() {
    const item: Client = { id: `new-${Date.now()}`, name: "New client", imageUrl: "" };
    setClients((current) => [...current, item]);
    setSelectedClient(clients.length);
  }

  function signOut() {
    fetch("/api/admin/logout", { method: "POST" }).then(() => { window.location.href = "/admin/login"; });
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <aside className={`fixed inset-y-0 left-0 z-30 w-72 bg-slate-950 text-white transition-transform lg:translate-x-0 ${mobileNav ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-6">
            <div><p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">MGC Associates</p><p className="mt-1 text-lg font-semibold">Admin dashboard</p></div>
            <button className="lg:hidden" onClick={() => setMobileNav(false)} aria-label="Close navigation"><X /></button>
          </div>
          <nav className="flex-1 space-y-1 px-4 py-6">
            {navItems.map(({ id, label, icon: Icon }) => <button key={id} onClick={() => { setSection(id); setMobileNav(false); }} className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm transition ${section === id ? "bg-amber-500 font-semibold text-slate-950" : "text-slate-300 hover:bg-white/10 hover:text-white"}`}><Icon className="h-4 w-4" />{label}</button>)}
          </nav>
          <div className="border-t border-white/10 p-4"><button onClick={signOut} className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm text-slate-300 hover:bg-white/10 hover:text-white"><LogOut className="h-4 w-4" />Sign out</button></div>
        </div>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-slate-200 bg-white/95 px-5 backdrop-blur sm:px-8">
          <div className="flex items-center gap-3"><button className="lg:hidden" onClick={() => setMobileNav(true)} aria-label="Open navigation"><Menu /></button><div><p className="text-xs uppercase tracking-widest text-slate-400">Website editor</p><h1 className="text-xl font-semibold text-slate-900">{currentTitle}</h1></div></div>
          <div className="hidden items-center gap-2 text-xs text-slate-500 sm:flex"><span className="h-2 w-2 rounded-full bg-emerald-500" /> Admin session active</div>
        </header>

        <main className="mx-auto max-w-7xl p-5 sm:p-8">
          {notice && <div className="fixed right-6 top-24 z-40 rounded-lg bg-slate-900 px-5 py-3 text-sm text-white shadow-xl">{notice}</div>}
          {section === "overview" && <Overview newsCount={news.length} publishedNews={publishedNews} leaderCount={leadership.length} clientCount={clients.length} onSelect={setSection} />}
          {section === "top-contact" && <ContactEditor title="Top contact bar" fields={contact} setFields={setContact} fieldsToShow={["city", "email", "primaryPhone", "secondaryPhone"]} onSave={() => saveContent("top-contact", contact)} />}
          {section === "footer" && <ContactEditor title="Footer contact details" fields={contact} setFields={setContact} fieldsToShow={["address", "primaryPhone", "secondaryPhone", "email", "footerDescription"]} onSave={() => saveContent("footer", contact)} />}
          {section === "news" && <NewsManager items={news} setItems={setNews} onAdd={addNews} onSave={() => saveContent("news", news)} />}
          {section === "leadership" && <TeamManager items={leadership} setItems={setLeadership} onAdd={addLeader} onSave={() => saveContent("leadership", leadership)} />}
          {section === "clients" && <ClientManager items={clients} setItems={setClients} onAdd={addClient} onSave={() => saveContent("clients", clients)} />}
        </main>
      </div>
    </div>
  );
}

function Overview({ newsCount, publishedNews, leaderCount, clientCount, onSelect }: { newsCount: number; publishedNews: number; leaderCount: number; clientCount: number; onSelect: (section: Section) => void }) {
  const cards = [{ label: "News & insights", value: newsCount, detail: `${publishedNews} featured updates`, section: "news" as Section, icon: Newspaper }, { label: "Leadership members", value: leaderCount, detail: "Manage team profiles", section: "leadership" as Section, icon: Users }, { label: "Clients", value: clientCount, detail: "Manage client records", section: "clients" as Section, icon: Building2 }];
  return <><div className="mb-8"><p className="text-sm font-medium text-amber-600">Welcome to your website editor</p><h2 className="mt-1 text-3xl font-bold text-slate-900">What would you like to update?</h2><p className="mt-2 max-w-2xl text-slate-500">Choose an area below or use the menu on the left. You do not need any technical knowledge—edit the words, then press <strong>Save changes</strong>.</p></div><div className="grid gap-5 md:grid-cols-3">{cards.map(({ label, value, detail, section, icon: Icon }) => <button key={label} onClick={() => onSelect(section)} className="rounded-xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-amber-400"><div className="flex items-center justify-between"><span className="text-sm font-medium text-slate-500">{label}</span><Icon className="h-5 w-5 text-amber-500" /></div><p className="mt-4 text-4xl font-bold">{value}</p><p className="mt-2 text-sm text-slate-500">{detail}</p><span className="mt-5 inline-flex text-sm font-semibold text-amber-700">Edit this section →</span></button>)}</div><div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-6"><div className="flex gap-4"><ImageIcon aria-hidden="true" className="h-5 w-5 text-amber-600" /><div><h3 className="font-semibold text-slate-900">Need to change a photo?</h3><p className="mt-1 text-sm text-slate-600">Paste the photo link into the photo field. Image upload buttons will be added when Cloudinary is connected.</p></div></div></div></>;
}

function EditorFrame({ title, description, children, onSave, onAdd, onDelete, count }: { title: string; description: string; children: React.ReactNode; onSave: () => void; onAdd?: () => void; onDelete?: () => void; count?: number }) {
  return <div><div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><h2 className="text-3xl font-bold">{title}</h2><p className="mt-2 max-w-2xl text-sm text-slate-500">{description}</p></div><div className="flex flex-wrap gap-3">{onAdd && <button onClick={onAdd} className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-700">+ Add new</button>}{onDelete && <button onClick={onDelete} className="rounded-lg border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50">Delete this item</button>}<button onClick={onSave} className="rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-bold text-slate-950 hover:bg-amber-400">Save changes</button></div></div>{count !== undefined && <p className="mb-4 text-xs uppercase tracking-widest text-slate-400">{count} records</p>}{children}</div>;
}

function ContactEditor({ title, fields, setFields, fieldsToShow, onSave }: { title: string; fields: ContactSettings; setFields: React.Dispatch<React.SetStateAction<ContactSettings>>; fieldsToShow: (keyof ContactSettings)[]; onSave: () => void }) {
  const [editing, setEditing] = useState(false);
  const labels: Record<keyof ContactSettings, string> = { city: "City / location", email: "Email address", primaryPhone: "Primary phone", secondaryPhone: "Secondary phone", address: "Office address", footerDescription: "Footer company description" };
  return <div><div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><h2 className="text-3xl font-bold">{title}</h2><p className="mt-2 max-w-2xl text-sm text-slate-500">Review these details as they appear on the website. Click Edit details to make a change.</p></div>{!editing && <button onClick={() => setEditing(true)} className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-bold text-white hover:bg-slate-700">Edit details</button>}</div>{editing ? <div className="max-w-3xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm"><div className="grid gap-5 sm:grid-cols-2">{fieldsToShow.map((key) => <div key={key} className={key === "address" || key === "footerDescription" ? "sm:col-span-2" : ""}><Field label={labels[key]} value={fields[key]} multiline={key === "address" || key === "footerDescription"} onChange={(value) => setFields((current) => ({ ...current, [key]: value }))} /></div>)}</div><div className="mt-6 flex gap-3"><button onClick={() => setEditing(false)} className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold">Cancel</button><button onClick={() => { onSave(); setEditing(false); }} className="rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-bold text-slate-950">Save changes</button></div></div> : <div className="max-w-3xl divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white shadow-sm">{fieldsToShow.map((key) => <div key={key} className="grid gap-1 px-6 py-4 sm:grid-cols-[190px_1fr]"><span className="text-sm font-semibold text-slate-500">{labels[key]}</span><span className="text-sm text-slate-800">{fields[key] || "Not provided"}</span></div>)}</div>}</div>;
}

function NewsEditor({ items, selected, setSelected, item, setItems, onAdd, onDelete, onSave }: { items: NewsItem[]; selected: number; setSelected: (value: number) => void; item: NewsItem; setItems: React.Dispatch<React.SetStateAction<NewsItem[]>>; onAdd: () => void; onDelete: () => void; onSave: () => void }) {
  const update = (patch: Partial<NewsItem>) => setItems((current) => current.map((entry, index) => index === selected ? { ...entry, ...patch } : entry));
  const updateHeadline = (headline: string) => update({ headline, slug: headline.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") });
  return <EditorFrame title="News & updates" description="Create announcements and articles for your visitors. The items marked as featured appear in the Latest Update area on the home page." onSave={onSave} onAdd={onAdd} onDelete={onDelete} count={items.length}><div className="grid grid-cols-1 gap-6"><RecordList items={items.map((entry) => entry.headline)} selected={selected} setSelected={setSelected} /><div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"><div className="grid gap-5 sm:grid-cols-2"><Field label="Headline" value={item.headline} onChange={updateHeadline} /><Field label="Category" value={item.category} onChange={(value) => update({ category: value })} /><Field label="Date" value={item.date} onChange={(value) => update({ date: value })} /></div><div className="mt-6"><ImageUploadField label="News image" value={item.imageUrl ?? ""} onChangeAction={(value) => update({ imageUrl: value })} /></div><div className="mt-5"><Field label="Short description" value={item.shortDescription} multiline onChange={(value) => update({ shortDescription: value })} /></div><div className="mt-5 flex items-center gap-3"><input id="featured" type="checkbox" checked={item.isImportantNotice} onChange={(event) => update({ isImportantNotice: event.target.checked })} /><label htmlFor="featured" className="text-sm font-medium">Show this in the Latest Update area on the home page</label></div></div></div></EditorFrame>;
}

function LeadershipEditor({ items, selected, setSelected, item, setItems, onAdd, onDelete, onSave }: { items: TeamMember[]; selected: number; setSelected: (value: number) => void; item: TeamMember; setItems: React.Dispatch<React.SetStateAction<TeamMember[]>>; onAdd: () => void; onDelete: () => void; onSave: () => void }) {
  const update = (patch: Partial<TeamMember>) => setItems((current) => current.map((entry, index) => index === selected ? { ...entry, ...patch } : entry));
  return <EditorFrame title="Team members" description="Add the people on your team, update their details, or remove someone who is no longer listed." onSave={onSave} onAdd={onAdd} onDelete={onDelete} count={items.length}><div className="grid grid-cols-1 gap-6"><RecordList items={items.map((entry) => entry.name)} selected={selected} setSelected={setSelected} /><div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"><div className="grid gap-5 sm:grid-cols-2"><Field label="Name" value={item.name} onChange={(value) => update({ name: value })} /><Field label="Position" value={item.position} onChange={(value) => update({ position: value })} /><Field label="Qualification" value={item.qualification} onChange={(value) => update({ qualification: value })} /></div><div className="mt-6"><ImageUploadField label="Profile photo" value={item.imageUrl ?? ""} onChangeAction={(value) => update({ imageUrl: value })} /></div><div className="mt-5"><Field label="Experience / biography" value={item.experience} multiline onChange={(value) => update({ experience: value })} /></div></div></div></EditorFrame>;
}

function ClientsEditor({ items, selected, setSelected, item, setItems, onAdd, onDelete, onSave }: { items: Client[]; selected: number; setSelected: (value: number) => void; item: Client; setItems: React.Dispatch<React.SetStateAction<Client[]>>; onAdd: () => void; onDelete: () => void; onSave: () => void }) {
  const update = (patch: Partial<Client>) => setItems((current) => current.map((entry, index) => index === selected ? { ...entry, ...patch } : entry));
  return <EditorFrame title="Our clients" description="Add or remove the organizations displayed in the clients section of your website." onSave={onSave} onAdd={onAdd} onDelete={onDelete} count={items.length}><div className="grid grid-cols-1 gap-6"><RecordList items={items.map((entry) => entry.name)} selected={selected} setSelected={setSelected} /><div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"><div className="grid gap-5"><Field label="Client name" value={item.name} onChange={(value) => update({ name: value })} /><ImageUploadField label="Client logo or image" value={item.imageUrl ?? ""} onChangeAction={(value) => update({ imageUrl: value })} /></div></div></div></EditorFrame>;
}

function RecordList({ items, selected, setSelected }: { items: string[]; selected: number; setSelected: (value: number) => void }) {
  return <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm"><p className="mb-3 px-2 text-xs font-bold uppercase tracking-wider text-slate-400">Click a card to edit</p><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{items.map((label, index) => <button key={`${label}-${index}`} onClick={() => setSelected(index)} className={`mb-0 flex min-h-20 w-full items-center rounded-xl border px-4 py-4 text-left text-sm ${selected === index ? "border-amber-400 bg-amber-50 font-semibold text-amber-800" : "border-slate-100 text-slate-600 hover:border-slate-300 hover:bg-slate-50"}`}>{label || "Untitled record"}</button>)}</div></div>;
}
