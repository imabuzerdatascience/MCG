"use client";

import { useState } from "react";
import { Image as ImageIcon, Pencil, Plus, Trash2, UsersRound, X } from "lucide-react";
import type { NewsItem } from "@/data/news";
import type { TeamMember } from "@/data/team";
import type { Client } from "@/data/clients";
import { ImageUploadField } from "./ImageUploadField";
import { slugify } from "@/lib/utils";

// Result returned by the per-item news handlers wired to /api/admin/news.
export type NewsSaveResult = { ok: boolean; error?: string };

type NewsManagerProps = {
  items: NewsItem[];
  onCreate: (draft: Omit<NewsItem, "id">) => Promise<NewsSaveResult>;
  onUpdate: (item: NewsItem) => Promise<NewsSaveResult>;
  onDelete: (id: string) => Promise<NewsSaveResult>;
};
type TeamManagerProps = { items: TeamMember[]; setItems: React.Dispatch<React.SetStateAction<TeamMember[]>>; onSave: () => void; onAdd: () => void };
type ClientManagerProps = { items: Client[]; setItems: React.Dispatch<React.SetStateAction<Client[]>>; onSave: () => void; onAdd: () => void };

type FieldProps = { label: string; value: string; onChange: (value: string) => void; multiline?: boolean };

function TextField({ label, value, onChange, multiline = false }: FieldProps) {
  const style = "mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10";
  return <label className="block text-sm font-semibold text-slate-700">{label}{multiline ? <textarea className={`${style} min-h-32 resize-y`} value={value} onChange={(event) => onChange(event.target.value)} /> : <input className={style} value={value} onChange={(event) => onChange(event.target.value)} />}</label>;
}

function ManagerHeader({ title, description, count, onAdd, onSave }: { title: string; description: string; count: number; onAdd: () => void; onSave?: () => void }) {
  return <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><h2 className="text-3xl font-bold text-slate-900">{title}</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">{description}</p><p className="mt-3 text-xs font-bold uppercase tracking-widest text-slate-400">{count} {count === 1 ? "item" : "items"}</p></div><div className="flex gap-3">{onSave && <button onClick={onSave} className="rounded-lg bg-amber-500 px-5 py-3 text-sm font-bold text-slate-950 hover:bg-amber-400">Save all changes</button>}<button onClick={onAdd} className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-3 text-sm font-bold text-white hover:bg-slate-700"><Plus className="h-4 w-4" />Add new</button></div></div>;
}

function EmptyCard({ label, onAdd }: { label: string; onAdd: () => void }) {
  return <button onClick={onAdd} className="flex min-h-64 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-white p-6 text-center text-slate-500 hover:border-amber-400 hover:text-amber-700"><Plus className="mb-3 h-8 w-8" /><span className="font-semibold">Add your first {label}</span></button>;
}

function ImagePreview({ src, fallback }: { src?: string; fallback: React.ReactNode }) {
  return <div className="flex h-40 items-center justify-center overflow-hidden bg-slate-100">{src ? <img src={src} alt="" className="h-full w-full object-cover" /> : fallback}</div>;
}

