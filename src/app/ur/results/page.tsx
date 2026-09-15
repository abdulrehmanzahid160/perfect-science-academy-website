import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { classNineResults, sscResults } from "@/data/academy";
import { urduClassNineNames, urduSscNames } from "@/data/urdu";

export const metadata: Metadata = { title: "نتائج 2026", description: "پرفیکٹ سائنس اکیڈمی کے ایس ایس سی اور جماعت نہم کے نتائج 2026۔", alternates: { languages: { en: "/results", ur: "/ur/results" } } };

function ResultTable({ title, results, names }: { title: string; results: readonly (readonly [string, number])[]; names: readonly string[] }) {
  return <section className="result-table-section"><div className="table-heading"><div><p className="eyebrow dark">نتائج 2026</p><h2>{title}</h2></div><p>{results.length} طلبہ کے نتائج</p></div><div className="table-scroll"><table><caption className="sr-only">پرفیکٹ سائنس اکیڈمی {title} نتائج 2026</caption><thead><tr><th>درجہ</th><th>طالب علم</th><th>نمبر</th></tr></thead><tbody>{results.map(([name, score], index) => <tr key={name}><td>{String(index + 1).padStart(2, "0")}</td><th scope="row">{names[index]}</th><td>{score}</td></tr>)}</tbody></table></div></section>;
}

export default function UrduResultsPage() {
  return <><PageHero eyebrow="تعلیمی نتائج · 2026" title={<>محنت، جو نتائج میں<br/><em>واضح نظر آئے۔</em></>} intro="پرفیکٹ سائنس اکیڈمی کے فراہم کردہ ایس ایس سی اور جماعت نہم کے نتائج کا شفاف ریکارڈ۔"/><div className="results-page section shell"><section className="results-podium"><p className="eyebrow dark">نمایاں ایس ایس سی سکور</p><div>{sscResults.slice(0, 3).map(([name, score], index) => <article key={name} className={index === 0 ? "first" : ""}><span>درجہ {index + 1}</span><strong>{score}</strong><h2>{urduSscNames[index]}</h2></article>)}</div></section><div className="results-note"><strong>{classNineResults.length}</strong><p>جماعت نہم کے طلبہ نے <b>500 یا اس سے زیادہ</b> نمبر حاصل کیے۔</p></div><ResultTable title="ایس ایس سی" results={sscResults} names={urduSscNames}/><ResultTable title="جماعت نہم" results={classNineResults} names={urduClassNineNames}/><p className="honest-note">تمام نمبر پرفیکٹ سائنس اکیڈمی کی فراہم کردہ معلومات کے مطابق درج کیے گئے ہیں۔ بورڈ پوزیشن، فیصد یا تقابلی دعویٰ مقصود نہیں۔</p></div></>;
}
