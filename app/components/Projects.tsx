"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import { Code2, ExternalLink } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  status: string;
  featured: boolean;
  github: string;
  image: string | null;
}

export default function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .order("featured", { ascending: false });

        if (error) {
          console.error("Supabase error:", error);
          alert(`Database error: ${error.message}`);
        } else {
          console.log("Fetched projects:", data);
          // Ensure tech is always an array
          const processedData = (data || []).map((project) => ({
            ...project,
            tech: Array.isArray(project.tech) ? project.tech : [],
          }));
          setProjects(processedData);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        alert(`Error: ${err}`);
      }
      setLoading(false);
    }

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section
        id="projects"
        className="min-h-screen relative py-20 px-6 flex items-center justify-center"
      >
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-electric-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading projects...</p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="projects"
      className="min-h-screen relative py-20 px-6 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-dark-bg to-dark-card"></div>
      <motion.div
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        }}
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 80% 20%, rgba(34, 197, 94, 0.15) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(14, 165, 233, 0.15) 0%, transparent 50%)",
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
            Featured{" "}
            <span className="bg-gradient-to-r from-toxic-green to-emerald-400 bg-clip-text text-transparent">
              Projects
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-gray-400 text-lg"
          >
            Building the decentralized and intelligent future
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  inView,
}: {
  project: Project;
  index: number;
  inView: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    ["7.5deg", "-7.5deg"]
  );
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    ["-7.5deg", "7.5deg"]
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      className="group relative cursor-pointer"
    >
      <div
        className={`absolute inset-0 rounded-2xl blur-xl transition-all duration-500 ${
          project.featured
            ? "bg-gradient-to-br from-toxic-green/20 to-emerald-400/20"
            : "bg-gradient-to-br from-electric-blue/10 to-purple-500/10"
        } ${isHovered ? "opacity-100" : "opacity-50"}`}
      ></div>

      <div
        className={`relative bg-dark-bg/50 backdrop-blur-xl border rounded-2xl p-6 transition-all duration-500 ${
          project.featured
            ? "border-toxic-green/30 hover:border-toxic-green shadow-2xl"
            : "border-white/10 hover:border-electric-blue/50"
        }`}
        style={{ transform: "translateZ(20px)" }}
      >
        {project.featured && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 + index * 0.2, type: "spring" }}
            className="inline-block bg-gradient-to-r from-toxic-green to-emerald-400 text-dark-bg text-xs font-bold px-3 py-1 rounded-full mb-3"
          >
            ⭐ FEATURED
          </motion.span>
        )}

        <motion.h3
          className="text-2xl font-bold text-white mb-3 group-hover:text-toxic-green transition-colors"
          style={{ transform: "translateZ(30px)" }}
        >
          {project.title}
        </motion.h3>

        <motion.p
          className="text-gray-400 mb-4 leading-relaxed"
          style={{ transform: "translateZ(25px)" }}
        >
          {project.description}
        </motion.p>

        <div
          className="flex flex-wrap gap-2 mb-4"
          style={{ transform: "translateZ(20px)" }}
        >
          {project.tech.map((tech: string) => (
            <span
              key={tech}
              className="bg-electric-blue/10 text-electric-blue text-xs px-3 py-1 rounded-full border border-electric-blue/30 backdrop-blur-sm"
            >
              {tech}
            </span>
          ))}
        </div>

        <div
          className="flex items-center justify-between pt-4 border-t border-gray-800"
          style={{ transform: "translateZ(30px)" }}
        >
          <span
            className={`text-sm font-semibold flex items-center gap-1 ${
              project.status === "Deployed"
                ? "text-toxic-green"
                : "text-electric-blue"
            }`}
          >
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-current"
            />
            {project.status}
          </span>

          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 bg-electric-blue/10 text-electric-blue rounded-lg hover:bg-electric-blue hover:text-dark-bg transition-all font-semibold text-sm group/btn"
          >
            <Code2 className="w-4 h-4" />
            <span>View Code</span>
            <ExternalLink className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}
