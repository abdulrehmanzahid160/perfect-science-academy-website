import Link from "next/link";
import Image from "next/image";

export function Logo({ compact = false }: { compact?: boolean }) {
  return <Link href="/" className="logo" aria-label="Perfect Science Academy home"><Image className="logo-image" src="/images/psa-logo.png" width={48} height={48} alt="" priority/>{!compact && <span><b>Perfect Science</b><small>Academy · Gojra</small></span>}</Link>;
}
