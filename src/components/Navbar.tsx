"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { navigation } from "@/data/academy";
import { Logo } from "./Logo";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 28 });
  return <><header className="site-header"><div className="nav-shell"><Logo /><nav className="desktop-nav" aria-label="Primary navigation">{navigation.map((item) => <Link key={item.href} href={item.href} className={pathname === item.href ? "active" : ""}>{item.label}</Link>)}</nav><Link className="nav-cta" href="/admissions">Apply now <span>↗</span></Link><button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu"><span className="menu-label">Menu</span><span className="menu-line"/><span className="menu-line"/></button></div><motion.div className="scroll-progress" style={{ scaleX }} /></header>{open && <motion.nav id="mobile-menu" className="mobile-nav" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} aria-label="Mobile navigation">{navigation.map((item, index) => <Link onClick={() => setOpen(false)} key={item.href} href={item.href}><span>0{index + 1}</span>{item.label}</Link>)}</motion.nav>}</>;
}
