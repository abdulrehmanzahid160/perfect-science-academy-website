import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { academy, sscResults } from "@/data/academy";

export const metadata: Metadata = { title: "Promotional Creative System", description: "Reusable social-poster concepts for Perfect Science Academy." };

const promoTypes = [["Admissions Open", "Editable status"], ["Matric Preparation", "Program creative"], ["Intermediate Preparation", "Program creative"], ["SSC 2026 Results", "Confirmed data"], ["Class 9 Results", "Confirmed data"], ["Experienced Faculty", "Confirmed data"], ["New Session", "Editable placeholder"], ["Free Demo Class", "Editable placeholder"]] as const;

export default function PromosPage() {
  const [name, score] = sscResults[0];
  return <><PageHero index="05" eyebrow="Creative system" title={<>Made for<br/><em>the message.</em></>} intro="A modern promotional language that matches the website and can be captured or exported later."/><section className="promos-page section shell"><aside className="promo-copy"><p className="eyebrow">Creative menu</p><h2>Eight useful directions.</h2><p>Items that need dates or confirmation remain clearly marked as editable—not announced as facts.</p><div className="promo-types">{promoTypes.map(([type,status],index) => <div key={type}><span>0{index+1}</span><strong>{type}</strong><small>{status}</small></div>)}</div><Link href="/admissions" className="button button-dark">Admissions page <span>↗</span></Link></aside><div className="poster-grid"><article className="poster poster-square"><span className="format-tag">Square · 1:1</span><Mark/><p>SSC Results · 2026</p><h3>{score}</h3><strong>{name}</strong><small>Perfect Science Academy</small></article><article className="poster poster-portrait"><span className="format-tag">Portrait · 4:5</span><Mark/><p>Matric<br/>Preparation</p><h3>09—10</h3><small>Concepts · Practice · Preparation</small></article><article className="poster poster-story"><span className="format-tag">Story · 9:16</span><Mark/><p>Experienced<br/>faculty</p><h3>Five core<br/>subjects.</h3><small>{academy.phone}<br/>160 GB Kalyki · Gojra</small></article><article className="poster poster-landscape"><span className="format-tag">Landscape · 1.91:1</span><div><Mark/><p>Perfect Science Academy</p></div><h3>Clarity becomes<br/><em>confidence.</em></h3><small>160 GB Kalyki · Gojra</small></article><p className="promo-note">Concept frames only. “New Session,” “Admissions Open” and “Free Demo Class” require confirmation before publishing.</p></div></section></>;
}

function Mark() { return <span className="poster-mark"><Image src="/images/psa-logo.png" alt="Perfect Science Academy" width={46} height={46}/></span>; }
