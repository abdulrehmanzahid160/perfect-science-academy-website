"use client";

import { FormEvent, useRef, useState } from "react";

type FormStatus = "idle" | "submitting" | "complete";

export function AdmissionForm() {
  const [error, setError] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const required = ["name", "parent", "phone", "level"];
    const missing = required.some((field) => !String(form.get(field) || "").trim());

    if (missing) {
      setError("Please complete the student name, parent / guardian name, phone number and class.");
      return;
    }

    setError("");
    setStatus("submitting");
    timerRef.current = setTimeout(() => {
      formElement.reset();
      setStatus("complete");
    }, 700);
  }

  if (status === "complete") {
    return <div className="form-success" role="status" aria-live="polite"><span>✓</span><p className="eyebrow">Demo submitted</p><h2>Thank you for your interest.</h2><p>This website demonstration did not transmit or store your information. Please call the academy when you want to make a real enquiry.</p><button className="text-link" type="button" onClick={() => setStatus("idle")}>Send another demo <span>↗</span></button></div>;
  }

  return <form className="admission-form" onSubmit={submit} noValidate>
    <div className="field"><label htmlFor="name">Student name *</label><input id="name" name="name" autoComplete="name"/></div>
    <div className="field"><label htmlFor="parent">Parent / guardian name *</label><input id="parent" name="parent" autoComplete="name"/></div>
    <div className="field"><label htmlFor="phone">Phone number *</label><input id="phone" name="phone" inputMode="tel" autoComplete="tel"/></div>
    <div className="field"><label htmlFor="whatsapp">WhatsApp number</label><input id="whatsapp" name="whatsapp" inputMode="tel"/></div>
    <div className="field full"><label htmlFor="level">Class *</label><select id="level" name="level" defaultValue=""><option value="" disabled>Select a class</option><option>1–8</option><option>9</option><option>10</option><option>11</option><option>12</option></select></div>
    <fieldset className="full"><legend>Subjects</legend><div className="check-row">{["Mathematics", "Physics", "Chemistry", "Biology", "English"].map((subject) => <label key={subject}><input type="checkbox" name="subjects" value={subject}/><span>{subject}</span></label>)}</div></fieldset>
    <div className="field full"><label htmlFor="school">School / college</label><input id="school" name="school"/></div>
    <div className="field full"><label htmlFor="message">Message</label><textarea id="message" name="message" rows={4}/></div>
    {error && <p className="form-error full" role="alert">{error}</p>}
    <div className="form-submit full"><p>Demonstration form only. No information is sent, stored or emailed.</p><button className="button button-dark" type="submit" disabled={status === "submitting"}>{status === "submitting" ? "Submitting…" : "Submit enquiry"}<span>↗</span></button></div>
  </form>;
}
