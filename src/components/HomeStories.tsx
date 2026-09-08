"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { classNineResults, programs, sscResults, subjects } from "@/data/academy";
import { CountUp } from "./CountUp";
import { Reveal } from "./Reveal";

export function ResultsStory() {
  return <>
    <section id="results" className="results-declaration dark-section section">
      <div className="shell declaration-grid">
        <Reveal><p className="eyebrow">Results · 04</p><h2>Results<br/>are not<br/><em>an accident.</em></h2></Reveal>
        <Reveal delay={.15}><p>They come from preparation, discipline, testing and consistent guidance.</p></Reveal>
      </div>
    </section>

    <section className="ssc-section section">
      <div className="shell results-intro"><Reveal><div><p className="eyebrow">SSC 2026 · 05</p><h2>Work that<br/><em>shows.</em></h2></div></Reveal><Reveal delay={.1}><p>Three leading scores, followed by every additional SSC result supplied by the academy.</p></Reveal></div>
      <div className="shell result-feature-grid">
        {sscResults.slice(0, 3).map(([name, score], index) => <Reveal key={name} delay={index * .08}><article className={`rank-feature rank-${index + 1}`}><span className="rank">0{index + 1}</span><strong><CountUp value={score}/></strong><h3>{name}</h3><p>SSC · 2026</p></article></Reveal>)}
      </div>
      <div className="shell compact-results">{sscResults.slice(3).map(([name, score], index) => <div key={name}><span>{String(index + 4).padStart(2, "0")}</span><strong>{name}</strong><b>{score}</b></div>)}</div>
    </section>

    <section className="class-nine-section dark-section section">
      <div className="shell class-nine-grid">
        <Reveal><div className="mega-stat"><strong><CountUp value={8}/></strong><p>Students<br/><b>500+</b><br/>Class 9 · 2026</p></div></Reveal>
        <Reveal delay={.1}><div><p className="eyebrow">Class 9 results · 06</p><h2>A benchmark<br/><em>crossed.</em></h2><p>Every Class 9 result listed is 500 or above.</p></div></Reveal>
      </div>
      <div className="class-nine-track shell">{classNineResults.map(([name, score], index) => <div key={name}><span>0{index + 1}</span><h3>{name}</h3><strong>{score}</strong></div>)}</div>
    </section>

    <section className="results-marquee marquee-section" aria-label="Academic highlights"><motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 35, ease: "linear", repeat: Infinity }}><span>SSC 2026 · 1161 · 1153 · 1151 · CLASS 9 · 545 · 541 · 540 · EXPERIENCED FACULTY · BOARD PREPARATION · REGULAR TESTING · </span><span aria-hidden="true">SSC 2026 · 1161 · 1153 · 1151 · CLASS 9 · 545 · 541 · 540 · EXPERIENCED FACULTY · BOARD PREPARATION · REGULAR TESTING · </span></motion.div></section>
  </>;
}

export function ProgramsSubjectsLearning() {
  const reduce = useReducedMotion();
  return <>
    <section className="programs-section section">
      <div className="shell split-heading light-heading"><div><p className="eyebrow">Programs · 08</p><h2>Choose<br/><em>your stage.</em></h2></div><p>From strong fundamentals to focused board preparation.</p></div>
      <div className="program-list shell">{programs.map((program, index) => <Link href="/admissions" key={program.title} className="program-row"><span>0{index + 1}</span><h3>{program.title}</h3><p>{program.years}</p><p>{program.note}</p><b>↗</b></Link>)}</div>
    </section>

    <section className="subjects-section dark-section section">
      <div className="shell"><Reveal><p className="eyebrow">Subjects · 09</p><h2>Master<br/><em>the subject.</em></h2></Reveal><div className="subject-lines">{subjects.map((subject, index) => <motion.div whileHover={reduce ? undefined : { x: 6 }} key={subject}><span>0{index + 1}</span><h3>{subject}</h3><SubjectVisual subject={subject}/></motion.div>)}</div></div>
    </section>

    <LearningPath/>
    <WhyPSA/>
  </>;
}

function SubjectVisual({ subject }: { subject: string }) {
  const marks: Record<string, string> = { Mathematics: "x² + y²", Physics: "λ / Δt", Chemistry: "H—O—H", Biology: "AT · CG", English: "A a" };
  return <b aria-hidden="true">{marks[subject]}</b>;
}

function LearningPath() {
  const ref = useRef<HTMLElement>(null); const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start .75", "end .35"] });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const steps = ["Learn", "Practice", "Test", "Analyse", "Improve", "Excel"];
  return <section ref={ref} className="learning-section section"><div className="shell"><Reveal><p className="eyebrow">Learning system · 10</p><h2>The system<br/>behind progress.</h2></Reveal><div className="learning-map learning-six"><svg viewBox="0 0 1200 190" preserveAspectRatio="none" aria-hidden="true"><motion.path d="M 15 105 C 130 15, 200 180, 320 100 S 520 20, 625 105 S 825 180, 930 95 S 1090 20, 1185 100" style={{ pathLength: reduce ? 1 : pathLength }}/></svg>{steps.map((step, index) => <div className={`step step-${index + 1}`} key={step}><span>{String(index + 1).padStart(2,"0")}</span><h3>{step}</h3></div>)}</div></div></section>;
}

function WhyPSA() {
  const points = ["Highly qualified and experienced faculty", "Regular tests", "Progress monitoring", "Conceptual learning", "Smart learning techniques", "Individual attention", "Strong academic result record", "Disciplined environment", "Safe and respectful learning atmosphere", "Modern teaching methods", "Character building and moral values"];
  return <section className="why-manifesto dark-section section"><div className="shell why-manifesto-grid"><div><p className="eyebrow">Why PSA · 11</p><h2>Why<br/>Perfect<br/><em>Science<br/>Academy?</em></h2></div><div className="why-list">{points.map((point, index) => <Reveal key={point} delay={Math.min(index * .025, .2)}><div><span>{String(index + 1).padStart(2,"0")}</span><h3>{point}</h3></div></Reveal>)}</div></div></section>;
}
