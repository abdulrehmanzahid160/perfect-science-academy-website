import Link from "next/link";
import { academy, navigation } from "@/data/academy";
import { Logo } from "./Logo";

export function Footer() {
  return <footer className="footer"><div className="footer-main shell"><div className="footer-brand"><Logo /><p>Clear concepts. Disciplined practice. Confident students.</p></div><div><p className="eyebrow">Explore</p>{navigation.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}</div><div><p className="eyebrow">Visit</p><address>{academy.address}</address><a href={`tel:${academy.phone.replaceAll(" ", "")}`}>{academy.phone}</a><a href={`mailto:${academy.email}`}>{academy.email}</a></div><div><p className="eyebrow">Connect</p><a href={academy.facebook} target="_blank" rel="noreferrer">Facebook ↗</a><a href={`https://wa.me/${academy.whatsapp}`} target="_blank" rel="noreferrer">WhatsApp ↗</a></div></div><div className="footer-bottom shell"><span>© {new Date().getFullYear()} Perfect Science Academy</span><span>160 GB Kalyki · Gojra</span></div></footer>;
}
