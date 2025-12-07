"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (email === "admin@portfolio.com" && password === "admin123") {
      localStorage.setItem("adminAuth", "true");
      router.push("/admin/dashboard");
    } else {
      setError("Invalid credentials");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-bg via-dark-card to-dark-bg flex items-center justify-center p-6">
      <motion.div
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, rgba(14, 165, 233, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(34, 197, 94, 0.15) 0%, transparent 50%)",
          backgroundSize: "200% 200%",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <motion.div
            animate={{
              boxShadow: [
                "0 0 20px rgba(14, 165, 233, 0.5)",
                "0 0 40px rgba(34, 197, 94, 0.8)",
                "0 0 20px rgba(14, 165, 233, 0.5)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="inline-block mb-4"
          >
            <h1 className="text-6xl font-bold bg-gradient-to-r from-electric-blue via-purple-400 to-toxic-green bg-clip-text text-transparent">
              TH
            </h1>
          </motion.div>
          <h2 className="text-2xl font-bold text-white mb-2">Admin Portal</h2>
          <p className="text-gray-400">Sign in to manage your portfolio</p>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/20 to-toxic-green/20 rounded-2xl blur-xl"></div>

          <div className="relative bg-dark-bg/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-dark-card/50 border border-electric-blue/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-toxic-green transition-colors"
                    placeholder="admin@portfolio.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-12 pr-12 py-3 bg-dark-card/50 border border-electric-blue/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-toxic-green transition-colors"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm"
                >
                  {error}
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 bg-gradient-to-r from-toxic-green to-emerald-400 text-dark-bg font-bold rounded-lg hover:shadow-lg hover:shadow-toxic-green/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Signing in..." : "Sign In"}
              </motion.button>
            </form>

            <div className="mt-6 p-4 bg-electric-blue/5 border border-electric-blue/20 rounded-lg">
              <p className="text-xs text-gray-400 text-center">
                Default: admin@portfolio.com / admin123
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <button
            onClick={() => router.push("/")}
            className="text-gray-400 hover:text-toxic-green transition-colors text-sm"
          >
            ← Back to Portfolio
          </button>
        </div>
      </motion.div>
    </div>
  );
}
