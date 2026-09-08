import Link from "next/link";

export function Logo({ compact = false }: { compact?: boolean }) {
  return <Link href="/" className="logo" aria-label="Perfect Science Academy home"><span className="logo-mark" aria-hidden="true">P</span>{!compact && <span><b>Perfect Science</b><small>Academy · Gojra</small></span>}</Link>;
}
