"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { Plus, Edit, Trash2, ArrowLeft, Star } from "lucide-react";

export default function ManageProjects() {
  const router = useRouter();
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isAuth = localStorage.getItem("adminAuth");
    if (!isAuth) {
      router.push("/admin");
      return;
    }
    fetchProjects();
  }, [router]);

  async function fetchProjects() {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error("Error:", error);
    } else {
      const processedData = (data || []).map((project) => ({
        ...project,
        tech: Array.isArray(project.tech) ? project.tech : [],
      }));
      setProjects(processedData);
    }
    setLoading(false);
  }

  async function deleteProject(id: number, title: string) {
    if (!confirm(`Delete "${title}"? This cannot be undone!`)) return;

    const { error } = await supabase.from("projects").delete().eq("id", id);

    if (error) {
      alert("Error deleting project: " + error.message);
    } else {
      alert("Project deleted successfully!");
      fetchProjects();
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-toxic-green border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-bg via-dark-card to-dark-bg">
      <div className="bg-dark-bg/50 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push("/admin/dashboard")}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-400" />
            </button>
            <h1 className="text-2xl font-bold text-white">Manage Projects</h1>
          </div>
          <button
            onClick={() => router.push("/admin/projects/new")}
            className="flex items-center gap-2 px-4 py-2 bg-toxic-green text-dark-bg font-semibold rounded-lg hover:bg-toxic-green/80 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Project
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {projects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg mb-4">No projects yet</p>
            <button
              onClick={() => router.push("/admin/projects/new")}
              className="px-6 py-3 bg-toxic-green text-dark-bg font-semibold rounded-lg hover:bg-toxic-green/80"
            >
              Add Your First Project
            </button>
          </div>
        ) : (
          <div className="grid gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative bg-dark-bg/50 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:border-toxic-green/50 transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-white">
                        {project.title}
                      </h3>
                      {project.featured && (
                        <span className="flex items-center gap-1 px-2 py-1 bg-toxic-green/10 text-toxic-green text-xs font-semibold rounded-full border border-toxic-green/30">
                          <Star className="w-3 h-3" />
                          Featured
                        </span>
                      )}
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          project.status === "Deployed"
                            ? "bg-toxic-green/10 text-toxic-green border border-toxic-green/30"
                            : "bg-electric-blue/10 text-electric-blue border border-electric-blue/30"
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>
                    <p className="text-gray-400 mb-3 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech: string, i: number) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-electric-blue/5 text-electric-blue text-xs rounded-full border border-electric-blue/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        router.push(`/admin/projects/edit/${project.id}`)
                      }
                      className="p-2 bg-electric-blue/10 text-electric-blue rounded-lg hover:bg-electric-blue/20 transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteProject(project.id, project.title)}
                      className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
