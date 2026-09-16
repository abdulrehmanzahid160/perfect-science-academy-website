import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/AdminLoginForm";
import { hasAdminSession, isAdminConfigured } from "@/lib/admin-auth";

export const metadata: Metadata = { title: "Certificate Studio Login", robots: { index: false, follow: false } };

export default async function AdminLoginPage() {
  if (await hasAdminSession()) redirect("/admin/certificates");

  return <section className="admin-login-page section">
    <div className="admin-login-card">
      <div className="admin-login-brand"><span>PSA</span><p>Perfect Science Academy</p></div>
      <p className="eyebrow dark">Restricted administration</p>
      <h1>Certificate Studio</h1>
      <p>Create and manage academy certificates. Access is limited to an authorized administrator.</p>
      <AdminLoginForm configured={isAdminConfigured()}/>
    </div>
  </section>;
}
