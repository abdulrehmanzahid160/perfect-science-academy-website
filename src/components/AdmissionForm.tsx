"use client";

import { FormEvent, useState } from "react";
import { whatsappLink } from "@/data/academy";

export function AdmissionForm() {
  const [error, setError] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim(); const parent = String(form.get("parent") || "").trim(); const phone = String(form.get("phone") || "").trim(); const whatsapp = String(form.get("whatsapp") || "").trim(); const level = String(form.get("level") || "");
    if (!name || !parent || !phone || !level) { setError("Please complete the student name, parent / guardian name, phone number and class."); return; }
    setError("");
    const subjects = form.getAll("subjects").join(", ") || "Not selected";
    const school = String(form.get("school") || "").trim() || "Not provided"; const note = String(form.get("message") || "").trim() || "—";
    const message = `Hello Perfect Science Academy,\nI would like to ask about admission.\n\nStudent: ${name}\nClass: ${level}\nSubjects: ${subjects}\nParent/Guardian: ${parent}\nPhone: ${phone}\nWhatsApp: ${whatsapp || phone}\nSchool/College: ${school}\nMessage: ${note}`;
    window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
  }
  return <form className="admission-form" onSubmit={submit} noValidate><div className="field"><label htmlFor="name">Student name *</label><input id="name" name="name" autoComplete="name" /></div><div className="field"><label htmlFor="parent">Parent / guardian name *</label><input id="parent" name="parent" autoComplete="name" /></div><div className="field"><label htmlFor="phone">Phone number *</label><input id="phone" name="phone" inputMode="tel" autoComplete="tel" /></div><div className="field"><label htmlFor="whatsapp">WhatsApp number</label><input id="whatsapp" name="whatsapp" inputMode="tel" /></div><div className="field full"><label htmlFor="level">Class *</label><select id="level" name="level" defaultValue=""><option value="" disabled>Select a class</option><option>1–8</option><option>9</option><option>10</option><option>11</option><option>12</option></select></div><fieldset className="full"><legend>Subjects</legend><div className="check-row">{["Mathematics", "Physics", "Chemistry", "Biology", "English"].map((subject) => <label key={subject}><input type="checkbox" name="subjects" value={subject}/><span>{subject}</span></label>)}</div></fieldset><div className="field full"><label htmlFor="school">School / college</label><input id="school" name="school" /></div><div className="field full"><label htmlFor="message">Message</label><textarea id="message" name="message" rows={4}/></div>{error && <p className="form-error full" role="alert">{error}</p>}<div className="form-submit full"><p>Your information is not stored on this website. This opens a pre-filled WhatsApp message.</p><button className="button button-dark" type="submit">Send via WhatsApp <span>↗</span></button></div></form>;
}
