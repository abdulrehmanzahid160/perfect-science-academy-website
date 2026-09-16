import Link from "next/link";

export default function CertificateNotFound() {
  return <section className="certificate-record-page section">
    <div className="shell certificate-not-found">
      <p className="eyebrow dark">No matching record</p>
      <h1>Certificate not found.</h1>
      <p>Check the certificate ID for typing mistakes, then try again. A missing record does not verify the certificate as authentic.</p>
      <Link className="button button-primary" href="/verify">Return to verification</Link>
    </div>
  </section>;
}
