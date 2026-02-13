import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

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

const formatPrice = (value: number, target: number) => {
  if (target >= 1000) {
    const whole = Math.floor(value / 1000);
    const remainder = value % 1000;
    if (whole > 0) return `$${whole},${String(remainder).padStart(3, "0")}`;
    return `$${remainder}`;
  }
  return `$${value}`;
};

const numericPrices = [499, 1299, 2499];

const plans = [
  {
    fig: "TIER_01",
    name: "FIX",
    price: "$499",
    description: "One-time fix for a single broken or manual workflow.",
    features: [
      "1 workflow audit & rebuild",
      "Up to 5 n8n nodes",
      "48-hour delivery",
      "7-day support window",
    ],
    featured: false,
    cta: "https://cal.com/saim-hussain-9ekrz6",
  },
  {
    fig: "TIER_02",
    name: "SYSTEM",
    price: "$1,299",
    description: "A full automation system with AI agents and integrations.",
    features: [
      "End-to-end workflow design",
      "AI agent integration",
      "Self-hosted deployment",
      "30-day support window",
      "Full documentation",
    ],
    featured: true,
    cta: "mailto:saimxhussain@gmail.com?subject=SYSTEM%20Plan%20Inquiry",
  },
  {
    fig: "TIER_03",
    name: "RETAINER",
    price: "$2,499",
    description: "Ongoing automation partner. Unlimited iterations.",
    features: [
      "Everything in SYSTEM",
      "Priority Slack channel",
      "Monthly workflow reviews",
      "Unlimited revisions",
      "SLA-backed uptime",
    ],
    featured: false,
    cta: "https://cal.com/saim-hussain-9ekrz6",
  },
];

const PricingCard = ({
  plan,
  i,
  dimmed,
  scaled,
  onEnter,
  onLeave,
}: {
  plan: typeof plans[0];
  i: number;
  dimmed: boolean;
  scaled: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const animatedPrice = useCountUp(numericPrices[i], inView);

  return (
    <motion.div
      ref={ref}
      key={i}
      initial={{ clipPath: "inset(100% 0 0 0)", opacity: 0 }}
      whileInView={{ clipPath: "inset(0% 0 0 0)", opacity: 1 }}
      transition={{ duration: 0.6, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      animate={{
        scale: scaled ? 1.02 : 1,
        opacity: dimmed ? 0.5 : 1,
      }}
      className={`relative bg-background p-6 md:p-8 flex flex-col border border-border md:border-0 ${
        plan.featured ? "border-2 !border-primary" : ""
      }`}
      style={{ transformOrigin: "center center" }}
      data-cursor-hover
    >
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          {plan.fig}
        </span>
        {plan.featured && (
          <span className="font-mono text-[9px] uppercase tracking-widest text-primary border border-primary px-2 py-0.5">
            PREFERRED_CHOICE
          </span>
        )}
      </div>

      <h3 className="font-display text-xl md:text-2xl font-bold uppercase tracking-tight text-foreground mb-2">
        {plan.name}
      </h3>
      <span className="font-display text-3xl md:text-4xl font-black text-foreground mb-3 gradient-text">
        {formatPrice(animatedPrice, numericPrices[i])}
      </span>
      <p className="font-mono text-xs text-muted-foreground leading-relaxed mb-4 md:mb-6">
        {plan.description}
      </p>

      <ul className="space-y-2 mb-6 md:mb-8 flex-1">
        {plan.features.map((f, fi) => (
          <li key={fi} className="flex items-start gap-2">
            <span className="font-mono text-xs text-primary mt-0.5">▸</span>
            <span className="font-mono text-xs text-foreground">{f}</span>
          </li>
        ))}
      </ul>

      <a
        href={plan.cta}
        target="_blank"
        rel="noopener noreferrer"
        className={`pricing-cta block w-full text-center py-3 font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
          plan.featured
            ? "bg-foreground text-background hover:text-primary-foreground"
            : "border border-foreground text-foreground hover:text-background"
        }`}
      >
        GET STARTED
      </a>
    </motion.div>
  );
};

const Pricing = () => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="border-b border-border px-4 md:px-6 py-12 md:py-20">
      <div className="mb-8 md:mb-12">
        <span className="font-mono text-[10px] uppercase tracking-widest text-primary block mb-2">
          INVEST ONCE
        </span>
        <h2 className="font-display text-2xl md:text-5xl font-black uppercase tracking-tighter text-foreground">
          PRICING / NO SUBSCRIPTIONS
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-[1px] md:bg-border">
        {plans.map((plan, i) => (
          <PricingCard
            key={i}
            plan={plan}
            i={i}
            dimmed={hovered === 1 && i !== 1}
            scaled={hovered === 1 && i === 1}
            onEnter={() => setHovered(i)}
            onLeave={() => setHovered(null)}
          />
        ))}
      </div>
    </section>
  );
};

export default Pricing;
