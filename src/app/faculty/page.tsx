import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { SafeImage } from "@/components/SafeImage";
import { academy, teachers } from "@/data/academy";

export const metadata: Metadata = { title: "Faculty", description: "Meet the Mathematics, Physics, Chemistry, Biology and English faculty at Perfect Science Academy." };

export default function FacultyPage() {
  return <><PageHero index="02" eyebrow="Faculty" title={<>Teachers who make<br/><em>ideas click.</em></>} intro="A focused team spanning five core subjects—from foundational understanding to exam preparation."/><section className="faculty-page section shell">{teachers.map((teacher, index) => <article className="teacher-profile" key={teacher.slug}><div className="teacher-meta"><span>0{index + 1}</span><p>{teacher.subjects.join(" · ")}</p></div><SafeImage src={teacher.image} alt={`${teacher.name}, teacher at ${academy.name}`} className="teacher-portrait" sizes="(max-width: 760px) 100vw, 40vw"/><div className="teacher-details"><h2>{teacher.name}</h2>{teacher.experience && <strong>{teacher.experience}</strong>}<div className="subject-pills">{teacher.subjects.map(subject => <span key={subject}>{subject}</span>)}</div>{teacher.bio && <p>{teacher.bio}</p>}{teacher.qualification && <p>{teacher.qualification}</p>}{teacher.teachingPhilosophy && <blockquote>{teacher.teachingPhilosophy}</blockquote>}<a className="text-link" href={`tel:${teacher.phone.replaceAll(" ", "")}`}>{teacher.phone} <span>↗</span></a></div></article>)}</section></>;
}
