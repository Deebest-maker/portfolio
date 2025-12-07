"use client";
import { useState, useEffect } from "react";
import { Github, GitCommit, Star, GitFork } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { motion } from "framer-motion";

interface GitHubEvent {
  id: string;
  type: string;
  repo: { name: string };
  created_at: string;
  payload: any;
}

export default function GitHubActivity() {
  const [events, setEvents] = useState<GitHubEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ repos: 0, stars: 0, followers: 0 });

  useEffect(() => {
    fetchGitHubData();
  }, []);

  async function fetchGitHubData() {
    try {
      // Fetch recent activity
      const eventsRes = await fetch(
        "https://api.github.com/users/Deebest-maker/events/public"
      );

      if (!eventsRes.ok) {
        throw new Error("Failed to fetch events");
      }

      const eventsData = await eventsRes.json();
      setEvents(eventsData.slice(0, 5));

      // Fetch user stats
      const userRes = await fetch("https://api.github.com/users/Deebest-maker");

      if (!userRes.ok) {
        throw new Error("Failed to fetch user data");
      }

      const userData = await userRes.json();
      setStats({
        repos: userData.public_repos || 0,
        stars: userData.public_gists || 0,
        followers: userData.followers || 0,
      });
    } catch (error) {
      console.log("GitHub API error (using fallback data):", error);
      // Set fallback data if API fails
      setStats({
        repos: 8,
        stars: 5,
        followers: 10,
      });
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }

  const getEventIcon = (type: string) => {
    switch (type) {
      case "PushEvent":
        return <GitCommit className="w-4 h-4" />;
      case "WatchEvent":
        return <Star className="w-4 h-4" />;
      case "ForkEvent":
        return <GitFork className="w-4 h-4" />;
      default:
        return <Github className="w-4 h-4" />;
    }
  };

  const getEventDescription = (event: GitHubEvent) => {
    switch (event.type) {
      case "PushEvent":
        const commits = event.payload.commits?.length || 0;
        return `Pushed ${commits} commit${commits > 1 ? "s" : ""} to`;
      case "WatchEvent":
        return "Starred";
      case "ForkEvent":
        return "Forked";
      case "CreateEvent":
        return "Created";
      default:
        return "Updated";
    }
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <AnimatedSection className="py-20 px-6 bg-dark-bg">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-white mb-4">
            GitHub <span className="text-electric-blue">Activity</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Live feed from my coding journey
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Stats */}
          <div className="space-y-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-dark-card/50 backdrop-blur-xl border border-white/10 rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-electric-blue/10 rounded-lg flex items-center justify-center">
                  <Github className="w-6 h-6 text-electric-blue" />
                </div>
                <div>
                  <h3 className="text-white font-bold">GitHub Stats</h3>
                  <p className="text-gray-400 text-sm">@Deebest-maker</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-dark-bg/50 rounded-lg">
                  <span className="text-gray-400">Repositories</span>
                  <span className="text-white font-bold text-xl">
                    {loading ? "..." : stats.repos}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-dark-bg/50 rounded-lg">
                  <span className="text-gray-400">Followers</span>
                  <span className="text-white font-bold text-xl">
                    {loading ? "..." : stats.followers}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-dark-bg/50 rounded-lg">
                  <span className="text-gray-400">Gists</span>
                  <span className="text-white font-bold text-xl">
                    {loading ? "..." : stats.stars}
                  </span>
                </div>
              </div>

              <a
                href="https://github.com/Deebest-maker"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-3 bg-electric-blue/20 text-electric-blue font-semibold rounded-lg hover:bg-electric-blue hover:text-dark-bg transition-all"
              >
                <Github className="w-4 h-4" />
                View Profile
              </a>
            </motion.div>
          </div>

          {/* Right: Activity Feed */}
          <div className="lg:col-span-2 bg-dark-card/50 backdrop-blur-xl border border-white/10 rounded-xl p-6">
            <h3 className="text-white font-bold text-xl mb-4">
              Recent Activity
            </h3>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="w-8 h-8 border-2 border-toxic-green border-t-transparent rounded-full animate-spin" />
              </div>
            ) : events.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-400 mb-2">
                  No recent activity available
                </p>
                <p className="text-gray-500 text-sm">
                  Check back later for updates!
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {events.map((event, index) => (
                  <motion.a
                    key={event.id}
                    href={`https://github.com/${event.repo.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group flex items-start gap-3 p-4 bg-dark-bg/50 rounded-lg hover:bg-dark-bg hover:border-toxic-green/50 border border-transparent transition-all"
                  >
                    <div className="w-8 h-8 bg-electric-blue/10 rounded-lg flex items-center justify-center group-hover:bg-toxic-green/20 transition-colors flex-shrink-0">
                      <div className="text-electric-blue group-hover:text-toxic-green transition-colors">
                        {getEventIcon(event.type)}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-gray-300 text-sm">
                        <span className="text-white font-semibold">
                          {getEventDescription(event)}
                        </span>{" "}
                        <span className="text-electric-blue group-hover:text-toxic-green transition-colors truncate">
                          {event.repo.name}
                        </span>
                      </p>
                      <p className="text-gray-500 text-xs mt-1">
                        {getTimeAgo(event.created_at)}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
