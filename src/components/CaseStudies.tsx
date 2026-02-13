import { motion } from "framer-motion";

const caseStudies = [
  {
    id: "CS_01",
    client: "ONLINE STORE",
    title: "ORDERS ON AUTOPILOT",
    description:
      "An online store was drowning in 800+ daily orders — staff spent hours copying order details between systems, and 1 in 8 shipments had errors. We connected their store, warehouse, and shipping into one automated flow. Now every order processes itself in seconds.",
    before: {
      label: "THE PROBLEM",
      metrics: [
        { key: "Time per Order", value: "45 minutes" },
        { key: "Shipping Mistakes", value: "1 in 8 orders" },
        { key: "Staff Time Wasted", value: "6 hours / day" },
      ],
    },
    after: {
      label: "THE RESULT",
      metrics: [
        { key: "Time per Order", value: "8 seconds" },
        { key: "Shipping Mistakes", value: "Nearly zero" },
        { key: "Staff Time Wasted", value: "None" },
      ],
    },
    stack: ["Shopify", "Shipping", "Database"],
  },
  {
    id: "CS_02",
    client: "FINANCE STARTUP",
    title: "INSTANT ID CHECKS",
    description:
      "A finance company needed to verify customer identities before opening accounts. Their team manually reviewed every document — slow, expensive, and couldn't keep up with demand. We built an AI that reads, checks, and approves documents automatically.",
    before: {
      label: "THE PROBLEM",
      metrics: [
        { key: "Time to Verify", value: "24 hours" },
        { key: "Reviews per Day", value: "50" },
        { key: "Cost per Review", value: "$4.20" },
      ],
    },
    after: {
      label: "THE RESULT",
      metrics: [
        { key: "Time to Verify", value: "12 seconds" },
        { key: "Reviews per Day", value: "2,000" },
        { key: "Cost per Review", value: "$0.03" },
      ],
    },
    stack: ["AI Vision", "Database", "Automation"],
  },
  {
    id: "CS_03",
    client: "MEDIA AGENCY",
    title: "ONE-CLICK PUBLISHING",
    description:
      "A media team was spending 2 hours per post copying and pasting content across 6 different platforms, then manually tracking results in spreadsheets. We built a system where they write once and everything publishes, schedules, and tracks itself.",
    before: {
      label: "THE PROBLEM",
      metrics: [
        { key: "Publishing", value: "Copy-paste to each platform" },
        { key: "Time per Post", value: "2 hours" },
        { key: "Performance Tracking", value: "Manual spreadsheet" },
      ],
    },
    after: {
      label: "THE RESULT",
      metrics: [
        { key: "Publishing", value: "All 6 platforms at once" },
        { key: "Time per Post", value: "Zero effort" },
        { key: "Performance Tracking", value: "Live dashboard" },
      ],
    },
    stack: ["Content Tools", "Scheduling", "Analytics"],
  },
];

const CaseStudies = () => {
  return (
    <section className="border-b border-border px-4 md:px-6 py-12 md:py-20">
      <div className="mb-8 md:mb-12">
        <span className="font-mono text-[10px] uppercase tracking-widest text-primary block mb-2">
          FIELD REPORTS
        </span>
        <h2 className="font-display text-2xl md:text-5xl font-black uppercase tracking-tighter text-foreground">
          CASE STUDIES
        </h2>
      </div>

      <div className="space-y-6 md:space-y-8">
        {caseStudies.map((cs, i) => (
          <motion.div
            key={cs.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{
              scale: typeof window !== "undefined" && window.innerWidth >= 768 ? 1.02 : 1,
              boxShadow: "0 0 30px hsl(var(--cyan) / 0.15), 0 0 60px hsl(var(--purple) / 0.08)",
            }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            viewport={{ once: true, margin: "-50px" }}
            className="border border-border bg-background cursor-pointer group"
            style={{ transformOrigin: "center" }}
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border px-4 md:px-6 py-3 transition-colors group-hover:border-primary/30">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] uppercase tracking-widest text-primary">
                  {cs.id}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {cs.client}
                </span>
              </div>
              <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
                {cs.stack.map((s) => (
                  <span
                    key={s}
                    className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground border border-border px-2 py-0.5 transition-colors group-hover:border-primary/20 group-hover:text-primary/70"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Body */}
            <div className="px-4 md:px-6 py-6 md:py-8">
              <h3 className="font-display text-xl md:text-2xl font-bold uppercase tracking-tight text-foreground mb-3 transition-colors group-hover:gradient-text">
                {cs.title}
              </h3>
              <p className="font-mono text-xs text-muted-foreground leading-relaxed max-w-2xl mb-6 md:mb-8">
                {cs.description}
              </p>

              {/* Before / After Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-[1px] md:bg-border">
                {/* Before */}
                <motion.div
                  className="bg-background p-4 md:p-6 border border-border md:border-0"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 + 0.2 }}
                  viewport={{ once: true }}
                >
                  <span className="font-mono text-[10px] uppercase tracking-widest text-destructive block mb-4">
                    ✗ {cs.before.label}
                  </span>
                  <div className="space-y-3">
                    {cs.before.metrics.map((m, mi) => (
                      <motion.div
                        key={m.key}
                        className="flex items-baseline justify-between gap-4"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.1 + 0.3 + mi * 0.08 }}
                        viewport={{ once: true }}
                      >
                        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                          {m.key}
                        </span>
                        <span className="font-mono text-sm text-foreground font-bold">
                          {m.value}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* After */}
                <motion.div
                  className="bg-background p-4 md:p-6 border border-border md:border-0"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 + 0.3 }}
                  viewport={{ once: true }}
                >
                  <span className="font-mono text-[10px] uppercase tracking-widest text-primary block mb-4">
                    ✓ {cs.after.label}
                  </span>
                  <div className="space-y-3">
                    {cs.after.metrics.map((m, mi) => (
                      <motion.div
                        key={m.key}
                        className="flex items-baseline justify-between gap-4"
                        initial={{ opacity: 0, x: 10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.1 + 0.4 + mi * 0.08 }}
                        viewport={{ once: true }}
                      >
                        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                          {m.key}
                        </span>
                        <span className="font-mono text-sm gradient-text font-bold">
                          {m.value}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CaseStudies;
