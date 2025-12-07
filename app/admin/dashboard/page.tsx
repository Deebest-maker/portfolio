"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { FileCode, BookOpen, Zap, LogOut, Plus, Settings } from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState({ projects: 0, blogs: 0, skills: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isAuth = localStorage.getItem("adminAuth");
    if (!isAuth) {
      router.push("/admin");
      return;
    }
    fetchStats();
  }, [router]);

  async function fetchStats() {
    try {
      const [projectsRes, blogsRes, skillsRes] = await Promise.all([
        supabase.from("projects").select("*", { count: "exact", head: true }),
        supabase.from("blog_posts").select("*", { count: "exact", head: true }),
        supabase.from("skills").select("*", { count: "exact", head: true }),
      ]);

      setStats({
        projects: projectsRes.count || 0,
        blogs: blogsRes.count || 0,
        skills: skillsRes.count || 0,
      });
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
    setLoading(false);
  }

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    router.push("/admin");
  };

  const sections = [
    {
      title: "Projects",
      count: stats.projects,
      icon: FileCode,
      color: "electric-blue",
      link: "/admin/projects",
    },
    {
      title: "Blog Posts",
      count: stats.blogs,
      icon: BookOpen,
      color: "purple-500",
      link: "/admin/blog",
    },
    {
      title: "Skills",
      count: stats.skills,
      icon: Zap,
      color: "toxic-green",
      link: "/admin/skills",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-toxic-green border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-bg via-dark-card to-dark-bg">
      <div className="bg-dark-bg/50 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-electric-blue to-toxic-green bg-clip-text text-transparent">
              TH Admin
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/admin/settings")}
              className="flex items-center gap-2 px-4 py-2 bg-electric-blue/10 text-electric-blue rounded-lg hover:bg-electric-blue/20 transition-colors"
            >
              <Settings className="w-4 h-4" />
              Settings
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-2">Dashboard</h2>
          <p className="text-gray-400">Manage your portfolio content</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {sections.map((section, index) => {
            const IconComponent = section.icon;
            return (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                onClick={() => router.push(section.link)}
                className="relative cursor-pointer group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/20 to-toxic-green/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>

                <div className="relative bg-dark-bg/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 group-hover:border-toxic-green/50 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-electric-blue/10 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-electric-blue" />
                    </div>
                    <span className="text-3xl font-bold text-electric-blue">
                      {section.count}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">
                    {section.title}
                  </h3>
                  <p className="text-gray-400 text-sm">Click to manage</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => router.push("/admin/projects/new")}
            className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-electric-blue/10 to-electric-blue/5 border border-electric-blue/30 rounded-xl hover:border-electric-blue hover:shadow-lg hover:shadow-electric-blue/20 transition-all"
          >
            <Plus className="w-5 h-5 text-electric-blue" />
            <span className="text-white font-semibold">Add Project</span>
          </motion.button>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => router.push("/admin/blog/new")}
            className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-purple-500/10 to-purple-500/5 border border-purple-500/30 rounded-xl hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/20 transition-all"
          >
            <Plus className="w-5 h-5 text-purple-400" />
            <span className="text-white font-semibold">Add Blog</span>
          </motion.button>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => router.push("/admin/settings")}
            className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-orange-500/10 to-orange-500/5 border border-orange-500/30 rounded-xl hover:border-orange-500 hover:shadow-lg hover:shadow-orange-500/20 transition-all"
          >
            <Settings className="w-5 h-5 text-orange-400" />
            <span className="text-white font-semibold">Profile</span>
          </motion.button>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => router.push("/")}
            className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-toxic-green/10 to-toxic-green/5 border border-toxic-green/30 rounded-xl hover:border-toxic-green hover:shadow-lg hover:shadow-toxic-green/20 transition-all"
          >
            <span className="text-white font-semibold">View Site →</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
