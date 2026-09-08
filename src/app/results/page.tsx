import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { classNineResults, sscResults } from "@/data/academy";

export const metadata: Metadata = { title: "2026 Results", description: "Perfect Science Academy SSC and Class 9 student results for 2026." };

function ResultTable({ title, results }: { title: string; results: readonly (readonly [string, number])[] }) {
  return <section className="result-table-section"><div className="table-heading"><div><p className="eyebrow">2026 result</p><h2>{title}</h2></div><p>{results.length} student records</p></div><div className="table-scroll"><table><caption className="sr-only">Perfect Science Academy {title} results for 2026</caption><thead><tr><th>Rank</th><th>Student</th><th>Score</th></tr></thead><tbody>{results.map(([name, score], index) => <tr key={name}><td>{String(index + 1).padStart(2,"0")}</td><th scope="row">{name}</th><td>{score}</td></tr>)}</tbody></table></div></section>;
}

export default function ResultsPage() {
  return <>
    <PageHero index="03" eyebrow="Results · 2026" title={<>The numbers tell<br/><em>the story.</em></>} intro="A transparent record of the SSC and Class 9 scores shared by the academy."/>
    <div className="results-page section shell">
      <section className="results-podium"><p className="eyebrow">Leading SSC scores</p><div>{sscResults.slice(0,3).map(([name,score],index) => <article key={name}><span>0{index+1}</span><strong>{score}</strong><h2>{name}</h2></article>)}</div></section>
      <div className="results-note"><strong>8</strong><p>Class 9 students crossed the 500 mark in the results listed below.</p></div>
      <ResultTable title="SSC" results={sscResults}/><ResultTable title="Class 9" results={classNineResults}/>
      <p className="honest-note">Scores are presented exactly as supplied by Perfect Science Academy. No positions, percentages or comparative claims are implied.</p>
    </div>
  </>;
}
