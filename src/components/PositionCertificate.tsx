import type { PositionCertificateDraft } from "@/types/certificate";

function formatIssueDate(value: string) {
  if (!value) return "Date to be confirmed";
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime())
    ? value
    : new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" }).format(date);
}

export function PositionCertificate({ certificate }: { certificate: PositionCertificateDraft }) {
  const score = certificate.marks && certificate.totalMarks
    ? `${certificate.marks} / ${certificate.totalMarks} marks`
    : certificate.percentage
      ? `${certificate.percentage}%`
      : "Academic excellence";

  return <article className="position-certificate" aria-label={`Position certificate for ${certificate.recipient || "student"}`}>
    <span className="position-certificate-frame"/>
    <span className="position-facet position-facet-one"/>
    <span className="position-facet position-facet-two"/>
    <span className="position-facet position-facet-three"/>
    <span className="position-facet position-facet-four"/>
    <div className="position-certificate-content">
      <header className="position-certificate-brand">
        <img src="/images/psa-logo.png" alt=""/>
        <div><b>Perfect Science Academy</b><small>Perfection leads to excellence</small></div>
      </header>
      <p className="position-certificate-kicker">Certificate of</p>
      <h2>Achievement</h2>
      <div className="position-certificate-rule"/>
      <p className="position-presented">This certificate is proudly presented to</p>
      <p className="position-recipient">{certificate.recipient || "Student Name"}</p>
      <p className="position-affiliation">{certificate.classLevel || "Class"} · {certificate.academicSession || "Academic session"}</p>
      <p className="position-copy">For securing <strong>{certificate.position || "a distinguished position"}</strong> in <strong>{certificate.examTitle || "the academy examination"}</strong>. This award recognizes excellent academic performance, consistent effort and a commitment to learning.</p>
      <div className="position-result"><span>{score}</span>{certificate.percentage && certificate.marks && certificate.totalMarks && <span>{certificate.percentage}%</span>}</div>
      {certificate.remarks && <p className="position-remarks">{certificate.remarks}</p>}
      <div className="position-certificate-formalities">
        <div className="position-signature">
          {certificate.includeSignature && certificate.issuer === "Usman Mustafa" && <img src="/certificates/usman-mustafa-signature.png" alt="Signature of Usman Mustafa"/>}
          <span className="position-signature-line"/>
          <b>{certificate.issuer || "Authorized issuer"}</b>
          <small>Perfect Science Academy</small>
        </div>
        <div className="position-seal"><div><b>PSA</b><span>Academic Award</span><small>{certificate.issueDate.slice(0, 4) || new Date().getFullYear()}</small></div></div>
        <div className="position-date"><span className="position-signature-line"/><b>{formatIssueDate(certificate.issueDate)}</b><small>Date of issue</small></div>
      </div>
    </div>
    <footer className="position-certificate-footer"><span>ID: {certificate.id || "Generated when saved"}</span><span>Verification available after publication</span></footer>
  </article>;
}
