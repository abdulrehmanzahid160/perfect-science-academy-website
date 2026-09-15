"use client";

import { FormEvent, useState } from "react";
import { whatsappLink } from "@/data/academy";
import { urduSubjects } from "@/data/urdu";

export function UrduAdmissionForm() {
  const [error, setError] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    const parent = String(form.get("parent") || "").trim();
    const phone = String(form.get("phone") || "").trim();
    const level = String(form.get("level") || "").trim();
    if (!name || !parent || !phone || !level) { setError("براہِ کرم طالب علم کا نام، والد یا سرپرست کا نام، فون نمبر اور جماعت درج کریں۔"); return; }
    setError("");
    const selected = form.getAll("subjects").join("، ") || "درج نہیں";
    const school = String(form.get("school") || "درج نہیں").trim();
    const note = String(form.get("message") || "کوئی اضافی پیغام نہیں").trim();
    const message = `السلام علیکم، میں داخلے کے بارے میں معلومات چاہتا/چاہتی ہوں۔\n\nطالب علم: ${name}\nوالد / سرپرست: ${parent}\nفون: ${phone}\nجماعت: ${level}\nمضامین: ${selected}\nسکول / کالج: ${school}\nپیغام: ${note}`;
    window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
  }
  return <form className="admission-form" onSubmit={submit} noValidate><div className="field"><label htmlFor="ur-name">طالب علم کا نام *</label><input id="ur-name" name="name" autoComplete="name" placeholder="طالب علم کا نام درج کریں"/></div><div className="field"><label htmlFor="ur-parent">والد / سرپرست کا نام *</label><input id="ur-parent" name="parent" autoComplete="name" placeholder="والد یا سرپرست کا نام"/></div><div className="field"><label htmlFor="ur-phone">فون نمبر *</label><input id="ur-phone" name="phone" inputMode="tel" autoComplete="tel" placeholder="03XX XXXXXXX" dir="ltr"/></div><div className="field"><label htmlFor="ur-level">موجودہ جماعت *</label><select id="ur-level" name="level" defaultValue=""><option value="" disabled>جماعت منتخب کریں</option>{Array.from({ length: 12 }, (_, index) => <option key={index + 1}>جماعت {index + 1}</option>)}</select></div><fieldset className="full"><legend>مطلوبہ مضامین</legend><div className="check-row">{urduSubjects.map((subject) => <label key={subject}><input type="checkbox" name="subjects" value={subject}/><span>{subject}</span></label>)}</div></fieldset><div className="field full"><label htmlFor="ur-school">سکول / کالج</label><input id="ur-school" name="school" placeholder="اختیاری"/></div><div className="field full"><label htmlFor="ur-message">مزید معلومات</label><textarea id="ur-message" name="message" rows={4} placeholder="مضامین، اہداف یا پسندیدہ اوقات..."/></div>{error && <p className="form-error full" role="alert">{error}</p>}<div className="form-submit full"><p>آپ کی معلومات اس ویب سائٹ پر محفوظ نہیں ہوتیں۔ انہیں واٹس ایپ پیغام میں شامل کیا جاتا ہے تاکہ آپ دیکھ کر بھیج سکیں۔</p><button className="button button-primary" type="submit">واٹس ایپ پر جاری رکھیں <span>↗</span></button></div></form>;
}
