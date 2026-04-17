// ========================================
// StatsBar.jsx — Animated stat counters (premium)
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
    <span ref={ref} className="font-[Syne] text-3xl md:text-4xl font-bold text-gradient tabular-nums">
      {count}{suffix}
    </span>
  );
}

export default function StatsBar({ stats }) {
  return (
    <div className="flex items-center justify-center gap-6 md:gap-10">
      {stats.map((stat, i) => (
        <div key={i} className="text-center relative">
          <AnimatedCounter target={stat.value} suffix={stat.suffix} />
          <p className="text-[#9CA3AF] text-xs font-medium mt-1 tracking-wide uppercase">{stat.label}</p>
          {i < stats.length - 1 && (
            <div className="absolute right-[-12px] md:right-[-20px] top-1/2 -translate-y-1/2 w-px h-8 bg-gray-200 hidden sm:block" />
          )}
        </div>
      ))}
    </div>
  );
}
