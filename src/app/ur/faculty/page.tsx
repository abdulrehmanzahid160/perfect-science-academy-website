import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { SafeImage } from "@/components/SafeImage";
import { teachers } from "@/data/academy";
import { urduTeachers } from "@/data/urdu";

export const metadata: Metadata = { title: "اساتذہ", description: "پرفیکٹ سائنس اکیڈمی کے تجربہ کار اساتذہ سے ملیے۔", alternates: { languages: { en: "/faculty", ur: "/ur/faculty" } } };

export default function UrduFacultyPage() {
  return <><PageHero eyebrow="ہمارے اساتذہ" title={<>اساتذہ جو مشکل تصورات کو<br/><em>آسان بناتے ہیں۔</em></>} intro="پانچ بنیادی مضامین کے تجربہ کار اساتذہ، جو واضح تشریح، مسلسل مشق اور طلبہ کی ترقی کے لیے پُرعزم ہیں۔"/><section className="faculty-page section shell">{teachers.map((teacher, index) => { const translated = urduTeachers[index]; return <article className="teacher-profile" key={teacher.slug}><div className="teacher-number">0{index + 1}</div><SafeImage src={teacher.image} alt={`${translated.name}، پرفیکٹ سائنس اکیڈمی کے استاد`} className="teacher-portrait" sizes="(max-width: 720px) 100vw, 42vw"/><div className="teacher-details"><p className="eyebrow dark">{translated.subjects.join(" · ")}</p><h2>{translated.name}</h2>{translated.experience && <strong>{translated.experience} کا تجربہ</strong>}<p>{translated.bio}</p><div className="subject-pills">{translated.subjects.map((subject) => <span key={subject}>{subject}</span>)}</div><a className="button button-primary" dir="ltr" href={`tel:${teacher.phone.replaceAll(" ", "")}`}>{teacher.phone} <span>↗</span></a></div></article>; })}</section></>;
}
