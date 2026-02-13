import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AssessmentForm from "@/components/AssessmentForm";

const WORDS = ["BORING", "MANUAL", "REPETITIVE", "TEDIOUS", "SLOW"];

const Hero = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [task, setTask] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % WORDS.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!task.trim()) return;
    setShowModal(true);
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center border-b border-border pt-16 md:pt-20">
      {/* Micro labels */}
      <div className="flex items-center justify-between px-4 md:px-6 py-3 border-b border-border">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          FIG 1.0
        </span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          SCROLL_Y : 0
        </span>
      </div>

      {/* Main headline */}
      <div className="flex-1 flex items-center px-4 md:px-6 py-8 md:py-24">
        <div className="w-full">
          <h1 className="font-display font-black uppercase tracking-tighter" style={{ lineHeight: 0.95 }}>
            <span className="block text-[clamp(2rem,9vw,8rem)] text-foreground">
              AUTOMATE THE
            </span>
            <span className="relative block overflow-hidden" style={{ height: "clamp(2rem, 9vw, 8rem)" }}>
              <AnimatePresence mode="wait">
                <motion.span
                  key={WORDS[wordIndex]}
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  exit={{ y: "-110%", opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 block gradient-text text-[clamp(2rem,9vw,8rem)]"
                  style={{ lineHeight: 0.95 }}
                >
                  {WORDS[wordIndex]}.
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>
          <p className="mt-4 md:mt-6 max-w-lg font-mono text-xs md:text-sm text-muted-foreground leading-relaxed">
            Stop pasting data between tabs.
            <br />
            I build digital employees.
          </p>
        </div>
      </div>

      {/* Terminal input — centered & highlighted */}
      <div className="border-t border-border px-4 md:px-6 py-8 md:py-12">
        <form onSubmit={handleTaskSubmit} className="max-w-5xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="font-mono text-[10px] uppercase tracking-widest text-primary block mb-4"
          >
            INPUT_TASK
          </motion.span>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="relative p-[1px] rounded-full"
            style={{
              background: "linear-gradient(135deg, hsl(var(--cyan)), hsl(var(--purple)), hsl(var(--cyan)))",
              boxShadow: "0 0 40px hsl(var(--cyan) / 0.3), 0 0 80px hsl(var(--purple) / 0.15), 0 0 120px hsl(var(--cyan) / 0.1)",
            }}
          >
            <div className="bg-background rounded-full px-4 md:px-6 py-3 md:py-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <input
                  type="text"
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                  placeholder="What do you want to automate?"
                  maxLength={500}
                  className="flex-1 bg-transparent border-none px-2 py-2 text-base md:text-lg text-foreground placeholder:text-muted-foreground outline-none font-mono text-left"
                />
                <button
                  type="submit"
                  disabled={!task.trim()}
                  className="border border-foreground rounded-full px-5 md:px-6 py-2.5 md:py-3 font-mono text-xs md:text-sm uppercase tracking-wider text-foreground transition-colors hover:bg-foreground hover:text-background disabled:opacity-30 disabled:cursor-not-allowed whitespace-nowrap shrink-0"
                  data-cursor-hover
                >
                  SUBMIT
                </button>
              </div>
            </div>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground/50 mt-3"
          >
            Tell us what's slowing you down — we'll show you how to automate it
          </motion.p>
        </form>
      </div>

      {/* Assessment Form Modal */}
      <AssessmentForm open={showModal} onOpenChange={setShowModal} task={task} />
    </section>
  );
};

export default Hero;
