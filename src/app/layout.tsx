import type { Metadata, Viewport } from "next";
import { DM_Sans, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { siteUrl } from "@/lib/site";

const display = Plus_Jakarta_Sans({ variable: "--font-display", subsets: ["latin"], weight: ["600", "700", "800"] });
const sans = DM_Sans({ variable: "--font-sans", subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = { metadataBase: new URL(siteUrl), title: { default: "Perfect Science Academy | Gojra", template: "%s | Perfect Science Academy" }, description: "Focused science education for Classes 1–12 at Perfect Science Academy, 160 GB Kalyki, Gojra.", openGraph: { title: "Perfect Science Academy", description: "Strong concepts. Confident students. Proven results.", type: "website" } };
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#0b2e26" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${display.variable} ${sans.variable}`}><body><Navbar/><main>{children}</main><Footer/></body></html>;
}
