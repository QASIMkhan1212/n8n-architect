import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const REGIONS = [
  { label: "USA", code: "+1", currency: "$" },
  { label: "UK", code: "+44", currency: "£" },
  { label: "UAE", code: "+971", currency: "AED " },
  { label: "Germany", code: "+49", currency: "€" },
  { label: "KSA", code: "+966", currency: "SAR " },
  { label: "Pakistan", code: "+92", currency: "₨" },
  { label: "India", code: "+91", currency: "₹" },
] as const;

const BOTTLENECKS = [
  "Lead follow-up",
  "Invoicing",
  "Customer Support",
  "Data Management",
  "Other",
];

const TEAM_SIZES = ["1-10", "11-50", "50+"];

const getBudgetOptions = (currency: string) => [
  `${currency}500 – ${currency}2,000`,
  `${currency}2,000 – ${currency}5,000`,
  `${currency}5,000 – ${currency}15,000`,
  `${currency}15,000+`,
];

interface AssessmentFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task: string;
}

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({
    x: dir > 0 ? -300 : 300,
    opacity: 0,
  }),
};

const AssessmentForm = ({ open, onOpenChange, task }: AssessmentFormProps) => {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  // Step 1 fields
  const [companyName, setCompanyName] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [region, setRegion] = useState("");

  // Step 2 fields
  const [whatsapp, setWhatsapp] = useState("");
  const [budget, setBudget] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [bottleneck, setBottleneck] = useState("");
  const [vision, setVision] = useState("");

  const selectedRegion = REGIONS.find((r) => r.label === region);
  const currency = selectedRegion?.currency ?? "$";
  const phonePrefix = selectedRegion?.code ?? "+1";

  const resetForm = () => {
    setStep(1);
    setDirection(1);
    setStatus("idle");
    setCompanyName("");
    setFullName("");
    setEmail("");
    setRegion("");
    setWhatsapp("");
    setBudget("");
    setTeamSize("");
    setBottleneck("");
    setVision("");
  };

  const handleClose = (val: boolean) => {
    if (!val) resetForm();
    onOpenChange(val);
  };

  const goNext = () => {
    if (!companyName.trim() || !fullName.trim() || !email.trim() || !region) return;
    setDirection(1);
    setStep(2);
  };

  const goBack = () => {
    setDirection(-1);
    setStep(1);
  };

  const handleSubmit = async () => {
    setStatus("loading");
    try {
      const res = await fetch(
        "https://deandre-unshed-giada.ngrok-free.dev/webhook/landingPage",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            request: task,
            companyName: companyName.trim(),
            fullName: fullName.trim(),
            email: email.trim(),
            region,
            whatsapp: `${phonePrefix}${whatsapp.trim()}`,
            budget,
            teamSize,
            bottleneck,
            vision: vision.trim(),
            source: "lovable_landing",
          }),
        }
      );
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full bg-background border-2 border-foreground rounded-[12px] px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:shadow-[4px_4px_0px_hsl(var(--primary))] transition-all font-mono";
  const selectClass =
    "w-full bg-background border-2 border-foreground rounded-[12px] px-4 py-3 text-sm text-foreground outline-none focus:border-primary focus:shadow-[4px_4px_0px_hsl(var(--primary))] transition-all font-mono appearance-none cursor-pointer";
  const labelClass = "font-mono text-[10px] uppercase tracking-widest text-muted-foreground block mb-1.5";

  const step1Valid = companyName.trim() && fullName.trim() && email.trim() && region;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="border-3 border-foreground bg-background p-0 max-w-[calc(100vw-2rem)] sm:max-w-lg rounded-[16px] shadow-[8px_8px_0px_hsl(var(--foreground))] overflow-hidden">
        <DialogHeader className="border-b-2 border-foreground p-4 md:p-6">
          <DialogTitle className="font-display text-base md:text-lg font-black uppercase tracking-tight text-foreground">
            Elite AI Automation Assessment
          </DialogTitle>
          {/* Step indicator */}
          <div className="flex items-center gap-2 mt-3">
            {[1, 2].map((s) => (
              <div
                key={s}
                className={`h-2 flex-1 rounded-full transition-colors duration-300 ${
                  s <= step ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
            <span className="font-mono text-[10px] text-muted-foreground ml-1">
              {step}/2
            </span>
          </div>
        </DialogHeader>

        <div className="p-4 md:p-6 min-h-[340px] relative overflow-hidden">
          {status === "success" ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center justify-center h-full py-8 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-4 shadow-[4px_4px_0px_hsl(var(--foreground))]">
                <span className="text-2xl text-primary-foreground font-black">✓</span>
              </div>
              <p className="font-display text-lg font-black uppercase text-foreground mb-2">
                Assessment Received
              </p>
              <p className="font-mono text-xs text-muted-foreground">
                We'll analyze your workflow and get back to you shortly.
              </p>
            </motion.div>
          ) : (
            <AnimatePresence mode="wait" custom={direction}>
              {step === 1 && (
                <motion.div
                  key="step1"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-4"
                >
                  <div>
                    <label className={labelClass}>Company Name</label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Acme Corp"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Full Name</label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="John Doe"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Business Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@acme.com"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Region</label>
                    <select
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                      className={selectClass}
                    >
                      <option value="" disabled>
                        Select your region
                      </option>
                      {REGIONS.map((r) => (
                        <option key={r.label} value={r.label}>
                          {r.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-4"
                >
                  <div>
                    <label className={labelClass}>WhatsApp Number</label>
                    <div className="flex gap-2">
                      <span className="border-2 border-foreground rounded-[12px] px-3 py-3 text-sm font-mono text-muted-foreground bg-muted shrink-0">
                        {phonePrefix}
                      </span>
                      <input
                        type="tel"
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value.replace(/[^0-9]/g, ""))}
                        placeholder="3001234567"
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Budget Range</label>
                    <div className="grid grid-cols-2 gap-2">
                      {getBudgetOptions(currency).map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setBudget(opt)}
                          className={`border-2 rounded-[12px] px-3 py-2.5 text-xs font-mono transition-all text-left ${
                            budget === opt
                              ? "border-primary bg-primary text-primary-foreground shadow-[3px_3px_0px_hsl(var(--foreground))]"
                              : "border-foreground text-foreground hover:shadow-[3px_3px_0px_hsl(var(--foreground))]"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className={labelClass}>Team Size</label>
                      <div className="flex gap-2">
                        {TEAM_SIZES.map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setTeamSize(s)}
                            className={`flex-1 border-2 rounded-[12px] px-2 py-2.5 text-xs font-mono transition-all ${
                              teamSize === s
                                ? "border-primary bg-primary text-primary-foreground shadow-[3px_3px_0px_hsl(var(--foreground))]"
                                : "border-foreground text-foreground hover:shadow-[3px_3px_0px_hsl(var(--foreground))]"
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Biggest Bottleneck</label>
                    <select
                      value={bottleneck}
                      onChange={(e) => setBottleneck(e.target.value)}
                      className={selectClass}
                    >
                      <option value="" disabled>
                        Select bottleneck
                      </option>
                      {BOTTLENECKS.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Your Vision</label>
                    <textarea
                      value={vision}
                      onChange={(e) => setVision(e.target.value)}
                      placeholder="Describe your dream Automated Business..."
                      rows={3}
                      className={`${inputClass} resize-none`}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>

        {/* Footer buttons */}
        {status !== "success" && (
          <div className="border-t-2 border-foreground p-4 md:p-6 flex items-center justify-between gap-3">
            {step === 2 ? (
              <button
                type="button"
                onClick={goBack}
                className="border-2 border-foreground rounded-[12px] px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-foreground hover:shadow-[4px_4px_0px_hsl(var(--foreground))] transition-all"
              >
                Back
              </button>
            ) : (
              <div />
            )}
            {step === 1 ? (
              <button
                type="button"
                onClick={goNext}
                disabled={!step1Valid}
                className="bg-primary border-2 border-foreground rounded-[12px] px-6 py-2.5 font-mono text-xs uppercase tracking-wider text-primary-foreground shadow-[4px_4px_0px_hsl(var(--foreground))] hover:shadow-[6px_6px_0px_hsl(var(--foreground))] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none disabled:hover:translate-x-0 disabled:hover:translate-y-0"
                data-cursor-hover
              >
                Next →
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={status === "loading"}
                className="bg-primary border-2 border-foreground rounded-[12px] px-6 py-2.5 font-mono text-xs uppercase tracking-wider text-primary-foreground shadow-[4px_4px_0px_hsl(var(--foreground))] hover:shadow-[6px_6px_0px_hsl(var(--foreground))] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all disabled:opacity-50"
                data-cursor-hover
              >
                {status === "loading" ? "Submitting..." : "Submit Assessment"}
              </button>
            )}
          </div>
        )}

        {status === "error" && (
          <div className="px-4 md:px-6 pb-4">
            <p className="font-mono text-xs text-destructive">
              ✗ Submission failed — please try again.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AssessmentForm;
