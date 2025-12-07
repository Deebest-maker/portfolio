"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { motion } from "framer-motion";

export default function Blog() {
  const router = useRouter();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false })
      .limit(6);

    if (error) {
      console.error("Error fetching posts:", error);
    } else {
      setPosts(data || []);
    }
    setLoading(false);
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="blog"
      className="min-h-screen bg-dark-bg py-20 px-6 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-dark-card/20 to-transparent" />

      <AnimatedSection className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-4">
            Latest <span className="text-toxic-green">Insights</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Thoughts on blockchain, AI, and building the future
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-16">
          <div className="bg-gradient-to-r from-electric-blue/10 to-toxic-green/10 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-2">
              Subscribe to My Newsletter 📬
            </h3>
            <p className="text-gray-400 mb-6">
              Get notified when I publish new posts about tech, innovation, and
              my journey
            </p>

            <form onSubmit={handleSubscribe} className="flex gap-3">
              <input
                type="email"
                required
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-6 py-4 bg-dark-bg/50 border border-electric-blue/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-toxic-green transition-colors"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-toxic-green text-dark-bg font-bold rounded-xl hover:bg-toxic-green/80 transition-all hover:scale-105"
              >
                {subscribed ? "✓ Subscribed!" : "Subscribe"}
              </button>
            </form>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-16 h-16 border-4 border-toxic-green border-t-transparent rounded-full animate-spin" />
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">
              No blog posts yet. Check back soon!
            </p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {posts.map((post) => (
              <motion.div
                key={post.id}
                variants={itemVariants}
                className="group bg-dark-card/30 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-toxic-green/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-toxic-green/20 cursor-pointer"
                onClick={() => router.push(`/blog/${post.id}`)}
              >
                <div className="relative h-48 overflow-hidden">
                  {post.image ? (
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-electric-blue/20 via-purple-500/20 to-toxic-green/20 group-hover:scale-110 transition-transform duration-500" />
                  )}

                  <span className="absolute top-4 left-4 px-3 py-1 bg-electric-blue/90 backdrop-blur-sm text-white text-xs font-bold rounded-full">
                    {post.category}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-toxic-green transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-gray-400 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.created_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.read_time}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-toxic-green font-semibold group-hover:gap-3 transition-all">
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {posts.length >= 6 && (
          <div className="text-center mt-12">
            <button
              onClick={() => router.push("/blog")}
              className="px-8 py-4 bg-dark-card border-2 border-electric-blue text-electric-blue font-bold rounded-xl hover:bg-electric-blue hover:text-dark-bg transition-all hover:scale-105"
            >
              View All Posts
            </button>
          </div>
        )}
      </AnimatedSection>
    </section>
  );
}
