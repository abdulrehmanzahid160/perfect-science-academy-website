import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { academy } from "@/data/academy";
import { certificateIds, getCertificate } from "@/data/certificates";

type CertificatePageProps = { params: Promise<{ id: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return certificateIds.map((id) => ({ id }));
}

export async function generateMetadata({ params }: CertificatePageProps): Promise<Metadata> {
  const { id } = await params;
  const certificate = getCertificate(decodeURIComponent(id));
  if (!certificate) return { title: "Certificate not found", robots: { index: false, follow: true } };

  return {
    title: `Verified Certificate — ${certificate.recipient}`,
    description: `Official Perfect Science Academy verification record for certificate ${certificate.id}, issued to ${certificate.recipient}.`,
    robots: { index: false, follow: true },
  };
}

export default async function CertificatePage({ params }: CertificatePageProps) {
  const { id } = await params;
  const certificate = getCertificate(decodeURIComponent(id));
  if (!certificate) notFound();

  return <section className="certificate-record-page section">
    <div className="shell certificate-record-shell">
      <Link className="record-back" href="/verify">← Verify another certificate</Link>
      <article className="certificate-record">
        <div className="record-status-bar">
          <span className="verified-mark" aria-hidden="true">✓</span>
          <div><p>Authenticity status</p><h1>Verified certificate</h1></div>
          <span className="status-pill">Official PSA record</span>
        </div>
        <div className="record-body">
          <div className="record-heading">
            <p className="eyebrow dark">Certificate of appreciation</p>
            <h2>{certificate.recipient}</h2>
            <p>This record confirms that the certificate shown below was issued by {academy.name}.</p>
          </div>
          <dl className="record-details">
            <div><dt>Certificate ID</dt><dd>{certificate.id}</dd></div>
            <div><dt>Issue date</dt><dd>{certificate.issuedOn}</dd></div>
            <div><dt>Affiliation</dt><dd>{certificate.affiliation}</dd></div>
            <div><dt>Recognition</dt><dd>{certificate.recognition}</dd></div>
            <div><dt>Subject taught</dt><dd>{certificate.subject}</dd></div>
            <div><dt>Service type</dt><dd>{certificate.serviceType}</dd></div>
            <div><dt>Authorized issuer</dt><dd>{certificate.issuer}</dd></div>
            <div><dt>Issuing organization</dt><dd>{academy.name}</dd></div>
          </dl>
          <div className="record-actions">
            <a className="button button-primary" href={certificate.certificateUrl} target="_blank" rel="noreferrer">Open certificate PDF <span aria-hidden="true">↗</span></a>
            <Link className="text-link" href="/">Visit academy website</Link>
          </div>
        </div>
      </article>
      <figure className="certificate-preview">
        <Image src={certificate.previewUrl} width={1123} height={794} alt={`Certificate of Appreciation issued to ${certificate.recipient}`}/>
        <figcaption>Official certificate preview · ID {certificate.id}</figcaption>
      </figure>
      <p className="record-security-note">For verification questions, contact <a href={`mailto:${academy.email}`}>{academy.email}</a>. A record is valid only when the certificate ID and displayed details match.</p>
    </div>
  </section>;
}
