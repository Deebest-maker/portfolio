"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, Upload, Save, Camera, Trash2 } from "lucide-react";

export default function ProfileSettings() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [currentImage, setCurrentImage] = useState<string>("");
  const [newImageUrl, setNewImageUrl] = useState<string>("");
  const [imagePreview, setImagePreview] = useState<string>("");
  const [uploadedFilePath, setUploadedFilePath] = useState<string>("");

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    const { data, error } = await supabase
      .from("settings")
      .select("*")
      .single();

    if (error) {
      console.log("No settings found, will create new");
    } else {
      setCurrentImage(data.profile_image || "");
      setImagePreview(data.profile_image || "");
    }
    setLoading(false);
  }

  const handleImageUrlChange = (url: string) => {
    setNewImageUrl(url);
    setImagePreview(url);
    setUploadedFilePath(""); // Clear uploaded file path if URL is entered
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB");
      return;
    }

    setUploading(true);
    const fileExt = file.name.split(".").pop();
    const fileName = `profile-${Date.now()}.${fileExt}`;
    const filePath = `profiles/${fileName}`;

    try {
      // Upload file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("portfolio-images")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("portfolio-images").getPublicUrl(filePath);

      setUploadedFilePath(filePath);
      setNewImageUrl(""); // Clear URL input if file is uploaded
      setImagePreview(publicUrl);
      alert('Image uploaded! Click "Save Changes" to apply.');
    } catch (error: any) {
      alert("Error uploading image: " + error.message);
    }
    setUploading(false);
  };

  const handleDeleteImage = async () => {
    if (!currentImage) {
      alert("No image to delete");
      return;
    }

    if (
      !confirm("Are you sure you want to delete the current profile picture?")
    ) {
      return;
    }

    setSaving(true);

    // If current image is from storage, delete it
    if (currentImage.includes("portfolio-images")) {
      const pathMatch = currentImage.match(/portfolio-images\/(.+)$/);
      if (pathMatch) {
        await supabase.storage.from("portfolio-images").remove([pathMatch[1]]);
      }
    }

    // Update database to remove image
    const { data: existing } = await supabase
      .from("settings")
      .select("id")
      .single();

    if (existing) {
      await supabase
        .from("settings")
        .update({ profile_image: "", updated_at: new Date().toISOString() })
        .eq("id", existing.id);
    }

    setCurrentImage("");
    setImagePreview("");
    setNewImageUrl("");
    setUploadedFilePath("");
    alert("Profile picture deleted!");
    setSaving(false);
  };

  const handleSave = async () => {
    if (!newImageUrl && !uploadedFilePath) {
      alert("Please upload an image or enter a URL first");
      return;
    }

    setSaving(true);

    let imageToSave = "";

    if (uploadedFilePath) {
      // Use uploaded file URL
      const {
        data: { publicUrl },
      } = supabase.storage
        .from("portfolio-images")
        .getPublicUrl(uploadedFilePath);
      imageToSave = publicUrl;
    } else {
      // Use URL from input
      imageToSave = newImageUrl;
    }

    // Delete old image from storage if it exists
    if (currentImage && currentImage.includes("portfolio-images")) {
      const pathMatch = currentImage.match(/portfolio-images\/(.+)$/);
      if (pathMatch) {
        await supabase.storage.from("portfolio-images").remove([pathMatch[1]]);
      }
    }

    // Check if settings row exists
    const { data: existing } = await supabase
      .from("settings")
      .select("id")
      .single();

    let error;

    if (existing) {
      // Update existing row
      const result = await supabase
        .from("settings")
        .update({
          profile_image: imageToSave,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existing.id);
      error = result.error;
    } else {
      // Insert new row
      const result = await supabase
        .from("settings")
        .insert([{ profile_image: imageToSave }]);
      error = result.error;
    }

    if (error) {
      alert("Error saving settings: " + error.message);
    } else {
      alert("Profile picture updated successfully!");
      setCurrentImage(imageToSave);
      setNewImageUrl("");
      setUploadedFilePath("");
    }
    setSaving(false);
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
            onClick={() => router.push("/admin/dashboard")}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-400" />
          </button>
          <h1 className="text-2xl font-bold text-white">Profile Settings</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-dark-bg/50 backdrop-blur-xl border border-white/10 rounded-xl p-8">
          <h2 className="text-xl font-bold text-white mb-6">Profile Picture</h2>

          {/* Current/Preview Image */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-electric-blue to-toxic-green rounded-full blur-2xl opacity-30 animate-pulse"></div>
              <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-electric-blue/50 hover:border-toxic-green transition-all duration-300 shadow-2xl">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Profile"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      const parent = e.currentTarget.parentElement;
                      if (parent) {
                        parent.innerHTML =
                          '<div class="w-full h-full bg-gradient-to-br from-electric-blue/20 to-toxic-green/20 flex items-center justify-center text-6xl">👨‍💻</div>';
                      }
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-electric-blue/20 to-toxic-green/20 flex items-center justify-center text-6xl">
                    👨‍💻
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Upload Options */}
          <div className="space-y-6 mb-6">
            {/* File Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-3">
                <Upload className="w-4 h-4 inline mr-2" />
                Option 1: Upload from Computer
              </label>
              <div className="border-2 border-dashed border-electric-blue/30 rounded-xl p-8 text-center hover:border-electric-blue/50 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  disabled={uploading}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center gap-4"
                >
                  <div className="w-16 h-16 bg-electric-blue/10 rounded-full flex items-center justify-center">
                    {uploading ? (
                      <div className="w-8 h-8 border-4 border-electric-blue border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <Upload className="w-8 h-8 text-electric-blue" />
                    )}
                  </div>
                  <div>
                    <p className="text-white font-semibold mb-1">
                      {uploading
                        ? "Uploading..."
                        : "Click to upload or drag and drop"}
                    </p>
                    <p className="text-gray-400 text-sm">
                      PNG, JPG, GIF up to 5MB
                    </p>
                  </div>
                </label>
              </div>
            </div>

            <div className="text-center text-gray-400 font-semibold">OR</div>

            {/* URL Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-3">
                <Camera className="w-4 h-4 inline mr-2" />
                Option 2: Paste Image URL
              </label>
              <input
                type="url"
                placeholder="https://example.com/your-photo.jpg"
                value={newImageUrl}
                onChange={(e) => handleImageUrlChange(e.target.value)}
                className="w-full px-4 py-3 bg-dark-card/50 border border-electric-blue/30 rounded-lg text-white focus:outline-none focus:border-toxic-green"
              />
              <p className="text-gray-500 text-sm mt-2">
                Upload to{" "}
                <a
                  href="https://imgur.com"
                  target="_blank"
                  className="text-electric-blue hover:underline"
                >
                  Imgur
                </a>{" "}
                or{" "}
                <a
                  href="https://postimages.org"
                  target="_blank"
                  className="text-electric-blue hover:underline"
                >
                  PostImages
                </a>
                , then paste the direct image URL
              </p>
            </div>

            {currentImage && (
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Current Image URL
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={currentImage}
                    readOnly
                    className="flex-1 px-4 py-3 bg-dark-card/30 border border-electric-blue/20 rounded-lg text-gray-400 text-sm"
                  />
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(currentImage);
                      alert("URL copied to clipboard!");
                    }}
                    className="px-4 py-3 bg-electric-blue/10 text-electric-blue rounded-lg hover:bg-electric-blue/20 transition-colors text-sm font-semibold"
                  >
                    Copy
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            {currentImage && (
              <button
                onClick={handleDeleteImage}
                disabled={saving}
                className="flex items-center justify-center gap-2 px-6 py-4 bg-red-500/10 text-red-400 border border-red-500/30 font-bold rounded-lg hover:bg-red-500/20 transition-all disabled:opacity-50"
              >
                <Trash2 className="w-5 h-5" />
                Delete Current
              </button>
            )}
            <button
              onClick={handleSave}
              disabled={saving || (!newImageUrl && !uploadedFilePath)}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-toxic-green text-dark-bg font-bold rounded-lg hover:bg-toxic-green/80 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-5 h-5" />
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
