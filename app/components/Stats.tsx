"use client";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Code, Briefcase, BookOpen, Award } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

function CountUp({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (!inView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [inView, end, duration]);

  return <span ref={ref}>{count}</span>;
}

export default function Stats() {
  const stats = [
    {
      icon: Code,
      label: "Technologies Mastered",
      value: 25,
      suffix: "+",
      color: "text-electric-blue",
      bgColor: "bg-electric-blue/10",
    },
    {
      icon: Briefcase,
      label: "Projects Completed",
      value: 12,
      suffix: "+",
      color: "text-toxic-green",
      bgColor: "bg-toxic-green/10",
    },
    {
      icon: BookOpen,
      label: "Blog Posts Written",
      value: 8,
      suffix: "+",
      color: "text-purple-400",
      bgColor: "bg-purple-400/10",
    },
    {
      icon: Award,
      label: "Years Self-Learning",
      value: 2,
      suffix: "+",
      color: "text-orange-400",
      bgColor: "bg-orange-400/10",
    },
  ];

  return (
    <AnimatedSection className="py-20 px-6 bg-dark-card/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="group bg-dark-bg/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-toxic-green/50 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-toxic-green/20"
              >
                <div
                  className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>

                <div
                  className={`text-4xl md:text-5xl font-bold ${stat.color} mb-2`}
                >
                  <CountUp end={stat.value} />
                  {stat.suffix}
                </div>

                <p className="text-gray-400 text-sm md:text-base font-semibold">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}
