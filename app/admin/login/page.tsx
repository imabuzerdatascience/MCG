"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();

      if (!response.ok) {
        setError(result.error ?? "Unable to sign in");
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Unable to sign in. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-off-white flex items-center justify-center px-6 py-16">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white border border-charcoal/10 p-8 shadow-sm">
        <p className="text-xs uppercase tracking-[0.25em] text-gold mb-3">MGC Associates</p>
        <h1 className="font-serif text-4xl text-charcoal mb-8">Admin sign in</h1>
        <div className="space-y-5">
          <label className="block text-sm text-charcoal">
            Email
            <input className="mt-2 w-full border border-charcoal/20 px-4 py-3 outline-none focus:border-gold" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
          </label>
          <label className="block text-sm text-charcoal">
            Password
            <input className="mt-2 w-full border border-charcoal/20 px-4 py-3 outline-none focus:border-gold" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
          </label>
        </div>
        {error && <p className="mt-4 text-sm text-red-700">{error}</p>}
        <button className="mt-7 w-full bg-charcoal px-5 py-3 text-sm uppercase tracking-widest text-white transition hover:bg-gold disabled:opacity-60" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </main>
  );
}
