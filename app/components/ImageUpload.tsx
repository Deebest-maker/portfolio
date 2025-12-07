"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Upload, Link as LinkIcon, X, Image as ImageIcon } from "lucide-react";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
}

export default function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [mode, setMode] = useState<"url" | "upload">("url");
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(value);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB");
      return;
    }

    setUploading(true);

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()
        .toString(36)
        .substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from("blog-images")
        .upload(filePath, file);

      if (error) {
        throw error;
      }

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("blog-images").getPublicUrl(filePath);

      onChange(publicUrl);
      setPreview(publicUrl);
    } catch (error: any) {
      alert("Error uploading image: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleUrlChange = (url: string) => {
    onChange(url);
    setPreview(url);
  };

  const clearImage = () => {
    onChange("");
    setPreview("");
  };

  return (
    <div className="space-y-4">
      {/* Mode Toggle */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setMode("url")}
          className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-all ${
            mode === "url"
              ? "bg-electric-blue text-dark-bg"
              : "bg-dark-card/50 text-gray-400 hover:text-white"
          }`}
        >
          <LinkIcon className="w-4 h-4 inline mr-2" />
          URL
        </button>
        <button
          type="button"
          onClick={() => setMode("upload")}
          className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-all ${
            mode === "upload"
              ? "bg-electric-blue text-dark-bg"
              : "bg-dark-card/50 text-gray-400 hover:text-white"
          }`}
        >
          <Upload className="w-4 h-4 inline mr-2" />
          Upload
        </button>
      </div>

      {/* URL Input Mode */}
      {mode === "url" && (
        <div>
          <input
            type="url"
            placeholder="https://images.unsplash.com/photo-..."
            value={value}
            onChange={(e) => handleUrlChange(e.target.value)}
            className="w-full px-4 py-3 bg-dark-card/50 border border-electric-blue/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-toxic-green"
          />
          <p className="text-xs text-gray-400 mt-2">
            💡 Get free images from{" "}
            <a
              href="https://unsplash.com"
              target="_blank"
              className="text-electric-blue hover:underline"
            >
              Unsplash
            </a>{" "}
            or{" "}
            <a
              href="https://pexels.com"
              target="_blank"
              className="text-electric-blue hover:underline"
            >
              Pexels
            </a>
          </p>
        </div>
      )}

      {/* Upload Mode */}
      {mode === "upload" && (
        <div>
          <label
            className={`block w-full px-4 py-8 border-2 border-dashed rounded-lg cursor-pointer transition-all ${
              uploading
                ? "border-gray-600 bg-dark-card/30"
                : "border-electric-blue/30 hover:border-toxic-green/50 bg-dark-card/50 hover:bg-dark-card/70"
            }`}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              disabled={uploading}
              className="hidden"
            />
            <div className="text-center">
              {uploading ? (
                <>
                  <div className="w-8 h-8 border-2 border-toxic-green border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                  <p className="text-gray-400">Uploading...</p>
                </>
              ) : (
                <>
                  <Upload className="w-8 h-8 text-electric-blue mx-auto mb-2" />
                  <p className="text-white font-semibold mb-1">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-gray-400 text-sm">
                    PNG, JPG, GIF up to 5MB
                  </p>
                </>
              )}
            </div>
          </label>
        </div>
      )}

      {/* Image Preview */}
      {preview && (
        <div className="relative group">
          <div className="relative w-full h-48 rounded-lg overflow-hidden border border-electric-blue/30">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={clearImage}
              className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2 truncate">{preview}</p>
        </div>
      )}
    </div>
  );
}
