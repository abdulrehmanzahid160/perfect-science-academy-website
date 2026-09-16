"use client";

import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { AdminLogoutButton } from "@/components/AdminLogoutButton";
import { PositionCertificate } from "@/components/PositionCertificate";
import { positionOptions, type PositionCertificateDraft } from "@/types/certificate";

const STORAGE_KEY = "psa-position-certificate-drafts-v1";

function localDate() {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60_000;
  return new Date(now.getTime() - offset).toISOString().slice(0, 10);
}

function classCode(value: string) {
  return value.toUpperCase().replace(/CLASS|GRADE/g, "C").replace(/[^A-Z0-9]/g, "").slice(0, 7) || "GENERAL";
}

function nextId(issueDate: string, classLevel: string, existingIds: Iterable<string>) {
  const year = issueDate.slice(0, 4) || String(new Date().getFullYear());
  const prefix = `PSA-POS-${year}-${classCode(classLevel)}`;
  const used = new Set(existingIds);
  let sequence = 1;
  while (used.has(`${prefix}-${String(sequence).padStart(3, "0")}`)) sequence += 1;
  return `${prefix}-${String(sequence).padStart(3, "0")}`;
}

function blankDraft(existingIds: Iterable<string> = []): PositionCertificateDraft {
  const now = new Date().toISOString();
  const issueDate = localDate();
  return {
    id: nextId(issueDate, "Class 10", existingIds),
    recipient: "",
    classLevel: "Class 10",
    position: "First Position",
    examTitle: "Annual Examination",
    academicSession: `${new Date().getFullYear()}–${new Date().getFullYear() + 1}`,
    marks: "",
    totalMarks: "",
    percentage: "",
    issueDate,
    issuer: "Usman Mustafa",
    remarks: "",
    includeSignature: true,
    createdAt: now,
    updatedAt: now,
  };
}

function normalizeHeader(value: string) {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
}

function parseCsv(text: string) {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    if (character === '"') {
      if (quoted && text[index + 1] === '"') { cell += '"'; index += 1; }
      else quoted = !quoted;
    } else if (character === "," && !quoted) {
      row.push(cell.trim()); cell = "";
    } else if ((character === "\n" || character === "\r") && !quoted) {
      if (character === "\r" && text[index + 1] === "\n") index += 1;
      row.push(cell.trim());
      if (row.some(Boolean)) rows.push(row);
      row = []; cell = "";
    } else cell += character;
  }
  row.push(cell.trim());
  if (row.some(Boolean)) rows.push(row);
  if (rows.length < 2) return [];

  const headers = rows[0].map(normalizeHeader);
  return rows.slice(1).map((values) => Object.fromEntries(headers.map((header, index) => [header, values[index] || ""])));
}

function firstValue(row: Record<string, string>, keys: string[]) {
  for (const key of keys) if (row[key]) return row[key];
  return "";
}

