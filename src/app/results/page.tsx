import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { classNineResults, sscResults } from "@/data/academy";

export const metadata: Metadata = { title: "2026 Results", description: "View Perfect Science Academy SSC and Class 9 student results for 2026." };

function ResultTable({ title, subtitle, results }: { title: string; subtitle: string; results: readonly (readonly [string, number])[] }) {
  return <section className="result-table-section"><div className="table-heading"><div><p className="eyebrow">{subtitle}</p><h2>{title}</h2></div><p>{results.length} student records</p></div><div className="result-table" role="table" aria-label={`${title} ${subtitle}`}><div className="result-row result-head" role="row"><span>Rank</span><span>Student</span><span>Score</span></div>{results.map(([name, score], index) => <div className="result-row" role="row" key={name}><span>{String(index + 1).padStart(2, "0")}</span><strong>{name}</strong><b>{score}</b></div>)}</div></section>;
}
export default function ResultsPage() {
  return <><PageHero index="03" eyebrow="Results · 2026" title={<>Earned through<br/><em>consistent work.</em></>} intro="A transparent record of the SSC and Class 9 scores shared by the academy."/><div className="results-page section shell"><div className="results-note"><strong>8</strong><p>Class 9 students scored 500 or above in the results listed below.</p></div><ResultTable title="SSC" subtitle="2026" results={sscResults}/><ResultTable title="Class 9" subtitle="2026" results={classNineResults}/><p className="honest-note">Scores are presented exactly as supplied by Perfect Science Academy. No positions, percentages or comparative claims are implied.</p></div></>;
}
