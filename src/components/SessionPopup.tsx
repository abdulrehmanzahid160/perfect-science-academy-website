"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

export function SessionPopup() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (sessionStorage.getItem("psa-admission-prompt")) return;
    const show = () => { sessionStorage.setItem("psa-admission-prompt", "shown"); setOpen(true); };
    const timer = window.setTimeout(show, 10000);
    const onScroll = () => { if (window.scrollY > document.documentElement.scrollHeight * 0.28) { clearTimeout(timer); show(); window.removeEventListener("scroll", onScroll); } };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { clearTimeout(timer); window.removeEventListener("scroll", onScroll); };
  }, []);
  return <AnimatePresence>{open && <motion.aside className="session-popup" role="dialog" aria-modal="false" aria-label="Admissions enquiry" initial={reduce ? false : { opacity: 0, y: 30, scale: .96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20 }}><button onClick={() => setOpen(false)} aria-label="Close">×</button><p className="eyebrow">Admissions enquiry</p><h2>Let’s plan the right path.</h2><p>Tell us your class and subjects. We’ll continue the conversation on WhatsApp.</p><Link href="/admissions" onClick={() => setOpen(false)} className="button button-dark">Start enquiry <span>↗</span></Link></motion.aside>}</AnimatePresence>;
}
