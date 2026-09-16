import type { Metadata } from "next";
import { CertificateStudio } from "@/components/CertificateStudio";
import { requireAdminSession } from "@/lib/admin-auth";

export const metadata: Metadata = { title: "Certificate Studio", robots: { index: false, follow: false } };

export default async function CertificateStudioPage() {
  await requireAdminSession();
  return <CertificateStudio/>;
}
