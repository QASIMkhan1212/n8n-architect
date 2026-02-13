import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Head of Operations",
    company: "Bloom Commerce",
    quote:
      "We used to spend 6 hours a day on order processing alone. Now it runs itself — zero errors, zero overtime. Our team finally focuses on growth instead of data entry.",
    result: "6 hours saved daily",
  },
  {
    name: "Marcus Rivera",
    role: "Founder & CEO",
    company: "FinLeap",
    quote:
      "Saim didn't just automate our KYC process — he made it 40x faster. What took a full day now takes 12 seconds. Our investors couldn't believe the numbers.",
    result: "40x faster processing",
  },
  {
    name: "Priya Sharma",
    role: "Marketing Director",
    company: "Altitude Media",
    quote:
      "Publishing content across 6 platforms used to take half my day. Now I hit one button and it's everywhere — formatted, scheduled, and tracked automatically.",
    result: "2 hours → 0 minutes",
  },
];

const resultNumbers = [6, 40, 2];
const resultSuffixes = [" hours saved daily", "x faster processing", " hours → 0 minutes"];

const useCountUp = (target: number, inView: boolean, duration = 1.2) => {
  const [value, setValue] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);

  return value;
};

const TestimonialCard = ({ t, i }: { t: typeof testimonials[0]; i: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const count = useCountUp(resultNumbers[i], inView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: i * 0.15 }}
      viewport={{ once: true }}
      className="relative bg-background p-6 md:p-8 border border-border md:border-0 flex flex-col"
    >
      <blockquote className="font-mono text-xs text-muted-foreground leading-relaxed italic flex-1 mb-6">
        "{t.quote}"
      </blockquote>

      <div className="border-t border-border pt-4">
        <span className="font-display text-sm font-bold uppercase tracking-tight text-foreground block">
          {t.name}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground block mb-3">
          {t.role}, {t.company}
        </span>
        <span className="inline-block font-mono text-[10px] uppercase tracking-widest text-primary border border-primary px-2 py-0.5">
          {count}{resultSuffixes[i]}
        </span>
      </div>
    </motion.div>
  );
};

const Testimonials = () => {
  return (
    <section className="border-b border-border px-4 md:px-6 py-12 md:py-20">
      <div className="mb-8 md:mb-12">
        <span className="font-mono text-[10px] uppercase tracking-widest text-primary block mb-2">
          CLIENT STORIES
        </span>
        <h2 className="font-display text-2xl md:text-5xl font-black uppercase tracking-tighter text-foreground">
          WHAT CLIENTS SAY
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-[1px] md:bg-border">
        {testimonials.map((t, i) => (
          <TestimonialCard key={i} t={t} i={i} />
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