function download(filename: string, content: string, type: string) {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function CertificateStudio() {
  const [drafts, setDrafts] = useState<PositionCertificateDraft[]>([]);
  const [form, setForm] = useState<PositionCertificateDraft>(() => blankDraft());
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]") as PositionCertificateDraft[];
      setDrafts(Array.isArray(saved) ? saved : []);
      setForm(blankDraft((Array.isArray(saved) ? saved : []).map((draft) => draft.id)));
    } catch {
      setDrafts([]);
      setForm(blankDraft());
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(STORAGE_KEY, JSON.stringify(drafts));
  }, [drafts, hydrated]);

  const visibleDrafts = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return drafts;
    return drafts.filter((draft) => [draft.recipient, draft.classLevel, draft.position, draft.id].some((value) => value.toLowerCase().includes(needle)));
  }, [drafts, query]);

  function field<K extends keyof PositionCertificateDraft>(key: K, value: PositionCertificateDraft[K]) {
    setForm((current) => {
      const updated = { ...current, [key]: value };
      if ((key === "marks" || key === "totalMarks") && Number(updated.marks) >= 0 && Number(updated.totalMarks) > 0) {
        updated.percentage = ((Number(updated.marks) / Number(updated.totalMarks)) * 100).toFixed(2).replace(/\.00$/, "");
      }
      return updated;
    });
  }

  function startNew() {
    setSelectedId(null);
    setForm(blankDraft(drafts.map((draft) => draft.id)));
    setMessage("");
  }

  function saveDraft() {
    if (!form.recipient.trim() || !form.classLevel.trim() || !form.position.trim()) {
      setMessage("Student name, class and position are required.");
      return;
    }
    const id = form.id.trim().toUpperCase() || nextId(form.issueDate, form.classLevel, drafts.map((draft) => draft.id));
    const duplicate = drafts.find((draft) => draft.id === id && draft.id !== selectedId);
    if (duplicate) { setMessage("That certificate ID is already used by another draft."); return; }

    const saved = { ...form, id, recipient: form.recipient.trim(), updatedAt: new Date().toISOString() };
    setDrafts((current) => [saved, ...current.filter((draft) => draft.id !== selectedId)]);
    setForm(saved);
    setSelectedId(id);
    setMessage("Draft saved in this browser. It is not publicly verified yet.");
  }

  function editDraft(draft: PositionCertificateDraft) {
    setForm(draft);
    setSelectedId(draft.id);
    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function deleteDraft(id: string) {
    if (!window.confirm("Delete this local draft? This cannot be undone.")) return;
    setDrafts((current) => current.filter((draft) => draft.id !== id));
    if (selectedId === id) startNew();
  }

  function regenerateId() {
    const otherIds = drafts.filter((draft) => draft.id !== selectedId).map((draft) => draft.id);
    field("id", nextId(form.issueDate, form.classLevel, otherIds));
  }

  async function importCsv(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const rows = parseCsv(await file.text());
      const existingIds = new Set(drafts.map((draft) => draft.id));
      const imported = rows.map((row) => {
        const certificate = blankDraft(existingIds);
        certificate.recipient = firstValue(row, ["student_name", "name", "recipient"]);
        certificate.classLevel = firstValue(row, ["class", "class_level", "grade"]) || certificate.classLevel;
        certificate.position = firstValue(row, ["position", "rank"]) || certificate.position;
        certificate.examTitle = firstValue(row, ["exam", "exam_title", "assessment"]) || certificate.examTitle;
        certificate.academicSession = firstValue(row, ["session", "academic_session", "year"]) || certificate.academicSession;
        certificate.marks = firstValue(row, ["marks", "obtained_marks"]);
        certificate.totalMarks = firstValue(row, ["total_marks", "total"]);
        certificate.percentage = firstValue(row, ["percentage", "percent"]);
        certificate.issueDate = firstValue(row, ["issue_date", "date"]) || certificate.issueDate;
        certificate.issuer = firstValue(row, ["issuer", "issued_by"]) || certificate.issuer;
        certificate.remarks = firstValue(row, ["remarks", "note"]);
        certificate.id = nextId(certificate.issueDate, certificate.classLevel, existingIds);
        existingIds.add(certificate.id);
        return certificate;
      }).filter((certificate) => certificate.recipient);
      setDrafts((current) => [...imported, ...current]);
      setMessage(`${imported.length} certificate draft${imported.length === 1 ? "" : "s"} imported. Review before printing.`);
    } catch {
      setMessage("The CSV file could not be read. Download the template and check its columns.");
    } finally {
      event.target.value = "";
    }
  }

  function printCertificates(mode: "current" | "all") {
    if (mode === "all" && drafts.length === 0) { setMessage("Save or import at least one draft before bulk printing."); return; }
    document.body.dataset.certificatePrint = mode;
    const cleanup = () => { delete document.body.dataset.certificatePrint; window.removeEventListener("afterprint", cleanup); };
    window.addEventListener("afterprint", cleanup);
    window.setTimeout(() => window.print(), 80);
  }

  const csvTemplate = "student_name,class,position,exam,session,marks,total_marks,percentage,issue_date,issuer,remarks\nAyesha Khan,Class 10,First Position,Annual Examination,2026-2027,1090,1200,90.83,2026-09-16,Usman Mustafa,Excellent performance";

  return <div className="certificate-studio">
    <header className="studio-header">
      <div><p className="eyebrow">Administration</p><h1>Certificate Studio</h1><p>Create, review and print position-holder certificates.</p></div>
      <div className="studio-header-actions"><span className="studio-mode">Local draft mode · Supabase pending</span><AdminLogoutButton/></div>
    </header>

    <div className="studio-toolbar">
      <button type="button" className="button button-primary" onClick={startNew}>New certificate</button>
      <button type="button" className="button studio-button" onClick={() => fileInput.current?.click()}>Import class CSV</button>
      <button type="button" className="button studio-button" onClick={() => download("psa-position-certificate-template.csv", csvTemplate, "text/csv")}>Download CSV template</button>
      <button type="button" className="button studio-button" onClick={() => download("psa-certificate-drafts.json", JSON.stringify(drafts, null, 2), "application/json")}>Back up drafts</button>
      <input ref={fileInput} className="sr-only" type="file" accept=".csv,text/csv" onChange={importCsv}/>
    </div>

    <div className="studio-workspace">
      <aside className="studio-drafts">
        <div className="studio-panel-heading"><div><span>Saved locally</span><b>{drafts.length} drafts</b></div><input aria-label="Search drafts" placeholder="Search name, class or ID" value={query} onChange={(event) => setQuery(event.target.value)}/></div>
        <div className="studio-draft-list">
          {visibleDrafts.length === 0 && <p className="studio-empty">No matching drafts yet.</p>}
          {visibleDrafts.map((draft) => <article className={selectedId === draft.id ? "is-active" : ""} key={draft.id}>
            <button type="button" onClick={() => editDraft(draft)}><span>{draft.classLevel} · {draft.position}</span><b>{draft.recipient}</b><small>{draft.id}</small></button>
            <button className="studio-delete" type="button" onClick={() => deleteDraft(draft.id)} aria-label={`Delete ${draft.recipient}`}>×</button>
          </article>)}
        </div>
      </aside>

      <section className="studio-editor">
        <div className="studio-section-title"><div><span>{selectedId ? "Editing draft" : "New draft"}</span><h2>Certificate details</h2></div><span className="studio-unpublished">Not publicly verified</span></div>
        <div className="studio-form-grid">
          <label className="full"><span>Student name *</span><input value={form.recipient} onChange={(event) => field("recipient", event.target.value)} placeholder="Student’s full name"/></label>
          <label><span>Class *</span><input value={form.classLevel} onChange={(event) => field("classLevel", event.target.value)} placeholder="Class 10"/></label>
          <label><span>Position *</span><select value={form.position} onChange={(event) => field("position", event.target.value)}>{positionOptions.map((position) => <option key={position}>{position}</option>)}</select></label>
          <label><span>Examination</span><input value={form.examTitle} onChange={(event) => field("examTitle", event.target.value)}/></label>
          <label><span>Academic session</span><input value={form.academicSession} onChange={(event) => field("academicSession", event.target.value)}/></label>
          <label><span>Obtained marks</span><input inputMode="decimal" value={form.marks} onChange={(event) => field("marks", event.target.value)}/></label>
          <label><span>Total marks</span><input inputMode="decimal" value={form.totalMarks} onChange={(event) => field("totalMarks", event.target.value)}/></label>
          <label><span>Percentage</span><input inputMode="decimal" value={form.percentage} onChange={(event) => field("percentage", event.target.value)}/></label>
          <label><span>Issue date</span><input type="date" value={form.issueDate} onChange={(event) => field("issueDate", event.target.value)}/></label>
          <label><span>Issuer</span><input value={form.issuer} onChange={(event) => field("issuer", event.target.value)}/></label>
          <label className="studio-checkbox"><input type="checkbox" checked={form.includeSignature} onChange={(event) => field("includeSignature", event.target.checked)}/><span>Include stored signature when issuer is Usman Mustafa</span></label>
          <label className="full"><span>Optional remarks</span><textarea rows={2} value={form.remarks} onChange={(event) => field("remarks", event.target.value)} placeholder="Short congratulatory note"/></label>
          <label className="full studio-id-field"><span>Certificate ID</span><div><input value={form.id} onChange={(event) => field("id", event.target.value.toUpperCase())}/><button type="button" onClick={regenerateId}>Regenerate</button></div></label>
        </div>
        {message && <p className="studio-message" role="status">{message}</p>}
        <div className="studio-form-actions"><button className="button button-primary" type="button" onClick={saveDraft}>Save local draft</button><button className="button studio-button" type="button" onClick={() => printCertificates("current")}>Print current / Save PDF</button><button className="button studio-button" type="button" onClick={() => printCertificates("all")}>Print all saved</button></div>
      </section>
    </div>

    <section className="studio-preview-section"><div className="studio-section-title"><div><span>Live preview</span><h2>Position-holder certificate</h2></div><small>A4 landscape · print ready</small></div><div className="studio-current-print"><PositionCertificate certificate={form}/></div></section>
    <div className="studio-print-stack" aria-hidden="true">{drafts.map((draft) => <PositionCertificate certificate={draft} key={draft.id}/>)}</div>
  </div>;
}
