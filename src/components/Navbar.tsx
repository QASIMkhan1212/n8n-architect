import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

const Navbar = () => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : true;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    }
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/90 backdrop-blur-sm">
      <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4">
        <a href="/" className="flex items-center gap-2">
          <img
            src={isDark ? "/logo-dark.png" : "/logo-light.png"}
            alt="AgentFlow logo"
            className="h-7 md:h-8"
          />
        </a>
        <div className="flex items-center gap-3 md:gap-4">
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
            data-cursor-hover
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <span className="hidden font-mono text-[10px] uppercase tracking-widest text-muted-foreground sm:inline">
            SYS_VER: 2.0.26
          </span>
          <a
            href="https://cal.com/saim-hussain-9ekrz6"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-foreground px-3 md:px-4 py-1.5 md:py-2 font-mono text-[10px] md:text-xs uppercase tracking-wider text-foreground transition-colors hover:bg-foreground hover:text-background"
            data-cursor-hover
          >
            Book Call
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
