"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Calendar, Clock, ArrowLeft, Share2 } from "lucide-react";

export default function BlogPost() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check theme
    const checkTheme = () => {
      const isLight = document.documentElement.classList.contains("light");
      setIsDark(!isLight);
    };

    checkTheme();

    // Watch for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (id) {
      fetchPost();
    }
  }, [id]);

  async function fetchPost() {
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching post:", error);
        setPost(null);
      } else {
        console.log("Post loaded successfully:", data?.title);
        console.log("Content length:", data?.content?.length);
        setPost(data);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      setPost(null);
    } finally {
      setLoading(false);
    }
  }

  const sharePost = () => {
    if (post && navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      });
    } else if (post) {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-toxic-green border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Post Not Found</h1>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-3 bg-toxic-green text-dark-bg font-bold rounded-lg hover:bg-toxic-green/80 transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const contentStyles: React.CSSProperties = {
    color: isDark ? "#e5e7eb" : "#000000",
    fontSize: "1.125rem",
    lineHeight: "1.75",
  };

  return (
    <div className="min-h-screen bg-dark-bg light:bg-white">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        {post.image ? (
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-electric-blue/20 via-purple-500/20 to-toxic-green/20" />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/80 to-dark-bg/40" />

        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => (window.location.href = "/#blog")}
              className="flex items-center gap-2 text-white hover:text-toxic-green transition-colors mb-6 font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </button>

            <span className="inline-block px-4 py-1 bg-electric-blue/30 text-white backdrop-blur-sm rounded-full text-sm font-semibold mb-4 border border-electric-blue/50">
              {post.category}
            </span>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-2xl">
              {post.title}
            </h1>

            <div className="flex items-center gap-6 text-white font-medium">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(post.created_at).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.read_time}
              </div>
              <button
                onClick={sharePost}
                className="flex items-center gap-2 hover:text-toxic-green transition-colors"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <article
          style={contentStyles}
          dangerouslySetInnerHTML={{ __html: post.content || "" }}
        />
      </div>

      <style jsx global>{`
        /* Base styles for all elements */
        article p {
          margin-bottom: 1.5em;
          font-size: 1.125rem;
          line-height: 1.75;
        }

        article h1 {
          font-size: 2.5rem;
          font-weight: 800;
          margin-top: 2em;
          margin-bottom: 1em;
          line-height: 1.2;
        }

        article h2 {
          font-size: 2rem;
          font-weight: 800;
          margin-top: 2em;
          margin-bottom: 1em;
          line-height: 1.3;
        }

        article h3 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-top: 1.5em;
          margin-bottom: 0.75em;
          line-height: 1.4;
        }

        article strong {
          font-weight: 800;
        }

        article em {
          font-style: italic;
        }

        article ul,
        article ol {
          margin: 1.5em 0;
          padding-left: 2em;
        }

        article ul {
          list-style-type: disc;
        }

        article ol {
          list-style-type: decimal;
        }

        article li {
          margin-bottom: 0.75em;
          font-size: 1.125rem;
        }

        article a {
          text-decoration: underline;
          font-weight: 600;
        }

        article code {
          background: rgba(59, 130, 246, 0.1);
          padding: 0.2em 0.4em;
          border-radius: 0.25em;
          font-family: monospace;
          font-size: 0.9em;
        }

        article pre {
          background: #1e293b;
          padding: 1.5em;
          border-radius: 0.5em;
          overflow-x: auto;
          margin: 1.5em 0;
        }

        article hr {
          border: none;
          border-top: 2px solid;
          margin: 3em 0;
        }

        article blockquote {
          border-left: 4px solid;
          padding-left: 1.5em;
          margin: 1.5em 0;
          font-style: italic;
        }

        /* DARK MODE COLORS */
        article[style*="color: rgb(229, 231, 235)"] h1 {
          color: #3b82f6 !important;
        }

        article[style*="color: rgb(229, 231, 235)"] h2 {
          color: #3b82f6 !important;
        }

        article[style*="color: rgb(229, 231, 235)"] h3 {
          color: #10b981 !important;
        }

        article[style*="color: rgb(229, 231, 235)"] a {
          color: #10b981 !important;
        }

        article[style*="color: rgb(229, 231, 235)"] strong {
          color: #ffffff !important;
        }

        article[style*="color: rgb(229, 231, 235)"] code {
          color: #3b82f6 !important;
        }

        article[style*="color: rgb(229, 231, 235)"] hr {
          border-top-color: rgba(255, 255, 255, 0.1) !important;
        }

        /* LIGHT MODE COLORS */
        article[style*="color: rgb(0, 0, 0)"] p,
        article[style*="color: rgb(0, 0, 0)"] span,
        article[style*="color: rgb(0, 0, 0)"] div,
        article[style*="color: rgb(0, 0, 0)"] li {
          color: #000000 !important;
        }

        article[style*="color: rgb(0, 0, 0)"] h1 {
          color: #1e40af !important;
          font-size: 2.5rem !important;
          font-weight: 800 !important;
        }

        article[style*="color: rgb(0, 0, 0)"] h2 {
          color: #1e40af !important;
          font-size: 2rem !important;
          font-weight: 800 !important;
        }

        article[style*="color: rgb(0, 0, 0)"] h3 {
          color: #047857 !important;
          font-size: 1.5rem !important;
          font-weight: 700 !important;
        }

        article[style*="color: rgb(0, 0, 0)"] a {
          color: #047857 !important;
        }

        article[style*="color: rgb(0, 0, 0)"] strong {
          color: #000000 !important;
          font-weight: 800 !important;
        }

        article[style*="color: rgb(0, 0, 0)"] code {
          color: #1e40af !important;
          background: rgba(30, 64, 175, 0.1) !important;
        }

        article[style*="color: rgb(0, 0, 0)"] pre {
          background: #f1f5f9 !important;
          border: 1px solid #cbd5e1 !important;
        }

        article[style*="color: rgb(0, 0, 0)"] hr {
          border-top-color: rgba(0, 0, 0, 0.15) !important;
        }
      `}</style>
    </div>
  );
}
