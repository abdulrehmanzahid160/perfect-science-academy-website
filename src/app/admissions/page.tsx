import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { AdmissionForm } from "@/components/AdmissionForm";
import { academy, programs } from "@/data/academy";

export const metadata: Metadata = { title: "Admissions", description: "Start an admission enquiry for Classes 1–12 at Perfect Science Academy in Gojra." };

export default function AdmissionsPage() {
  return <>
    <PageHero index="04" eyebrow="Admissions" title={<>Start your next<br/><em>academic chapter.</em></>} intro="Tell us where the student is today. We’ll help you begin an enquiry for the appropriate learning stage."/>
    <section className="admissions-page section shell"><div className="admission-programs"><p className="eyebrow">Learning stages</p>{programs.map((program, index) => <article key={program.title}><span>0{index + 1}</span><div><h2>{program.title}</h2><p>{program.years} · {program.note}</p></div></article>)}</div><div><div className="form-heading"><p className="eyebrow">Admission enquiry</p><h2>Tell us about the student.</h2></div><AdmissionForm/></div></section>
    <section className="direct-contact"><div className="shell"><h2>Prefer to speak directly?</h2><div><a href={`tel:${academy.phone.replaceAll(" ", "")}`}>{academy.phone} ↗</a><a href={`mailto:${academy.email}`}>{academy.email} ↗</a></div></div></section>
  </>;
}
