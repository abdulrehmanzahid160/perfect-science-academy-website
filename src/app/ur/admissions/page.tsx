import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { UrduAdmissionForm } from "@/components/UrduAdmissionForm";
import { academy } from "@/data/academy";
import { urduPrograms } from "@/data/urdu";

export const metadata: Metadata = { title: "داخلہ", description: "پرفیکٹ سائنس اکیڈمی میں جماعت اول سے بارہویں تک داخلے کے لیے رابطہ کریں۔", alternates: { languages: { en: "/admissions", ur: "/ur/admissions" } } };

export default function UrduAdmissionsPage() {
  return <><PageHero eyebrow="داخلے کے لیے رابطہ" title={<>بہتر تعلیم کی جانب<br/><em>پہلا قدم اٹھائیں۔</em></>} intro="طالب علم کے بارے میں مختصر معلومات فراہم کریں۔ آپ کا پیغام واٹس ایپ میں کھلے گا، جہاں آپ اسے دیکھ کر براہِ راست اکیڈمی کو بھیج سکتے ہیں۔"/><section className="admissions-page section shell"><aside className="admission-programs"><p className="eyebrow dark">تعلیمی مراحل</p>{urduPrograms.map((program, index) => <article key={program.title}><span>0{index + 1}</span><div><p>{program.years}</p><h2>{program.title}</h2><small>{program.note}</small></div></article>)}<div className="admission-contact"><span>مدد چاہیے؟</span><a dir="ltr" href={`tel:${academy.phone.replaceAll(" ", "")}`}>{academy.phone}</a><p>مضامین، جماعتوں اور دستیاب اوقات کے بارے میں بات کرنے کے لیے فون کریں۔</p></div></aside><div><div className="form-heading"><p className="eyebrow dark">طالب علم کی معلومات</p><h2>ہمیں اپنی ضرورت بتائیں۔</h2><p>ضروری خانوں کے ساتھ * کا نشان موجود ہے۔</p></div><UrduAdmissionForm/></div></section></>;
}
