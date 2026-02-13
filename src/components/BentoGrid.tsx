import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const services = [
  {
    fig: "FIG_2.1",
    label: "SVC_01",
    title: "REAL-TIME EVENTS",
    description: "Webhook listeners, Cron triggers, and event-driven n8n workflows that react instantly.",
    details: [
      "HTTP Webhook nodes for instant triggers",
      "Schedule nodes for recurring automation",
      "Error-handling & retry logic built-in",
      "Real-time Slack/Discord/Email alerts",
    ],
  },
  {
    fig: "FIG_2.2",
    label: "SVC_02",
    title: "AI AGENTS",
    description: "LLM-powered agents that read, decide, and act on your data autonomously.",
    details: [
      "OpenAI / Anthropic / local LLM integration",
      "RAG pipelines with vector databases",
      "Tool-calling agents for multi-step reasoning",
      "Human-in-the-loop approval workflows",
    ],
  },
  {
    fig: "FIG_2.3",
    label: "SVC_03",
    title: "SELF-HOSTED",
    description: "Your infrastructure, your rules. Full Docker deployments with zero vendor lock-in.",
    details: [
      "Docker Compose production configs",
      "Nginx reverse-proxy & SSL setup",
      "PostgreSQL + Redis persistence",
      "Automated backups & monitoring",
    ],
  },
  {
    fig: "FIG_2.4",
    label: "SVC_04",
    title: "CUSTOM APIS",
    description: "Bespoke REST & GraphQL endpoints that bridge your tools into a unified system.",
    details: [
      "RESTful API design & documentation",
      "OAuth2 / API key authentication",
      "Rate limiting & request validation",
      "Webhook-to-API translation layers",
    ],
  },
];

const BentoGrid = () => {
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);

  return (
    <section className="border-b border-border px-4 md:px-6 py-12 md:py-20">
      <div className="mb-8 md:mb-12">
        <span className="font-mono text-[10px] uppercase tracking-widest text-primary block mb-2">
          THE STACK
        </span>
        <h2 className="font-display text-2xl md:text-3xl font-black uppercase tracking-tighter text-foreground md:text-5xl">
          SERVICES / CAPABILITIES
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-[1px] bg-border md:grid-cols-2">
        {services.map((service, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true, margin: "-50px" }}
            onClick={() => setSelectedService(service)}
            className="group bg-background p-5 md:p-8 cursor-pointer transition-colors duration-300 hover:bg-foreground"
            data-cursor-hover
          >
            <div className="flex items-center justify-between mb-6">
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground group-hover:text-background/60 transition-colors">
                {service.label}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground group-hover:text-background/60 transition-colors">
                {service.fig}
              </span>
            </div>
            <h3 className="font-display text-lg md:text-xl font-bold uppercase tracking-tight text-foreground group-hover:text-background transition-colors mb-3">
              {service.title}
            </h3>
            <p className="font-mono text-xs text-muted-foreground group-hover:text-background/70 transition-colors leading-relaxed">
              {service.description}
            </p>
            <span className="inline-block mt-4 font-mono text-[10px] uppercase tracking-widest text-primary group-hover:text-background transition-colors">
              CLICK_TO_EXPAND →
            </span>
          </motion.div>
        ))}
      </div>

      {/* Detail Modal */}
      <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
        <DialogContent className="border border-border bg-background p-0 max-w-[calc(100vw-2rem)] sm:max-w-lg">
          <DialogHeader className="border-b border-border p-6">
            <DialogTitle className="font-display text-lg font-bold uppercase tracking-tight text-foreground">
              {selectedService?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="p-6">
            <span className="font-mono text-[10px] uppercase tracking-widest text-primary block mb-4">
              TECHNICAL_SPEC / {selectedService?.label}
            </span>
            <p className="font-mono text-sm text-muted-foreground mb-6">
              {selectedService?.description}
            </p>
            <ul className="space-y-3">
              {selectedService?.details.map((detail, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="font-mono text-xs text-primary mt-0.5">▸</span>
                  <span className="font-mono text-xs text-foreground">{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default BentoGrid;
