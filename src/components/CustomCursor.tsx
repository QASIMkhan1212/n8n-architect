import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window;
    if (isTouchDevice) return;

    setVisible(true);

    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    const overHandler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-cursor-hover]") ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA"
      ) {
        setHovering(true);
      }
    };

    const outHandler = () => setHovering(false);

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", overHandler);
    document.addEventListener("mouseout", outHandler);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", overHandler);
      document.removeEventListener("mouseout", outHandler);
    };
  }, []);

  if (!visible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] mix-blend-difference bg-foreground"
      animate={{
        x: pos.x - (hovering ? 24 : 8),
        y: pos.y - (hovering ? 24 : 8),
        width: hovering ? 48 : 16,
        height: hovering ? 48 : 16,
      }}
      transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
    />
  );
};

export default CustomCursor;
