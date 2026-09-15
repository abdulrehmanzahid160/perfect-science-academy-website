import type { ReactNode } from "react";

export function PageHero({ eyebrow, title, intro, children }: { index?: string; eyebrow: string; title: ReactNode; intro: string; children?: ReactNode }) {
  return <header className="page-hero"><div className="page-hero-pattern" aria-hidden="true"/><div className="shell"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><div className="page-hero-foot"><p>{intro}</p>{children}</div></div></header>;
}
