"use client";

import { animate, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

export function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const visible = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const start = Math.max(0, value - Math.max(3, Math.round(value * .07)));
  const [shown, setShown] = useState(reduce ? value : start);

  useEffect(() => {
    if (!visible) return;
    if (reduce) { setShown(value); return; }
    const controls = animate(start, value, {
      duration: .85,
      ease: "easeOut",
      onUpdate: (latest) => setShown(Math.round(latest)),
    });
    return () => controls.stop();
  }, [visible, value, reduce, start]);

  return <motion.span ref={ref}>{shown}</motion.span>;
}
