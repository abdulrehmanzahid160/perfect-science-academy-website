import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "پرفیکٹ سائنس اکیڈمی | گوجرہ", template: "%s | پرفیکٹ سائنس اکیڈمی" },
  description: "پرفیکٹ سائنس اکیڈمی، 160 جی بی کلیکی، گوجرہ میں جماعت اول سے بارہویں تک معیاری سائنس کی تعلیم۔",
  alternates: { languages: { en: "/", ur: "/ur" } },
};

export default function UrduLayout({ children }: { children: React.ReactNode }) {
  return <div className="urdu-site" lang="ur" dir="rtl">{children}</div>;
}
