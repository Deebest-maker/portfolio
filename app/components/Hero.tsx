"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Instagram, Mail } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function Hero() {
  const [profileImage, setProfileImage] = useState<string>("");
  const [displayedText, setDisplayedText] = useState("");
  const fullText = "Toma Hamidu Haruna";

  useEffect(() => {
    fetchProfileImage();
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);
    return () => clearInterval(timer);
  }, []);

  async function fetchProfileImage() {
    const { data } = await supabase
      .from("settings")
      .select("profile_image")
      .single();

    if (data?.profile_image) {
      setProfileImage(data.profile_image);
    }
  }

  const socialLinks = [
    { name: "GitHub", icon: Github, url: "https://github.com/Deebest-maker" },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://www.linkedin.com/in/thomas-haruna-07a75a349",
    },
    { name: "Twitter", icon: Twitter, url: "https://x.com/thomas_har68635" },
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://www.instagram.com/thomasdidibest",
    },
    { name: "Email", icon: Mail, url: "mailto:thmsharuna@gmail.com" },
  ];

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
    >
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-dark-bg to-blue-900/30"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-electric-blue/10 via-transparent to-toxic-green/10 animate-pulse"></div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-3 h-3 bg-electric-blue rounded-full animate-ping"></div>
        <div className="absolute top-40 right-20 w-4 h-4 bg-toxic-green rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-electric-blue rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 right-1/3 w-3 h-3 bg-toxic-green rounded-full animate-ping"></div>
        <div className="absolute top-1/2 left-20 w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-40 w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center md:text-left order-2 md:order-1"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              <p className="text-toxic-green text-lg font-semibold mb-2 animate-pulse">
                Hi there! 👋 I'm
              </p>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">
                <span className="inline-block transition-transform duration-300 bg-gradient-to-r from-electric-blue via-purple-400 to-toxic-green bg-clip-text text-transparent">
                  {displayedText}
                  <span className="animate-blink">|</span>
                </span>
              </h1>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-2xl md:text-3xl text-electric-blue font-semibold mb-6"
            >
              Blockchain & AI Developer | Full-Stack Engineer
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-lg text-gray-300 mb-8 leading-relaxed"
            >
              Engineering the future with blockchain innovation and artificial
              intelligence. Self-taught developer on a mission to solve
              tomorrow's problems today.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-8"
            >
              <a href="mailto:thmsharuna@gmail.com">
                <button className="group relative px-8 py-4 bg-gradient-to-r from-toxic-green to-emerald-400 text-dark-bg font-bold rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-toxic-green/50">
                  <span className="relative z-10">Get In Touch ✉️</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-toxic-green opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
              </a>

              <a href="#blog">
                <button className="px-8 py-4 border-2 border-electric-blue text-electric-blue font-bold rounded-lg hover:bg-electric-blue hover:text-dark-bg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-electric-blue/50">
                  Read My Blog 📝
                </button>
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex gap-4 justify-center md:justify-start"
            >
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + index * 0.1 }}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    className="w-12 h-12 flex items-center justify-center bg-dark-card border border-electric-blue/30 rounded-lg hover:border-toxic-green hover:bg-toxic-green/10 transition-all duration-300 hover:shadow-lg hover:shadow-toxic-green/50"
                    title={social.name}
                  >
                    <IconComponent className="w-5 h-5 text-electric-blue group-hover:text-toxic-green" />
                  </motion.a>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Right side - Portrait Photo */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-1 md:order-2 flex justify-center"
          >
            <div className="relative">
              {/* Glowing rings around photo */}
              <div className="absolute inset-0 bg-gradient-to-r from-electric-blue to-toxic-green rounded-full blur-2xl opacity-30 animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full blur-xl opacity-20 animate-ping"></div>

              {/* Photo container */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-electric-blue/50 hover:border-toxic-green transition-all duration-300 hover:scale-105 shadow-2xl">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Toma Hamidu Haruna"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to emoji if image fails to load
                      const target = e.currentTarget;
                      target.style.display = "none";
                      const parent = target.parentElement;
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
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce"
      >
        <a href="#skills">
          <div className="w-6 h-10 border-2 border-electric-blue rounded-full flex justify-center cursor-pointer hover:border-toxic-green transition-colors">
            <div className="w-1 h-3 bg-electric-blue rounded-full mt-2 animate-pulse"></div>
          </div>
        </a>
      </motion.div>
    </section>
  );
}
