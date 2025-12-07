"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Skill {
  id: number;
  category: string;
  items: string[];
  order: number;
}

export default function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSkills() {
      try {
        const { data, error } = await supabase
          .from("skills")
          .select("*")
          .order("order", { ascending: true });

        if (error) {
          console.error("Supabase error:", error);
        } else {
          console.log("Raw fetched skills:", data);
          // Process the data and ensure items is always an array
          const processedData = (data || []).map((skill) => {
            let items = skill.items;

            // If items is a string (shouldn't happen but just in case)
            if (typeof items === "string") {
              // Remove curly braces and split by comma
              items = items
                .replace(/[{}]/g, "")
                .split(",")
                .map((s: string) => s.trim());
            }

            // Ensure it's an array
            if (!Array.isArray(items)) {
              items = [];
            }

            console.log("Processed skill:", { ...skill, items });

            return {
              ...skill,
              items,
            };
          });
          setSkills(processedData);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
      setLoading(false);
    }

    fetchSkills();
  }, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    },
  };

  if (loading) {
    return (
      <section
        id="skills"
        className="min-h-screen relative py-20 px-6 flex items-center justify-center"
      >
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-toxic-green border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading skills...</p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="skills"
      className="min-h-screen relative py-20 px-6 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-dark-card to-dark-bg"></div>
      <motion.div
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        }}
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, rgba(14, 165, 233, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(34, 197, 94, 0.15) 0%, transparent 50%)",
          backgroundSize: "200% 200%",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          ref={ref}
          className="text-center mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl font-bold text-white mb-4"
          >
            Technical{" "}
            <span className="bg-gradient-to-r from-electric-blue to-toxic-green bg-clip-text text-transparent">
              Arsenal
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-gray-400 text-lg"
          >
            Self-taught expertise across emerging technologies
          </motion.p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-8"
        >
          {skills.map((skill, categoryIndex) => (
            <motion.div
              key={skill.id}
              variants={itemVariants as any}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/10 to-toxic-green/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>

              <div className="relative bg-dark-bg/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-toxic-green/50 transition-all duration-500 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/0 to-toxic-green/0 group-hover:from-electric-blue/5 group-hover:to-toxic-green/5 rounded-2xl transition-all duration-500"></div>

                <div className="relative z-10">
                  <motion.h3
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + categoryIndex * 0.1 }}
                    className="text-2xl font-bold text-toxic-green mb-4 flex items-center gap-2"
                  >
                    <motion.span
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 3,
                      }}
                    >
                      ⚡
                    </motion.span>
                    {skill.category}
                  </motion.h3>

                  <div className="flex flex-wrap gap-3">
                    {skill.items.map((item, skillIndex) => (
                      <motion.span
                        key={skillIndex}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{
                          delay: 0.5 + categoryIndex * 0.1 + skillIndex * 0.05,
                          duration: 0.3,
                        }}
                        whileHover={{
                          scale: 1.1,
                          backgroundColor: "rgba(14, 165, 233, 0.2)",
                          color: "#0EA5E9",
                          borderColor: "#0EA5E9",
                        }}
                        className="bg-electric-blue/5 text-electric-blue/90 px-4 py-2 rounded-full text-sm font-semibold border border-electric-blue/20 cursor-pointer transition-all backdrop-blur-sm hover:shadow-lg hover:shadow-electric-blue/30"
                      >
                        {item}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.5 }}
          className="text-center mt-12"
        >
          <motion.div
            whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
            className="inline-block bg-gradient-to-r from-electric-blue/10 to-toxic-green/10 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3"
          >
            <p className="text-gray-300 font-semibold">
              <span className="text-toxic-green">10+</span> Technologies
              Mastered
              <span className="text-electric-blue"> • Self-Taught</span>
              <span className="text-purple-400"> • Always Learning</span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
