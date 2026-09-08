import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SessionPopup } from "@/components/SessionPopup";

const display = Cormorant_Garamond({ variable: "--font-display", subsets: ["latin"], weight: ["500", "600", "700"] });
const sans = Manrope({ variable: "--font-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "Perfect Science Academy | Gojra", template: "%s | Perfect Science Academy" },
  description: "Concept-focused science education for Classes 1–12 at Perfect Science Academy, 160 GB Kalyki, Gojra.",
  icons: { icon: "/images/psa-logo.png", apple: "/images/psa-logo.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <SessionPopup />
      </body>
    </html>
  );
}
