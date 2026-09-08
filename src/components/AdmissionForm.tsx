"use client";

import { FormEvent, useState } from "react";
import { whatsappLink } from "@/data/academy";

export function AdmissionForm() {
  const [error, setError] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim(); const phone = String(form.get("phone") || "").trim(); const level = String(form.get("level") || "");
    if (!name || !phone || !level) { setError("Please complete your name, phone number and class level."); return; }
    setError("");
    const subjects = form.getAll("subjects").join(", ") || "Not selected";
    const message = `Assalam-o-Alaikum, I would like to enquire about admission at Perfect Science Academy.\n\nStudent: ${name}\nPhone: ${phone}\nClass level: ${level}\nSubjects: ${subjects}`;
    window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
  }
  return <form className="admission-form" onSubmit={submit} noValidate><div className="field"><label htmlFor="name">Student name *</label><input id="name" name="name" autoComplete="name" /></div><div className="field"><label htmlFor="phone">Phone number *</label><input id="phone" name="phone" inputMode="tel" autoComplete="tel" /></div><div className="field full"><label htmlFor="level">Current / intended class *</label><select id="level" name="level" defaultValue=""><option value="" disabled>Select a level</option><option>Classes 1–8 · Foundation</option><option>Classes 9–10 · Matric</option><option>Classes 11–12 · Intermediate</option></select></div><fieldset className="full"><legend>Subjects of interest</legend><div className="check-row">{["Mathematics", "Physics", "Chemistry", "Biology", "English"].map((subject) => <label key={subject}><input type="checkbox" name="subjects" value={subject}/><span>{subject}</span></label>)}</div></fieldset>{error && <p className="form-error full" role="alert">{error}</p>}<div className="form-submit full"><p>Your information is not stored on this website. The button opens a pre-filled WhatsApp message.</p><button className="button button-dark" type="submit">Continue on WhatsApp <span>↗</span></button></div></form>;
}
