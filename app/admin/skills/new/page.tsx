"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AddSkillCategory() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [skill, setSkill] = useState({
    category: "",
    items: "",
    order: 1,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const itemsArray = skill.items
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

      const { data, error } = await supabase
        .from("skills")
        .insert([
          {
            category: skill.category,
            items: itemsArray,
            order: skill.order,
          },
        ])
        .select();

      if (error) {
        console.error("Supabase error:", error);
        alert("Error creating skill category: " + error.message);
        setSaving(false);
        return;
      }

      console.log("Skill category created:", data);
      alert("Skill category created successfully!");
      router.push("/admin/skills");
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("Error: " + (err instanceof Error ? err.message : String(err)));
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-white">Add Skill Category</h1>
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
              placeholder="e.g., Blockchain & Web3"
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
              placeholder="Solidity, Foundry, Vyper, Rust, Noir"
              className="w-full px-4 py-3 bg-dark-bg border border-electric-blue/30 rounded text-white focus:outline-none focus:border-toxic-green"
              required
            />
            <p className="text-gray-400 text-sm mt-2">
              Separate each skill with a comma
            </p>
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
            <p className="text-gray-400 text-sm mt-2">
              Lower numbers appear first (1, 2, 3...)
            </p>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full py-4 bg-toxic-green hover:bg-toxic-green/80 text-dark-bg font-bold rounded-lg transition-all disabled:opacity-50"
          >
            {saving ? "Creating..." : "Create Skill Category"}
          </button>
        </form>
      </div>
    </div>
  );
}
