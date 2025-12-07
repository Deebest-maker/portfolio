"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, Save } from "lucide-react";

export default function EditProject() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tech: "",
    status: "In Development",
    featured: false,
    github: "",
  });

  useEffect(() => {
    fetchProject();
  }, [id]);

  async function fetchProject() {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      alert("Error loading project");
      router.push("/admin/projects");
    } else {
      setFormData({
        title: data.title,
        description: data.description,
        tech: Array.isArray(data.tech) ? data.tech.join(", ") : "",
        status: data.status,
        featured: data.featured,
        github: data.github,
      });
      setLoading(false);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const techArray = formData.tech
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t);

    const { error } = await supabase
      .from("projects")
      .update({
        title: formData.title,
        description: formData.description,
        tech: techArray,
        status: formData.status,
        featured: formData.featured,
        github: formData.github,
      })
      .eq("id", id);

    if (error) {
      alert("Error updating project: " + error.message);
      setSaving(false);
    } else {
      alert("Project updated successfully!");
      router.push("/admin/projects");
    }
  };

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
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => router.push("/admin/projects")}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-400" />
          </button>
          <h1 className="text-2xl font-bold text-white">Edit Project</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-dark-bg/50 backdrop-blur-xl border border-white/10 rounded-xl p-6 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Project Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-4 py-3 bg-dark-card/50 border border-electric-blue/30 rounded-lg text-white focus:outline-none focus:border-toxic-green"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Description *
              </label>
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-4 py-3 bg-dark-card/50 border border-electric-blue/30 rounded-lg text-white focus:outline-none focus:border-toxic-green resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Tech Stack * (comma-separated)
              </label>
              <input
                type="text"
                required
                value={formData.tech}
                onChange={(e) =>
                  setFormData({ ...formData, tech: e.target.value })
                }
                className="w-full px-4 py-3 bg-dark-card/50 border border-electric-blue/30 rounded-lg text-white focus:outline-none focus:border-toxic-green"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Status *
              </label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="w-full px-4 py-3 bg-dark-card/50 border border-electric-blue/30 rounded-lg text-white focus:outline-none focus:border-toxic-green"
              >
                <option value="In Development">In Development</option>
                <option value="Deployed">Deployed</option>
                <option value="Production Ready">Production Ready</option>
                <option value="Live on Testnet">Live on Testnet</option>
                <option value="Completed">Completed</option>
                <option value="Beta">Beta</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                GitHub Repository URL *
              </label>
              <input
                type="url"
                required
                value={formData.github}
                onChange={(e) =>
                  setFormData({ ...formData, github: e.target.value })
                }
                className="w-full px-4 py-3 bg-dark-card/50 border border-electric-blue/30 rounded-lg text-white focus:outline-none focus:border-toxic-green"
              />
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) =>
                  setFormData({ ...formData, featured: e.target.checked })
                }
                className="w-5 h-5 rounded bg-dark-card border-electric-blue/30"
              />
              <label htmlFor="featured" className="text-gray-300 font-semibold">
                Mark as Featured Project
              </label>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => router.push("/admin/projects")}
              className="flex-1 px-6 py-3 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-toxic-green text-dark-bg font-semibold rounded-lg hover:bg-toxic-green/80 transition-colors disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {saving ? "Saving..." : "Update Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
