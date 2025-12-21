"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Calendar, Clock, ArrowLeft, Share2 } from "lucide-react";
import AnimatedSection from "@/app/components/AnimatedSection";

export default function BlogPost() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);

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
      console.error("Error:", error);
      setLoading(false);
    } else {
      setPost(data);
      if (data) {
        fetchRelatedPosts(data.category);
      }
      setLoading(false);
    }
  }

  async function fetchRelatedPosts(category: string) {
    const { data } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("category", category)
      .eq("published", true)
      .neq("id", id)
      .limit(3);

    if (data) setRelatedPosts(data);
  }

  const sharePost = () => {
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

  const handleBackToBlog = () => {
    // Navigate to homepage with blog hash
    window.location.href = "/#blog";
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

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Hero Image Section */}
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

        {/* Strong dark gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/80 to-dark-bg/40" />

        {/* Content over image */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-4xl mx-auto">
            <button
              onClick={handleBackToBlog}
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
      <AnimatedSection className="max-w-4xl mx-auto px-6 py-16">
        <article className="prose prose-invert prose-lg max-w-none">
          <div
            className="text-gray-300 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16 pt-16 border-t border-white/10">
            <h2 className="text-3xl font-bold text-white mb-8">
              Related Posts
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((related) => (
                <button
                  key={related.id}
                  onClick={() => router.push(`/blog/${related.id}`)}
                  className="group bg-dark-card/50 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden hover:border-toxic-green/50 transition-all text-left"
                >
                  {related.image ? (
                    <img
                      src={related.image}
                      alt={related.title}
                      className="w-full h-40 object-cover"
                    />
                  ) : (
                    <div className="w-full h-40 bg-gradient-to-br from-electric-blue/20 to-toxic-green/20" />
                  )}
                  <div className="p-4">
                    <span className="text-xs text-electric-blue font-semibold">
                      {related.category}
                    </span>
                    <h3 className="text-lg font-bold text-white mt-2 group-hover:text-toxic-green transition-colors">
                      {related.title}
                    </h3>
                    <p className="text-sm text-gray-400 mt-2 line-clamp-2">
                      {related.excerpt}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </AnimatedSection>

      <style jsx global>{`
        .prose p {
          margin-bottom: 1.5em;
        }
        .prose h2 {
          color: #0ea5e9;
          font-size: 2em;
          font-weight: bold;
          margin-top: 2em;
          margin-bottom: 1em;
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
        }
        .prose pre {
          background: #1a1f3a;
          padding: 1em;
          border-radius: 0.5em;
          overflow-x: auto;
        }
        .prose a {
          color: #22c55e;
          text-decoration: none;
          transition: color 0.3s;
        }
        .prose a:hover {
          color: #0ea5e9;
        }
      `}</style>
    </div>
  );
}
