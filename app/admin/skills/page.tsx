"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Plus, Edit, Trash2, ArrowLeft } from "lucide-react";

export default function ManageSkills() {
  const router = useRouter();
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSkills();
  }, []);

  async function fetchSkills() {
    const { data, error } = await supabase
      .from("skills")
      .select("*")
      .order("order", { ascending: true });

    if (error) {
      console.error("Error fetching skills:", error);
    } else {
      setSkills(data || []);
    }
    setLoading(false);
  }

  async function deleteSkill(id: string) {
    if (!confirm("Are you sure you want to delete this skill category?"))
      return;

    const { error } = await supabase.from("skills").delete().eq("id", id);

    if (error) {
      alert("Error deleting skill: " + error.message);
    } else {
      alert("Skill deleted successfully!");
      fetchSkills();
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
            <h1 className="text-2xl font-bold text-white">Manage Skills</h1>
          </div>
          <button
            onClick={() => router.push("/admin/skills/new")}
            className="flex items-center gap-2 px-4 py-2 bg-toxic-green text-dark-bg font-semibold rounded-lg hover:bg-toxic-green/80 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Skill Category
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {skills.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg mb-4">
              No skill categories yet
            </p>
            <button
              onClick={() => router.push("/admin/skills/new")}
              className="px-6 py-3 bg-toxic-green text-dark-bg font-semibold rounded-lg hover:bg-toxic-green/80 transition-colors"
            >
              Add Your First Category
            </button>
          </div>
        ) : (
          <div className="grid gap-6">
            {skills.map((skill) => {
              const skillItems = Array.isArray(skill.items)
                ? skill.items
                : typeof skill.items === "string"
                ? skill.items.split(",").map((s: string) => s.trim())
                : [];

              return (
                <div
                  key={skill.id}
                  className="bg-dark-bg/50 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:border-toxic-green/50 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        {skill.category}
                      </h3>
                      <p className="text-sm text-gray-400">
                        Order: {skill.order}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          router.push(`/admin/skills/edit/${skill.id}`)
                        }
                        className="p-2 bg-electric-blue/20 text-electric-blue rounded-lg hover:bg-electric-blue/30 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteSkill(skill.id)}
                        className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {skillItems.map((item: string, idx: number) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-electric-blue/10 text-electric-blue rounded-full text-sm"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
