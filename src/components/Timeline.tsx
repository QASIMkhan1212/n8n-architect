import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const steps = [
  {
    num: "01",
    label: "PHASE_01",
    title: "DISCOVERY",
    subtitle: "Understand your business inside out",
    description:
      "We sit down with you to understand exactly how your team works today — where time is wasted, what's frustrating, and what could run on autopilot. Within 48 hours, you get a clear roadmap showing exactly what we'll automate and the impact it will have.",
    deliverables: ["Process audit report", "Automation blueprint", "ROI estimate"],
    side: "left" as const,
  },
  {
    num: "02",
    label: "PHASE_02",
    title: "BUILD",
    subtitle: "Engineer your digital workforce",
    description:
      "We design and build your automated workflows, connect your tools, and add AI where it makes sense — all in a safe test environment. You see and approve everything before it touches your real data. No surprises.",
    deliverables: ["Custom workflows", "AI agent setup", "Integration testing"],
    side: "right" as const,
  },
  {
    num: "03",
    label: "PHASE_03",
    title: "DEPLOY",
    subtitle: "Go live with confidence",
    description:
      "Your new system goes live with real-time monitoring and alerts so nothing slips through the cracks. We train your team, hand over full documentation, and stay on call for 30 days to make sure everything runs perfectly.",
    deliverables: ["Live deployment", "Team training", "30-day support"],
    side: "left" as const,
  },
];

const StepBlock = ({ step }: { step: typeof steps[0] }) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.9, 1.1, 1.1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.2, 1, 1, 0]);

  return (
    <div
      ref={ref}
      className="relative py-8 md:py-12"
    >
      {/* Mobile: stacked layout */}
      <div className="block md:hidden py-4">
        <motion.span
          style={{ scale, opacity }}
          className="block font-display text-[4.5rem] font-black leading-none gradient-text select-none mb-4"
        >
          {step.num}
        </motion.span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-primary block mb-2">
          {step.label}
        </span>
        <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-foreground mb-1">
          {step.title}
        </h3>
        <span className="font-mono text-xs text-primary/70 block mb-3">
          {step.subtitle}
        </span>
        <p className="font-mono text-xs text-muted-foreground leading-relaxed mb-4">
          {step.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {step.deliverables.map((d) => (
            <span key={d} className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground border border-border px-2 py-0.5">
              {d}
            </span>
          ))}
        </div>
      </div>

      {/* Desktop: alternating layout */}
      <div
        className={`hidden md:flex items-start gap-8 ${
          step.side === "right" ? "flex-row-reverse" : ""
        }`}
      >
        {/* Sticky number — stays pinned while scrolling through the extended block */}
        <div className="sticky top-24 flex-shrink-0 w-48 h-fit">
          <motion.span
            style={{ scale, opacity }}
            className="block font-display text-[8rem] font-black leading-none gradient-text select-none"
          >
            {step.num}
          </motion.span>
        </div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex-1 pt-4"
        >
          <span className="font-mono text-[10px] uppercase tracking-widest text-primary block mb-2">
            {step.label}
          </span>
          <h3 className="font-display text-4xl font-bold uppercase tracking-tight text-foreground mb-2">
            {step.title}
          </h3>
          <span className="font-mono text-sm text-primary/70 block mb-4">
            {step.subtitle}
          </span>
          <p className="font-mono text-sm text-muted-foreground leading-relaxed max-w-md mb-5">
            {step.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {step.deliverables.map((d) => (
              <span key={d} className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground border border-border px-2 py-0.5">
                {d}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const Timeline = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // Defer scroll tracking to avoid forced reflow during initial render
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 20%"],
  });

  // The line fills from 0% to 100% height as the section scrolls
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  // Glow dot opacity
  const dotOpacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);

  return (
    <section className="border-b border-border px-4 md:px-6 py-8 md:py-10">
      <div className="mb-6 md:mb-8">
        <span className="font-mono text-[10px] uppercase tracking-widest text-primary block mb-2">
          DEPLOYMENT
        </span>
        <h2 className="font-display text-2xl md:text-5xl font-black uppercase text-foreground" style={{ letterSpacing: '-0.05em' }}>
          PROCESS/TIMELINE
        </h2>
      </div>

      <div ref={sectionRef} className="relative max-w-4xl mx-auto">
        {/* Vertical progress lines — both sides, desktop only */}
        {["left", "right"].map((side) => (
          <div key={side} className={`hidden md:block absolute ${side === "left" ? "left-[-2rem]" : "right-[-2rem]"} top-0 bottom-0 w-px`}>
            <div className="absolute inset-0 bg-border" />
            <motion.div
              className="absolute top-0 left-0 w-full origin-top"
              style={{
                height: lineHeight,
                background: "linear-gradient(180deg, hsl(var(--cyan)), hsl(var(--purple)))",
                boxShadow: "0 0 8px hsl(var(--cyan) / 0.5), 0 0 20px hsl(var(--cyan) / 0.2)",
              }}
            />
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full"
              style={{
                top: lineHeight,
                opacity: dotOpacity,
                background: "hsl(var(--cyan))",
                boxShadow: "0 0 12px hsl(var(--cyan) / 0.8), 0 0 24px hsl(var(--cyan) / 0.4)",
              }}
            />
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full border border-border bg-background"
                style={{ top: `${i * 50}%` }}
              />
            ))}
          </div>
        ))}

        {steps.map((step, i) => (
          <StepBlock key={i} step={step} />
        ))}
      </div>
    </section>
  );
};

export default Timeline;
