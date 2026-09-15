"use client";

import { FormEvent, useState } from "react";
import { subjects, whatsappLink } from "@/data/academy";

export function AdmissionForm() {
  const [error, setError] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    const parent = String(form.get("parent") || "").trim();
    const phone = String(form.get("phone") || "").trim();
    const level = String(form.get("level") || "").trim();
    if (!name || !parent || !phone || !level) { setError("Please complete the student name, parent or guardian name, phone number and class."); return; }
    setError("");
    const selected = form.getAll("subjects").join(", ") || "Not specified";
    const school = String(form.get("school") || "Not specified").trim();
    const note = String(form.get("message") || "No additional message").trim();
    const message = `Assalam-o-Alaikum, I would like to make an admission enquiry.\n\nStudent: ${name}\nParent / Guardian: ${parent}\nPhone: ${phone}\nClass: ${level}\nSubjects: ${selected}\nSchool / College: ${school}\nMessage: ${note}`;
    window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
  }

  return <form className="admission-form" onSubmit={submit} noValidate><div className="field"><label htmlFor="name">Student name *</label><input id="name" name="name" autoComplete="name" placeholder="Enter student name"/></div><div className="field"><label htmlFor="parent">Parent / guardian *</label><input id="parent" name="parent" autoComplete="name" placeholder="Enter parent name"/></div><div className="field"><label htmlFor="phone">Phone number *</label><input id="phone" name="phone" inputMode="tel" autoComplete="tel" placeholder="03XX XXXXXXX"/></div><div className="field"><label htmlFor="level">Current class *</label><select id="level" name="level" defaultValue=""><option value="" disabled>Select a class</option>{Array.from({ length: 12 }, (_, index) => <option key={index + 1}>Class {index + 1}</option>)}</select></div><fieldset className="full"><legend>Subjects of interest</legend><div className="check-row">{subjects.map((subject) => <label key={subject}><input type="checkbox" name="subjects" value={subject}/><span>{subject}</span></label>)}</div></fieldset><div className="field full"><label htmlFor="school">School / college</label><input id="school" name="school" placeholder="Optional"/></div><div className="field full"><label htmlFor="message">Anything else we should know?</label><textarea id="message" name="message" rows={4} placeholder="Subjects, goals, preferred timings..."/></div>{error && <p className="form-error full" role="alert">{error}</p>}<div className="form-submit full"><p>Your details are not stored on this website. They are added to a WhatsApp message for you to review and send.</p><button className="button button-primary" type="submit">Continue on WhatsApp <span>↗</span></button></div></form>;
}
