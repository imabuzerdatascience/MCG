"use client";

import { useRouter } from "next/navigation";

export function AdminLogoutButton() {
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button onClick={logout} className="border border-charcoal/20 px-4 py-2 text-xs uppercase tracking-widest text-charcoal hover:border-gold hover:text-gold">
      Sign out
    </button>
  );
}
