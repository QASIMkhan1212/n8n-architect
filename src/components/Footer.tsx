const Footer = () => {
  return (
    <footer className="px-4 md:px-6 py-12 md:py-20 pb-24">
      <div className="grid grid-cols-1 gap-10 md:gap-16 md:grid-cols-2">
        {/* CTA */}
        <div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-primary block mb-4">
            CONTACT / CTA
          </span>
          <h2 className="font-display text-3xl md:text-6xl font-black uppercase tracking-tighter text-foreground mb-2">
            READY?
          </h2>
          <h2 className="font-display text-3xl md:text-6xl font-black uppercase tracking-tighter gradient-text mb-6">
            BOOK DISCOVERY CALL
          </h2>
          <a
            href="https://cal.com/saim-hussain-9ekrz6"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border-2 border-foreground px-6 md:px-8 py-3 md:py-4 font-mono text-xs md:text-sm uppercase tracking-wider text-foreground transition-colors hover:bg-foreground hover:text-background"
            data-cursor-hover
          >
            Schedule a Call →
          </a>
        </div>

        {/* Info */}
        <div className="flex flex-col justify-between">
          <div>
            <span className="font-display text-xl font-black uppercase tracking-tighter text-foreground block mb-3">
              AgentFlow
            </span>
            <p className="font-mono text-xs text-muted-foreground leading-relaxed mb-2">
              Systems that breathe. Logic that scales.
            </p>
            <a
              href="mailto:saimm.dev@gmail.com"
              className="font-mono text-xs text-primary hover:underline"
            >
              EMAIL: saimm.dev@gmail.com
            </a>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-6 md:mt-8">
            © 2025 AgentFlow
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
