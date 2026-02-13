const items = ["AUTOMATE", "DELEGATE", "SCALE", "NO_CODE", "FULL_SPEED"];

const Marquee = () => {
  return (
    <div className="overflow-hidden border-b border-border py-4 bg-secondary">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <span
            key={i}
            className="mx-8 font-display text-sm font-bold uppercase tracking-widest text-muted-foreground"
          >
            {item} •
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
