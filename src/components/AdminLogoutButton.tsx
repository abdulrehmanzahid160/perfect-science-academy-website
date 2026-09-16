"use client";

import { useState } from "react";

export function AdminLogoutButton() {
  const [pending, setPending] = useState(false);

  async function logout() {
    setPending(true);
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.assign("/admin/login");
  }

  return <button className="studio-logout" type="button" onClick={logout} disabled={pending}>{pending ? "Signing out…" : "Sign out"}</button>;
}
