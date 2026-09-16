"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function CertificateLookup() {
  const router = useRouter();
  const [certificateId, setCertificateId] = useState("");

  function verify(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedId = certificateId.trim().toUpperCase();
    if (normalizedId) router.push(`/verify/${encodeURIComponent(normalizedId)}`);
  }

  return <form className="certificate-lookup" onSubmit={verify}>
    <label htmlFor="certificate-id">Certificate ID</label>
    <div className="certificate-lookup-row">
      <input
        id="certificate-id"
        name="certificate-id"
        value={certificateId}
        onChange={(event) => setCertificateId(event.target.value)}
        placeholder="e.g. PSA-VCS-2026-001"
        autoComplete="off"
        spellCheck={false}
        required
      />
      <button className="button button-accent" type="submit">Verify certificate <span aria-hidden="true">→</span></button>
    </div>
    <p>Enter the ID exactly as it appears near the bottom of the certificate.</p>
  </form>;
}
