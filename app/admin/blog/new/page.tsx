"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, Save, Upload, Link as LinkIcon } from "lucide-react";

export default function AddBlogPost() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "Blockchain",
    read_time: "5 min read",
    image: "",
    published: true,
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB");
      return;
    }

    setUploading(true);
    const fileExt = file.name.split(".").pop();
    const fileName = `blog-${Date.now()}.${fileExt}`;
    const filePath = `blog/${fileName}`;

    try {
      const { error: uploadError } = await supabase.storage
        .from("portfolio-images")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("portfolio-images").getPublicUrl(filePath);

      setFormData({ ...formData, image: publicUrl });
      setImagePreview(publicUrl);
    } catch (error: any) {
      alert("Error uploading image: " + error.message);
    }
    setUploading(false);
  };

  const handleImageUrl = (url: string) => {
    setFormData({ ...formData, image: url });
    setImagePreview(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const { error } = await supabase.from("blog_posts").insert([formData]);

    if (error) {
      alert("Error adding post: " + error.message);
      setSaving(false);
    } else {
      alert("Blog post added successfully!");
      router.push("/admin/blog");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-bg via-dark-card to-dark-bg">
      <div className="bg-dark-bg/50 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => router.push("/admin/blog")}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-400" />
          </button>
          <h1 className="text-2xl font-bold text-white">Add New Blog Post</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-dark-bg/50 backdrop-blur-xl border border-white/10 rounded-xl p-6 space-y-6">
            {/* Image Preview */}
            {imagePreview && (
              <div className="relative w-full h-64 rounded-lg overflow-hidden border border-electric-blue/30">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Image Upload Section */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-3">
                Post Image
              </label>

              {/* File Upload */}
              <div className="border-2 border-dashed border-electric-blue/30 rounded-lg p-6 mb-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className="hidden"
                  id="blog-image-upload"
                />
                <label
                  htmlFor="blog-image-upload"
                  className="cursor-pointer flex items-center gap-3"
                >
                  <div className="w-12 h-12 bg-electric-blue/10 rounded-lg flex items-center justify-center">
                    {uploading ? (
                      <div className="w-6 h-6 border-4 border-electric-blue border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <Upload className="w-6 h-6 text-electric-blue" />
                    )}
                  </div>
                  <div>
                    <p className="text-white font-semibold">
                      {uploading ? "Uploading..." : "Upload Image"}
                    </p>
                    <p className="text-gray-400 text-sm">
                      Click to select or drag and drop (max 5MB)
                    </p>
                  </div>
                </label>
              </div>

              <div className="text-center text-gray-400 text-sm mb-3">OR</div>

              {/* URL Input */}
              <div className="flex items-center gap-2">
                <LinkIcon className="w-5 h-5 text-gray-400" />
                <input
                  type="url"
                  placeholder="Paste image URL"
                  value={formData.image}
                  onChange={(e) => handleImageUrl(e.target.value)}
                  className="flex-1 px-4 py-3 bg-dark-card/50 border border-electric-blue/30 rounded-lg text-white focus:outline-none focus:border-toxic-green"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Post Title *
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
                Excerpt *
              </label>
              <textarea
                required
                rows={3}
                value={formData.excerpt}
                onChange={(e) =>
                  setFormData({ ...formData, excerpt: e.target.value })
                }
                className="w-full px-4 py-3 bg-dark-card/50 border border-electric-blue/30 rounded-lg text-white focus:outline-none focus:border-toxic-green resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Content *
              </label>
              <textarea
                required
                rows={10}
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                className="w-full px-4 py-3 bg-dark-card/50 border border-electric-blue/30 rounded-lg text-white focus:outline-none focus:border-toxic-green resize-none"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-dark-card/50 border border-electric-blue/30 rounded-lg text-white focus:outline-none focus:border-toxic-green"
                >
                  <option value="Blockchain">Blockchain</option>
                  <option value="AI & ML">AI & ML</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Personal">Personal</option>
                  <option value="Tutorial">Tutorial</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Read Time *
                </label>
                <input
                  type="text"
                  required
                  value={formData.read_time}
                  onChange={(e) =>
                    setFormData({ ...formData, read_time: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-dark-card/50 border border-electric-blue/30 rounded-lg text-white focus:outline-none focus:border-toxic-green"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="published"
                checked={formData.published}
                onChange={(e) =>
                  setFormData({ ...formData, published: e.target.checked })
                }
                className="w-5 h-5 rounded bg-dark-card border-electric-blue/30"
              />
              <label
                htmlFor="published"
                className="text-gray-300 font-semibold"
              >
                Published
              </label>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => router.push("/admin/blog")}
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
              {saving ? "Saving..." : "Publish Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
