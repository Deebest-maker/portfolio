"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import {
  ArrowLeft,
  Save,
  Bold,
  Italic,
  List,
  ListOrdered,
  Code,
  Link as LinkIcon,
  Upload,
  Trash2,
} from "lucide-react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import LinkExtension from "@tiptap/extension-link";

export default function EditBlogPost() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    category: "Blockchain",
    read_time: "5 min read",
    image: "",
    published: true,
  });

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      LinkExtension.configure({
        openOnClick: false,
      }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class:
          "prose prose-invert max-w-none focus:outline-none min-h-[300px] px-4 py-3",
      },
    },
  });

  useEffect(() => {
    fetchPost();
  }, [id]);

  async function fetchPost() {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      alert("Error loading post");
      router.push("/admin/blog");
    } else {
      setFormData({
        title: data.title,
        excerpt: data.excerpt,
        category: data.category,
        read_time: data.read_time,
        image: data.image || "",
        published: data.published,
      });
      setImagePreview(data.image || "");
      editor?.commands.setContent(data.content);
      setLoading(false);
    }
  }

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

  const handleDeleteImage = () => {
    setFormData({ ...formData, image: "" });
    setImagePreview("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const content = editor?.getHTML() || "";

    const { error } = await supabase
      .from("blog_posts")
      .update({
        ...formData,
        content,
      })
      .eq("id", id);

    if (error) {
      alert("Error updating post: " + error.message);
      setSaving(false);
    } else {
      alert("Post updated successfully!");
      router.push("/admin/blog");
    }
  };

  const addLink = () => {
    const url = window.prompt("Enter URL:");
    if (url) {
      editor?.chain().focus().setLink({ href: url }).run();
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
            onClick={() => router.push("/admin/blog")}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-400" />
          </button>
          <h1 className="text-2xl font-bold text-white">Edit Blog Post</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-dark-bg/50 backdrop-blur-xl border border-white/10 rounded-xl p-6 space-y-6">
            {/* Image Preview */}
            {imagePreview && (
              <div className="relative w-full h-64 rounded-lg overflow-hidden border border-electric-blue/30 group">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={handleDeleteImage}
                  className="absolute top-4 right-4 p-2 bg-red-500/80 text-white rounded-lg hover:bg-red-500 transition-all opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Image Upload Section */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-3">
                Post Cover Image
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
                      {uploading ? "Uploading..." : "Upload New Image"}
                    </p>
                    <p className="text-gray-400 text-sm">
                      Click to select (max 5MB)
                    </p>
                  </div>
                </label>
              </div>

              <div className="text-center text-gray-400 text-sm mb-3">OR</div>

              {/* URL Input */}
              <input
                type="url"
                placeholder="Paste image URL (e.g., from Unsplash)"
                value={formData.image}
                onChange={(e) => handleImageUrl(e.target.value)}
                className="w-full px-4 py-3 bg-dark-card/50 border border-electric-blue/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-toxic-green"
              />
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

              <div className="flex flex-wrap gap-2 p-3 bg-dark-card/50 border border-electric-blue/30 rounded-t-lg">
                <button
                  type="button"
                  onClick={() => editor?.chain().focus().toggleBold().run()}
                  className={`p-2 rounded hover:bg-white/10 transition-colors ${
                    editor?.isActive("bold")
                      ? "bg-electric-blue/20 text-electric-blue"
                      : "text-gray-400"
                  }`}
                >
                  <Bold className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => editor?.chain().focus().toggleItalic().run()}
                  className={`p-2 rounded hover:bg-white/10 transition-colors ${
                    editor?.isActive("italic")
                      ? "bg-electric-blue/20 text-electric-blue"
                      : "text-gray-400"
                  }`}
                >
                  <Italic className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    editor?.chain().focus().toggleBulletList().run()
                  }
                  className={`p-2 rounded hover:bg-white/10 transition-colors ${
                    editor?.isActive("bulletList")
                      ? "bg-electric-blue/20 text-electric-blue"
                      : "text-gray-400"
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    editor?.chain().focus().toggleOrderedList().run()
                  }
                  className={`p-2 rounded hover:bg-white/10 transition-colors ${
                    editor?.isActive("orderedList")
                      ? "bg-electric-blue/20 text-electric-blue"
                      : "text-gray-400"
                  }`}
                >
                  <ListOrdered className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    editor?.chain().focus().toggleCodeBlock().run()
                  }
                  className={`p-2 rounded hover:bg-white/10 transition-colors ${
                    editor?.isActive("codeBlock")
                      ? "bg-electric-blue/20 text-electric-blue"
                      : "text-gray-400"
                  }`}
                >
                  <Code className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={addLink}
                  className={`p-2 rounded hover:bg-white/10 transition-colors ${
                    editor?.isActive("link")
                      ? "bg-electric-blue/20 text-electric-blue"
                      : "text-gray-400"
                  }`}
                >
                  <LinkIcon className="w-4 h-4" />
                </button>

                <div className="flex-1" />

                <button
                  type="button"
                  onClick={() =>
                    editor?.chain().focus().toggleHeading({ level: 2 }).run()
                  }
                  className={`px-3 py-2 rounded text-sm font-semibold hover:bg-white/10 transition-colors ${
                    editor?.isActive("heading", { level: 2 })
                      ? "bg-electric-blue/20 text-electric-blue"
                      : "text-gray-400"
                  }`}
                >
                  H2
                </button>

                <button
                  type="button"
                  onClick={() =>
                    editor?.chain().focus().toggleHeading({ level: 3 }).run()
                  }
                  className={`px-3 py-2 rounded text-sm font-semibold hover:bg-white/10 transition-colors ${
                    editor?.isActive("heading", { level: 3 })
                      ? "bg-electric-blue/20 text-electric-blue"
                      : "text-gray-400"
                  }`}
                >
                  H3
                </button>
              </div>

              <div className="bg-dark-card/50 border border-electric-blue/30 border-t-0 rounded-b-lg overflow-hidden">
                <EditorContent editor={editor} />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
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
                  <option value="Tutorial">Tutorial</option>
                  <option value="Personal">Personal</option>
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

              <div className="flex items-end">
                <label className="flex items-center gap-3 w-full px-4 py-3 bg-dark-card/50 border border-electric-blue/30 rounded-lg cursor-pointer hover:border-toxic-green transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) =>
                      setFormData({ ...formData, published: e.target.checked })
                    }
                    className="w-5 h-5 rounded bg-dark-card border-electric-blue/30"
                  />
                  <span className="text-gray-300 font-semibold">Published</span>
                </label>
              </div>
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
              {saving ? "Updating..." : "Update Post"}
            </button>
          </div>
        </form>
      </div>

      <style jsx global>{`
        .ProseMirror {
          color: #d1d5db;
          min-height: 300px;
        }
        .ProseMirror p {
          margin-bottom: 1em;
        }
        .ProseMirror h2 {
          color: #0ea5e9;
          font-size: 2em;
          font-weight: bold;
          margin-top: 1.5em;
          margin-bottom: 0.5em;
        }
        .ProseMirror h3 {
          color: #22c55e;
          font-size: 1.5em;
          font-weight: bold;
          margin-top: 1.25em;
          margin-bottom: 0.5em;
        }
        .ProseMirror code {
          background: rgba(14, 165, 233, 0.1);
          padding: 0.25em 0.5em;
          border-radius: 0.25em;
          color: #0ea5e9;
          font-family: monospace;
        }
        .ProseMirror pre {
          background: #1a1f3a;
          padding: 1em;
          border-radius: 0.5em;
          overflow-x: auto;
          margin: 1em 0;
        }
        .ProseMirror pre code {
          background: transparent;
          padding: 0;
          color: #22c55e;
        }
        .ProseMirror ul,
        .ProseMirror ol {
          padding-left: 1.5em;
          margin-bottom: 1em;
        }
        .ProseMirror li {
          margin-bottom: 0.5em;
        }
        .ProseMirror a {
          color: #22c55e;
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
