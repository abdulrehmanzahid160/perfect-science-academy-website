export type CertificateRecord = {
  id: string;
  recipient: string;
  affiliation: string;
  recognition: string;
  subject: string;
  serviceType: string;
  issuedOn: string;
  issuer: string;
  status: "verified";
  certificateUrl: string;
  previewUrl: string;
};

export const certificates = {
  "PSA-VCS-2026-001": {
    id: "PSA-VCS-2026-001",
    recipient: "Abdul Rehman",
    affiliation: "National University of Technology (NUTECH), Islamabad",
    recognition: "Certificate of Appreciation for outstanding voluntary teaching service",
    subject: "Computer Science",
    serviceType: "Voluntary",
    issuedOn: "15 September 2026",
    issuer: "Usman Mustafa",
    status: "verified",
    certificateUrl: "/certificates/PSA-VCS-2026-001.pdf",
    previewUrl: "/certificates/PSA-VCS-2026-001.png",
  },
} satisfies Record<string, CertificateRecord>;

export const certificateIds = Object.keys(certificates);

export function getCertificate(id: string): CertificateRecord | undefined {
  return certificates[id.toUpperCase() as keyof typeof certificates];
}
