import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { academy, sscResults } from "@/data/academy";

export const metadata: Metadata = { title: "Promo Studio", description: "Share-ready promotional artwork for Perfect Science Academy." };

export default function PromosPage() {
  const top = sscResults[0];
  return <><PageHero index="05" eyebrow="Promo studio" title={<>Designed to be<br/><em>shared.</em></>} intro="A reusable visual system for academy announcements and verified achievements."/><section className="promos-page section shell"><div className="promo-copy"><p className="eyebrow">Poster system</p><h2>Three formats.<br/>One visual language.</h2><p>These previews use confirmed academy information. Future announcements can reuse the same system after their details are verified.</p><Link href="/admissions" className="button button-dark">Admissions page <span>↗</span></Link></div><div className="poster-grid"><article className="poster poster-square"><span className="poster-mark">PSA</span><p>SSC · 2026</p><h3>{top[1]}</h3><strong>{top[0]}</strong><small>Perfect Science Academy · Gojra</small></article><article className="poster poster-story"><span className="poster-mark">PSA</span><p>Learning begins<br/>with clarity.</p><h3>Classes<br/>1–12</h3><small>Admission enquiries<br/>{academy.phone}</small></article><article className="poster poster-landscape"><div><span className="poster-mark">PSA</span><p>Perfect Science Academy</p></div><h3>Science, explained<br/><em>with purpose.</em></h3><small>160 GB Kalyki · Gojra</small></article></div><p className="promo-note">Concept previews—not downloadable official notices. Confirm dates and details before publishing future announcements.</p></section></>;
}
