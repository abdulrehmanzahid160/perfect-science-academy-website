"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { academy, navigation, whatsappLink } from "@/data/academy";
import { urduNavigation } from "@/data/urdu";
import { Logo } from "./Logo";

export function Footer() {
  const pathname = usePathname();
  const isUrdu = pathname === "/ur" || pathname.startsWith("/ur/");
  const items = isUrdu ? urduNavigation : navigation;
  return <footer className={`footer ${isUrdu ? "urdu-footer" : ""}`} dir={isUrdu ? "rtl" : "ltr"}><div className="shell footer-cta"><div><p className="eyebrow">{isUrdu ? "آغاز کے لیے تیار ہیں؟" : "Ready to begin?"}</p><h2>{isUrdu ? "اپنے بچے کو مضبوط تعلیمی بنیاد فراہم کریں۔" : "Give your child a stronger academic foundation."}</h2></div><Link className="button button-accent" href={isUrdu ? "/ur/admissions" : "/admissions"}>{isUrdu ? "داخلے کے لیے رابطہ کریں" : "Start an enquiry"} <span>↗</span></Link></div><div className="shell footer-grid"><div className="footer-brand"><Logo/><p>{isUrdu ? "بہترین تعلیم کامیابی کی بنیاد ہے۔ جماعت اول سے بارہویں تک سائنس کی معیاری تعلیم۔" : `${academy.tagline}. Focused science education for students from Classes 1–12.`}</p></div><div><p className="footer-label">{isUrdu ? "صفحات" : "Explore"}</p>{items.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}<Link href="/verify">{isUrdu ? "سرٹیفکیٹ کی تصدیق" : "Certificate verification"}</Link></div><div><p className="footer-label">{isUrdu ? "رابطہ" : "Contact"}</p><a dir="ltr" href={`tel:${academy.phone.replaceAll(" ", "")}`}>{academy.phone}</a><a dir="ltr" href={`mailto:${academy.email}`}>{academy.email}</a><a href={whatsappLink(isUrdu ? "السلام علیکم، میں پرفیکٹ سائنس اکیڈمی کے بارے میں مزید معلومات چاہتا/چاہتی ہوں۔" : "Assalam-o-Alaikum, I would like to know more about Perfect Science Academy.")} target="_blank" rel="noreferrer">{isUrdu ? "واٹس ایپ" : "WhatsApp"}</a></div><div><p className="footer-label">{isUrdu ? "پتہ" : "Visit"}</p><address>{isUrdu ? "160 جی بی کلیکی، گوجرہ، ٹوبہ ٹیک سنگھ، پاکستان" : academy.address}</address><a href={academy.facebook} target="_blank" rel="noreferrer">{isUrdu ? "فیس بک" : "Facebook"} ↗</a></div></div><div className="shell footer-bottom"><span>© {new Date().getFullYear()} Perfect Science Academy</span><span>{isUrdu ? "وضاحت کے ساتھ تعلیم، ترقی کے لیے تعمیر۔" : "Designed for clarity, built for progress."}</span></div></footer>;
}
