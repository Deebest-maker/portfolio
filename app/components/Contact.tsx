"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Mail,
  MapPin,
  Send,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Sparkles,
} from "lucide-react";
import ContactForm from "./ContactForm";

export default function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const contactLinks = [
    {
      icon: Mail,
      label: "Email",
      value: "thmsharuna@gmail.com",
      href: "mailto:thmsharuna@gmail.com",
      color: "from-red-500 to-orange-500",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "Deebest-maker",
      href: "https://github.com/Deebest-maker",
      color: "from-gray-600 to-gray-800",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "Thomas Haruna",
      href: "https://www.linkedin.com/in/thomas-haruna-07a75a349",
      color: "from-blue-600 to-blue-800",
    },
    {
      icon: Twitter,
      label: "Twitter/X",
      value: "@thomas_har68635",
      href: "https://x.com/thomas_har68635",
      color: "from-sky-500 to-blue-600",
    },
    {
      icon: Instagram,
      label: "Instagram",
      value: "@thomasdidibest",
      href: "https://www.instagram.com/thomasdidibest",
      color: "from-pink-500 to-purple-600",
    },
  ];

  return (
    <section
      id="contact"
      className="min-h-screen relative py-20 px-6 flex items-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-dark-bg to-dark-card"></div>

      {/* Animated background orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-20 left-20 w-96 h-96 bg-electric-blue/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          x: [0, -100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-20 right-20 w-96 h-96 bg-toxic-green/10 rounded-full blur-3xl"
      />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          ref={ref}
          className="text-center mb-12"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl font-bold text-white mb-4"
          >
            Let's Build{" "}
            <span className="bg-gradient-to-r from-toxic-green to-emerald-400 bg-clip-text text-transparent">
              Something Legendary
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Open to scholarship opportunities, collaborative projects, and
            innovative tech ventures. Let's connect and create the future
            together.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Side - Info Cards */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/20 to-purple-500/20 rounded-2xl blur-xl"></div>
              <div className="relative bg-dark-bg/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-toxic-green/10 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-toxic-green" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold">Location</h3>
                    <p className="text-gray-400">Nigeria</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-electric-blue/10 rounded-lg flex items-center justify-center">
                    <Send className="w-6 h-6 text-electric-blue" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold">Availability</h3>
                    <p className="text-gray-400">Open to Opportunities</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-toxic-green/20 to-electric-blue/20 rounded-2xl blur-xl"></div>
              <div className="relative bg-dark-bg/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-toxic-green" />
                  <h3 className="text-white font-bold">Quick Stats</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    {
                      value: "4+",
                      label: "Projects Built",
                      color: "toxic-green",
                    },
                    {
                      value: "10+",
                      label: "Technologies",
                      color: "electric-blue",
                    },
                    {
                      value: "100%",
                      label: "Self-Taught",
                      color: "purple-400",
                    },
                    { value: "∞", label: "Dedication", color: "toxic-green" },
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      className="text-center p-3 bg-dark-card/50 rounded-lg border border-white/5"
                    >
                      <motion.p
                        initial={{ scale: 0 }}
                        animate={inView ? { scale: 1 } : {}}
                        transition={{ delay: 0.9 + i * 0.1, type: "spring" }}
                        className={`text-3xl font-bold text-${stat.color}`}
                      >
                        {stat.value}
                      </motion.p>
                      <p className="text-gray-400 text-sm mt-1">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Side - Contact Links */}
          <div className="space-y-4">
            {contactLinks.map((link, index) => {
              const IconComponent = link.icon;
              return (
                <motion.a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: 50 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.03, x: 10 }}
                  className="group relative block"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${link.color} opacity-20 rounded-xl blur-lg group-hover:opacity-30 transition-opacity`}
                  ></div>

                  <div className="relative flex items-center gap-4 bg-dark-bg/50 backdrop-blur-xl border border-white/10 rounded-xl p-4 group-hover:border-toxic-green transition-all duration-300">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className={`w-12 h-12 bg-gradient-to-br ${link.color} rounded-lg flex items-center justify-center shadow-lg`}
                    >
                      <IconComponent className="w-6 h-6 text-white" />
                    </motion.div>
                    <div className="flex-1">
                      <h4 className="text-white font-semibold group-hover:text-toxic-green transition-colors">
                        {link.label}
                      </h4>
                      <p className="text-gray-400 text-sm">{link.value}</p>
                    </div>
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="text-electric-blue group-hover:text-toxic-green transition-colors"
                    >
                      →
                    </motion.span>
                  </div>
                </motion.a>
              );
            })}

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.3 }}
              className="mt-6 bg-dark-bg/50 backdrop-blur-xl border border-white/10 rounded-xl p-6"
            >
              <h3 className="text-white font-bold text-xl mb-4">
                Send a Message
              </h3>
              <ContactForm />
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mt-16 pt-8 border-t border-gray-800 text-center"
        >
          <p className="text-gray-400 mb-2">
            Built with passion by{" "}
            <span className="text-toxic-green font-semibold">
              Toma Hamidu Haruna
            </span>
          </p>
          <p className="text-gray-500 text-sm">
            © 2024 All rights reserved. Self-taught developer on a mission.
          </p>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mt-4 inline-block"
          >
            ⚡
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
