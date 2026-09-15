import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { AdmissionForm } from "@/components/AdmissionForm";
import { academy, programs } from "@/data/academy";

export const metadata: Metadata = { title: "Admissions", description: "Start an admission enquiry for Classes 1–12 at Perfect Science Academy in Gojra." };

export default function AdmissionsPage() {
  return <><PageHero eyebrow="Admission enquiry" title={<>Take the first step<br/><em>towards better learning.</em></>} intro="Share a few details about the student. Your enquiry will open in WhatsApp, ready to send directly to the academy."/><section className="admissions-page section shell"><aside className="admission-programs"><p className="eyebrow dark">Learning stages</p>{programs.map((program, index) => <article key={program.title}><span>0{index + 1}</span><div><p>{program.years}</p><h2>{program.title}</h2><small>{program.note}</small></div></article>)}<div className="admission-contact"><span>Need help?</span><a href={`tel:${academy.phone.replaceAll(" ", "")}`}>{academy.phone}</a><p>Call us to discuss subjects, classes and available timings.</p></div></aside><div><div className="form-heading"><p className="eyebrow dark">Student details</p><h2>Tell us what you need.</h2><p>Required fields are marked with an asterisk.</p></div><AdmissionForm/></div></section></>;
}
