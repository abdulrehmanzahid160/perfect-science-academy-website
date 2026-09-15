import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { SafeImage } from "@/components/SafeImage";
import { academy, teachers } from "@/data/academy";

export const metadata: Metadata = { title: "Faculty", description: "Meet the experienced faculty at Perfect Science Academy in Gojra." };

export default function FacultyPage() {
  return <><PageHero eyebrow="Our faculty" title={<>Teachers who make<br/><em>difficult ideas clear.</em></>} intro="A focused team across five core subjects, committed to clear explanation, consistent practice and student progress."/><section className="faculty-page section shell">{teachers.map((teacher, index) => <article className="teacher-profile" key={teacher.slug}><div className="teacher-number">0{index + 1}</div><SafeImage src={teacher.image} alt={`${teacher.name}, teacher at ${academy.name}`} className="teacher-portrait" sizes="(max-width: 720px) 100vw, 42vw"/><div className="teacher-details"><p className="eyebrow dark">{teacher.subjects.join(" · ")}</p><h2>{teacher.name}</h2>{teacher.experience && <strong>{teacher.experience} experience</strong>}<p>{teacher.bio}</p><div className="subject-pills">{teacher.subjects.map((subject) => <span key={subject}>{subject}</span>)}</div><a className="button button-primary" href={`tel:${teacher.phone.replaceAll(" ", "")}`}>Call {teacher.phone} <span>↗</span></a></div></article>)}</section></>;
}
