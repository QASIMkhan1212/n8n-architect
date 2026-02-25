import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const gifs = [
  {
    id: "DEMO_01",
    title: "B2B LEAD GENERATOR",
    src: "/gifs/B2B Lead Generator.gif",
  },
  {
    id: "DEMO_02",
    title: "LINKEDIN SCRAPER",
    src: "/gifs/Linkedin_scraper.gif",
  },
];

const GifsShowcase = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="font-mono text-xs tracking-widest text-zinc-500 uppercase mb-3">
            LIVE_DEMOS
          </p>
          <h2 className="font-mono text-3xl md:text-4xl font-bold tracking-tight">
            SEE IT IN ACTION
          </h2>
        </motion.div>

        <div className="flex flex-col gap-20">
          {gifs.map((gif, i) => (
            <motion.div
              key={gif.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="flex flex-col gap-4"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs tracking-widest text-zinc-500">
                  {gif.id}
                </span>
                <div className="flex-1 h-px bg-zinc-800" />
                <span className="font-mono text-sm font-bold tracking-widest">
                  {gif.title}
                </span>
              </div>
              <div className="rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950">
                <img
                  src={gif.src}
                  alt={gif.title}
                  className="w-full h-auto"
                  loading="lazy"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GifsShowcase;
