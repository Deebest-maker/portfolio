"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function EditSkillCategory() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [skill, setSkill] = useState({
    category: "",
    items: "",
    order: 1,
  });

  useEffect(() => {
    // Only fetch if we have an ID
    if (params.id && params.id !== "undefined") {
      fetchSkill();
    } else {
      console.error("No valid ID found in URL");
      alert("Error: No skill ID provided");
      router.push("/admin/skills");
    }
  }, [params.id]);

  const fetchSkill = async () => {
    try {
      console.log("Fetching skill with ID:", params.id);

      const { data, error } = await supabase
        .from("skills")
        .select("*")
        .eq("id", params.id)
        .single();

      if (error) {
        console.error("Supabase error:", error);
        alert("Error loading skill: " + error.message);
        router.push("/admin/skills");
        return;
      }

      if (data) {
        console.log("Skill data loaded:", data);

        // Handle different data formats from Supabase
        let itemsString = "";
        if (Array.isArray(data.items)) {
          itemsString = data.items.join(", ");
        } else if (typeof data.items === "string") {
          itemsString = data.items;
        }

        setSkill({
          category: data.category || "",
          items: itemsString,
          order: data.order || 1,
        });
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("Error: " + (err instanceof Error ? err.message : String(err)));
      router.push("/admin/skills");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const itemsArray = skill.items
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

      console.log("Updating skill:", {
        category: skill.category,
        items: itemsArray,
        order: skill.order,
      });

      const { data, error } = await supabase
        .from("skills")
        .update({
          category: skill.category,
          items: itemsArray,
          order: skill.order,
        })
        .eq("id", params.id)
        .select();

      if (error) {
        console.error("Supabase error:", error);
        alert("Error updating skill category: " + error.message);
        setSaving(false);
        return;
      }

      console.log("Update successful:", data);
      alert("Skill category updated successfully!");
      router.push("/admin/skills");
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("Error: " + (err instanceof Error ? err.message : String(err)));
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="text-white text-xl">Loading skill category...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-white">Edit Skill Category</h1>
          <button
            onClick={() => router.push("/admin/skills")}
            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
          >
            ← Back
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-dark-card border border-electric-blue/20 rounded-lg p-8 space-y-6"
        >
          <div>
            <label className="block text-white font-semibold mb-2">
              Category Name *
            </label>
            <input
              type="text"
              value={skill.category}
              onChange={(e) => setSkill({ ...skill, category: e.target.value })}
              className="w-full px-4 py-3 bg-dark-bg border border-electric-blue/30 rounded text-white focus:outline-none focus:border-toxic-green"
              required
            />
          </div>

          <div>
            <label className="block text-white font-semibold mb-2">
              Skills *{" "}
              <span className="text-gray-400 text-sm">(comma separated)</span>
            </label>
            <textarea
              value={skill.items}
              onChange={(e) => setSkill({ ...skill, items: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 bg-dark-bg border border-electric-blue/30 rounded text-white focus:outline-none focus:border-toxic-green"
              required
            />
          </div>

          <div>
            <label className="block text-white font-semibold mb-2">
              Display Order *
            </label>
            <input
              type="number"
              value={skill.order}
              onChange={(e) =>
                setSkill({ ...skill, order: parseInt(e.target.value) })
              }
              min="1"
              className="w-full px-4 py-3 bg-dark-bg border border-electric-blue/30 rounded text-white focus:outline-none focus:border-toxic-green"
              required
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full py-4 bg-toxic-green hover:bg-toxic-green/80 text-dark-bg font-bold rounded-lg transition-all disabled:opacity-50"
          >
            {saving ? "Updating..." : "Update Skill Category"}
          </button>
        </form>
      </div>
    </div>
  );
}
