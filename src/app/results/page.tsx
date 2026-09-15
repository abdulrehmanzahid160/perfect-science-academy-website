import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { classNineResults, sscResults } from "@/data/academy";

export const metadata: Metadata = { title: "2026 Results", description: "Perfect Science Academy SSC and Class 9 student results for 2026." };

function ResultTable({ title, results }: { title: string; results: readonly (readonly [string, number])[] }) {
  return <section className="result-table-section"><div className="table-heading"><div><p className="eyebrow dark">2026 results</p><h2>{title}</h2></div><p>{results.length} listed students</p></div><div className="table-scroll"><table><caption className="sr-only">Perfect Science Academy {title} results for 2026</caption><thead><tr><th>Rank</th><th>Student name</th><th>Score</th></tr></thead><tbody>{results.map(([name, score], index) => <tr key={name}><td>{String(index + 1).padStart(2, "0")}</td><th scope="row">{name}</th><td>{score}</td></tr>)}</tbody></table></div></section>;
}

export default function ResultsPage() {
  return <><PageHero eyebrow="Academic results · 2026" title={<>Hard work,<br/><em>clearly reflected.</em></>} intro="A transparent record of the SSC and Class 9 scores shared by Perfect Science Academy."/><div className="results-page section shell"><section className="results-podium"><p className="eyebrow dark">Leading SSC scores</p><div>{sscResults.slice(0, 3).map(([name, score], index) => <article key={name} className={index === 0 ? "first" : ""}><span>Rank {index + 1}</span><strong>{score}</strong><h2>{name}</h2></article>)}</div></section><div className="results-note"><strong>{classNineResults.length}</strong><p>listed Class 9 students achieved scores of <b>500 or above.</b></p></div><ResultTable title="SSC" results={sscResults}/><ResultTable title="Class 9" results={classNineResults}/><p className="honest-note">Scores are presented exactly as supplied by Perfect Science Academy. No board positions, percentages or comparative claims are implied.</p></div></>;
}
