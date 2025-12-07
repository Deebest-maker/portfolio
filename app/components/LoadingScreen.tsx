"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen({
  onLoadingComplete,
}: {
  onLoadingComplete: () => void;
}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onLoadingComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-dark-bg"
    >
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/20 via-dark-bg to-toxic-green/20"></div>
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-electric-blue/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-toxic-green/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 text-center">
        {/* Animated Initials */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            duration: 1,
            type: "spring",
            stiffness: 200,
            damping: 15,
          }}
          className="mb-8"
        >
          <motion.div
            animate={{
              boxShadow: [
                "0 0 20px rgba(14, 165, 233, 0.5)",
                "0 0 60px rgba(34, 197, 94, 0.8)",
                "0 0 20px rgba(14, 165, 233, 0.5)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="inline-block"
          >
            <h1 className="text-9xl font-bold bg-gradient-to-r from-electric-blue via-purple-400 to-toxic-green bg-clip-text text-transparent">
              TH
            </h1>
          </motion.div>
        </motion.div>

        {/* Loading text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-gray-400 text-xl mb-8"
        >
          Loading Experience...
        </motion.p>

        {/* Progress bar */}
        <div className="w-64 h-2 bg-dark-card rounded-full overflow-hidden mx-auto">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-gradient-to-r from-electric-blue to-toxic-green"
          />
        </div>

        {/* Progress percentage */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-electric-blue text-sm mt-4 font-mono"
        >
          {progress}%
        </motion.p>
      </div>
    </motion.div>
  );
}
