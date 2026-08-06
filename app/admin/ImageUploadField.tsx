"use client";

import { useRef, useState } from "react";
import { ImagePlus, Loader2 } from "lucide-react";

export function ImageUploadField({ label, value, onChangeAction }: { label: string; value: string; onChangeAction: (value: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function upload(file: File) {
    setError("");
    setUploading(true);
    try {
      const signatureResponse = await fetch("/api/admin/cloudinary-signature", { method: "POST" });
      const signature = await signatureResponse.json();
      if (!signatureResponse.ok) throw new Error(signature.error ?? "Image service is not configured");

      const body = new FormData();
      body.append("file", file);
      body.append("api_key", signature.apiKey);
      body.append("timestamp", String(signature.timestamp));
      body.append("signature", signature.signature);
      const uploadResponse = await fetch(`https://api.cloudinary.com/v1_1/${signature.cloudName}/image/upload`, { method: "POST", body });
      const result = await uploadResponse.json();
      if (!uploadResponse.ok) throw new Error(result.error?.message ?? "Image upload failed");
      onChangeAction(result.secure_url);
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Image upload failed");
    } finally {
      setUploading(false);
    }
  }

  return <div><p className="text-sm font-medium text-slate-700">{label}</p><div className="mt-2 flex flex-wrap items-center gap-4"><div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-lg border border-dashed border-slate-300 bg-slate-50">{value ? <img src={value} alt="Selected preview" className="h-full w-full object-cover" /> : <ImagePlus className="h-7 w-7 text-slate-300" aria-hidden="true" />}</div><div><button type="button" onClick={() => inputRef.current?.click()} disabled={uploading} className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:border-amber-500 disabled:opacity-60">{uploading && <Loader2 className="h-4 w-4 animate-spin" />}{uploading ? "Uploading..." : value ? "Replace image" : "Upload image"}</button><input ref={inputRef} type="file" accept="image/png,image/jpeg,image/webp" className="hidden" onChange={(event) => { const file = event.target.files?.[0]; if (file) void upload(file); event.target.value = ""; }} /><p className="mt-2 text-xs text-slate-400">PNG, JPG, or WEBP</p></div></div>{error && <p className="mt-2 text-xs text-red-600">{error}</p>}</div>;
}
