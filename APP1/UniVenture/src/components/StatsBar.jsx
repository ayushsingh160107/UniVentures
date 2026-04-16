// ========================================
// StatsBar.jsx — Animated stat counters (light)
// ========================================

import { useState, useEffect, useRef } from 'react';

function AnimatedCounter({ target, suffix = '', duration = 1500 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animateCount();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  function animateCount() {
    const startTime = Date.now();
    const step = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  return (
    <span ref={ref} className="font-[Syne] text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#6C63FF] to-[#00B4D8] bg-clip-text text-transparent">
      {count}{suffix}
    </span>
  );
}

export default function StatsBar({ stats }) {
  return (
    <div className="grid grid-cols-3 gap-4 md:gap-8">
      {stats.map((stat, i) => (
        <div key={i} className="text-center">
          <AnimatedCounter target={stat.value} suffix={stat.suffix} />
          <p className="text-[#6B7280] text-sm mt-1">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
