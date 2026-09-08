"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { academy, classroomImages, teachers, whatsappLink } from "@/data/academy";
import { SafeImage } from "./SafeImage";
import { Reveal } from "./Reveal";
import { ProgramsSubjectsLearning, ResultsStory } from "./HomeStories";

export function HomePage() {
  const hero = useRef<HTMLElement>(null); const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: hero, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 160]); const heroOpacity = useTransform(scrollYProgress, [0, .8], [1, .1]);
  return <>
    <section ref={hero} className="hero dark-section"><div className="hero-grid" aria-hidden="true"/><motion.div className="hero-orbit orbit-one" animate={reduce ? undefined : { rotate: 360 }} transition={{ duration: 34, ease: "linear", repeat: Infinity }}/><motion.div className="hero-orbit orbit-two" animate={reduce ? undefined : { rotate: -360 }} transition={{ duration: 46, ease: "linear", repeat: Infinity }}/><motion.div className="hero-content shell" style={{ y: heroY, opacity: heroOpacity }}><motion.p className="eyebrow hero-kicker" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Science education · Gojra</motion.p><h1><motion.span initial={reduce ? false : { y: "110%" }} animate={{ y: 0 }} transition={{ duration: .9 }}>Clarity becomes</motion.span><motion.em initial={reduce ? false : { y: "110%" }} animate={{ y: 0 }} transition={{ duration: .9, delay: .12 }}>confidence.</motion.em></h1><motion.div className="hero-bottom" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .65 }}><p>We turn difficult concepts into disciplined learning—from strong foundations to board-ready preparation.</p><div className="button-row"><Link href="/admissions" className="button button-light">Begin an enquiry <span>↗</span></Link><Link href="#results" className="text-link">See 2026 results <span>↓</span></Link></div></motion.div></motion.div><div className="hero-index shell"><span>01</span><span>Perfect Science Academy</span><span>Scroll to explore</span></div></section>

    <section className="manifesto section shell"><Reveal><p className="eyebrow">Experience · 02</p></Reveal><Reveal><h2>Education should do more than prepare a student for the next paper.</h2></Reveal><div className="manifesto-grid"><Reveal><p className="lead">It should replace hesitation with understanding—and turn understanding into confidence.</p></Reveal><Reveal delay={.1}><p>Focused explanation and consistent practice work together. Students learn the idea, test it, strengthen it and carry it forward.</p></Reveal></div></section>

    <section className="faculty-story section dark-section"><div className="shell split-heading"><div><p className="eyebrow">Faculty · 03</p><h2>Guidance with<br/><em>subject depth.</em></h2></div><p>Three educators. Five core subjects. One shared focus: making every lesson clear enough to use.</p></div><div className="faculty-stack shell">{teachers.map((teacher, index) => <article className="faculty-panel" key={teacher.slug} style={{ top: `${100 + index * 18}px` }}><div className="faculty-number">0{index + 1}</div><SafeImage src={teacher.image} alt={`${teacher.name}, ${teacher.subjects.join(" and ")} teacher`} className="faculty-image" sizes="(max-width: 760px) 100vw, 45vw"/><div className="faculty-copy"><p className="eyebrow">{teacher.subjects.join(" · ")}</p><h3>{teacher.name}</h3>{teacher.experience && <p className="experience">{teacher.experience} of teaching experience</p>}<a href={`tel:${teacher.phone.replaceAll(" ", "")}`} className="text-link">Speak with faculty <span>↗</span></a></div></article>)}</div><div className="center-action"><Link href="/faculty" className="button button-light">Meet the complete faculty <span>↗</span></Link></div></section>

    <ResultsStory/>
    <ProgramsSubjectsLearning/>

    <section className="gallery-section section"><div className="shell gallery-heading"><Reveal><div><p className="eyebrow">Academy moments · 12</p><h2>A focused environment.</h2></div></Reveal><p>A disciplined routine.<br/>A place to improve.</p></div><div className="gallery-grid shell">{classroomImages.map((image, index) => <SafeImage key={image} src={image} alt={`Perfect Science Academy classroom ${index + 1}`} className={`gallery-image gallery-${index + 1}`} sizes="(max-width: 760px) 100vw, 50vw"/>)}</div></section>

    <section className="admission-band dark-section"><div className="admission-glow"/><div className="shell"><p className="eyebrow">Admissions · 13</p><h2>Your<br/>next result<br/><em>starts here.</em></h2><div><p>Admissions enquiries for Matric and Intermediate students.</p><div className="button-row"><Link href="/admissions" className="button button-light">Apply for admission <span>↗</span></Link><a href={whatsappLink("Assalam-o-Alaikum, I would like to ask about admission at Perfect Science Academy.")} className="text-link" target="_blank" rel="noreferrer">WhatsApp us <span>↗</span></a></div></div></div></section>

    <section className="contact-section section shell"><div><p className="eyebrow">Contact · 14</p><h2>Find us in<br/>160 GB Kalyki.</h2><p>{academy.address}</p><span className="map-coming">Google Maps coming soon</span></div><div className="contact-list"><a href={`tel:${academy.phone.replaceAll(" ", "")}`}><span>Primary</span>{academy.phone}<b>↗</b></a><a href="tel:03457574147"><span>Faculty</span>0345 7574147<b>↗</b></a><a href="tel:03157814715"><span>Faculty</span>0315 7814715<b>↗</b></a><a href={`mailto:${academy.email}`}><span>Email</span>{academy.email}<b>↗</b></a><a href={academy.facebook} target="_blank" rel="noreferrer"><span>Facebook</span>Visit PSA<b>↗</b></a></div></section>
  </>;
}