// News is a first-class content type: every change is persisted immediately
// through the authenticated /api/admin/news routes (create/update/delete).
export function NewsManager({ items, onCreate, onUpdate, onDelete }: NewsManagerProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [creating, setCreating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [modalError, setModalError] = useState("");

  const openEditor = (index: number) => { setEditingIndex(index); setCreating(false); setModalError(""); };
  const openCreate = () => { setCreating(true); setEditingIndex(null); setModalError(""); };
  const closeEditor = () => { setEditingIndex(null); setCreating(false); setModalError(""); };

  const item = editingIndex !== null ? items[editingIndex] : undefined;

  async function handleCreate(draft: Omit<NewsItem, "id">) {
    setSaving(true);
    const result = await onCreate(draft);
    setSaving(false);
    if (result.ok) closeEditor(); else setModalError(result.error ?? "Saving failed");
  }

  async function handleUpdate(updated: NewsItem) {
    setSaving(true);
    const result = await onUpdate(updated);
    setSaving(false);
    if (result.ok) closeEditor(); else setModalError(result.error ?? "Saving failed");
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Delete this news item? This cannot be undone.")) return;
    setSaving(true);
    const result = await onDelete(id);
    setSaving(false);
    if (result.ok) closeEditor(); else setModalError(result.error ?? "Deleting failed");
  }

  return <div><ManagerHeader title="News & updates" description="Create, edit, and delete the articles shown under Latest News. Each change is saved to the website as soon as you press Save." count={items.length} onAdd={openCreate} /><div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{items.map((entry, index) => <article key={entry.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"><ImagePreview src={entry.imageUrl} fallback={<ImageIcon className="h-10 w-10 text-slate-300" />} /><div className="p-5"><div className="flex items-center justify-between gap-2"><span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">{entry.category}</span><span className="text-xs text-slate-400">{entry.date}</span></div><h3 className="mt-4 line-clamp-2 min-h-12 text-lg font-bold text-slate-900">{entry.title}</h3><p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-slate-500">{entry.excerpt}</p><div className="mt-5 flex items-center justify-between">{entry.isImportantNotice && <span className="text-xs font-bold text-emerald-600">Important notice</span>}<button onClick={() => openEditor(index)} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold text-slate-700 hover:border-amber-400 hover:text-amber-700"><Pencil className="h-3.5 w-3.5" />Edit</button></div></div></article>)}<EmptyCard label="news update" onAdd={openCreate} /></div>{creating && <NewsModal isNew title="Write news update" subtitle="Everything visitors need to read your update is in this form." item={emptyNewsDraft()} saving={saving} error={modalError} onClose={closeEditor} onDelete={undefined} onSave={(draft) => { if (!("id" in draft)) void handleCreate(draft); }} />}{item && editingIndex !== null && <NewsModal title="Edit news update" subtitle="Update the article and press Save to publish your changes." item={item} saving={saving} error={modalError} onClose={closeEditor} onDelete={() => handleDelete(item.id)} onSave={(updated) => { if ("id" in updated) void handleUpdate(updated); }} />}</div>;
}

function emptyNewsDraft(): Omit<NewsItem, "id"> {
  return { slug: "", category: "News", date: new Date().toISOString().slice(0, 10), title: "", excerpt: "", body: "", isImportantNotice: false, imageUrl: "", tags: [] };
}

function NewsModal({ item, isNew, saving, error, onClose, onDelete, onSave, title, subtitle }: { isNew?: boolean; saving: boolean; error: string; item: NewsItem | Omit<NewsItem, "id">; onClose: () => void; onDelete?: (() => void) | undefined; onSave: (item: NewsItem | Omit<NewsItem, "id">) => void; title: string; subtitle: string }) {
  const [draft, setDraft] = useState<NewsItem | Omit<NewsItem, "id">>(item);
  const [slugEdited, setSlugEdited] = useState(false);
  const [tagText, setTagText] = useState((item.tags ?? []).join(", "));
  const update = (patch: Partial<NewsItem>) => setDraft((current) => ({ ...current, ...patch }));

  return <Modal title={title} subtitle={subtitle} error={error} onClose={onClose} onDelete={onDelete} onSave={() => onSave({ ...draft, tags: tagText.split(",").map((tag) => tag.trim()).filter(Boolean) })} saving={saving}><div className="grid gap-6 lg:grid-cols-[1fr_280px]"><div className="space-y-5"><TextField label="Headline" value={draft.title} onChange={(title) => update({ title, ...(isNew && !slugEdited ? { slug: slugify(title) } : {}) })} /><TextField label="Short description (excerpt shown in previews)" value={draft.excerpt} multiline onChange={(excerpt) => update({ excerpt })} /><TextField label="Full article text (blank line between paragraphs)" value={draft.body} multiline onChange={(body) => update({ body })} /><div className="grid gap-5 sm:grid-cols-2"><TextField label="Category" value={draft.category} onChange={(category) => update({ category })} /><TextField label="Date (YYYY-MM-DD)" value={draft.date} onChange={(date) => update({ date })} /></div><div className="grid gap-5 sm:grid-cols-2"><TextField label="URL slug" value={draft.slug} onChange={(slug) => { setSlugEdited(true); update({ slug: slugify(slug) }); }} /><TextField label="Tags (comma separated)" value={tagText} onChange={setTagText} /></div></div><div className="space-y-6"><ImageUploadField label="Article image" value={draft.imageUrl ?? ""} onChangeAction={(imageUrl) => update({ imageUrl })} /><label className="flex cursor-pointer items-start gap-3 rounded-xl bg-amber-50 p-4 text-sm text-slate-700"><input className="mt-1" type="checkbox" checked={draft.isImportantNotice} onChange={(event) => update({ isImportantNotice: event.target.checked })} /><span><strong>Mark as Important Notice</strong><br /><small className="text-slate-500">Shows an Important Notice badge on the article page.</small></span></label></div></div></Modal>;
}

export function TeamManager({ items, setItems, onSave, onAdd }: TeamManagerProps) {
  const [editing, setEditing] = useState<number | null>(null);
  const item = editing === null ? undefined : items[editing];
  const update = (patch: Partial<TeamMember>) => editing !== null && setItems((current) => current.map((entry, index) => index === editing ? { ...entry, ...patch } : entry));
  const remove = () => { if (editing === null) return; setItems((current) => current.filter((_, index) => index !== editing)); setEditing(null); };
  const create = () => { onAdd(); setEditing(items.length); };
  return <div><ManagerHeader title="Team members" description="Add the people visitors should see on your leadership page. Each person has their own profile card." count={items.length} onAdd={create} onSave={onSave} /><div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{items.map((entry, index) => <article key={entry.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"><ImagePreview src={entry.imageUrl} fallback={<UsersRound className="h-12 w-12 text-slate-300" />} /><div className="p-5"><h3 className="text-lg font-bold text-slate-900">{entry.name}</h3><p className="mt-1 text-sm font-semibold text-amber-700">{entry.position}</p><p className="mt-3 line-clamp-2 min-h-10 text-sm text-slate-500">{entry.experience}</p><button onClick={() => setEditing(index)} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold text-slate-700 hover:border-amber-400 hover:text-amber-700"><Pencil className="h-3.5 w-3.5" />Edit member</button></div></article>)}<EmptyCard label="team member" onAdd={create} /></div>{item && <Modal title="Edit team member" subtitle="Update this person's public profile." onClose={() => setEditing(null)} onDelete={remove} onSave={() => { onSave(); setEditing(null); }}><div className="grid gap-5 sm:grid-cols-2"><TextField label="Full name" value={item.name} onChange={(name) => update({ name })} /><TextField label="Position" value={item.position} onChange={(position) => update({ position })} /><TextField label="Qualification" value={item.qualification} onChange={(qualification) => update({ qualification })} /><div className="sm:col-span-2"><ImageUploadField label="Profile photo" value={item.imageUrl ?? ""} onChangeAction={(imageUrl) => update({ imageUrl })} /></div><div className="sm:col-span-2"><TextField label="Biography / experience" value={item.experience} multiline onChange={(experience) => update({ experience })} /></div></div></Modal>}</div>;
}

export function ClientManager({ items, setItems, onSave, onAdd }: ClientManagerProps) {
  const [editing, setEditing] = useState<number | null>(null);
  const item = editing === null ? undefined : items[editing];
  const update = (patch: Partial<Client>) => editing !== null && setItems((current) => current.map((entry, index) => index === editing ? { ...entry, ...patch } : entry));
  const remove = () => { if (editing === null) return; setItems((current) => current.filter((_, index) => index !== editing)); setEditing(null); };
  const create = () => { onAdd(); setEditing(items.length); };
  return <div><ManagerHeader title="Our clients" description="Show the organizations your company works with. Add a logo or image to make each client card more recognizable." count={items.length} onAdd={create} onSave={onSave} /><div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{items.map((entry, index) => <article key={entry.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"><ImagePreview src={entry.imageUrl} fallback={<div className="px-6 text-center text-sm font-bold text-slate-400">Client logo</div>} /><div className="p-5"><h3 className="min-h-12 text-lg font-bold text-slate-900">{entry.name}</h3><button onClick={() => setEditing(index)} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold text-slate-700 hover:border-amber-400 hover:text-amber-700"><Pencil className="h-3.5 w-3.5" />Edit client</button></div></article>)}<EmptyCard label="client" onAdd={create} /></div>{item && <Modal title="Edit client" subtitle="Update the name and image visitors see." onClose={() => setEditing(null)} onDelete={remove} onSave={() => { onSave(); setEditing(null); }}><TextField label="Client name" value={item.name} onChange={(name) => update({ name })} /><div className="mt-6"><ImageUploadField label="Client logo or image" value={item.imageUrl ?? ""} onChangeAction={(imageUrl) => update({ imageUrl })} /></div></Modal>}</div>;
}

function Modal({ title, subtitle, children, onClose, onDelete, onSave, saving, error }: { title: string; subtitle: string; children: React.ReactNode; onClose: () => void; onDelete?: (() => void) | undefined; onSave: () => void; saving?: boolean; error?: string }) {
  return <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-950/50 p-4 sm:p-8"><div className="w-full max-w-4xl rounded-2xl bg-slate-50 shadow-2xl"><header className="flex items-start justify-between border-b border-slate-200 bg-white px-6 py-5 sm:px-8"><div><h2 className="text-2xl font-bold text-slate-900">{title}</h2><p className="mt-1 text-sm text-slate-500">{subtitle}</p></div><button onClick={onClose} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700" aria-label="Close editor"><X /></button></header><div className="px-6 py-6 sm:px-8">{children}{error && <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p>}</div><footer className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 bg-white px-6 py-5 sm:px-8">{onDelete && <button onClick={onDelete} disabled={saving} className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 disabled:opacity-60"><Trash2 className="h-4 w-4" />Delete</button>}<div className="flex gap-3"><button onClick={onClose} className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-bold text-slate-700">Cancel</button><button onClick={onSave} disabled={saving} className="rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-bold text-slate-950 hover:bg-amber-400 disabled:opacity-60">{saving ? "Saving..." : "Save changes"}</button></div></footer></div></div>;
}
