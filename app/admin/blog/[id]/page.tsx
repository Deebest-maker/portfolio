"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, Calendar, Clock, Tag, Share2 } from "lucide-react";

export default function BlogPost() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost();
  }, [id]);

  async function fetchPost() {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("id", id)
      .eq("published", true)
      .single();

    if (error || !data) {
      router.push("/");
    } else {
      setPost(data);
    }
    setLoading(false);
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      });
    } else {
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

  if (!post) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-bg via-dark-card to-dark-bg">
      {/* Header with Back Button */}
      <div className="bg-dark-bg/50 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => router.push("/#blog")}
            className="flex items-center gap-2 text-gray-400 hover:text-toxic-green transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Back to Blog</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 bg-electric-blue/10 text-electric-blue rounded-lg hover:bg-electric-blue/20 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </div>
      </div>

      {/* Hero Image */}
      {post.image && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative w-full h-[400px] overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-dark-bg z-10"></div>
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </motion.div>
      )}

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Category Badge */}
          <div className="flex items-center gap-2 mb-6">
            <span className="px-4 py-2 bg-electric-blue/10 text-electric-blue rounded-full text-sm font-semibold">
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-gray-400 mb-12 pb-8 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">
                {new Date(post.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{post.read_time}</span>
            </div>
          </div>

          {/* Excerpt */}
          <div className="text-xl text-gray-300 mb-12 leading-relaxed p-6 bg-electric-blue/5 border-l-4 border-electric-blue rounded-r-lg">
            {post.excerpt}
          </div>

          {/* Content */}
          <div
            className="prose prose-invert prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Author Section */}
          <div className="mt-16 pt-8 border-t border-white/10">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-electric-blue to-toxic-green rounded-full flex items-center justify-center text-2xl">
                👨‍💻
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">
                  Toma Hamidu Haruna
                </h3>
                <p className="text-gray-400">
                  Blockchain & AI Developer | Full-Stack Engineer
                </p>
              </div>
            </div>
          </div>

          {/* Share Again */}
          <div className="mt-12 text-center">
            <button
              onClick={handleShare}
              className="px-8 py-4 bg-gradient-to-r from-electric-blue to-toxic-green text-white font-bold rounded-lg hover:scale-105 transition-all"
            >
              Share This Post
            </button>
          </div>
        </motion.article>
      </div>

      <style jsx global>{`
        .prose {
          color: #d1d5db;
        }
        .prose p {
          margin-bottom: 1.5em;
          line-height: 1.8;
        }
        .prose h2 {
          color: #0ea5e9;
          font-size: 2em;
          font-weight: bold;
          margin-top: 2em;
          margin-bottom: 0.75em;
        }
        .prose h3 {
          color: #22c55e;
          font-size: 1.5em;
          font-weight: bold;
          margin-top: 1.5em;
          margin-bottom: 0.75em;
        }
        .prose code {
          background: rgba(14, 165, 233, 0.1);
          padding: 0.25em 0.5em;
          border-radius: 0.25em;
          color: #0ea5e9;
          font-family: monospace;
          font-size: 0.9em;
        }
        .prose pre {
          background: #1a1f3a;
          padding: 1.5em;
          border-radius: 0.5em;
          overflow-x: auto;
          margin: 2em 0;
        }
        .prose pre code {
          background: transparent;
          padding: 0;
          color: #22c55e;
        }
        .prose ul,
        .prose ol {
          padding-left: 2em;
          margin-bottom: 1.5em;
        }
        .prose li {
          margin-bottom: 0.75em;
        }
        .prose a {
          color: #22c55e;
          text-decoration: underline;
          transition: color 0.2s;
        }
        .prose a:hover {
          color: #0ea5e9;
        }
        .prose strong {
          color: #fff;
          font-weight: 700;
        }
        .prose blockquote {
          border-left: 4px solid #0ea5e9;
          padding-left: 1.5em;
          margin: 2em 0;
          font-style: italic;
          color: #9ca3af;
        }
      `}</style>
    </div>
  );
}
