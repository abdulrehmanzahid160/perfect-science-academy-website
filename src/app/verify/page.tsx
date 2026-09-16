import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { CertificateLookup } from "@/components/CertificateLookup";

export const metadata: Metadata = {
  title: "Certificate Verification",
  description: "Verify certificates issued by Perfect Science Academy using the unique certificate ID.",
  alternates: { canonical: "/verify" },
};

export default function VerifyPage() {
  return <>
    <PageHero
      eyebrow="Official records"
      title={<>Verify an official<br/><em>PSA certificate.</em></>}
      intro="Enter the unique certificate ID to confirm the recipient, recognition, issue date and issuing authority directly from Perfect Science Academy."
    />
    <section className="verification-section section">
      <div className="shell verification-layout">
        <div>
          <p className="eyebrow dark">Certificate lookup</p>
          <h2>Check its authenticity.</h2>
          <p className="verification-intro">Every official certificate has a unique ID. The verification record should match the name and details printed on the document.</p>
        </div>
        <CertificateLookup/>
      </div>
    </section>
  </>;
}
