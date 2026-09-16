"use client";

import { FormEvent, useState } from "react";

export function AdminLoginForm({ configured }: { configured: boolean }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!configured || pending) return;
    setPending(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to sign in.");
      window.location.assign("/admin/certificates");
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "Unable to sign in.");
      setPending(false);
    }
  }

  return <form className="admin-login-form" onSubmit={login}>
    <label htmlFor="admin-password">Administrator password</label>
    <input
      id="admin-password"
      type="password"
      value={password}
      onChange={(event) => setPassword(event.target.value)}
      autoComplete="current-password"
      minLength={12}
      disabled={!configured || pending}
      required
    />
    {error && <p className="admin-form-error" role="alert">{error}</p>}
    {!configured && <p className="admin-config-note">Admin access is safely locked. Configure <code>PSA_ADMIN_PASSWORD</code> and <code>PSA_SESSION_SECRET</code> to enable sign-in.</p>}
    <button className="button button-accent" type="submit" disabled={!configured || pending}>{pending ? "Signing in…" : "Open certificate studio"}</button>
  </form>;
}
