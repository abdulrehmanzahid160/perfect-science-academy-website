import type { ReactNode } from "react";

export function PageHero({ index, eyebrow, title, intro, children }: { index: string; eyebrow: string; title: ReactNode; intro: string; children?: ReactNode }) {
  return <header className="page-hero dark-section"><div className="page-hero-grid" aria-hidden="true" /><div className="shell"><p className="eyebrow">{eyebrow}</p><span className="page-index">{index}</span><h1>{title}</h1><div className="page-hero-foot"><p>{intro}</p>{children}</div></div></header>;
}
