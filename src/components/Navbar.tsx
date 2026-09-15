"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { academy, navigation, whatsappLink } from "@/data/academy";
import { urduNavigation } from "@/data/urdu";
import { Logo } from "./Logo";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isUrdu = pathname === "/ur" || pathname.startsWith("/ur/");
  const items = isUrdu ? urduNavigation : navigation;
  const languageHref = isUrdu
    ? pathname.replace(/^\/ur/, "") || "/"
    : pathname === "/" ? "/ur" : `/ur${pathname}`;

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return <header className="site-header">
    <div className="nav-shell">
      <Logo/>
      <nav className="desktop-nav" aria-label={isUrdu ? "مرکزی نیویگیشن" : "Primary navigation"} dir={isUrdu ? "rtl" : "ltr"}>
        {items.map((item) => <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined}>{item.label}</Link>)}
      </nav>
      <a className="nav-phone" href={`tel:${academy.phone.replaceAll(" ", "")}`}><small>{isUrdu ? "فون کریں" : "Call us"}</small>{academy.phone}</a>
      <Link className={`language-switch ${isUrdu ? "is-urdu" : ""}`} href={languageHref} onClick={() => setOpen(false)} hrefLang={isUrdu ? "en" : "ur"}>
        <span aria-hidden="true" className="language-icon">◎</span>
        <span>{isUrdu ? "View in English" : "اردو میں دیکھیں"}</span>
      </Link>
      <Link className="nav-cta" href={isUrdu ? "/ur/admissions" : "/admissions"}>{isUrdu ? "داخلہ" : "Apply now"} <span aria-hidden="true">↗</span></Link>
      <button className="menu-button" type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? (isUrdu ? "مینو بند کریں" : "Close menu") : (isUrdu ? "مینو کھولیں" : "Open menu")}><span/><span/></button>
    </div>
    <nav id="mobile-menu" className={`mobile-nav ${open ? "is-open" : ""}`} aria-label={isUrdu ? "موبائل نیویگیشن" : "Mobile navigation"} dir={isUrdu ? "rtl" : "ltr"}>
      <div className="mobile-nav-links">{items.map((item, index) => <Link onClick={() => setOpen(false)} key={item.href} href={item.href}><span>0{index + 1}</span>{item.label}</Link>)}</div>
      <div className="mobile-nav-actions">
        <a className="button button-primary" href={whatsappLink(isUrdu ? "السلام علیکم، میں پرفیکٹ سائنس اکیڈمی میں داخلے کے بارے میں معلومات چاہتا/چاہتی ہوں۔" : "Assalam-o-Alaikum, I would like information about admission at Perfect Science Academy.")} target="_blank" rel="noreferrer">{isUrdu ? "واٹس ایپ کریں" : "Chat on WhatsApp"} <span>↗</span></a>
        <a href={`tel:${academy.phone.replaceAll(" ", "")}`}>{academy.phone}</a>
      </div>
    </nav>
  </header>;
}
